# Continuous trait evolution on network

# default tolerances to optimize parameters in continuous trait evolution models
# like lambda, sigma2_withinspecies / sigma2_BM, etc.
const fAbsTr = 1e-10
const fRelTr = 1e-10
const xAbsTr = 1e-10
const xRelTr = 1e-10

"""
    MatrixTopologicalOrder

Matrix associated to an [`HybridNetwork`](@ref) in which rows/columns
correspond to nodes in the network, sorted in topological order.

The following functions and extractors can be applied to it: [`tipLabels`](@ref), `obj[:Tips]`, `obj[:InternalNodes]`, `obj[:TipsNodes]` (see documentation for function [`getindex(::MatrixTopologicalOrder, ::Symbol)`](@ref)).

Functions [`sharedPathMatrix`](@ref) and [`simulate`](@ref) return objects of this type.

The `MatrixTopologicalOrder` object has fields: `V`, `nodeNumbersTopOrder`, `internalNodeNumbers`, `tipNumbers`, `tipNames`, `indexation`.
Type in "?MatrixTopologicalOrder.field" to get documentation on a specific field.
"""
struct MatrixTopologicalOrder
    "V: the matrix per se"
    V::Matrix # Matrix in itself
    "nodeNumbersTopOrder: vector of nodes numbers in the topological order, used for the matrix"
    nodeNumbersTopOrder::Vector{Int} # Vector of nodes numbers for ordering of the matrix
    "internalNodeNumbers: vector of internal nodes number, in the original net order"
    internalNodeNumbers::Vector{Int} # Internal nodes numbers (original net order)
    "tipNumbers: vector of tips numbers, in the origial net order"
    tipNumbers::Vector{Int} # Tips numbers (original net order)
    "tipNames: vector of tips names, in the original net order"
    tipNames::Vector # Tips Names (original net order)
    """
    indexation: a string giving the type of matrix `V`:
    -"r": rows only are indexed by the nodes of the network
    -"c": columns only are indexed by the nodes of the network
    -"b": both rows and columns are indexed by the nodes of the network
    """
    indexation::AbstractString # Are rows ("r"), columns ("c") or both ("b") indexed by nodes numbers in the matrix ?
end

function Base.show(io::IO, obj::MatrixTopologicalOrder)
    println(io, "$(typeof(obj)):\n$(obj.V)")
end

# docstring already in descriptive.jl
function tipLabels(obj::MatrixTopologicalOrder)
    return obj.tipNames
end

# This function takes an init and update funtions as arguments
# It does the recursion using these functions on a preordered network.
function recursionPreOrder(net::HybridNetwork,
                           checkPreorder=true::Bool,
                           init=identity::Function,
                           updateRoot=identity::Function,
                           updateTree=identity::Function,
                           updateHybrid=identity::Function,
                           indexation="b"::AbstractString,
                           params...)
    net.isRooted || error("net needs to be rooted for a pre-oreder recursion")
    if(checkPreorder)
        preorder!(net)
    end
    M = recursionPreOrder(net.nodes_changed, init, updateRoot, updateTree, updateHybrid, params)
    # Find numbers of internal nodes
    nNodes = [n.number for n in net.node]
    nleaf = [n.number for n in net.leaf]
    deleteat!(nNodes, indexin(nleaf, nNodes))
    MatrixTopologicalOrder(M, [n.number for n in net.nodes_changed], nNodes, nleaf, [n.name for n in net.leaf], indexation)
end

"""
    recursionPreOrder(nodes, init_function, root_function, tree_node_function,
                      hybrid_node_function, parameters)
    recursionPreOrder!(nodes, AbstractArray, root_function, tree_node_function,
                       hybrid_node_function, parameters)
    updatePreOrder(index, nodes, updated_matrix, root_function, tree_node_function,
                   hybrid_node_function, parameters)

Generic tool to apply a pre-order (or topological ordering) algorithm.
Used by `sharedPathMatrix` and by `pairwiseTaxonDistanceMatrix`.
"""
function recursionPreOrder(nodes::Vector{Node},
                           init::Function,
                           updateRoot::Function,
                           updateTree::Function,
                           updateHybrid::Function,
                           params)
    M = init(nodes, params)
    recursionPreOrder!(nodes, M, updateRoot, updateTree, updateHybrid, params)
end
@doc (@doc recursionPreOrder) recursionPreOrder!
function recursionPreOrder!(nodes::Vector{Node},
                           M::AbstractArray,
                           updateRoot::Function,
                           updateTree::Function,
                           updateHybrid::Function,
                           params)
    for i in 1:length(nodes) #sorted list of nodes
        updatePreOrder!(i, nodes, M, updateRoot, updateTree, updateHybrid, params)
    end
    return M
end

@doc (@doc recursionPreOrder) updatePreOrder!
function updatePreOrder!(i::Int,
                         nodes::Vector{Node},
                         V::AbstractArray, updateRoot::Function,
                         updateTree::Function,
                         updateHybrid::Function,
                         params)
    parent = getParents(nodes[i]) #array of nodes (empty, size 1 or 2)
    if(isempty(parent)) #nodes[i] is root
        updateRoot(V, i, params)
    elseif(length(parent) == 1) #nodes[i] is tree
        parentIndex = getIndex(parent[1],nodes)
        edge = getConnectingEdge(nodes[i],parent[1])
        updateTree(V, i, parentIndex, edge, params)
    elseif(length(parent) == 2) #nodes[i] is hybrid
        parentIndex1 = getIndex(parent[1],nodes)
        parentIndex2 = getIndex(parent[2],nodes)
        edge1 = getConnectingEdge(nodes[i],parent[1])
        edge2 = getConnectingEdge(nodes[i],parent[2])
        edge1.hybrid || error("connecting edge between node $(nodes[i].number) and $(parent[1].number) should be a hybrid egde")
        edge2.hybrid || error("connecting edge between node $(nodes[i].number) and $(parent[2].number) should be a hybrid egde")
        updateHybrid(V, i, parentIndex1, parentIndex2, edge1, edge2, params)
    end
end

## Same, but in post order (tips to root). see docstring below
function recursionPostOrder(net::HybridNetwork,
                            checkPreorder=true::Bool,
                            init=identity::Function,
                            updateTip=identity::Function,
                            updateNode=identity::Function,
                            indexation="b"::AbstractString,
                            params...)
    net.isRooted || error("net needs to be rooted for a post-order recursion")
    if(checkPreorder)
        preorder!(net)
    end
    M = recursionPostOrder(net.nodes_changed, init, updateTip, updateNode, params)
    # Find numbers of internal nodes
    nNodes = [n.number for n in net.node]
    nleaf = [n.number for n in net.leaf]
    deleteat!(nNodes, indexin(nleaf, nNodes))
    MatrixTopologicalOrder(M, [n.number for n in net.nodes_changed], nNodes, nleaf, [n.name for n in net.leaf], indexation)
end

"""
    recursionPostOrder(net::HybridNetwork, checkPreorder::Bool,
                       init_function, tip_function, node_function,
                       indexation="b", parameters...)
    recursionPostOrder(nodes, init_function, tip_function, node_function,
                       parameters)
    updatePostOrder!(index, nodes, updated_matrix, tip_function, node_function,
                    parameters)

Generic tool to apply a post-order (or topological ordering) algorithm,
acting on a matrix where rows & columns correspond to nodes.
Used by `descendenceMatrix`.
"""
function recursionPostOrder(nodes::Vector{Node},
                            init::Function,
                            updateTip::Function,
                            updateNode::Function,
                            params)
    n = length(nodes)
    M = init(nodes, params)
    for i in n:-1:1 #sorted list of nodes
        updatePostOrder!(i, nodes, M, updateTip, updateNode, params)
    end
    return M
end
@doc (@doc recursionPostOrder) updatePostOrder!
function updatePostOrder!(i::Int,
                          nodes::Vector{Node},
                          V::Matrix,
                          updateTip::Function,
                          updateNode::Function,
                          params)
    children = getChildren(nodes[i]) #array of nodes (empty, size 1 or 2)
    if(isempty(children)) #nodes[i] is a tip
        updateTip(V, i, params)
    else
        childrenIndex = [getIndex(n, nodes) for n in children]
        edges = [getConnectingEdge(nodes[i], c) for c in children]
        updateNode(V, i, childrenIndex, edges, params)
    end
end

# Extract the right part of a matrix in topological order
# !! Extract sub-matrices in the original net nodes numbers !!
"""
    getindex(obj, d,[ indTips, nonmissing])

Getting submatrices of an object of type [`MatrixTopologicalOrder`](@ref).

# Arguments
* `obj::MatrixTopologicalOrder`: the matrix from which to extract.
* `d::Symbol`: a symbol precising which sub-matrix to extract. Can be:
  * `:Tips` columns and/or rows corresponding to the tips
  * `:InternalNodes` columns and/or rows corresponding to the internal nodes
  * `:TipsNodes` columns corresponding to internal nodes, and row to tips (works only is indexation="b")
* `indTips::Vector{Int}`: optional argument precising a specific order for the tips (internal use).
* `nonmissing::BitArray{1}`: optional argument saying which tips have data (internal use).
   Tips with missing data are treated as internal nodes.
"""
function Base.getindex(obj::MatrixTopologicalOrder,
                       d::Symbol,
                       indTips=collect(1:length(obj.tipNumbers))::Vector{Int},
                       nonmissing=trues(length(obj.tipNumbers))::BitArray{1})
    if d == :Tips # Extract rows and/or columns corresponding to the tips with data
        maskTips = indexin(obj.tipNumbers, obj.nodeNumbersTopOrder)
        maskTips = maskTips[indTips]
        maskTips = maskTips[nonmissing]
        obj.indexation == "b" && return obj.V[maskTips, maskTips] # both columns and rows are indexed by nodes
        obj.indexation == "c" && return obj.V[:, maskTips] # Only the columns
        obj.indexation == "r" && return obj.V[maskTips, :] # Only the rows
    end
    if d == :InternalNodes # Idem, for internal nodes
        maskNodes = indexin(obj.internalNodeNumbers, obj.nodeNumbersTopOrder)
        maskTips = indexin(obj.tipNumbers, obj.nodeNumbersTopOrder)
        maskTips = maskTips[indTips]
        maskNodes = [maskNodes; maskTips[.!nonmissing]]
        obj.indexation == "b" && return obj.V[maskNodes, maskNodes]
        obj.indexation == "c" && return obj.V[:, maskNodes]
        obj.indexation == "r" && return obj.V[maskNodes, :]
    end
    if d == :TipsNodes
        maskNodes = indexin(obj.internalNodeNumbers, obj.nodeNumbersTopOrder)
        maskTips = indexin(obj.tipNumbers, obj.nodeNumbersTopOrder)
        maskTips = maskTips[indTips]
        maskNodes = [maskNodes; maskTips[.!nonmissing]]
        maskTips = maskTips[nonmissing]
        obj.indexation == "b" && return obj.V[maskTips, maskNodes]
        obj.indexation == "c" && error("""Both rows and columns must be net
                                       ordered to take the submatrix tips vs internal nodes.""")
        obj.indexation == "r" && error("""Both rows and columns must be net
                                       ordered to take the submatrix tips vs internal nodes.""")
    end
    d == :All && return obj.V
end

###############################################################################
## phylogenetic variance-covariance between tips
###############################################################################
"""
    vcv(net::HybridNetwork; model="BM"::AbstractString,
                            corr=false::Bool,
                            checkPreorder=true::Bool)

This function computes the variance covariance matrix between the tips of the
network, assuming a Brownian model of trait evolution (with unit variance).
If optional argument `corr` is set to `true`, then the correlation matrix is returned instead.

The function returns a `DataFrame` object, with columns named by the tips of the network.

The calculation of the covariance matrix requires a pre-ordering of nodes to be fast.
If `checkPreorder` is true (default), then [`preorder!`](@ref) is run on the network beforehand.
Otherwise, the network is assumed to be already in pre-order.

This function internally calls [`sharedPathMatrix`](@ref), which computes the variance
matrix between all the nodes of the network.

# Examples
```jldoctest
julia> tree_str = "(((t2:0.14,t4:0.33):0.59,t3:0.96):0.14,(t5:0.70,t1:0.18):0.90);";

julia> tree = readTopology(tree_str);

julia> C = vcv(tree)
5×5 DataFrame
 Row │ t2       t4       t3       t5       t1      
     │ Float64  Float64  Float64  Float64  Float64 
─────┼─────────────────────────────────────────────
   1 │    0.87     0.73     0.14      0.0     0.0
   2 │    0.73     1.06     0.14      0.0     0.0
   3 │    0.14     0.14     1.1       0.0     0.0
   4 │    0.0      0.0      0.0       1.6     0.9
   5 │    0.0      0.0      0.0       0.9     1.08

```
The following block needs `ape` to be installed (not run):
```julia
julia> using RCall # Comparison with ape vcv function

julia> R"ape::vcv(ape::read.tree(text = \$tree_str))"
RCall.RObject{RCall.RealSxp}
     t2   t4   t3  t5   t1
t2 0.87 0.73 0.14 0.0 0.00
t4 0.73 1.06 0.14 0.0 0.00
t3 0.14 0.14 1.10 0.0 0.00
t5 0.00 0.00 0.00 1.6 0.90
t1 0.00 0.00 0.00 0.9 1.08

```

The covariance can also be calculated on a network
(for the model, see Bastide et al. 2018)
```jldoctest
julia> net = readTopology("((t1:1.0,#H1:0.1::0.30):0.5,((t2:0.9)#H1:0.2::0.70,t3:1.1):0.4);");

julia> C = vcv(net)
3×3 DataFrame
 Row │ t1       t2       t3      
     │ Float64  Float64  Float64 
─────┼───────────────────────────
   1 │    1.5     0.15      0.0
   2 │    0.15    1.248     0.28
   3 │    0.0     0.28      1.5
```
"""
function vcv(net::HybridNetwork;
             model="BM"::AbstractString,
             corr=false::Bool,
             checkPreorder=true::Bool)
    @assert (model == "BM") "The 'vcv' function only works for a BM process (for now)."
    V = sharedPathMatrix(net; checkPreorder=checkPreorder)
    C = V[:Tips]
    corr && StatsBase.cov2cor!(C, sqrt.(diag(C)))
    Cd = DataFrame(C, map(Symbol, V.tipNames))
    return(Cd)
end


"""
    sharedPathMatrix(net::HybridNetwork; checkPreorder=true::Bool)

This function computes the shared path matrix between all the nodes of a
network. It assumes that the network is in the pre-order. If checkPreorder is
true (default), then it runs function `preoder` on the network beforehand.

Returns an object of type [`MatrixTopologicalOrder`](@ref).

"""
function sharedPathMatrix(net::HybridNetwork;
                          checkPreorder=true::Bool)
    recursionPreOrder(net,
                      checkPreorder,
                      initsharedPathMatrix,
                      updateRootSharedPathMatrix!,
                      updateTreeSharedPathMatrix!,
                      updateHybridSharedPathMatrix!,
                      "b")
end

function updateRootSharedPathMatrix!(V::AbstractArray, i::Int, params)
    return
end


function updateTreeSharedPathMatrix!(V::Matrix,
                                     i::Int,
                                     parentIndex::Int,
                                     edge::Edge,
                                     params)
    for j in 1:(i-1)
        V[i,j] = V[j,parentIndex]
        V[j,i] = V[j,parentIndex]
    end
    V[i,i] = V[parentIndex,parentIndex] + edge.length
end

function updateHybridSharedPathMatrix!(V::Matrix,
                                       i::Int,
                                       parentIndex1::Int,
                                       parentIndex2::Int,
                                       edge1::Edge,
                                       edge2::Edge,
                                       params)
    for j in 1:(i-1)
        V[i,j] = V[j,parentIndex1]*edge1.gamma + V[j,parentIndex2]*edge2.gamma
        V[j,i] = V[i,j]
    end
    V[i,i] = edge1.gamma*edge1.gamma*(V[parentIndex1,parentIndex1] + edge1.length) + edge2.gamma*edge2.gamma*(V[parentIndex2,parentIndex2] + edge2.length) + 2*edge1.gamma*edge2.gamma*V[parentIndex1,parentIndex2]
end

function initsharedPathMatrix(nodes::Vector{Node}, params)
    n = length(nodes)
    return(zeros(Float64,n,n))
end

###############################################################################
"""
    descendenceMatrix(net::HybridNetwork; checkPreorder=true::Bool)

Compute the descendence matrix between all the nodes of a network:
an object `D` of type [`MatrixTopologicalOrder`](@ref) in which
`D[i,j]` is the proportion of genetic material in node `i` that can be traced
back to node `j`. If `D[i,j]>0` then `j` is a descendent of `i` (and `j` is
an ancestor of `i`).
The network is assumed to be pre-ordered if `checkPreorder` is false.
If `checkPreorder` is true (default), `preorder` is run on the network beforehand.
"""
function descendenceMatrix(net::HybridNetwork;
                         checkPreorder=true::Bool)
    recursionPostOrder(net,
                       checkPreorder,
                       initDescendenceMatrix,
                       updateTipDescendenceMatrix!,
                       updateNodeDescendenceMatrix!,
                       "r")
end

function updateTipDescendenceMatrix!(::Matrix, ::Int, params)
    return
end

function updateNodeDescendenceMatrix!(V::Matrix,
                                    i::Int,
                                    childrenIndex::Vector{Int},
                                    edges::Vector{Edge},
                                    params)
    for j in 1:length(edges)
        V[:,i] .+= edges[j].gamma .* V[:,childrenIndex[j]]
    end
end

function initDescendenceMatrix(nodes::Vector{Node}, params)
    n = length(nodes)
    return(Matrix{Float64}(I, n, n)) # identity matrix
end

###############################################################################
"""
    regressorShift(node::Vector{Node}, net::HybridNetwork; checkPreorder=true)
    regressorShift(edge::Vector{Edge}, net::HybridNetwork; checkPreorder=true)

Compute the regressor vectors associated with shifts on edges that are above nodes
`node`, or on edges `edge`, on a network `net`. It uses function [`descendenceMatrix`](@ref), so
`net` might be modified to sort it in a pre-order.
Return a `DataFrame` with as many rows as there are tips in net, and a column for
each shift, each labelled according to the pattern shift_{number_of_edge}. It has
an aditional column labelled `tipNames` to allow easy fitting afterward (see example).

# Examples
```jldoctest; filter = r"Info: Loading DataFrames support into Gadfly"
julia> net = readTopology("(A:2.5,((B:1,#H1:0.5::0.4):1,(C:1,(D:0.5)#H1:0.5::0.6):1):0.5);");

julia> preorder!(net)

julia> using PhyloPlots

julia> plot(net, :RCall, showNodeNumber=true); # to locate nodes

julia> nodes_shifts = indexin([1,-5], [n.number for n in net.node]) # Put a shift on edges ending at nodes 1 and -5
2-element Array{Union{Nothing, Int64},1}:
 1
 7

julia> params = ParamsBM(10, 0.1, ShiftNet(net.node[nodes_shifts], [3.0, -3.0],  net))
ParamsBM:
Parameters of a BM with fixed root:
mu: 10
Sigma2: 0.1

There are 2 shifts on the network:
──────────────────────────
  Edge Number  Shift Value
──────────────────────────
          8.0         -3.0
          1.0          3.0
──────────────────────────

julia> using Random; Random.seed!(2468); # sets the seed for reproducibility

julia> sim = simulate(net, params); # simulate a dataset with shifts

julia> using DataFrames # to handle data frames

julia> dat = DataFrame(trait = sim[:Tips], tipNames = sim.M.tipNames)
4×2 DataFrame
 Row │ trait     tipNames 
     │ Float64   String   
─────┼────────────────────
   1 │ 13.392    A
   2 │  9.55741  B
   3 │  7.17704  C
   4 │  7.88906  D

julia> dfr_shift = regressorShift(net.node[nodes_shifts], net) # the regressors matching the shifts.
4×3 DataFrame
 Row │ shift_1  shift_8  tipNames 
     │ Float64  Float64  String   
─────┼────────────────────────────
   1 │     1.0      0.0  A
   2 │     0.0      0.0  B
   3 │     0.0      1.0  C
   4 │     0.0      0.6  D

julia> dfr = innerjoin(dat, dfr_shift, on=:tipNames); # join data and regressors in a single dataframe

julia> using StatsModels # for statistical model formulas

julia> fitBM = phyloNetworklm(@formula(trait ~ shift_1 + shift_8), dfr, net) # actual fit
StatsModels.TableRegressionModel{PhyloNetworkLinearModel,Array{Float64,2}}

Formula: trait ~ 1 + shift_1 + shift_8

Model: BM

Parameter(s) Estimates:
Sigma2: 0.0112618

Coefficients:
────────────────────────────────────────────────────────────────────────
                Coef.  Std. Error      t  Pr(>|t|)  Lower 95%  Upper 95%
────────────────────────────────────────────────────────────────────────
(Intercept)   9.48238    0.327089  28.99    0.0220    5.32632   13.6384
shift_1       3.9096     0.46862    8.34    0.0759   -2.04479    9.86399
shift_8      -2.4179     0.422825  -5.72    0.1102   -7.7904     2.95461
────────────────────────────────────────────────────────────────────────
Log Likelihood: 1.8937302027
AIC: 4.2125395947

```

# See also
[`phyloNetworklm`](@ref), [`descendenceMatrix`](@ref), [`regressorHybrid`](@ref).
"""
function regressorShift(node::Vector{Node},
                        net::HybridNetwork; checkPreorder=true::Bool)
    T = descendenceMatrix(net; checkPreorder=checkPreorder)
    regressorShift(node, net, T)
end

function regressorShift(node::Vector{Node},
                        net::HybridNetwork,
                        T::MatrixTopologicalOrder)
    ## Get the descendence matrix for tips
    T_t = T[:Tips]
    ## Get the indices of the columns to keep
    ind = zeros(Int, length(node))
    for i in 1:length(node)
        !node[i].hybrid || error("Shifts on hybrid edges are not allowed")
        ind[i] = getIndex(node[i], net.nodes_changed)
    end
    ## get column names
    eNum = [getMajorParentEdgeNumber(n) for n in net.nodes_changed[ind]]
    function tmp_fun(x::Int)
        return(Symbol("shift_$(x)"))
    end
    df = DataFrame(T_t[:, ind], [tmp_fun(num) for num in eNum])
    df[!,:tipNames]=T.tipNames
    return(df)
end

function regressorShift(edge::Vector{Edge},
                        net::HybridNetwork; checkPreorder=true::Bool)
    childs = [getChild(ee) for ee in edge]
    return(regressorShift(childs, net; checkPreorder=checkPreorder))
end

regressorShift(edge::Edge, net::HybridNetwork; checkPreorder=true::Bool) = regressorShift([edge], net; checkPreorder=checkPreorder)
regressorShift(node::Node, net::HybridNetwork; checkPreorder=true::Bool) = regressorShift([node], net; checkPreorder=checkPreorder)

"""
    regressorHybrid(net::HybridNetwork; checkPreorder=true::Bool)

Compute the regressor vectors associated with shifts on edges that imediatly below
all hybrid nodes of `net`. It uses function [`descendenceMatrix`](@ref) through
a call to [`regressorShift`](@ref), so `net` might be modified to sort it in a pre-order.
Return a `DataFrame` with as many rows as there are tips in net, and a column for
each hybrid, each labelled according to the pattern shift_{number_of_edge}. It has
an aditional column labelled `tipNames` to allow easy fitting afterward (see example).

This function can be used to test for heterosis.

# Examples
```jldoctest; filter = r"Info: Loading DataFrames support into Gadfly"
julia> using DataFrames # Needed to handle data frames.

julia> net = readTopology("(A:2.5,((B:1,#H1:0.5::0.4):1,(C:1,(D:0.5)#H1:0.5::0.6):1):0.5);");

julia> preorder!(net)

julia> using PhyloPlots

julia> plot(net, :RCall, showNodeNumber=true); # to locate nodes: node 5 is child of hybrid node

julia> nodes_hybrids = indexin([5], [n.number for n in net.node]) # Put a shift on edges below hybrids
1-element Array{Union{Nothing, Int64},1}:
 5

julia> params = ParamsBM(10, 0.1, ShiftNet(net.node[nodes_hybrids], [3.0],  net))
ParamsBM:
Parameters of a BM with fixed root:
mu: 10
Sigma2: 0.1

There are 1 shifts on the network:
──────────────────────────
  Edge Number  Shift Value
──────────────────────────
          6.0          3.0
──────────────────────────


julia> using Random; Random.seed!(2468); # sets the seed for reproducibility

julia> sim = simulate(net, params); # simulate a dataset with shifts

julia> dat = DataFrame(trait = sim[:Tips], tipNames = sim.M.tipNames)
4×2 DataFrame
 Row │ trait     tipNames 
     │ Float64   String   
─────┼────────────────────
   1 │ 10.392    A
   2 │  9.55741  B
   3 │ 10.177    C
   4 │ 12.6891   D

julia> dfr_hybrid = regressorHybrid(net) # the regressors matching the hybrids.
4×3 DataFrame
 Row │ shift_6  tipNames  sum     
     │ Float64  String    Float64 
─────┼────────────────────────────
   1 │     0.0  A             0.0
   2 │     0.0  B             0.0
   3 │     0.0  C             0.0
   4 │     1.0  D             1.0

julia> dfr = innerjoin(dat, dfr_hybrid, on=:tipNames); # join data and regressors in a single dataframe

julia> using StatsModels

julia> fitBM = phyloNetworklm(@formula(trait ~ shift_6), dfr, net) # actual fit
StatsModels.TableRegressionModel{PhyloNetworkLinearModel,Array{Float64,2}}

Formula: trait ~ 1 + shift_6

Model: BM

Parameter(s) Estimates:
Sigma2: 0.041206

Coefficients:
────────────────────────────────────────────────────────────────────────
                Coef.  Std. Error      t  Pr(>|t|)  Lower 95%  Upper 95%
────────────────────────────────────────────────────────────────────────
(Intercept)  10.064      0.277959  36.21    0.0008    8.86805   11.26
shift_6       2.72526    0.315456   8.64    0.0131    1.36796    4.08256
────────────────────────────────────────────────────────────────────────
Log Likelihood: -0.7006021946
AIC: 7.4012043891

```

# See also
[`phyloNetworklm`](@ref), [`descendenceMatrix`](@ref), [`regressorShift`](@ref).
"""
function regressorHybrid(net::HybridNetwork; checkPreorder=true::Bool)
    childs = [getChildren(nn)[1] for nn in net.hybrid]
    dfr = regressorShift(childs, net; checkPreorder=checkPreorder)
    dfr[!,:sum] = sum.(eachrow(select(dfr, Not(:tipNames), copycols=false)))
    return(dfr)
end

# Type for shifts
"""
    ShiftNet

Shifts associated to a [`HybridNetwork`](@ref) sorted in topological order.
Its `shift` field is a vector of shift values, one for each node,
corresponding to the shift on the parent edge of the node
(which makes sense for tree nodes only: they have a single parent edge).

Two `ShiftNet` objects on the same network can be concatened with `*`.

`ShiftNet(node::Vector{Node}, value::AbstractVector, net::HybridNetwork; checkPreorder=true::Bool)`

Constructor from a vector of nodes and associated values. The shifts are located
on the edges above the nodes provided. Warning, shifts on hybrid edges are not
allowed.

`ShiftNet(edge::Vector{Edge}, value::AbstractVector, net::HybridNetwork; checkPreorder=true::Bool)`

Constructor from a vector of edges and associated values.
Warning, shifts on hybrid edges are not allowed.

Extractors: [`getShiftEdgeNumber`](@ref), [`getShiftValue`](@ref)
"""
struct ShiftNet
    shift::Matrix{Float64}
    net::HybridNetwork
end

# Default
ShiftNet(net::HybridNetwork, dim::Int) = ShiftNet(zeros(length(net.node), dim), net)
ShiftNet(net::HybridNetwork) = ShiftNet(net, 1)

function ShiftNet(node::Vector{Node}, value::AbstractMatrix,
                  net::HybridNetwork; checkPreorder=true::Bool)

    n_nodes, dim = size(value)
    if length(node) != n_nodes
        error("The vector of nodes/edges and of values must have the same number or rows.")
    end
    if checkPreorder
        preorder!(net)
    end
    obj = ShiftNet(net, dim)
    for i in 1:length(node)
        !node[i].hybrid || error("Shifts on hybrid edges are not allowed")
        ind = findfirst(x -> x===node[i], net.nodes_changed)
        obj.shift[ind, :] .= @view value[i, :]
    end
    return(obj)
end

function ShiftNet(node::Vector{Node}, value::AbstractVector,
                  net::HybridNetwork; checkPreorder=true::Bool)
    return ShiftNet(node, reshape(value, (length(value), 1)), net,
                    checkPreorder = checkPreorder)
end

# Construct from edges and values
function ShiftNet(edge::Vector{Edge},
                  value::Union{AbstractVector, AbstractMatrix},
                  net::HybridNetwork; checkPreorder=true::Bool)
    childs = [getChild(ee) for ee in edge]
    return(ShiftNet(childs, value, net; checkPreorder=checkPreorder))
end

ShiftNet(edge::Edge, value::Float64, net::HybridNetwork; checkPreorder=true::Bool) = ShiftNet([edge], [value], net; checkPreorder=checkPreorder)
ShiftNet(node::Node, value::Float64, net::HybridNetwork; checkPreorder=true::Bool) = ShiftNet([node], [value], net; checkPreorder=checkPreorder)

function ShiftNet(edge::Edge, value::AbstractVector{Float64},
                  net::HybridNetwork; checkPreorder=true::Bool)
    return ShiftNet([edge], reshape(value, (1, length(value))), net,
                    checkPreorder = checkPreorder)
end

function ShiftNet(node::Node, value::AbstractVector{Float64},
                  net::HybridNetwork; checkPreorder=true::Bool)
    return ShiftNet([node], reshape(value, (1, length(value))), net,
                    checkPreorder = checkPreorder)
end


"""
    shiftHybrid(value::Vector{T} where T<:Real, net::HybridNetwork; checkPreorder=true::Bool)

Construct an object [`ShiftNet`](@ref) with shifts on all the edges below
hybrid nodes, with values provided. The vector of values must have the
same length as the number of hybrids in the network.

"""
function shiftHybrid(value::Union{Matrix{T}, Vector{T}} where T<:Real,
                     net::HybridNetwork; checkPreorder=true::Bool)
    if length(net.hybrid) != size(value, 1)
        error("You must provide as many values as the number of hybrid nodes.")
    end
    childs = [getChildren(nn)[1] for nn in net.hybrid]
    return(ShiftNet(childs, value, net; checkPreorder=checkPreorder))
end
shiftHybrid(value::Real, net::HybridNetwork; checkPreorder=true::Bool) = shiftHybrid([value], net; checkPreorder=checkPreorder)

"""
    getShiftEdgeNumber(shift::ShiftNet)

Get the edge numbers where the shifts are located, for an object [`ShiftNet`](@ref).
If a shift is placed at the root node with no parent edge, the edge number
of a shift is set to -1 (as if missing).
"""
function getShiftEdgeNumber(shift::ShiftNet)
    nodInd = getShiftRowInds(shift)
    [getMajorParentEdgeNumber(n) for n in shift.net.nodes_changed[nodInd]]
end

function getMajorParentEdgeNumber(n::Node)
    try
        getMajorParentEdge(n).number
    catch
        -1
    end
end

function getShiftRowInds(shift::ShiftNet)
    n, p = size(shift.shift)
    inds = zeros(Int, n)
    counter = 0
    for i = 1:n
        use_row = !all(iszero, @view shift.shift[i, :])
        if use_row
            counter += 1
            inds[counter] = i
        end
    end

    return inds[1:counter]
end
"""
    getShiftValue(shift::ShiftNet)

Get the values of the shifts, for an object [`ShiftNet`](@ref).
"""
function getShiftValue(shift::ShiftNet)
    rowInds = getShiftRowInds(shift)
    shift.shift[rowInds, :]
end

function shiftTable(shift::ShiftNet)
    sv = getShiftValue(shift)
    if size(sv, 2) == 1
        shift_labels = ["Shift Value"]
    else
        shift_labels = ["Shift Value $i" for i = 1:size(sv, 2)]
    end
    CoefTable(hcat(getShiftEdgeNumber(shift), sv),
              ["Edge Number"; shift_labels],
              fill("", size(sv, 1)))
end

function Base.show(io::IO, obj::ShiftNet)
    println(io, "$(typeof(obj)):\n",
            shiftTable(obj))
end

function Base.:*(sh1::ShiftNet, sh2::ShiftNet)
    isEqual(sh1.net, sh2.net) || error("Shifts to be concatenated must be defined on the same network.")
    size(sh1.shift) == size(sh2.shift) || error("Shifts to be concatenated must have the same dimensions.")
    shiftNew = zeros(size(sh1.shift))
    for i in 1:length(sh1.shift)
        if iszero(sh1.shift[i])
            shiftNew[i] = sh2.shift[i]
        elseif iszero(sh2.shift[i])
            shiftNew[i] = sh1.shift[i]
        elseif sh1.shift[i] == sh2.shift[i]
            shiftNew[i] = sh1.shift[i]
        else
            error("The two shifts matrices you provided affect the same " *
                  "trait for the same edge, so I cannot choose which one you want.")
        end
    end
    return(ShiftNet(shiftNew, sh1.net))
end

# function Base.:(==)(sh1::ShiftNet, sh2::ShiftNet)
#     isEqual(sh1.net, sh2.net) || return(false)
#     sh1.shift == sh2.shift || return(false)
#     return(true)
# end

###################################################
# types to hold parameters for evolutionary process
# like scalar BM, multivariate BM, OU?

abstract type ParamsProcess end

"""
    ParamsBM <: ParamsProcess

Type for a BM process on a network. Fields are `mu` (expectation),
`sigma2` (variance), `randomRoot` (whether the root is random, default to `false`),
and `varRoot` (if the root is random, the variance of the root, default to `NaN`).

"""
mutable struct ParamsBM <: ParamsProcess
    mu::Real # Ancestral value or mean
    sigma2::Real # variance
    randomRoot::Bool # Root is random ? default false
    varRoot::Real # root variance. Default NaN
    shift::Union{ShiftNet, Missing} # shifts

    function ParamsBM(mu::Real,
                      sigma2::Real,
                      randomRoot::Bool,
                      varRoot::Real,
                      shift::Union{ShiftNet, Missing})
        if !ismissing(shift) && size(shift.shift, 2) != 1
            error("ShiftNet must have only a single shift dimension.")
        end
        return new(mu, sigma2, randomRoot, varRoot, shift)
    end
end
# Constructor
ParamsBM(mu::Real, sigma2::Real) = ParamsBM(mu, sigma2, false, NaN, missing) # default values
ParamsBM(mu::Real, sigma2::Real, net::HybridNetwork) = ParamsBM(mu, sigma2, false, NaN, ShiftNet(net)) # default values
ParamsBM(mu::Real, sigma2::Real, shift::ShiftNet) = ParamsBM(mu, sigma2, false, NaN, shift) # default values

function anyShift(params::ParamsProcess)
    if ismissing(params.shift) return(false) end
    for v in params.shift.shift
        if v != 0 return(true) end
    end
    return(false)
end

function process_dim(::ParamsBM)
    return 1
end

function Base.show(io::IO, obj::ParamsBM)
    disp =  "$(typeof(obj)):\n"
    pt = paramstable(obj)
    if obj.randomRoot
        disp = disp * "Parameters of a BM with random root:\n" * pt
    else
        disp = disp * "Parameters of a BM with fixed root:\n" * pt
    end
    println(io, disp)
end

function paramstable(obj::ParamsBM)
    disp = "mu: $(obj.mu)\nSigma2: $(obj.sigma2)"
    if obj.randomRoot
        disp = disp * "\nvarRoot: $(obj.varRoot)"
    end
    if anyShift(obj)
        disp = disp * "\n\nThere are $(length(getShiftValue(obj.shift))) shifts on the network:\n"
        disp = disp * "$(shiftTable(obj.shift))"
    end
    return(disp)
end


"""
    ParamsMultiBM <: ParamsProcess

Type for a multivariate Brownian diffusion (MBD) process on a network. Fields are `mu` (expectation),
`sigma` (covariance matrix), `randomRoot` (whether the root is random, default to `false`),
`varRoot` (if the root is random, the covariance matrix of the root, default to `[NaN]`),
`shift` (a ShiftNet type, default to `missing`),
and `L` (the lower triangular of the cholesky decomposition of `sigma`, computed automatically)

# Constructors
```jldoctest
julia> ParamsMultiBM([1.0, -0.5], [2.0 0.3; 0.3 1.0]) # no shifts
ParamsMultiBM:
Parameters of a MBD with fixed root:
mu: [1.0, -0.5]
Sigma: [2.0 0.3; 0.3 1.0]

julia> net = readTopology("((A:1,B:1):1,C:2);");

julia> shifts = ShiftNet(net.node[2], [-1.0, 2.0], net);

julia> ParamsMultiBM([1.0, -0.5], [2.0 0.3; 0.3 1.0], shifts) # with shifts
ParamsMultiBM:
Parameters of a MBD with fixed root:
mu: [1.0, -0.5]
Sigma: [2.0 0.3; 0.3 1.0]

There are 2 shifts on the network:
───────────────────────────────────────────
  Edge Number  Shift Value 1  Shift Value 2
───────────────────────────────────────────
          2.0           -1.0            2.0
───────────────────────────────────────────


```

"""
mutable struct ParamsMultiBM <: ParamsProcess
    mu::AbstractArray{Float64, 1}
    sigma::AbstractArray{Float64, 2}
    randomRoot::Bool
    varRoot::AbstractArray{Float64, 2}
    shift::Union{ShiftNet, Missing}
    L::LowerTriangular{Float64}

    function ParamsMultiBM(mu::AbstractArray{Float64, 1},
                           sigma::AbstractArray{Float64, 2},
                           randomRoot::Bool,
                           varRoot::AbstractArray{Float64, 2},
                           shift::Union{ShiftNet, Missing},
                           L::LowerTriangular{Float64})
        dim = length(mu)
        if size(sigma) != (dim, dim)
            error("The mean and variance do must have conforming dimensions.")
        end
        if randomRoot && size(sigma) != size(varRoot)
            error("The root variance and process variance must have the same dimensions.")
        end
        if !ismissing(shift) && size(shift.shift, 2) != dim
            error("The ShiftNet and diffusion process must have the same dimensions.")
        end
        return new(mu, sigma, randomRoot, varRoot, shift, L)
    end
end

ParamsMultiBM(mu::AbstractArray{Float64, 1},
              sigma::AbstractArray{Float64, 2}) =
        ParamsMultiBM(mu, sigma, false, Diagonal([NaN]), missing, cholesky(sigma).L)

function ParamsMultiBM(mu::AbstractArray{Float64, 1},
                       sigma::AbstractArray{Float64, 2},
                       shift::ShiftNet)
    ParamsMultiBM(mu, sigma, false, Diagonal([NaN]), shift, cholesky(sigma).L)
end

function ParamsMultiBM(mu::AbstractArray{Float64, 1},
                       sigma::AbstractArray{Float64, 2},
                       net::HybridNetwork)
    ParamsMultiBM(mu, sigma, ShiftNet(net, length(mu)))
end


function process_dim(params::ParamsMultiBM)
    return length(params.mu)
end


function Base.show(io::IO, obj::ParamsMultiBM)
    disp =  "$(typeof(obj)):\n"
    pt = paramstable(obj)
    if obj.randomRoot
        disp = disp * "Parameters of a MBD with random root:\n" * pt
    else
        disp = disp * "Parameters of a MBD with fixed root:\n" * pt
    end
    println(io, disp)
end

function paramstable(obj::ParamsMultiBM)
    disp = "mu: $(obj.mu)\nSigma: $(obj.sigma)"
    if obj.randomRoot
        disp = disp * "\nvarRoot: $(obj.varRoot)"
    end
    if anyShift(obj)
        disp = disp * "\n\nThere are $(length(getShiftValue(obj.shift))) shifts on the network:\n"
        disp = disp * "$(shiftTable(obj.shift))"
    end
    return(disp)
end


function partitionMBDMatrix(M::Matrix{Float64}, dim::Int)

    means = @view M[1:dim, :]
    vals = @view M[(dim + 1):(2 * dim), :]
    return means, vals
end


###############################################################################
## Simulation of continuous traits
###############################################################################

"""
    TraitSimulation

Result of a trait simulation on an [`HybridNetwork`](@ref) with function [`simulate`](@ref).

The following functions and extractors can be applied to it: [`tipLabels`](@ref), `obj[:Tips]`, `obj[:InternalNodes]` (see documentation for function [`getindex(::TraitSimulation, ::Symbol)`](@ref)).

The `TraitSimulation` object has fields: `M`, `params`, `model`.
"""
struct TraitSimulation
    M::MatrixTopologicalOrder
    params::ParamsProcess
    model::AbstractString
end

function Base.show(io::IO, obj::TraitSimulation)
    disp = "$(typeof(obj)):\n"
    disp = disp * "Trait simulation results on a network with $(length(obj.M.tipNames)) tips, using a $(obj.model) model, with parameters:\n"
    disp = disp * paramstable(obj.params)
    println(io, disp)
end

# docstring already in descriptive.jl
function tipLabels(obj::TraitSimulation)
    return tipLabels(obj.M)
end


"""
    simulate(net::HybridNetwork, params::ParamsProcess, checkPreorder=true::Bool)

Simulate traits on `net` using the parameters `params`. For now, only
parameters of type [`ParamsBM`](@ref) (univariate Brownian Motion) and
[`ParamsMultiBM`](@ref) (multivariate Brownian motion) are accepted.

The simulation using a recursion from the root to the tips of the network,
therefore, a pre-ordering of nodes is needed. If `checkPreorder=true` (default),
[`preorder!`](@ref) is called on the network beforehand. Otherwise, it is assumed
that the preordering has already been calculated.

Returns an object of type [`TraitSimulation`](@ref),
which has a matrix with the trait expecations and simulated trait values at
all the nodes.

See examples below for accessing expectations and simulated trait values.

# Examples
## Univariate
```jldoctest
julia> phy = readTopology(joinpath(dirname(pathof(PhyloNetworks)), "..", "examples", "carnivores_tree.txt"));

julia> par = ParamsBM(1, 0.1) # BM with expectation 1 and variance 0.1.
ParamsBM:
Parameters of a BM with fixed root:
mu: 1
Sigma2: 0.1


julia> using Random; Random.seed!(17920921); # for reproducibility

julia> sim = simulate(phy, par) # Simulate on the tree.
TraitSimulation:
Trait simulation results on a network with 16 tips, using a BM model, with parameters:
mu: 1
Sigma2: 0.1


julia> traits = sim[:Tips] # Extract simulated values at the tips.
16-element Array{Float64,1}:
  2.17618427971927
  1.0330846124205684
  3.048979175536912
  3.0379560744947876
  2.189704751299587
  4.031588898597555
  4.647725850651446
 -0.8772851731182523
  4.625121065244063
 -0.5111667949991542
  1.3560351170535228
 -0.10311152349323893
 -2.088472913751017
  2.6399137689702723
  2.8051193818084057
  3.1910928691142915

julia> sim.M.tipNames # name of tips, in the same order as values above
16-element Array{String,1}:
 "Prionodontidae"
 "Felidae"
 "Viverridae"
 "Herpestidae"
 "Eupleridae"
 "Hyaenidae"
 "Nandiniidae"
 "Canidae"
 "Ursidae"
 "Odobenidae"
 "Otariidae"
 "Phocidae"
 "Mephitidae"
 "Ailuridae"
 "Mustelidae"
 "Procyonidae"

julia> traits = sim[:InternalNodes] # Extract simulated values at internal nodes. Order: as in sim.M.internalNodeNumbers
15-element Array{Float64,1}:
 1.1754592873593104
 2.0953234045227083
 2.4026760531649423
 1.8143470622283222
 1.5958834784477616
 2.5535578380290103
 0.14811474751515852
 1.2168428692963675
 3.169431736805764
 2.906447201806521
 2.8191520015241545
 2.280632978157822
 2.5212485416800425
 2.4579867601968663
 1.0

julia> traits = sim[:All] # simulated values at all nodes, ordered as in sim.M.nodeNumbersTopOrder
31-element Array{Float64,1}:
 1.0
 2.4579867601968663
 2.5212485416800425
 2.280632978157822
 2.8191520015241545
 2.906447201806521
 3.169431736805764
 3.1910928691142915
 2.8051193818084057
 2.6399137689702723
 ⋮
 2.4026760531649423
 4.031588898597555
 2.0953234045227083
 2.189704751299587
 3.0379560744947876
 3.048979175536912
 1.1754592873593104
 1.0330846124205684
 2.17618427971927

julia> traits = sim[:Tips, :Exp] # Extract expected values at the tips (also works for sim[:All, :Exp] and sim[:InternalNodes, :Exp]).
16-element Array{Float64,1}:
 1.0
 1.0
 1.0
 1.0
 1.0
 1.0
 1.0
 1.0
 1.0
 1.0
 1.0
 1.0
 1.0
 1.0
 1.0
 1.0
```

## Multivariate
```jldoctest
julia> phy = readTopology(joinpath(dirname(pathof(PhyloNetworks)), "..", "examples", "carnivores_tree.txt"));

julia> par = ParamsMultiBM([1.0, 2.0], [1.0 0.5; 0.5 1.0]) # BM with expectation [1.0, 2.0] and variance [1.0 0.5; 0.5 1.0].
ParamsMultiBM:
Parameters of a MBD with fixed root:
mu: [1.0, 2.0]
Sigma: [1.0 0.5; 0.5 1.0]

julia> using Random; Random.seed!(17920921); # for reproducibility

julia> sim = simulate(phy, par) # Simulate on the tree.
TraitSimulation:
Trait simulation results on a network with 16 tips, using a MBD model, with parameters:
mu: [1.0, 2.0]
Sigma: [1.0 0.5; 0.5 1.0]


julia> traits = sim[:Tips] # Extract simulated values at the tips (each column contains the simulated traits for one node).
2×16 Array{Float64,2}:
 5.39465  7.223     1.88036  -5.10491   …  -3.86504  0.133704  -2.44564
 7.29184  7.59947  -1.89206  -0.960013      3.86822  3.23285    1.93376

julia> traits = sim[:InternalNodes] # simulated values at internal nodes. order: same as in sim.M.internalNodeNumbers
2×15 Array{Float64,2}:
 4.42499  -0.364198  0.71666   3.76669  …  4.57552  4.29265  5.61056  1.0
 6.24238   2.97237   0.698006  2.40122     5.92623  5.13753  4.5268   2.0

julia> traits = sim[:All] # simulated values at all nodes, ordered as in sim.M.nodeNumbersTopOrder
2×31 Array{Float64,2}:
 1.0  5.61056  4.29265  4.57552  …   1.88036  4.42499  7.223    5.39465
 2.0  4.5268   5.13753  5.92623     -1.89206  6.24238  7.59947  7.29184

julia> sim[:Tips, :Exp] # Extract expected values (also works for sim[:All, :Exp] and sim[:InternalNodes, :Exp])
2×16 Array{Float64,2}:
 1.0  1.0  1.0  1.0  1.0  1.0  1.0  1.0  …  1.0  1.0  1.0  1.0  1.0  1.0  1.0
 2.0  2.0  2.0  2.0  2.0  2.0  2.0  2.0     2.0  2.0  2.0  2.0  2.0  2.0  2.0
```
"""
function simulate(net::HybridNetwork,
                  params::ParamsProcess,
                  checkPreorder=true::Bool)
    if isa(params, ParamsBM)
        model = "BM"
    elseif isa(params, ParamsMultiBM)
        model = "MBD"
    else
        error("The 'simulate' function only works for a BM process (for now).")
    end
    !ismissing(params.shift) || (params.shift = ShiftNet(net, process_dim(params)))

    net.isRooted || error("The net needs to be rooted for trait simulation.")
    !anyShiftOnRootEdge(params.shift) || error("Shifts are not allowed above the root node. Please put all root specifications in the process parameter.")

    funcs = preorderFunctions(params)
    M = recursionPreOrder(net,
                          checkPreorder,
                          funcs["init"],
                          funcs["root"],
                          funcs["tree"],
                          funcs["hybrid"],
                          "c",
                          params)
    TraitSimulation(M, params, model)
end


function preorderFunctions(::ParamsBM)
    return Dict("init" => initSimulateBM,
                "root" => updateRootSimulateBM!,
                "tree" => updateTreeSimulateBM!,
                "hybrid" => updateHybridSimulateBM!)
end

function preorderFunctions(::ParamsMultiBM)
    return Dict("init" => initSimulateMBD,
                "root" => updateRootSimulateMBD!,
                "tree" => updateTreeSimulateMBD!,
                "hybrid" => updateHybridSimulateMBD!)
end


function anyShiftOnRootEdge(shift::ShiftNet)
    nodInd = getShiftRowInds(shift)
    for n in shift.net.nodes_changed[nodInd]
        !(getMajorParentEdgeNumber(n) == -1) || return(true)
    end
    return(false)
end

# Initialization of the structure
function initSimulateBM(nodes::Vector{Node}, ::Tuple{ParamsBM})
    return(zeros(2, length(nodes)))
end

function initSimulateMBD(nodes::Vector{Node}, params::Tuple{ParamsMultiBM})
    n = length(nodes)
    p = process_dim(params[1])
    return zeros(2 * p, n) # [means vals]
end


# Initialization of the root
function updateRootSimulateBM!(M::Matrix, i::Int, params::Tuple{ParamsBM})
    params = params[1]
    if (params.randomRoot)
        M[1, i] = params.mu # expectation
        M[2, i] = params.mu + sqrt(params.varRoot) * randn() # random value
    else
        M[1, i] = params.mu # expectation
        M[2, i] = params.mu # random value (root fixed)
    end
end

function updateRootSimulateMBD!(M::Matrix{Float64},
                                i::Int,
                                params::Tuple{ParamsMultiBM})
    params = params[1]
    p = process_dim(params)

    means, vals = partitionMBDMatrix(M, p)

    if (params.randomRoot)
        means[:, i] .= params.mu # expectation
        vals[:, i] .= params.mu + cholesky(params.varRoot).L * randn(p) # random value
    else
        means[:, i] .= params.mu # expectation
        vals[:, i] .= params.mu # random value
    end
end

# Going down to a tree node
function updateTreeSimulateBM!(M::Matrix,
                               i::Int,
                               parentIndex::Int,
                               edge::Edge,
                               params::Tuple{ParamsBM})
    params = params[1]
    M[1, i] = M[1, parentIndex] + params.shift.shift[i] # expectation
    M[2, i] = M[2, parentIndex] + params.shift.shift[i] + sqrt(params.sigma2 * edge.length) * randn() # random value
end

function updateTreeSimulateMBD!(M::Matrix{Float64},
                               i::Int,
                               parentIndex::Int,
                               edge::Edge,
                               params::Tuple{ParamsMultiBM})
    params = params[1]
    p = process_dim(params)

    means, vals = partitionMBDMatrix(M, p)

    μ = @view means[:, i]
    val = @view vals[:, i]

    # μ .= means[:, parentIndex] + params.shift.shift[i, :]
    μ .= @view means[:, parentIndex]
    μ .+= @view params.shift.shift[i, :]

    # val .= sqrt(edge.length) * params.L * randn(p) + vals[:, parentIndex] + params.shift.shift[i, :]
    mul!(val, params.L, randn(p))
    val .*= sqrt(edge.length)
    val .+= @view vals[:, parentIndex]
    val .+= params.shift.shift[i, :]
end

# Going down to an hybrid node
function updateHybridSimulateBM!(M::Matrix,
                                 i::Int,
                                 parentIndex1::Int,
                                 parentIndex2::Int,
                                 edge1::Edge,
                                 edge2::Edge,
                                 params::Tuple{ParamsBM})
    params = params[1]
    M[1, i] =  edge1.gamma * M[1, parentIndex1] + edge2.gamma * M[1, parentIndex2] # expectation
    M[2, i] =  edge1.gamma * (M[2, parentIndex1] + sqrt(params.sigma2 * edge1.length) * randn()) + edge2.gamma * (M[2, parentIndex2] + sqrt(params.sigma2 * edge2.length) * randn()) # random value
end

function updateHybridSimulateMBD!(M::Matrix{Float64},
                                 i::Int,
                                 parentIndex1::Int,
                                 parentIndex2::Int,
                                 edge1::Edge,
                                 edge2::Edge,
                                 params::Tuple{ParamsMultiBM})

    params = params[1]
    p = process_dim(params)

    means, vals = partitionMBDMatrix(M, p)

    μ = @view means[:, i]
    val = @view vals[:, i]

    μ1 = @view means[:, parentIndex1]
    μ2 = @view means[:, parentIndex2]

    v1 = @view vals[:, parentIndex1]
    v2 = @view vals[:, parentIndex2]

    # means[:, i] .= edge1.gamma * μ1 + edge2.gamma * μ2
    mul!(μ, μ1, edge1.gamma)
    BLAS.axpy!(edge2.gamma, μ2, μ)  # expectation

    # val .=  edge1.gamma * (v1 + sqrt(edge1.length) * params.L * r1) +
    #                 edge2.gamma * (v2 + sqrt(edge2.length) * params.L * r2) # random value
    mul!(val, params.L, randn(p))
    val .*= sqrt(edge1.length)
    val .+= v1

    buffer = params.L * randn(p)
    buffer .*= sqrt(edge2.length)
    buffer .+= v2
    BLAS.axpby!(edge2.gamma, buffer, edge1.gamma, val) # random value
end

# Extract the vector of simulated values at the tips
"""
    getindex(obj, d)

Getting submatrices of an object of type [`TraitSimulation`](@ref).

# Arguments
* `obj::TraitSimulation`: the matrix from which to extract.
* `d::Symbol`: a symbol precising which sub-matrix to extract. Can be:
  * `:Tips` columns and/or rows corresponding to the tips
  * `:InternalNodes` columns and/or rows corresponding to the internal nodes
"""
function Base.getindex(obj::TraitSimulation, d::Symbol, w=:Sim::Symbol)
    inds = siminds(obj.params, w)
    return getindex(obj.M, d)[inds, :]
end

function siminds(::ParamsBM, w::Symbol)
    if w == :Sim
        return 2
    elseif w == :Exp
        return 1
    else
        error("The argument 'w' must be ':Sim' or ':Exp'. (':$w' was supplied)")
    end
end

function siminds(params::ParamsMultiBM, w::Symbol)
    p = process_dim(params)
    if w == :Sim
        return (p + 1):(2 * p)
    elseif w == :Exp
        return 1:p
    else
        error("The argument 'w' must be ':Sim' or ':Exp'. (':$w' was supplied)")
    end
end

###############################################################################
## Type for models with within-species variation (or measurement error)
###############################################################################

# WithinSpeciesCTM stands for "within species continuous trait model"
# error_distr::ContinuousUnivariateDistribution # immutable, e.g: Normal()
"""
    WithinSpeciesCTM

CTM stands for "continuous trait model". Contains the estimated variance components for a  
measurement error model, and output from the `NLopt` optimization used in the estimation.

## Fields

- `wsp_var`: within-species measurement-error variance
- `bsp_var`: between-species variance-rate
- `wsp_ninv`: vector of the inverse sample sizes (e.g. [1/n₁,...,1/nₖ], where there are k  
species in the phylogeny represented without missing predictor values in the dataset, and  
nᵢ is the no. of observations for the ith of those k species encountered as row number  
increases) 
- `optsum`: an [`OptSummary`](@ref) object

"""
struct WithinSpeciesCTM
    "within-species variance η*σ², assumes Normal distribution"
    wsp_var::Vector{Float64} # vector to make it mutable
    "between-species variance rate σ², such as from Brownian motion"
    bsp_var::Vector{Float64}
    "inverse sample sizes (or precision): 1/#individuals within each species"
    wsp_ninv::Vector{Float64}
    "NLopt & NLopt summary object"
    optsum::OptSummary
end

"""
    ContinuousTraitEM

Abstract type for evolutionary models for continuous traits, using a continuous-time
stochastic process on a phylogeny. 

For sub types, see [`BM`](@ref), [`PagelLambda`](@ref), [`ScalingHybrid`](@ref)

Each of these models has the field `lambda`, corresponding to a variance-rate. Default  
value for `lambda` is 1.0.
"""
abstract type ContinuousTraitEM end

# current concrete subtypes: BM, PagelLambda, ScalingHybrid
# possible future additions: OU (Ornstein-Uhlenbeck)?
"""
    BM 

Brownian Motion model. Independent Gaussian increments with mean=0 and variance=`lambda` ⋅ t,  
where t is the length of the increment.
"""
struct BM <: ContinuousTraitEM
    lambda::Float64 # immutable
end
BM() = BM(1.0)

"""
    PagelLambda

Pagel's Lambda model.
"""
mutable struct PagelLambda <: ContinuousTraitEM
    lambda::Float64 # mutable: can be optimized
end
PagelLambda() = PagelLambda(1.0)

"""
    ScalingHybrid

Scaling Hybrid model.
"""
mutable struct ScalingHybrid <: ContinuousTraitEM
    lambda::Float64
end
ScalingHybrid() = ScalingHybrid(1.0)

###############################################################################
##     phylogenetic network regression
###############################################################################

"""
    PhyloNetworkLinearModel<:GLM.LinPredModel

Regression object for a phylogenetic regression. Result of fitting [`phyloNetworklm(::Matrix,::Vector,::HybridNetwork)`](@ref).

The following StatsBase functions can be applied to it:  
`coef`, `nobs`, `vcov`, `stderror`, `confint`, `coeftable`, `dof_residual`, `dof`, `deviance`,  
`residuals`, `response`, `predict`, `loglikelihood`, `nulldeviance`, `nullloglikelihood`,  
`r2`, `adjr2`, `aic`, `aicc`, `bic`.

Estimated variance and mean of the BM process used can be retrieved with
functions [`sigma2_estim`](@ref) and [`mu_estim`](@ref).

If a Pagel's lambda model is fitted, the parameter can be retrieved with function
[`lambda_estim`](@ref).

An ancestral state reconstruction can be performed from this fitted object using function:
[`ancestralStateReconstruction`](@ref).

The `PhyloNetworkLinearModel` object has fields: `lm`, `V`, `Vy`, `RL`, `Y`, `X`, `logdetVy`,  
`reml`, `ind`, `nonmissing`, `model`, `model_within`.  
Type in "?PhyloNetworkLinearModel.field" to get help on a specific field (e.g. "?PhyloNetworkLinearModel.lm"  
for help on the `lm` field of the object).
"""
mutable struct PhyloNetworkLinearModel <: GLM.LinPredModel
    "lm: a GLM.LinearModel object, fitted on the cholesky-tranformend problem"
    lm::GLM.LinearModel # result of a lm on a matrix
    "V: a MatrixTopologicalOrder object of the network-induced correlations"
    V::MatrixTopologicalOrder
    "Vy: the sub matrix corresponding to the tips and actually used for the correction"
    Vy::Matrix
    "RL: a LowerTriangular matrix, Cholesky transform of Vy=RL*RL'"
    RL::LowerTriangular
    "Y: the vector of data"
    Y::Vector
    "X: the matrix of regressors"
    X::Matrix
    "logdetVy: the log-determinent of Vy"
    logdetVy::Float64
    "criterion: REML if reml is true, ML otherwise"
    reml::Bool
    "ind: vector matching the tips of the network against the names of the dataframe provided. 0 if the match could not be performed."
    ind::Vector{Int}
    "nonmissing: vector indicating which tips have non-missing data"
    nonmissing::BitArray{1}
    "model: the model used for the fit"
    model::ContinuousTraitEM
    "model_within: the model used for describing measurement error (if needed)"
    model_within::Union{Nothing, WithinSpeciesCTM}
end

# default model_within=nothing
PhyloNetworkLinearModel(lm,  V,Vy,RL,Y,X,logdetVy, reml,ind,nonmissing, model) =
  PhyloNetworkLinearModel(lm,V,Vy,RL,Y,X,logdetVy, reml,ind,nonmissing, model,nothing)


#= ------ roadmap of phyloNetworklm methods --------------

with or without measurement error:
- phyloNetworklm(formula, dataframe, net; model="BM",...,msr_err=false,...)
- phyloNetworklm(X,Y,net, model::ContinuousTraitEM; kwargs...)
  calls a function with or without measurement error.

1. no measurement error:
   - phyloNetworklm(model, X,Y,net, reml; kwargs...) dispatches based on model type
   - phyloNetworklm_lambda(X,Y,V,reml, gammas,times; ...)
   - phyloNetworklm_scalingHybrid(X,Y,net,reml, gammas; ...)

   helpers:
   - pgls(X,Y,V; ...) for vanilla BM, but called by others with fixed V_theta
   - logLik_lam(lambda, X,Y,V,gammas,times; ...)
   - logLik_lam_hyb(lambda, X,Y,net,gammas; ...)

2. with measurement error (within-species variation):
   - phyloNetworklm_wsp(model, X,Y,net, reml; kwargs...) dispatch based on model
     implemented for model <: BM only

   - phyloNetworklm_wsp(X,Y,V,reml, nonmissing,ind, counts,ySD, model_within)
   - phyloNetworklm_wsp(Xsp,Ysp,Vsp,reml, d_inv,RSS, n,p,a, model_within)
=#
function phyloNetworklm(X::Matrix,
                        Y::Vector,
                        net::HybridNetwork,
                        model::ContinuousTraitEM = BM();
                        reml=false::Bool,
                        nonmissing=trues(length(Y))::BitArray{1},
                        ind=[0]::Vector{Int},
                        startingValue=0.5::Real,
                        fixedValue=missing::Union{Real,Missing},
                        msr_err::Bool=false,
                        counts::Union{Nothing, Vector}=nothing,
                        ySD::Union{Nothing, Vector}=nothing)
    if msr_err
        phyloNetworklm_wsp(model, X,Y,net, reml; nonmissing=nonmissing, ind=ind,
                        counts=counts, ySD=ySD)
    else
        phyloNetworklm(model, X,Y,net, reml; nonmissing=nonmissing, ind=ind,
                       startingValue=startingValue, fixedValue=fixedValue)
    end
end

function phyloNetworklm(::BM, X::Matrix, Y::Vector, net::HybridNetwork, reml::Bool;
                        nonmissing=trues(length(Y))::BitArray{1},
                        ind=[0]::Vector{Int},
                        kwargs...)
    # BM variance covariance:
    # V_ij = expected shared time for independent genes in i & j
    V = sharedPathMatrix(net)
    linmod, Vy, RL, logdetVy = pgls(X,Y,V; nonmissing=nonmissing, ind=ind)
    return PhyloNetworkLinearModel(linmod, V, Vy, RL, Y, X,
                logdetVy, reml, ind, nonmissing, BM())
end

function phyloNetworklm(::PagelLambda,
                        X::Matrix,
                        Y::Vector,
                        net::HybridNetwork,
                        reml::Bool;
                        nonmissing=trues(length(Y))::BitArray{1},
                        ind=[0]::Vector{Int},
                        startingValue=0.5::Real,
                        fixedValue=missing::Union{Real,Missing})
    # BM variance covariance
    V = sharedPathMatrix(net)
    gammas = getGammas(net)
    times = getHeights(net)
    phyloNetworklm_lambda(X,Y,V,reml, gammas, times;
            nonmissing=nonmissing, ind=ind,
            startingValue=startingValue, fixedValue=fixedValue)
end

#= ScalingHybrid = BM but with optimized weights of hybrid edges:
minor edges have their original γ's changed to λγ. Same λ at all hybrids.
see Bastide (2017) dissertation, section 4.3.2 p.175, at
https://tel.archives-ouvertes.fr/tel-01629648
=#
function phyloNetworklm(::ScalingHybrid,
                        X::Matrix,
                        Y::Vector,
                        net::HybridNetwork,
                        reml::Bool;
                        nonmissing=trues(length(Y))::BitArray{1},
                        ind=[0]::Vector{Int},
                        startingValue=0.5::Real,
                        fixedValue=missing::Union{Real,Missing})
    preorder!(net)
    gammas = getGammas(net)
    phyloNetworklm_scalingHybrid(X, Y, net, reml, gammas;
            nonmissing=nonmissing, ind=ind,
            startingValue=startingValue, fixedValue=fixedValue)
end

###############################################################################
## Fit BM

# Vanilla BM using covariance V. used for other models: V calculated beforehand
function pgls(X::Matrix, Y::Vector, V::MatrixTopologicalOrder;
        nonmissing=trues(length(Y))::BitArray{1}, # which tips are not missing?
        ind=[0]::Vector{Int})
    # Extract tips matrix
    Vy = V[:Tips]
    # Re-order if necessary
    if (ind != [0]) Vy = Vy[ind, ind] end
    # Keep only not missing values
    Vy = Vy[nonmissing, nonmissing]
    # Cholesky decomposition
    R = cholesky(Vy)
    RL = R.L
    # Fit with GLM.lm, and return quantities needed downstream
    return lm(RL\X, RL\Y), Vy, RL, logdet(R)
end

###############################################################################
## helper functions for lambda models

"""
    getGammas(net)

Get inheritance γ's of major hybrid edges. Assume pre-order calculated already
(with up-to-date field `nodes_changed`). See [`setGammas!`](@ref)
"""
function getGammas(net::HybridNetwork)
    isHybrid = [n.hybrid for n in net.nodes_changed]
    gammas = ones(size(isHybrid))
    for i in 1:size(isHybrid, 1)
        if isHybrid[i]
            majorHybrid = [n.hybrid & n.isMajor for n in net.nodes_changed[i].edge]
            gammas[i] = net.nodes_changed[i].edge[majorHybrid][1].gamma
        end
    end
    return gammas
end

"""
    setGammas!(net, γ vector)

Set inheritance γ's of hybrid edges, using input vector for *major* edges.
Assume pre-order calculated already, with up-to-date field `nodes_changed`.
See [`getGammas`](@ref).

Very different from [`setGamma!`](@ref), which focuses on a single hybrid event,
updates the field `isMajor` according to the new γ, and is not used here.

May assume a tree-child network.
"""
function setGammas!(net::HybridNetwork, gammas::Vector)
    isHybrid = [n.hybrid for n in net.nodes_changed]
    for i in 1:size(isHybrid, 1)
        if isHybrid[i]
            nod = net.nodes_changed[i]
            majorHybrid = [edg.hybrid &  edg.isMajor for edg in nod.edge]
            # worry: assume tree-child network? getMajorParent and getMinorParent would be safer
            minorHybrid = [edg.hybrid & !edg.isMajor for edg in nod.edge]
            nod.edge[majorHybrid][1].gamma = gammas[i]
            if any(minorHybrid) # case where gamma = 0.5 exactly
                nod.edge[minorHybrid][1].gamma = 1 - gammas[i]
            else
                nod.edge[majorHybrid][2].gamma = 1 - gammas[i]
            end
        end
    end
    return nothing
end

"""
    getHeights(net)

Return the height (distance to the root) of all nodes, assuming a time-consistent network
(where all paths from the root to a given hybrid node have the same length).
Also assumes that the network has been preordered, because it uses
[`getGammas`](@ref) and [`setGammas!`](@ref)).
"""
function getHeights(net::HybridNetwork)
    gammas = getGammas(net)
    setGammas!(net, ones(net.numNodes))
    V = sharedPathMatrix(net)
    setGammas!(net, gammas)
    return(diag(V[:All]))
end

function maxLambda(times::Vector, V::MatrixTopologicalOrder)
    maskTips = indexin(V.tipNumbers, V.nodeNumbersTopOrder)
    maskNodes = indexin(V.internalNodeNumbers, V.nodeNumbersTopOrder)
    return minimum(times[maskTips]) / maximum(times[maskNodes])
    # res = minimum(times[maskTips]) / maximum(times[maskNodes])
    # res = res * (1 - 1/5/maximum(times[maskTips]))
end

function transform_matrix_lambda!(V::MatrixTopologicalOrder, lam::AbstractFloat,
                                  gammas::Vector, times::Vector)
    for i in 1:size(V.V, 1)
        for j in 1:size(V.V, 2)
            V.V[i,j] *= lam
        end
    end
    maskTips = indexin(V.tipNumbers, V.nodeNumbersTopOrder)
    for i in maskTips
        V.V[i, i] += (1-lam) * (gammas[i]^2 + (1-gammas[i])^2) * times[i]
    end
    #   V_diag = Matrix(Diagonal(diag(V.V)))
    #   V.V = lam * V.V .+ (1 - lam) .* V_diag
end

function logLik_lam(lam::AbstractFloat,
                    X::Matrix, Y::Vector,
                    V::MatrixTopologicalOrder,
                    reml::Bool,
                    gammas::Vector, times::Vector;
                    nonmissing=trues(length(Y))::BitArray{1}, # Which tips are not missing ?
                    ind=[0]::Vector{Int})
    # Transform V according to lambda
    Vp = deepcopy(V)
    transform_matrix_lambda!(Vp, lam, gammas, times)
    # Fit and take likelihood
    linmod, Vy, RL, logdetVy = pgls(X,Y,Vp; nonmissing=nonmissing, ind=ind)
    n = (reml ? dof_residual(linmod) : nobs(linmod))
    res = n*log(deviance(linmod)) + logdetVy
    if reml res += logdet(linmod.pp.chol); end
    return res
end

function phyloNetworklm_lambda(X::Matrix,
                               Y::Vector,
                               V::MatrixTopologicalOrder,
                               reml::Bool,
                               gammas::Vector,
                               times::Vector;
                               nonmissing=trues(length(Y))::BitArray{1}, # Which tips are not missing ?
                               ind=[0]::Vector{Int},
                               ftolRel=fRelTr::AbstractFloat,
                               xtolRel=xRelTr::AbstractFloat,
                               ftolAbs=fAbsTr::AbstractFloat,
                               xtolAbs=xAbsTr::AbstractFloat,
                               startingValue=0.5::Real,
                               fixedValue=missing::Union{Real,Missing})
    if ismissing(fixedValue)
        # Find Best lambda using optimize from package NLopt
        opt = NLopt.Opt(:LN_BOBYQA, 1)
        NLopt.ftol_rel!(opt, ftolRel) # relative criterion
        NLopt.ftol_abs!(opt, ftolAbs) # absolute critetion
        NLopt.xtol_rel!(opt, xtolRel) # criterion on parameter value changes
        NLopt.xtol_abs!(opt, xtolAbs) # criterion on parameter value changes
        NLopt.maxeval!(opt, 1000) # max number of iterations
        NLopt.lower_bounds!(opt, 1e-100) # Lower bound
        # Upper Bound
        up = maxLambda(times, V)
        up = up-up/1000
        NLopt.upper_bounds!(opt, up)
        @info "Maximum lambda value to maintain positive branch lengths: " * @sprintf("%.6g", up)
        count = 0
        function fun(x::Vector{Float64}, g::Vector{Float64})
            x = convert(AbstractFloat, x[1])
            res = logLik_lam(x, X,Y,V, reml, gammas, times; nonmissing=nonmissing, ind=ind)
            count =+ 1
            #println("f_$count: $(round(res, digits=5)), x: $(x)")
            return res
        end
        NLopt.min_objective!(opt, fun)
        fmin, xmin, ret = NLopt.optimize(opt, [startingValue])
        # Best value dans result
        res_lam = xmin[1]
    else
        res_lam = fixedValue
    end
    transform_matrix_lambda!(V, res_lam, gammas, times)
    linmod, Vy, RL, logdetVy = pgls(X,Y,V; nonmissing=nonmissing, ind=ind)
    res = PhyloNetworkLinearModel(linmod, V, Vy, RL, Y, X,
                logdetVy, reml, ind, nonmissing, PagelLambda(res_lam))
    return res
end

###############################################################################
## Fit scaling hybrid

function matrix_scalingHybrid(net::HybridNetwork, lam::AbstractFloat,
                              gammas::Vector)
    setGammas!(net, 1.0 .- lam .* (1. .- gammas))
    V = sharedPathMatrix(net)
    setGammas!(net, gammas)
    return V
end

function logLik_lam_hyb(lam::AbstractFloat,
                        X::Matrix, Y::Vector,
                        net::HybridNetwork, reml::Bool, gammas::Vector;
                        nonmissing=trues(length(Y))::BitArray{1}, # Which tips are not missing ?
                        ind=[0]::Vector{Int})
    # Transform V according to lambda
    V = matrix_scalingHybrid(net, lam, gammas)
    # Fit and take likelihood
    linmod, Vy, RL, logdetVy = pgls(X,Y,V; nonmissing=nonmissing, ind=ind)
    n = (reml ? dof_residual(linmod) : nobs(linmod))
    res = n*log(deviance(linmod)) + logdetVy
    if reml res += logdet(linmod.pp.chol); end
    return res
end

function phyloNetworklm_scalingHybrid(X::Matrix,
                                      Y::Vector,
                                      net::HybridNetwork,
                                      reml::Bool,
                                      gammas::Vector;
                                      nonmissing=trues(length(Y))::BitArray{1}, # Which tips are not missing ?
                                      ind=[0]::Vector{Int},
                                      ftolRel=fRelTr::AbstractFloat,
                                      xtolRel=xRelTr::AbstractFloat,
                                      ftolAbs=fAbsTr::AbstractFloat,
                                      xtolAbs=xAbsTr::AbstractFloat,
                                      startingValue=0.5::Real,
                                      fixedValue=missing::Union{Real,Missing})
    if ismissing(fixedValue)
        # Find Best lambda using optimize from package NLopt
        opt = NLopt.Opt(:LN_BOBYQA, 1)
        NLopt.ftol_rel!(opt, ftolRel) # relative criterion
        NLopt.ftol_abs!(opt, ftolAbs) # absolute critetion
        NLopt.xtol_rel!(opt, xtolRel) # criterion on parameter value changes
        NLopt.xtol_abs!(opt, xtolAbs) # criterion on parameter value changes
        NLopt.maxeval!(opt, 1000) # max number of iterations
        #NLopt.lower_bounds!(opt, 1e-100) # Lower bound
        #NLopt.upper_bounds!(opt, 1.0)
        count = 0
        function fun(x::Vector{Float64}, g::Vector{Float64})
            x = convert(AbstractFloat, x[1])
            res = logLik_lam_hyb(x, X, Y, net, reml, gammas; nonmissing=nonmissing, ind=ind)
            #count =+ 1
            #println("f_$count: $(round(res, digits=5)), x: $(x)")
            return res
        end
        NLopt.min_objective!(opt, fun)
        fmin, xmin, ret = NLopt.optimize(opt, [startingValue])
        # Best value dans result
        res_lam = xmin[1]
    else
        res_lam = fixedValue
    end
    V = matrix_scalingHybrid(net, res_lam, gammas)
    linmod, Vy, RL, logdetVy = pgls(X,Y,V; nonmissing=nonmissing, ind=ind)
    res = PhyloNetworkLinearModel(linmod, V, Vy, RL, Y, X,
                logdetVy, reml, ind, nonmissing, ScalingHybrid(res_lam))
    return res
end


"""
    phyloNetworklm(f, dataframe, net; model="BM", ...)

Phylogenetic regression, using the correlation structure induced by the network.

Returns an object of type [`StatsModels.TableRegressionModel`](@ref). The wrapped [`PhyloNetworkLinearModel`]   
object, can be accessed by `object.model`. For accessing the model matrix (`object.mm` and `object.mm.m`),  
the model frame (`object.mf`) or formula (`object.mf.f`), refer to [StatsModels](https://juliastats.github.io/StatsModels.jl/stable/) functions, like `show(object.mf.f)`,  
`terms(object.mf.f)`, `coefnames(object.mf.f)`, `terms(object.mf.f.rhs)`, `response(object)` etc.

# Arguments
* `f`: formula to use for the regression
* `fr`: DataFrame containing the response values, predictor values, species/tip labels for each observation/row.  
If `msr_err=true` and `y_mean_std=true` (i.e. we want to fit a measurement error model by supplying species-level  
statistics rather than individual-level observations), then two additional columns have to be provided:  
  (1) species sample sizes (i.e. no. of observations for each species)  
  (2) species standard deviations (i.e. standard deviations of the response values for each species sample)  
By default, the column name for species/tip labels is assumed to be "tipNames", though this can be changed  
by setting the `tipnames` argument.  
By default, the column names for species sample sizes and species standard deviations are "[response column name]_n"  
and "[response column name]_sd".
* `net`: phylogenetic network to use. Should have labelled tips.
* `model`: model for trait evolution. "BM" (default), "lambda" (for Pagel's lambda), "scalingHybrid"
* `tipnames=:tipNames`: column name for species/tip labels represented as a symbol (i.e. if the desired column name  
is "species", then do `tipnames=:species`)
* `no_names=false`: if `true`, force the function to ignore the tips names. The data is then assumed to be in the  
same order as the tips of the network. Default is false, setting it to true is dangerous, and strongly discouraged.
* `reml=false`: if `true`, use REML estimation for variance components

The following tolerance parameters control the optimization of lambda if `model="lambda"` or `model="scalingHybrid"`,  
and control the optimization of the variance components if `model="BM"` and `msr_err=true`. 
* `fTolRel=fRelTr`: relative tolerance on the likelihood value for the optimization
* `fTolAbs=xRelTr`: absolute tolerance on the likelihood value for the optimization
* `xTolRel=fAbsTr`: relative tolerance on the parameter value for the optimization
* `xTolAbs=xAbsTr`: absolute tolerance on the parameter value for the optimization


* `startingValue=0.5`: starting value for the optimization in lambda, if `model="lambda"` or `model="scalingHybrid"`
* `fixedValue=missing`: if `fixedValue::Real` and either `model="lambda"` or `model="scalingHybrid"`, then lambda  
is set to fixedValue and is not optimized. 
* `msr_err=false`: if `true`, then fits a measurement error model. Currently only implemented for `model="BM"`
* `y_mean_std=false`: if `true`, and `msr_err=true`, then fits a measurement error model using species-level  
statistics provided in `fr`.

# See also

Type [`PhyloNetworkLinearModel`](@ref), Function [`ancestralStateReconstruction`](@ref)

# Examples

```jldoctest
julia> phy = readTopology(joinpath(dirname(pathof(PhyloNetworks)), "..", "examples", "caudata_tree.txt"));

julia> using DataFrames, CSV # to read data file, next

julia> dat = CSV.File(joinpath(dirname(pathof(PhyloNetworks)), "..", "examples", "caudata_trait.txt")) |> DataFrame;

julia> using StatsModels # for stat model formulas

julia> fitBM = phyloNetworklm(@formula(trait ~ 1), dat, phy);

julia> fitBM # Shows a summary
StatsModels.TableRegressionModel{PhyloNetworkLinearModel,Array{Float64,2}}

Formula: trait ~ 1

Model: BM

Parameter(s) Estimates:
Sigma2: 0.00294521

Coefficients:
─────────────────────────────────────────────────────────────────────
             Coef.  Std. Error      t  Pr(>|t|)  Lower 95%  Upper 95%
─────────────────────────────────────────────────────────────────────
(Intercept)  4.679    0.330627  14.15    <1e-31    4.02696    5.33104
─────────────────────────────────────────────────────────────────────
Log Likelihood: -78.9611507833
AIC: 161.9223015666

julia> round(sigma2_estim(fitBM), digits=6) # rounding for jldoctest convenience
0.002945

julia> round(mu_estim(fitBM), digits=4)
4.679

julia> using StatsBase # for aic() stderror() loglikelihood() etc.

julia> round(loglikelihood(fitBM), digits=10)
-78.9611507833

julia> round(aic(fitBM), digits=10)
161.9223015666

julia> round(aicc(fitBM), digits=10)
161.9841572367

julia> round(bic(fitBM), digits=10)
168.4887090241

julia> round.(coef(fitBM), digits=4)
1-element Array{Float64,1}:
 4.679

julia> confint(fitBM)
1×2 Array{Float64,2}:
 4.02696  5.33104

julia> abs(round(r2(fitBM), digits=10)) # absolute value for jldoctest convenience
0.0

julia> abs(round(adjr2(fitBM), digits=10))
0.0

julia> round.(vcov(fitBM), digits=6)
1×1 Array{Float64,2}:
 0.109314

julia> round.(residuals(fitBM), digits=6)
197-element Array{Float64,1}:
 -0.237648
 -0.357937
 -0.159387
 -0.691868
 -0.323977
 -0.270452
 -0.673486
 -0.584654
 -0.279882
 -0.302175
  ⋮
 -0.777026
 -0.385121
 -0.443444
 -0.327303
 -0.525953
 -0.673486
 -0.603158
 -0.211712
 -0.439833

julia> round.(response(fitBM), digits=5)
197-element Array{Float64,1}:
 4.44135
 4.32106
 4.51961
 3.98713
 4.35502
 4.40855
 4.00551
 4.09434
 4.39912
 4.37682
 ⋮
 3.90197
 4.29388
 4.23555
 4.3517
 4.15305
 4.00551
 4.07584
 4.46729
 4.23917

julia> round.(predict(fitBM), digits=5)
197-element Array{Float64,1}:
 4.679
 4.679
 4.679
 4.679
 4.679
 4.679
 4.679
 4.679
 4.679
 4.679
 ⋮
 4.679
 4.679
 4.679
 4.679
 4.679
 4.679
 4.679
 4.679
 4.679

julia> net = readTopology("((((D:0.4,C:0.4):4.8,((A:0.8,B:0.8):2.2)#H1:2.2::0.7):4.0,(#H1:0::0.3,E:3.0):6.2):2.0,O:11.2);");

julia> df = DataFrame(
    species = repeat(["D","C","A","B","E","O"],inner=3),
    trait1 = [4.08298,4.08298,4.08298,3.10782,3.10782,3.10782,2.17078,2.17078,2.17078,1.87333,1.87333,1.87333,2.8445,2.8445,
              2.8445,5.88204,5.88204,5.88204],
    trait2 = [-7.34186,-7.34186,-7.34186,-7.45085,-7.45085,-7.45085,-3.32538,-3.32538,-3.32538,-4.26472,-4.26472,-4.26472,
              -5.96857,-5.96857,-5.96857,-1.99388,-1.99388,-1.99388],
    trait3 = [18.8101,18.934,18.9438,17.0687,17.0639,17.0732,14.4818,14.1112,14.2817,13.0842,12.9562,12.9019,15.4373,
              15.4075,15.4317,24.2249,24.1449,24.1302]
); # individual-level observations 

julia> m1 = phyloNetworklm(@formula(trait3 ~ trait1), df, net; reml=true, tipnames=:species, msr_err=true);

julia> m1
StatsModels.TableRegressionModel{PhyloNetworkLinearModel,Array{Float64,2}}

Formula: trait3 ~ 1 + trait1

Model: PhyloNetworks.BM

Parameter(s) Estimates:
Sigma2: 0.156188
Sigma2 (NLopt): 0.156188
Within-Species Variance: 0.0086343

Coefficients:
──────────────────────────────────────────────────────────────────────    
               Coef.  Std. Error     t  Pr(>|t|)  Lower 95%  Upper 95%    
──────────────────────────────────────────────────────────────────────    
(Intercept)  9.65347    1.3146    7.34    0.0018    6.00357   13.3034     
trait1       2.30358    0.277853  8.29    0.0012    1.53213    3.07502    
──────────────────────────────────────────────────────────────────────    
Log Likelihood: 1.9446255188
AIC: 2.1107489623

julia> df_r = DataFrame(
    species = ["D","C","A","B","E","O"],
    trait1 = [4.08298,3.10782,2.17078,1.87333,2.8445,5.88204],
    trait2 = [-7.34186,-7.45085,-3.32538,-4.26472,-5.96857,-1.99388],
    trait3 = [18.896,17.0686,14.2916,12.9808,15.4255,24.1667],
    trait3_sd = [0.074524,0.00465081,0.185497,0.0936,0.0158379,0.0509643],
    trait3_n = [3, 3, 3, 3, 3, 3]
); # species-level statistics (sample means and standard deviations)

julia> m2 = phyloNetworklm(@formula(trait3 ~ trait1), df_r, net; reml=true, tipnames=:species, msr_err=true,
                           y_mean_std=true);

julia> m2
StatsModels.TableRegressionModel{PhyloNetworkLinearModel,Array{Float64,2}}

Formula: trait3 ~ 1 + trait1

Model: PhyloNetworks.BM

Parameter(s) Estimates:
Sigma2: 0.15618
Sigma2 (NLopt): 0.15618
Within-Species Variance: 0.0086343

Coefficients:
──────────────────────────────────────────────────────────────────────
               Coef.  Std. Error     t  Pr(>|t|)  Lower 95%  Upper 95%
──────────────────────────────────────────────────────────────────────
(Intercept)  9.65342    1.31456   7.34    0.0018    6.00361   13.3032 
trait1       2.30359    0.277846  8.29    0.0012    1.53217    3.07502
──────────────────────────────────────────────────────────────────────
Log Likelihood: 1.9447243714
AIC: 2.1105512573
```

fixit: fix the function signature,
add documentation on the model with within-species variation
(aka measurement error), with examples for each of the 2 input format.
"""
function phyloNetworklm(f::StatsModels.FormulaTerm,
                        fr::AbstractDataFrame,
                        net::HybridNetwork;
                        model="BM"::AbstractString,
                        tipnames::Symbol=:tipNames, 
                        no_names=false::Bool,
                        reml=false::Bool,
                        ftolRel=fRelTr::AbstractFloat,
                        xtolRel=xRelTr::AbstractFloat,
                        ftolAbs=fAbsTr::AbstractFloat,
                        xtolAbs=xAbsTr::AbstractFloat,
                        startingValue=0.5::Real,
                        fixedValue=missing::Union{Real,Missing},
                        msr_err::Bool=false,
                        y_mean_std::Bool=false)
    # Match the tips names: make sure that the data provided by the user will
    # be in the same order as the ordered tips in matrix V.
    preorder!(net)
    if no_names # The names should not be taken into account.
        ind = [0]
        @info """As requested (no_names=true), I am ignoring the tips names
             in the network and in the dataframe."""
    else
        nodatanames = !any(DataFrames.propertynames(fr) .== tipnames)
        nodatanames && any(tipLabels(net) == "") &&
            error("""The network provided has no tip names, and the input dataframe has
                  no column labelled tipNames, so I can't match the data on the network
                  unambiguously. If you are sure that the tips of the network are in the
                  same order as the values of the dataframe provided, then please re-run
                  this function with argument no_name=true.""")
        any(tipLabels(net) == "") &&
            error("""The network provided has no tip names, so I can't match the data
                  on the network unambiguously. If you are sure that the tips of the
                  network are in the same order as the values of the dataframe provided,
                  then please re-run this function with argument no_name=true.""")
        nodatanames &&
            error("""The input dataframe has no column labelled tipNames, so I can't
                  match the data on the network unambiguously. If you are sure that the
                  tips of the network are in the same order as the values of the dataframe
                  provided, then please re-run this function with argument no_name=true.""")
        ind = indexin(fr[!, tipnames], tipLabels(net))
        any(isnothing, ind) &&
            error("""Tips with data are not in the network: $(fr[isnothing.(ind), tipnames])
                  please provide a larger network including these tips.""")
        ind = convert(Vector{Int}, ind) # Int, not Union{Nothing, Int}
        if length(unique(ind)) == length(ind)
            msr_err && !y_mean_std &&
            error("for within-species variation, at least 1 species must have at least 2 individuals")
        else
            (!msr_err || y_mean_std) &&
            error("""Some tips have data on multiple rows.""")
        end
    end
    # Find the regression matrix and response vector
    data, nonmissing = StatsModels.missing_omit(StatsModels.columntable(fr), f)
    sch = StatsModels.schema(f, data)
    f = StatsModels.apply_schema(f, sch, PhyloNetworkLinearModel)
    mf = ModelFrame(f, sch, data, PhyloNetworkLinearModel)
    mm = StatsModels.ModelMatrix(mf)
    Y = StatsModels.response(mf)
    # Y = convert(Vector{Float64}, StatsModels.response(mf))
    # Y, pred = StatsModels.modelcols(f, fr)

    if msr_err && y_mean_std
        # find columns in data frame for: # of individuals from each species
        counts  = fr[!,Symbol(String(mf.f.lhs.sym)*"_n")]
        # and sample SDs corresponding to the response mean in each species
        ySD = fr[!,Symbol(String(mf.f.lhs.sym)*"_sd")]
    else
        counts = nothing
        ySD = nothing
    end

    msr_err && model != "BM" &&
        error("within-species variation is not implemented for non-BM models")
    modeldic = Dict("BM" => BM(),
                    "lambda" => PagelLambda(),
                    "scalingHybrid" => ScalingHybrid())
    haskey(modeldic, model) || error("phyloNetworklm is not defined for model $model.")
    modelobj = modeldic[model]

    StatsModels.TableRegressionModel(
        phyloNetworklm(mm.m, Y, net, modelobj; reml=reml, nonmissing=nonmissing, ind=ind,
                    startingValue=startingValue, fixedValue=fixedValue,
                    msr_err=msr_err, counts=counts, ySD=ySD),
        mf, mm)
end

### Methods on type phyloNetworkRegression

## Un-changed Quantities
# Coefficients of the regression
StatsBase.coef(m::PhyloNetworkLinearModel) = coef(m.lm)
# Number of observations
StatsBase.nobs(m::PhyloNetworkLinearModel) = nobs(m.lm)
# (1) If the regression problem is to fit Y|X∼N(Xβ,V(σ²ₛ)) (i.e. neglecting msrerr)
# then vcov matrix = (X'·̂V·X)⁻¹, where ̂V = V(̂σ²ₛ), and ̂σ²ₛ is the REML estimate of 
# σ²ₛ. This follows the conventions of `gls`{nlme} and `glm`{stats} in R.
# (2) If the regression problem is to fit Y|X∼N(Xβ,W(σ²ₛ,η)) (i.e. a msrerr model) 
# then vcov matrix = (X'·Ŵ⁻¹·X)⁻¹, where Ŵ = W(̂σ̂²ₛ,̂η), and ̂σ²ₛ, ̂η are either the ML
# or REML estimates of σ²ₛ, η. This follows the convention of `fit`{MixedModels} in
# Julia.
StatsBase.vcov(m::PhyloNetworkLinearModel) = isnothing(m.model_within) ? vcov(m.lm) : sigma2_estim(m)*vcov(m.lm)/dispersion(m.lm,true)
# standard error of coefficients
StatsBase.stderror(m::PhyloNetworkLinearModel) = sqrt.(diag(vcov(m)))
# confidence Intervals for coefficients:
# Based on: (https://github.com/JuliaStats/GLM.jl/blob/d1ccc9abcc9c7ca6f640c13ff535ee8383e8f808/src/lm.jl#L240-L243)
function StatsBase.confint(m::PhyloNetworkLinearModel; level::Real=0.95)
    hcat(coef(m),coef(m)) + stderror(m) *
    quantile(TDist(dof_residual(m)), (1. - level)/2.) * [1. -1.]
end
# Table of estimated coefficients, standard errors, t-values, p-values, CIs
# Based on: https://github.com/JuliaStats/GLM.jl/blob/d1ccc9abcc9c7ca6f640c13ff535ee8383e8f808/src/lm.jl#L193-L203
function StatsBase.coeftable(m::PhyloNetworkLinearModel; level::Real=0.95)
    n_coef = size(m.lm.pp.X, 2) # no. of predictors
    if n_coef == 0
        return CoefTable([0], ["Fixed Value"], ["(Intercept)"])
    else
        cc = coef(m)
        se = stderror(m)
        tt = cc ./ se
        p = ccdf.(Ref(FDist(1, dof_residual(m))), abs2.(tt))
        ci = se*quantile(TDist(dof_residual(m)), (1-level)/2)
        levstr = isinteger(level*100) ? string(Integer(level*100)) : string(level*100)
        CoefTable(hcat(cc,se,tt,p,cc+ci,cc-ci),
                  ["Coef.","Std. Error","t","Pr(>|t|)","Lower $levstr%","Upper $levstr%"],
                  ["x$i" for i = 1:n_coef], 4, 3)
    end
end
# Degrees of freedom for residuals
StatsBase.dof_residual(m::PhyloNetworkLinearModel) =  nobs(m) - length(coef(m))
# Degrees of freedom consumed in the model
function StatsBase.dof(m::PhyloNetworkLinearModel)
    res = length(coef(m)) + 1 # (+1: dispersion parameter)
    if any(typeof(m.model) .== [PagelLambda, ScalingHybrid])
        res += 1 # lambda is one parameter
    end
    return res
end
# Deviance (sum of squared residuals with metric V)
StatsBase.deviance(m::PhyloNetworkLinearModel) = deviance(m.lm)

## Changed Quantities
# Compute the residuals
# (Rescaled by cholesky of variance between tips)
StatsBase.residuals(m::PhyloNetworkLinearModel) = m.RL * residuals(m.lm)
# Tip data
StatsBase.response(m::PhyloNetworkLinearModel) = m.Y
# Predicted values at the tips
# (rescaled by cholesky of tips variances)
StatsBase.predict(m::PhyloNetworkLinearModel) = m.RL * predict(m.lm)

# log likelihood of the fitted linear model
function StatsBase.loglikelihood(m::PhyloNetworkLinearModel)
    linmod = m.lm
    if isnothing(m.model_within) # not a msrerr model
        n = (m.reml ? dof_residual(linmod) : nobs(linmod) )
        σ² = deviance(linmod)/n
        ll =  - n * (1. + log2π + log(σ²))/2 - m.logdetVy/2
    else # if msrerr model, return loglikelihood of individual-level data
        modwsp = m.model_within
        ntot = sum(1.0 ./ modwsp.wsp_ninv) # total number of individuals
        nsp = nobs(linmod)                   # number of species
        ncoef = length(coef(linmod))
        bdof = (m.reml ? nsp - ncoef : nsp )
        wdof = ntot - nsp
        N = wdof + bdof # ntot or ntot - ncoef
        σ²  = modwsp.bsp_var[1]
        σw² = modwsp.wsp_var[1]
        ll = sum(log.(modwsp.wsp_ninv)) -
             (N + N * log2π + bdof * log(σ²) + wdof * log(σw²) + m.logdetVy)
        ll /= 2
    end
    if m.reml
        ll -= logdet(linmod.pp.chol)/2 # -1/2 log|X'Vm^{-1}X|
    end
    return ll
end
# Null  Deviance (sum of squared residuals with metric V)
# REMARK Not just the null deviance of the cholesky regression
# Might be something better to do than this, though.
function StatsBase.nulldeviance(m::PhyloNetworkLinearModel)
    vo = ones(length(m.Y), 1)
    vo = m.RL \ vo
    bo = inv(vo'*vo)*vo'*response(m.lm)
    ro = response(m.lm) - vo*bo
    return sum(ro.^2)
end
# Null Log likelihood (null model with only the intercept)
# Same remark
function StatsBase.nullloglikelihood(m::PhyloNetworkLinearModel)
    n = length(m.Y)
    return -n/2 * (log(2*pi * nulldeviance(m)/n) + 1) - 1/2 * m.logdetVy
end
# coefficient of determination (1 - SS_res/SS_null)
# Copied from GLM.jl/src/lm.jl, line 139
StatsBase.r2(m::PhyloNetworkLinearModel) = 1 - deviance(m)/nulldeviance(m)
# adjusted coefficient of determination
# Copied from GLM.jl/src/lm.jl, lines 141-146
function StatsBase.adjr2(obj::PhyloNetworkLinearModel)
    n = nobs(obj)
    # dof() includes the dispersion parameter
    p = dof(obj) - 1
    1 - (1 - r2(obj))*(n-1)/(n-p)
end

## REMARK
# As PhyloNetworkLinearModel <: GLM.LinPredModel, the following functions are automatically defined:
# aic, aicc, bic

## New quantities
# ML estimate for variance of the BM
"""
    sigma2_estim(m::PhyloNetworkLinearModel)

Estimated variance for a fitted object.
"""
function sigma2_estim(m::PhyloNetworkLinearModel)
    linmod = m.lm
    if isnothing(m.model_within)
        n = (m.reml ? dof_residual(linmod) : nobs(linmod) )
        σ² = deviance(linmod)/n
    else
        σ²  = m.model_within.bsp_var[1]
    end
    return σ²
end

# adapt to TableRegressionModel because sigma2_estim is a new function
sigma2_estim(m::StatsModels.TableRegressionModel{<:PhyloNetworkLinearModel,T} where T) =
  sigma2_estim(m.model)
# REML estimate of within-species variance for measurement error models
wspvar_estim(m::PhyloNetworkLinearModel) = (isnothing(m.model_within) ? nothing : m.model_within.wsp_var[1])
wspvar_estim(m::StatsModels.TableRegressionModel{<:PhyloNetworkLinearModel,T} where T) = wspvar_estim(m.model)
# ML estimate for ancestral state of the BM
"""
    mu_estim(m::PhyloNetworkLinearModel)

Estimated root value for a fitted object.
"""
function mu_estim(m::PhyloNetworkLinearModel)
    @warn """You fitted the data against a custom matrix, so I have no way
         to know which column is your intercept (column of ones).
         I am using the first coefficient for ancestral mean mu by convention,
         but that might not be what you are looking for."""
    if size(m.lm.pp.X,2) == 0
        return 0
    else
        return coef(m)[1]
    end
end
# Need to be adapted manually to TableRegressionModel beacouse it's a new function
function mu_estim(m::StatsModels.TableRegressionModel{<:PhyloNetworkLinearModel,T} where T)
    if m.mf.f.rhs.terms[1] != StatsModels.InterceptTerm{true}()
        error("The fit was done without intercept, so I cannot estimate mu")
    end
    return coef(m)[1]
end
# Lambda
"""
    lambda(m::PhyloNetworkLinearModel)
    lambda(m::ContinuousTraitEM)

Value assigned to the lambda parameter, if appropriate.
"""
lambda(m::PhyloNetworkLinearModel) = lambda(m.model)
lambda(m::Union{BM,PagelLambda,ScalingHybrid}) = m.lambda

"""
    lambda!(m::PhyloNetworkLinearModel, newlambda)
    lambda!(m::ContinuousTraitEM, newlambda)

Assign a new value to the lambda parameter.
"""
lambda!(m::PhyloNetworkLinearModel, lambda_new) = lambda!(m.model, lambda_new)
lambda!(m::Union{BM,PagelLambda,ScalingHybrid}, lambda_new::Real) = (m.lambda = lambda_new)

"""
    lambda_estim(m::PhyloNetworkLinearModel)

Estimated lambda parameter for a fitted object.
"""
lambda_estim(m::PhyloNetworkLinearModel) = lambda(m)
lambda_estim(m::StatsModels.TableRegressionModel{<:PhyloNetworkLinearModel,T} where T) = lambda_estim(m.model)

### Print the results
# Variance
function paramstable(m::PhyloNetworkLinearModel)
    Sig = sigma2_estim(m)
    res = "Sigma2: " * @sprintf("%.6g", Sig)
    if any(typeof(m.model) .== [PagelLambda, ScalingHybrid])
        Lamb = lambda_estim(m)
        res = res*"\nLambda: " * @sprintf("%.6g", Lamb)
    end
    mw = m.model_within
    if !isnothing(mw)
        res = res*"\nSigma2 (NLopt): " * @sprintf("%.6g", mw.bsp_var[1])
        res = res*"\nWithin-Species Variance: " * @sprintf("%.6g", mw.wsp_var[1])
    end
    return(res)
end
function Base.show(io::IO, obj::PhyloNetworkLinearModel)
    println(io, "$(typeof(obj)):\n\nParameter(s) Estimates:\n", paramstable(obj), "\n\nCoefficients:\n", coeftable(obj))
end
# For DataFrameModel. see also Base.show in
# https://github.com/JuliaStats/StatsModels.jl/blob/master/src/statsmodel.jl
function Base.show(io::IO, model::StatsModels.TableRegressionModel{<:PhyloNetworkLinearModel,T} where T)
    ct = coeftable(model)
    println(io, "$(typeof(model))")
    print(io, "\nFormula: ")
    println(io, string(model.mf.f)) # formula
    println(io)
    println(io, "Model: $(typeof(model.model.model))")
    println(io)
    println(io,"Parameter(s) Estimates:")
    println(io, paramstable(model.model))
    println(io)
    println(io,"Coefficients:")
    show(io, ct)
    println(io)
    println(io, "Log Likelihood: "*"$(round(loglikelihood(model), digits=10))")
    println(io, "AIC: "*"$(round(aic(model), digits=10))")
end

###############################################################################
#  within-species variation (including measurement error)
###############################################################################

function phyloNetworklm_wsp(::BM, X::Matrix, Y::Vector, net::HybridNetwork, reml::Bool;
        nonmissing=trues(length(Y))::BitArray{1}, # which individuals have non-missing data?
        ind=[0]::Vector{Int},
        counts::Union{Nothing, Vector}=nothing,
        ySD::Union{Nothing, Vector}=nothing,
        model_within::Union{Nothing, WithinSpeciesCTM}=nothing)
    V = sharedPathMatrix(net)
    phyloNetworklm_wsp(X,Y,V, reml, nonmissing,ind, counts,ySD, model_within)
end

#= notes about missing data: after X and Y produced by stat formula:
- individuals with missing data (in response or any predictor)
  already removed from both X and Y
- V has all species: some not listed, some listed but without any data
- nonmissing and ind correspond to the original rows in the data frame,
  including those with some missing data, so:
  * nonmissing has length >= length of Y
  * sum(nonmissing) = length of Y
- V[:Tips][ind,ind][nonmissing,nonmissing] correspond to the data rows

extra problems:
- a species may be listed 1+ times in ind, but not in ind[nonmissing]
- ind and nonmissing need to be converted to the species level, alongside Y
=#
function phyloNetworklm_wsp(X::Matrix, Y::Vector, V::MatrixTopologicalOrder,
        reml::Bool, nonmissing::BitArray{1}, ind::Vector{Int},
        counts::Union{Nothing, Vector},
        ySD::Union{Nothing, Vector},
        model_within::Union{Nothing, WithinSpeciesCTM}=nothing)
    n_coef = size(X, 2) # no. of predictors
    individualdata = isnothing(counts)
    xor(individualdata, isnothing(ySD)) &&
        error("counts and ySD must be both nothing, or both vectors")
    if individualdata
        # get species means for Y and X, the within-species residual ss
        ind_nm = ind[nonmissing] # same length as Y
        ind_sp = unique(ind_nm)
        n_sp = length(ind_sp) # number of species with data
        n_tot = length(Y)     # total number of individuals with data
        d_inv = zeros(n_sp)
        Ysp = Vector{Float64}(undef,n_sp) # species-level mean Y response
        Xsp = Matrix{Float64}(undef,n_sp,n_coef)
        RSS = 0.0  # residual sum-of-squares within-species
        for (i0,iV) in enumerate(ind_sp)
            iii = findall(isequal(iV), ind_nm)
            n_i = length(iii) # number of obs for species of index iV in V
            d_inv[i0] = 1/n_i
            Xsp[i0, :] = mean(X[iii, :], dims=1) # ideally, all have same Xs
            ymean = mean(Y[iii])
            Ysp[i0] = ymean
            RSS += sum((Y[iii] .- ymean).^2)
        end
        Vsp = V[:Tips][ind_sp,ind_sp]
    else # group means and sds for response variable were passed in
        n_sp = length(Y)
        n_tot = sum(counts)
        d_inv = 1.0 ./ counts
        Ysp = Y
        Xsp = X
        RSS = sum((ySD .^ 2) .* (counts .- 1.0))
        ind_nm = ind[nonmissing]
        Vsp = V[:Tips][ind_nm,ind_nm]
    end

    model_within, RL = withinsp_varianceratio(Xsp,Ysp,Vsp, reml, d_inv,RSS,
        n_tot,n_coef,n_sp, model_within)
    η = model_within.optsum.final[1]
    Vm = Vsp + η * Diagonal(d_inv)
    m = PhyloNetworkLinearModel(lm(RL\Xsp, RL\Ysp), V, Vm, RL, Y, X,
            2*logdet(RL), reml, ind, nonmissing, BM(), model_within)
    return m
end

# the method below takes in "clean" X,Y,V: species-level means, no missing data,
#     matching order of species in X,Y and V, no extra species in V.
# given V & η: analytical formula for σ² estimate
# numerical optimization of η = σ²within / σ²
function withinsp_varianceratio(X::Matrix, Y::Vector, V::Matrix, reml::Bool,
        d_inv::Vector, RSS::Float64, ntot::Real, ncoef::Int64, nsp::Int64,
        model_within::Union{Nothing, WithinSpeciesCTM}=nothing)

    if model_within === nothing
        RL = cholesky(V).L
        lm_sp = lm(RL\X, RL\Y)
        s2start = GLM.dispersion(lm_sp, false) # sqr=false: deviance/dof_residual
        # this is the REML, not ML estimate, which would be deviance/nobs
        s2withinstart = RSS/(ntot-nsp)
        ηstart = s2withinstart / s2start
        optsum = OptSummary([ηstart], [1e-100], :LN_BOBYQA; initial_step=[0.01],
            ftol_rel=fRelTr, ftol_abs=fAbsTr, xtol_rel=xRelTr, xtol_abs=[xAbsTr])
        optsum.maxfeval = 1000
        # default if model_within is not specified
        model_within = WithinSpeciesCTM([s2withinstart], [s2start], d_inv, optsum)
    else
        optsum = model_within.optsum
        # fixit: I find this option dangerous (and not used). what if the
        # current optsum has 2 parameters instead of 1, or innapropriate bounds, etc.?
        # We could remove the option to provide a pre-built model_within
    end
    opt = Opt(optsum)
    Ndof = (reml ? ntot - ncoef : ntot )
    wdof = ntot - nsp
    Vm = similar(V) # scratch space for repeated usage
    function logliksigma(η) # returns: -2loglik, estimated sigma2, and more
        Vm .= V + η * Diagonal(d_inv)
        Vmchol = cholesky(Vm) # LL' = Vm
        RL = Vmchol.L
        lm_sp = lm(RL\X, RL\Y)
        σ² = (RSS/η + deviance(lm_sp))/Ndof
        # n2ll = -2 loglik except for Ndof*log(2pi) + sum log(di) + Ndof
        n2ll = Ndof * log(σ²) + wdof * log(η) + logdet(Vmchol)
        if reml
            n2ll += logdet(lm_sp.pp.chol) # log|X'Vm^{-1}X|
        end
        #= manual calculations without cholesky
        Q = X'*(Vm\X);  β = Q\(X'*(Vm\Ysp));  r = Y-X*β
        val =  Ndof*log(σ²) + ((RSS/η) + r'*(Vm\r))/σ² +
            (ntot-ncoef)*log(η) + logabsdet(Vm)[1] + logabsdet(Q)[1]
        =#
        return (n2ll, σ², Vmchol)
    end
    obj(x, g) = logliksigma(x[1])[1] # x = [η]
    NLopt.min_objective!(opt, obj)
    fmin, xmin, ret = NLopt.optimize(opt, optsum.initial)
    optsum.feval = opt.numevals
    optsum.final = xmin
    optsum.fmin = fmin
    optsum.returnvalue = ret
    # save the results
    η = xmin[1]
    (n2ll, σ², Vmchol) = logliksigma(η)
    model_within.wsp_var[1] = η*σ²
    model_within.bsp_var[1] = σ²
    return model_within, Vmchol.L
end

###############################################################################
## Anova - using ftest from GLM - Need version 0.8.1
###############################################################################

function GLM.ftest(objs::StatsModels.TableRegressionModel{<:PhyloNetworkLinearModel,T}...)  where T
    objsModels = [obj.model for obj in objs]
    return ftest(objsModels...)
end

function GLM.ftest(objs::PhyloNetworkLinearModel...)
    objslm = [obj.lm for obj in objs]
    return ftest(objslm...)
end

###############################################################################
## Anova - old version - kept for tests purposes - do not export
###############################################################################

"""
    anova(objs::PhyloNetworkLinearModel...)

Takes several nested fits of the same data, and computes the F statistic for each
pair of models.

The fits must be results of function [`phyloNetworklm`](@ref) called on the same
data, for models that have more and more effects.

Returns a DataFrame object with the anova table.
"""
function anova(objs::StatsModels.TableRegressionModel{<:PhyloNetworkLinearModel,T}...) where T
    objsModels = [obj.model for obj in objs]
    return(anova(objsModels...))
end

function anova(objs::PhyloNetworkLinearModel...)
    anovaTable = Array{Any}(undef, length(objs)-1, 6)
    ## Compute binary statistics
    for i in 1:(length(objs) - 1)
      anovaTable[i, :] = anovaBin(objs[i], objs[i+1])
    end
    ## Transform into a DataFrame
    anovaTable = DataFrame(anovaTable,
        [:dof_res, :RSS, :dof, :SS, :F, Symbol("Pr(>F)")])
    return(anovaTable)
end

function anovaBin(obj1::PhyloNetworkLinearModel, obj2::PhyloNetworkLinearModel)
    length(coef(obj1)) < length(coef(obj2)) || error("Models must be nested, from the smallest to the largest.")
    ## residuals
    dof2 = dof_residual(obj2)
    dev2 = deviance(obj2)
    ## reducted residuals
    dof1 = dof_residual(obj1) - dof2
    dev1 = deviance(obj1) - dev2
    ## Compute statistic
    F = (dev1 / dof1) / (dev2 / dof2)
    pval = GLM.ccdf.(GLM.FDist(dof1, dof2), F) # ccdf and FDist from Distributions, used by GLM
    return([dof2, dev2, dof1, dev1, F, pval])
end

###############################################################################
## Ancestral State Reconstruction
###############################################################################
"""
    ReconstructedStates

Type containing the inferred information about the law of the ancestral states
given the observed tips values. The missing tips are considered as ancestral states.

The following functions can be applied to it:
[`expectations`](@ref) (vector of expectations at all nodes), `stderror` (the standard error),
`predint` (the prediction interval).

The `ReconstructedStates` object has fields: `traits_nodes`, `variances_nodes`, `NodeNumbers`, `traits_tips`, `tipNumbers`, `model`.
Type in "?ReconstructedStates.field" to get help on a specific field.
"""
struct ReconstructedStates
    "traits_nodes: the infered expectation of 'missing' values (ancestral nodes and missing tips)"
    traits_nodes::Vector # Nodes are actually "missing" data (including tips)
    "variances_nodes: the variance covariance matrix between all the 'missing' nodes"
    variances_nodes::Matrix
    "NodeNumbers: vector of the nodes numbers, in the same order as `traits_nodes`"
    NodeNumbers::Vector{Int}
    "traits_tips: the observed traits values at the tips"
    traits_tips::Vector # Observed values at tips
    "TipNumbers: vector of tips numbers, in the same order as `traits_tips`"
    TipNumbers::Vector # Observed tips only
    "model: if not missing, the `PhyloNetworkLinearModel` used for the computations."
    model::Union{PhyloNetworkLinearModel, Missing} # if empirical, corresponding fitted object
end

"""
    expectations(obj::ReconstructedStates)

Estimated reconstructed states at the nodes and tips.
"""
function expectations(obj::ReconstructedStates)
    return DataFrame(nodeNumber = [obj.NodeNumbers; obj.TipNumbers], condExpectation = [obj.traits_nodes; obj.traits_tips])
end

"""
    expectationsPlot(obj::ReconstructedStates)

Compute and format the expected reconstructed states for the plotting function.
The resulting dataframe can be readily used as a `nodeLabel` argument to
`plot` from package [`PhyloPlots`](https://github.com/cecileane/PhyloPlots.jl).
Keyword argument `markMissing` is a string that is appended to predicted
tip values, so that they can be distinguished from the actual datapoints. Default to
"*". Set to "" to remove any visual cue.
"""
function expectationsPlot(obj::ReconstructedStates; markMissing="*"::AbstractString)
    # Retrieve values
    expe = expectations(obj)
    # Format values for plot
    expetxt = Array{AbstractString}(undef, size(expe, 1))
    for i=1:size(expe, 1)
        expetxt[i] = string(round(expe[i, 2], digits=2))
    end
    # Find missing values
    if !ismissing(obj.model)
        nonmissing = obj.model.nonmissing
        ind = obj.model.ind
        missingTipNumbers = obj.model.V.tipNumbers[ind][.!nonmissing]
        indexMissing = indexin(missingTipNumbers, expe[!,:nodeNumber])
        expetxt[indexMissing] .*= markMissing
    end
    return DataFrame(nodeNumber = [obj.NodeNumbers; obj.TipNumbers], PredInt = expetxt)
end

StatsBase.stderror(obj::ReconstructedStates) = sqrt.(diag(obj.variances_nodes))

"""
    predint(obj::ReconstructedStates; level=0.95::Real)

Prediction intervals with level `level` for internal nodes and missing tips.
"""
function predint(obj::ReconstructedStates; level=0.95::Real)
    if ismissing(obj.model)
        qq = quantile(Normal(), (1. - level)/2.)
    else
        qq = quantile(GLM.TDist(dof_residual(obj.model)), (1. - level)/2.) # TDist from Distributions
        # @warn "As the variance is estimated, the predictions intervals are not exact, and should probably be larger."
    end
    tmpnode = hcat(obj.traits_nodes, obj.traits_nodes) .+ (stderror(obj) * qq) .* [1. -1.]
    return vcat(tmpnode, hcat(obj.traits_tips, obj.traits_tips))
end

function Base.show(io::IO, obj::ReconstructedStates)
    println(io, "$(typeof(obj)):\n",
            CoefTable(hcat(vcat(obj.NodeNumbers, obj.TipNumbers), vcat(obj.traits_nodes, obj.traits_tips), predint(obj)),
                      ["Node index", "Pred.", "Min.", "Max. (95%)"],
                      fill("", length(obj.NodeNumbers)+length(obj.TipNumbers))))
end

"""
    predintPlot(obj::ReconstructedStates; level=0.95::Real, withExp=false::Bool)

Compute and format the prediction intervals for the plotting function.
The resulting dataframe can be readily used as a `nodeLabel` argument to
`plot` from package [`PhyloPlots`](https://github.com/cecileane/PhyloPlots.jl).
Keyworks argument `level` control the confidence level of the
prediction interval. If `withExp` is set to true, then the best
predicted value is also shown along with the interval.
"""
function predintPlot(obj::ReconstructedStates; level=0.95::Real, withExp=false::Bool)
    # predInt
    pri = predint(obj; level=level)
    pritxt = Array{AbstractString}(undef, size(pri, 1))
    # Exp
    withExp ? exptxt = expectationsPlot(obj, markMissing="") : exptxt = ""
    for i=1:length(obj.NodeNumbers)
        !withExp ? sep = ", " : sep = "; " * exptxt[i, 2] * "; "
        pritxt[i] = "[" * string(round(pri[i, 1], digits=2)) * sep * string(round(pri[i, 2], digits=2)) * "]"
    end
    for i=(length(obj.NodeNumbers)+1):size(pri, 1)
        pritxt[i] = string(round(pri[i, 1], digits=2))
    end
    return DataFrame(nodeNumber = [obj.NodeNumbers; obj.TipNumbers], PredInt = pritxt)
end


"""
    ancestralStateReconstruction(net::HybridNetwork, Y::Vector, params::ParamsBM)

Compute the conditional expectations and variances of the ancestral (un-observed)
traits values at the internal nodes of the phylogenetic network (`net`),
given the values of the traits at the tips of the network (`Y`) and some
known parameters of the process used for trait evolution (`params`, only BM with fixed root
works for now).

This function assumes that the parameters of the process are known. For a more general
function, see `ancestralStateReconstruction(obj::PhyloNetworkLinearModel[, X_n::Matrix])`.

"""
function ancestralStateReconstruction(net::HybridNetwork,
                                      Y::Vector,
                                      params::ParamsBM)
    V = sharedPathMatrix(net)
    ancestralStateReconstruction(V, Y, params)
end

function ancestralStateReconstruction(V::MatrixTopologicalOrder,
                                      Y::Vector,
                                      params::ParamsBM)
    # Variances matrices
    Vy = V[:Tips]
    Vz = V[:InternalNodes]
    Vyz = V[:TipsNodes]
    R = cholesky(Vy)
    RL = R.L
    temp = RL \ Vyz
    # Vectors of means
    m_y = ones(size(Vy)[1]) .* params.mu # !! correct only if no predictor.
    m_z = ones(size(Vz)[1]) .* params.mu # !! works if BM no shift.
    # Actual computation
    ancestralStateReconstruction(Vz, temp, RL,
                                 Y, m_y, m_z,
                                 V.internalNodeNumbers,
                                 V.tipNumbers,
                                 params.sigma2)
end

# Reconstruction from all the needed quantities
function ancestralStateReconstruction(Vz::Matrix,
                                      VyzVyinvchol::Matrix,
                                      RL::LowerTriangular,
                                      Y::Vector, m_y::Vector, m_z::Vector,
                                      NodeNumbers::Vector,
                                      TipNumbers::Vector,
                                      sigma2::Real,
                                      add_var=zeros(size(Vz))::Matrix, # Additional variance for BLUP
                                      model=missing::Union{PhyloNetworkLinearModel,Missing})
    m_z_cond_y = m_z + VyzVyinvchol' * (RL \ (Y - m_y))
    V_z_cond_y = sigma2 .* (Vz - VyzVyinvchol' * VyzVyinvchol)
    ReconstructedStates(m_z_cond_y, V_z_cond_y + add_var, NodeNumbers, Y, TipNumbers, model)
end

# """
# `ancestralStateReconstruction(obj::PhyloNetworkLinearModel, X_n::Matrix)`
# Function to find the ancestral traits reconstruction on a network, given an
# object fitted by function phyloNetworklm, and some predictors expressed at all the nodes of the network.
#
# - obj: a PhyloNetworkLinearModel object, or a
# TableRegressionModel{PhyloNetworkLinearModel}, if data frames were used.
# - X_n a matrix with as many columns as the number of predictors used, and as
# many lines as the number of unknown nodes or tips.
#
# Returns an object of type ancestralStateReconstruction.
# """

# Empirical reconstruciton from a fitted object
# TO DO: Handle the order of internal nodes for matrix X_n
function ancestralStateReconstruction(obj::PhyloNetworkLinearModel, X_n::Matrix)
    if (size(X_n)[2] != length(coef(obj)))
        error("""The number of predictors for the ancestral states (number of columns of X_n)
              does not match the number of predictors at the tips.""")
    end
    if size(X_n)[1] != length(obj.V.internalNodeNumbers) + sum(.!obj.nonmissing)
        error("""The number of lines of the predictors does not match
              the number of nodes plus the number of missing tips.""")
    end
    m_y = predict(obj)
    m_z = X_n * coef(obj)
    # If the tips were re-organized, do the same for Vyz
    if (obj.ind != [0])
#       iii = indexin(1:length(obj.nonmissing), obj.ind[obj.nonmissing])
#       iii = iii[iii .> 0]
#       jjj = [1:length(obj.V.internalNodeNumbers); indexin(1:length(obj.nonmissing), obj.ind[!obj.nonmissing])]
#       jjj = jjj[jjj .> 0]
#       Vyz = Vyz[iii, jjj]
        Vyz = obj.V[:TipsNodes, obj.ind, obj.nonmissing]
        missingTipNumbers = obj.V.tipNumbers[obj.ind][.!obj.nonmissing]
        nmTipNumbers = obj.V.tipNumbers[obj.ind][obj.nonmissing]
    else
        @warn """There were no indication for the position of the tips on the network.
             I am assuming that they are given in the same order.
             Please check that this is what you intended."""
        Vyz = obj.V[:TipsNodes, collect(1:length(obj.V.tipNumbers)), obj.nonmissing]
        missingTipNumbers = obj.V.tipNumbers[.!obj.nonmissing]
        nmTipNumbers = obj.V.tipNumbers[obj.nonmissing]
    end
    temp = obj.RL \ Vyz
    U = X_n - temp' * (obj.RL \ obj.X)
    add_var = U * vcov(obj) * U'
    # Warn about the prediction intervals
    @warn """These prediction intervals show uncertainty in ancestral values,
         assuming that the estimated variance rate of evolution is correct.
         Additional uncertainty in the estimation of this variance rate is
         ignored, so prediction intervals should be larger."""
    # Actual reconstruction
    ancestralStateReconstruction(obj.V[:InternalNodes, obj.ind, obj.nonmissing],
                                 temp,
                                 obj.RL,
                                 obj.Y,
                                 m_y,
                                 m_z,
                                 [obj.V.internalNodeNumbers; missingTipNumbers],
                                 nmTipNumbers,
                                 sigma2_estim(obj),
                                 add_var,
                                 obj)
end

@doc raw"""
    ancestralStateReconstruction(obj::PhyloNetworkLinearModel[, X_n::Matrix])

Function to find the ancestral traits reconstruction on a network, given an
object fitted by function [`phyloNetworklm`](@ref). By default, the function assumes
that the regressor is just an intercept. If the value of the regressor for
all the ancestral states is known, it can be entered in X_n, a matrix with as
many columns as the number of predictors used, and as many lines as the number
of unknown nodes or tips.

Returns an object of type [`ReconstructedStates`](@ref).

# Examples

```jldoctest; filter = [r" PhyloNetworks .*:\d+", r"Info: Loading DataFrames support into Gadfly"]
julia> using DataFrames, CSV # to read data file

julia> phy = readTopology(joinpath(dirname(pathof(PhyloNetworks)), "..", "examples", "carnivores_tree.txt"));

julia> dat = CSV.File(joinpath(dirname(pathof(PhyloNetworks)), "..", "examples", "carnivores_trait.txt")) |> DataFrame;

julia> using StatsModels # for statistical model formulas

julia> fitBM = phyloNetworklm(@formula(trait ~ 1), dat, phy);

julia> ancStates = ancestralStateReconstruction(fitBM) # Should produce a warning, as variance is unknown.
┌ Warning: These prediction intervals show uncertainty in ancestral values,
│ assuming that the estimated variance rate of evolution is correct.
│ Additional uncertainty in the estimation of this variance rate is
│ ignored, so prediction intervals should be larger.
└ @ PhyloNetworks ~/build/crsl4/PhyloNetworks.jl/src/traits.jl:2163
ReconstructedStates:
───────────────────────────────────────────────
  Node index      Pred.        Min.  Max. (95%)
───────────────────────────────────────────────
        -5.0   1.32139   -0.288423     2.9312
        -8.0   1.03258   -0.539072     2.60423
        -7.0   1.41575   -0.0934395    2.92495
        -6.0   1.39417   -0.0643135    2.85265
        -4.0   1.39961   -0.0603343    2.85955
        -3.0   1.51341   -0.179626     3.20644
       -13.0   5.3192     3.96695      6.67145
       -12.0   4.51176    2.94268      6.08085
       -16.0   1.50947    0.0290151    2.98992
       -15.0   1.67425    0.241696     3.10679
       -14.0   1.80309    0.355568     3.2506
       -11.0   2.7351     1.21896      4.25123
       -10.0   2.73217    1.16545      4.29889
        -9.0   2.41132    0.639075     4.18357
        -2.0   2.04138   -0.0340955    4.11686
        14.0   1.64289    1.64289      1.64289
         8.0   1.67724    1.67724      1.67724
         5.0   0.331568   0.331568     0.331568
         2.0   2.27395    2.27395      2.27395
         4.0   0.275237   0.275237     0.275237
         6.0   3.39094    3.39094      3.39094
        13.0   0.355799   0.355799     0.355799
        15.0   0.542565   0.542565     0.542565
         7.0   0.773436   0.773436     0.773436
        10.0   6.94985    6.94985      6.94985
        11.0   4.78323    4.78323      4.78323
        12.0   5.33016    5.33016      5.33016
         1.0  -0.122604  -0.122604    -0.122604
        16.0   0.73989    0.73989      0.73989
         9.0   4.84236    4.84236      4.84236
         3.0   1.0695     1.0695       1.0695
───────────────────────────────────────────────

julia> expectations(ancStates)
31×2 DataFrame
 Row │ nodeNumber  condExpectation
     │ Int64       Float64
─────┼─────────────────────────────
   1 │         -5         1.32139
   2 │         -8         1.03258
   3 │         -7         1.41575
   4 │         -6         1.39417
   5 │         -4         1.39961
   6 │         -3         1.51341
   7 │        -13         5.3192
   8 │        -12         4.51176
  ⋮  │     ⋮              ⋮
  25 │         10         6.94985
  26 │         11         4.78323
  27 │         12         5.33016
  28 │          1        -0.122604
  29 │         16         0.73989
  30 │          9         4.84236
  31 │          3         1.0695
                    16 rows omitted

julia> predint(ancStates)
31×2 Array{Float64,2}:
 -0.288423    2.9312
 -0.539072    2.60423
 -0.0934395   2.92495
 -0.0643135   2.85265
 -0.0603343   2.85955
 -0.179626    3.20644
  3.96695     6.67145
  2.94268     6.08085
  0.0290151   2.98992
  0.241696    3.10679
  ⋮
  0.542565    0.542565
  0.773436    0.773436
  6.94985     6.94985
  4.78323     4.78323
  5.33016     5.33016
 -0.122604   -0.122604
  0.73989     0.73989
  4.84236     4.84236
  1.0695      1.0695

julia> expectationsPlot(ancStates) # format the ancestral states
31×2 DataFrame
 Row │ nodeNumber  PredInt
     │ Int64       Abstract… 
─────┼───────────────────────
   1 │         -5  1.32
   2 │         -8  1.03
   3 │         -7  1.42
   4 │         -6  1.39
   5 │         -4  1.4
   6 │         -3  1.51
   7 │        -13  5.32
   8 │        -12  4.51
  ⋮  │     ⋮           ⋮
  25 │         10  6.95
  26 │         11  4.78
  27 │         12  5.33
  28 │          1  -0.12
  29 │         16  0.74
  30 │          9  4.84
  31 │          3  1.07
              16 rows omitted

julia> using PhyloPlots # next: plot ancestral states on the tree

julia> plot(phy, :RCall, nodeLabel = expectationsPlot(ancStates));

julia> predintPlot(ancStates) # prediction intervals, in data frame, useful to plot
31×2 DataFrame
 Row │ nodeNumber  PredInt
     │ Int64       Abstract…
─────┼───────────────────────────
   1 │         -5  [-0.29, 2.93]
   2 │         -8  [-0.54, 2.6]
   3 │         -7  [-0.09, 2.92]
   4 │         -6  [-0.06, 2.85]
   5 │         -4  [-0.06, 2.86]
   6 │         -3  [-0.18, 3.21]
   7 │        -13  [3.97, 6.67]
   8 │        -12  [2.94, 6.08]
  ⋮  │     ⋮             ⋮
  25 │         10  6.95
  26 │         11  4.78
  27 │         12  5.33
  28 │          1  -0.12
  29 │         16  0.74
  30 │          9  4.84
  31 │          3  1.07
                  16 rows omitted

julia> plot(phy, :RCall, nodeLabel = predintPlot(ancStates));

julia> allowmissing!(dat, :trait);

julia> dat[[2, 5], :trait] .= missing; # missing values allowed to fit model

julia> fitBM = phyloNetworklm(@formula(trait ~ 1), dat, phy);

julia> ancStates = ancestralStateReconstruction(fitBM);
┌ Warning: These prediction intervals show uncertainty in ancestral values,
│ assuming that the estimated variance rate of evolution is correct.
│ Additional uncertainty in the estimation of this variance rate is
│ ignored, so prediction intervals should be larger.
└ @ PhyloNetworks ~/build/crsl4/PhyloNetworks.jl/src/traits.jl:2163

julia> first(expectations(ancStates), 3) # looking at first 3 nodes only
3×2 DataFrame
 Row │ nodeNumber  condExpectation 
     │ Int64       Float64         
─────┼─────────────────────────────
   1 │         -5          1.42724
   2 │         -8          1.35185
   3 │         -7          1.61993

julia> predint(ancStates)[1:3,:] # just first 3 nodes again
3×2 Array{Float64,2}:
 -0.31245   3.16694
 -0.625798  3.3295
 -0.110165  3.35002

   
julia> first(expectationsPlot(ancStates),3) # format node <-> ancestral state
3×2 DataFrame
 Row │ nodeNumber  PredInt   
     │ Int64       Abstract… 
─────┼───────────────────────
   1 │         -5  1.43
   2 │         -8  1.35
   3 │         -7  1.62

julia> plot(phy, :RCall, nodeLabel = expectationsPlot(ancStates));

julia> first(predintPlot(ancStates),3) # prediction intervals, useful to plot
3×2 DataFrame
 Row │ nodeNumber  PredInt       
     │ Int64       Abstract…     
─────┼───────────────────────────
   1 │         -5  [-0.31, 3.17]
   2 │         -8  [-0.63, 3.33]
   3 │         -7  [-0.11, 3.35]

julia> plot(phy, :RCall, nodeLabel = predintPlot(ancStates));
```
"""
function ancestralStateReconstruction(obj::PhyloNetworkLinearModel)
    # default reconstruction for known predictors
    if ((size(obj.X)[2] != 1) || !any(obj.X .== 1)) # Test if the regressor is just an intercept.
        error("""Predictor(s) other than a plain intercept are used in this `PhyloNetworkLinearModel` object.
    These predictors are unobserved at ancestral nodes, so they cannot be used
    for the ancestral state reconstruction. If these ancestral predictor values
    are known, please provide them as a matrix argument to the function.
    Otherwise, you might consider doing a multivariate linear regression (not implemented yet).""")
    end
  X_n = ones((length(obj.V.internalNodeNumbers) + sum(.!obj.nonmissing), 1))
    ancestralStateReconstruction(obj, X_n)
end
# For a TableRegressionModel
function ancestralStateReconstruction(obj::StatsModels.TableRegressionModel{<:PhyloNetworkLinearModel,T} where T)
    ancestralStateReconstruction(obj.model)
end
function ancestralStateReconstruction(obj::StatsModels.TableRegressionModel{<:PhyloNetworkLinearModel,T} where T, X_n::Matrix)
    ancestralStateReconstruction(obj.model, X_n)
end

"""
    ancestralStateReconstruction(fr::AbstractDataFrame, net::HybridNetwork; kwargs...)

Estimate the ancestral traits on a network, given some data at the tips.
Uses function [`phyloNetworklm`](@ref) to perform a phylogenetic regression of the data against an
intercept (amounts to fitting an evolutionary model on the network).

See documentation on [`phyloNetworklm`](@ref) and `ancestralStateReconstruction(obj::PhyloNetworkLinearModel[, X_n::Matrix])`
for further details.

Returns an object of type [`ReconstructedStates`](@ref).
"""
function ancestralStateReconstruction(fr::AbstractDataFrame,
                                      net::HybridNetwork;
                                      kwargs...)
    nn = DataFrames.propertynames(fr)
    datpos = nn .!= :tipNames
    if sum(datpos) > 1
        error("""Besides one column labelled 'tipNames', the dataframe fr should have
              only one column, corresponding to the data at the tips of the network.""")
    end
    f = @eval(@formula($(nn[datpos][1]) ~ 1))
    reg = phyloNetworklm(f, fr, net; kwargs...)
    return ancestralStateReconstruction(reg)
end






#################################################
## Old version of phyloNetworklm (naive)
#################################################

# function phyloNetworklmNaive(X::Matrix, Y::Vector, net::HybridNetwork, model="BM"::AbstractString)
#   # Geting variance covariance
#   V = sharedPathMatrix(net)
#   Vy = extractVarianceTips(V, net)
#   # Needed quantities (naive)
#   ntaxa = length(Y)
#   Vyinv = inv(Vy)
#   XtVyinv = X' * Vyinv
#   logdetVy = logdet(Vy)
#        # beta hat
#   betahat = inv(XtVyinv * X) * XtVyinv * Y
#        # sigma2 hat
#   fittedValues =  X * betahat
#   residuals = Y - fittedValues
#   sigma2hat = 1/ntaxa * (residuals' * Vyinv * residuals)
#        # log likelihood
#   loglik = - 1 / 2 * (ntaxa + ntaxa * log(2 * pi) + ntaxa * log(sigma2hat) + logdetVy)
#   # Result
# # res = phyloNetworkRegression(betahat, sigma2hat[1], loglik[1], V, Vy, fittedValues, residuals)
#   return((betahat, sigma2hat[1], loglik[1], V, Vy, logdetVy, fittedValues, residuals))
# end
