#=
move types:
 - NNI = nearest neighbor interchange, as defined in
   Gambette, van Iersel, Jones, Lafond, Pardi and Scornavacca (2017).
   Rearrangement moves on rooted phylogenetic networks.
   PLOS Computational Biology 13(8):e1005611.
 - change the direction of a hybrid edge
 - add or remove a hybrid edge
constrained to user-defined topological constraints (like an outgroup)

in `moves.jl`, functions are tailored to level-1 networks;
here, functions apply to semidirected networks of all levels.
=#

"""
Type for various topological constraints, such as:

1. a set of taxa forming a clade in the major tree
2. a set of individuals belonging to the same species
    if u or v in a list of clade constraints where u or v is the node at top of star, then don't
        allow nni and return nothing
3. a set of taxa forming a clade in any one of the displayed trees
"""
struct TopologyConstraint
    "type of constraint: 1, 2. Type 3 not implemented yet"
    type::UInt8
    "names of taxa in the constraint (clade / species / outgroup members)"
    taxonnames::Vector{String} #TODO decided to use vector to keep order
    """
    node numbers of taxa in the constraint (clade / species / outgroup members).
    warning: interpretation will be network-dependent.
    """
    taxonnums::Vector{Int}
    "number of the stem edge of the constrained group"
    edgenum::Int
    "child node of stem edge"
    nodenum::Int
end

"""
    TopologyConstraint(type::UInt8, taxonnames::Set{String}, net::HybridNetwork)

Create a topology constraint from user-given type, taxon names, and network.
"""
function TopologyConstraint(type::UInt8, taxonnames::Vector{String}, net::HybridNetwork)
    #get taxonnums
    taxonnums = []
    for i in 1:length(net.leaf) # iterate through leaves
        if net.leaf[i].name in taxonnames # check if leaf in clade
            push!(taxonnums, net.leaf[i].number) # add taxon node number to end of vector
        end
    end
    length(taxonnums) == length(taxonnames) || error("taxon names cannot be matched to node numbers. Check for typos.")
    if type == 0x02 
        # TODO if type is species, create mapping function to add a polytomy for species
        # with multiple individuals. (add a leaf node for each of the individuals within a species)
    end
    matrix = hardwiredClusters(net, net.names) # find most recent common ancestor (mrca)
    global mrcanumber = 0 # start with 0 as index of most recent common ancestor (mrca)
    global mrcaedge = net.edge[1] # arbitrary, just starts here
    sub = matrix[:, taxonnums.+1] # get only columns for the cluster taxa
    for i in 1:size(sub)[1] # iterate over rows in sub matrix
        if sum(sub[i,:]) == length(taxonnums) # all entries equal to one
            potential_mrca = matrix[i,1] # internal edge that is parent to all taxa in clade
            if mrcanumber == 0 || potential_mrca in descendants(mrcaedge) # mrcanumber is zero first time through
                global mrcanumber = 1
                global mrcaedge = net.edge[potential_mrca] #TODO not assigning
            end
        end
    end
    #find rows where all equal to 1
    #find lowest of these rows. Make it the edgenum.
    # first its child. assign nodenum.
    edgenum = mrcaedge.number # fixit: check that the network satisfies the constraint and return the associated edge
    nodenum = PhyloNetworks.getChild(mrcaedge).number
    TopologyConstraint(type, taxonnames, taxonnums, edgenum, nodenum)
end
# fixit: use these constraints in the functions below,
# to check that the proposed NNI move is acceptable

#- see test_moves_semidirected.jl for test file with example uses

#= TODO
- add option to modify branch lengths during NNI:
  `nni!` that take detailed input, and output of same signature
- `unzip` (bool) to constrain branch lengths to 0 below a hybrid node:
  make this part of the optimization process. Or option for `nni!` functions?
- RR move, during optimization: avoid the re-optimization of the likelihood.
  accept the move, just change inheritance values to get same likelihood
  (still update direct / forward likelihoods and tree priors?)
- add options to forbid non-tree-child networks
- add moves that change the root position (and edge directions accordingly)
  without re-calculating the likelihood (accept the move): perhaps recalculate forward / direct likelihoods
  why: the root position affects the feasibility of the NNIs starting from a BR configuration

  when changing root position, be sure to check if the stem edge is still directed in the correct direction
  stemedge.isChild1() 
=#

"""
    nni!(net::HybridNetwork, e::Edge, constraint::Vector{TopologyConstraint},
    no3cycle=true::Bool)

Attempt to perform a nearest neighbor interchange (NNI) around edge `e`,
randomly chosen among all possible NNIs (e.g 3, sometimes more depending on `e`)
satisfying the constraints, and such that the new network is a DAG. The number of 
possible NNI moves around an edge depends on whether the edge's parent/child nodes 
are tree or hybrid nodes. This is calculated by [`nnimax`](@ref).

Option `no3cycle` forbids moves that would create a 3-cycle in the network. 
When `no3cycle` = false, 2-cycle and 3-cycles may be generated by nni!(). 

Assumptions:  
- assumes that the starting network does not have 3-cycles. This function
does not check the input network for the presence of 2- and 3-cycles.
- assumes the edge field `isChild1` is correct in the input network. (This field
will be correct in the output network.)

Output:  
information indicating how to undo the move or `nothing` if all NNIs failed.

# examples

```jldoctest
# checks for 3cycle
str_level1 = "(((8,9),(((((1,2,3),4),(5)#H1),(#H1,(6,7))))#H2),(#H2,10));"
net_level1 = readTopology(str_level1);
undoinfo = nni!(net_level1, net_level1.edge[3])
nni!(undoinfo...)
writeTopology(net_level1) == str_level1
true

# does not check for 3cycle
undoinfo = nni!(net_level1, net_level1.edge[3], no3cycle=false)
nni!(undoinfo...)
writeTopology(net_level1) == str_level1
true
```
"""
function nni!(net::HybridNetwork, e::Edge, constraint::Vector{TopologyConstraint},
    no3cycle=true::Bool)
    for c in constraint
        c.edgenum != e.number || return nothing
    end
    hybparent = getParent(e).hybrid
    nnirange = 0x01:nnimax(e) # 0x01 = 1 but UInt8 instead of Int
    nnis = Random.shuffle(nnirange)
    for nummove in nnis # iterate through all possible NNIs, but in random order
        moveinfo = nni!(net, e, nummove, no3cycle)
        moveinfo !== nothing || continue # to next possible NNI
        if checknetwork(net, constraint)
            return moveinfo
        else nni!(moveinfo...); end # undo the previous NNI, try again
    end
    return nothing # if we get to this point, all NNIs failed
end

"""
    nnimax(e::Edge)

Return the number of NNI moves around edge `e`,
assuming that the network is semi-directed.
Return 0 if `e` is not internal, and more generally if either node
attached to `e` does not have 3 edges.

Output: UInt8 (e.g. `0x02`)
"""
function nnimax(e::Edge)
    length(e.node[1].edge) == 3 || return 0x00
    length(e.node[2].edge) == 3 || return 0x00
    # e.hybrid and hybrid parent: RR case, 2 possible NNIs only
    # e.hybrid and tree parent:   BR case, 3 or 6 NNIs if e is may contain the root
    # e not hybrid, hyb parent:   RB case, 4 NNIs
    # e not hybrid, tree parent:  BB case, 2 NNIs if directed, 8 if undirected
    hybparent = getParent(e).hybrid
    n = (e.hybrid ? (hybparent ? 0x02 : (e.containRoot ? 0x06 : 0x03)) : # RR & BR
                    (hybparent ? 0x04 : (e.containRoot ? 0x08 : 0x02)))  # RB & BB
    return n
end

"""
    nni!(net::HybridNetwork, uv::Edge, nummove::UInt8, no3cycle=true::Bool)

Modify `net` with a nearest neighbor interchange (NNI) around edge `uv`.
Return the information necessary to undo the NNI, or `nothing` if the move
was not successful (such as if the resulting graph was not acyclic (not a DAG) or if
the focus edge is adjacent to a polytomy). If the move fails, the network is not
modified.
`nummove` specifies which of the available NNIs is performed. 

rooted-NNI options according to Gambette et al. (2017), fig. 8:
* BB: 2 moves, both to BB, if directed edges. 8 moves if undirected.
* RR: 2 moves, both to RR.
* BR: 3 moves, 1 RB & 2 BRs, if directed. 6 moves if e is undirected.
* RB: 4 moves, all 4 BRs.
The extra options are due to assuming a semi-directed network, whereas
Gambette et al (2017) describe options for rooted networks.
On a semi-directed network, there might be a choice of how to direct
the edges that may contain the root, e.g. choice of e=uv versus vu, and
choice of labelling adjacent nodes as α/β (BB), or as α/γ (BR).

`no3cycle` prevents moves that would make a 3-cycle by checking for problem 4 cycles.

The edge field `isChild1` is assumed to be correct according to the `net.root`.
"""
function nni!(net::HybridNetwork, uv::Edge, nummove::UInt8, no3cycle=true::Bool)
    nmovemax = nnimax(uv)
    if nmovemax == 0x00 # uv not internal, or polytomy e.g. species represented by polytomy with >2 indiv
        return nothing
    end
    nummove > 0x00 || error("nummove $(nummove) must be >0")
    nummove <= nmovemax || error("nummove $(nummove) must be <= $nmovemax for edge number $(uv.number)")
    u = getParent(uv)
    v = getChild(uv)
    ## TASK 1: grab the edges adjacent to uv: αu, βu, vγ, vδ and adjacent nodes
    # get edges αu & βu connected to u
    # α = u's major parent if it exists, β = u's last child or minor parent
    if u.hybrid
        αu = getMajorParentEdge(u)
        βu = getMinorParentEdge(u)
        α = getParent(αu)
        β = getParent(βu)
    else # u may not have any parent, e.g. if root node
        # pick αu = parent edge if possible, first edge of u (other than uv) otherwise
        labs = [edgerelation(e, u, uv) for e in u.edge]
        pti = findfirst(isequal(:parent), labs) # parent index: there should be 1 or 0 
        ci = findall(  isequal(:child), labs)  # vector. there should be 1 or 2
        if pti === nothing
            length(ci) == 2 || error("node $(u.number) should have 2 children other than $(v.number)")
            pti = popfirst!(ci)
            αu = u.edge[pti]
            α = getChild(αu)
        else
            αu = u.edge[pti]
            α = getParent(αu)
        end
        βu = u.edge[ci[1]]
        β = getChild(βu)
    end
    # get edges vδ & vγ connected to v
    # δ = v's last child, γ = other child or v's parent other than u
    labs = [edgerelation(e, v, uv) for e in v.edge]
    if v.hybrid # then v must have another parent edge, other than uv
        vγ = v.edge[findfirst(isequal(:parent), labs)] # γ = getParent(vδ) ?this should be vγ right? 
            #on net_hybridladder edge 1 get ERROR: ArgumentError: invalid index: nothing of type Nothing
        vδ = v.edge[findfirst(isequal(:child), labs)]
        γ = getParent(vγ)
        δ = getChild(vδ)
    else
        ci = findall(isequal(:child), labs)
        length(ci) == 2 || error("node $(v.number) should have 2 children")
        vγ = v.edge[ci[1]] # γ = getChild(vγ)
        vδ = v.edge[ci[2]]
        γ = getChild(vγ)
        δ = getChild(vδ)
    end
    ## TASK 2: semi-directed network swaps:
    ## swap u <-> v, α <-> β if undirected and according to move number
    if !u.hybrid && uv.containRoot # case BB or BR, with uv that may contain the root
        nmoves = 0x03 # number of moves in the rooted (directed) case
        if !v.hybrid # BB, uv and all adjacent edges are undirected: 8 moves
            if nummove > 0x04  # switch u & v with prob 1/2
                nummove -= 0x04  # now in 1,2,3,4
                (u,v) = (v,u) #?could this be combined with the line below?
                (α,αu,β,βu,γ,vγ,δ,vδ) = (γ,vγ,δ,vδ,α,αu,β,βu)
            end
            nmoves = 0x02
        end
        # now nmoves should be in 1, ..., 2*nmoves: 1:4 (BB) or 1:6 (BR) #? should this be 2*nummoves?
        # next: switch α & β with probability 1/2
        if nummove > nmoves
            nummove -= nmoves # now nummoves in 1,2 (BB) or 1,2,3 (BR)
            (α,αu,β,βu) = (β,βu,α,αu)
        end
    end
    ## TASK 3: rooted network swaps, then do the NNI
    if u.hybrid # RR or RB cases
        # swap α & β: reduce NNIs from 2 to 1 (RR) or from 4 to 2 (RB)
        if nummove == 0x02 || nummove == 0x04
            (α,αu,β,βu) = (β,βu,α,αu)
        end
        if !v.hybrid && nummove > 0x02 # case RB, moves 3 or 4
            (γ,vγ,vδ,δ) = (δ,vδ,vγ,γ)
        end
        # detach β and graft onto vδ
        if no3cycle && problem4cycle(α,γ, β,δ) return nothing; end
        res = nni!(αu, u, uv, v, vδ)
    else # u = bifurcation: BB or BR cases
        if !v.hybrid # case BB: 2 options
            if nummove == 0x02
                (γ,vγ,vδ,δ) = (δ,vδ,vγ,γ)
            end
            # detach β and graft onto vδ
            if no3cycle && problem4cycle(α,γ, β,δ) return nothing; end
            res = nni!(αu, u, uv, v, vδ)
        else # case BR: 3 options 
            # DAG check
            # if α parent of u, check if β -> γ (directed or undirected)
            # if undirected with β parent of u, check α -> γ
            # if undirected and u = root:
            #   moves 1 and 3 will fail if α -> γ 
            #   moves 2 and 3 will fail if β -> γ
            # nummove 3 always creates a nonDAG when u is the root
            αparentu = getChild(αu)===u
            βparentu = getChild(βu)===u
            if αparentu
                if isdescendant(γ, β) return nothing; end
            elseif βparentu
                if isdescendant(γ, α) return nothing; end
            else # cases when u is root
                if nummove == 0x01 && isdescendant(γ, α)
                    return nothing
                elseif nummove == 0x02 && isdescendant(γ, β)
                    return nothing
                elseif nummove == 0x03 # fail: not DAG
                    return nothing
                end
            end
            if nummove == 0x01 # graft γ onto α
                if no3cycle && problem4cycle(α,γ, β,δ) return nothing; end
                res = nni!(vδ, v, uv, u, αu)
            elseif nummove == 0x02 # graft γ onto β
                if no3cycle && problem4cycle(β,γ, α,δ) return nothing; end
                res = nni!(vδ, v, uv, u, βu)
            else # nummove == 0x03
                if αparentu # if α->u: graft δ onto α
                    if no3cycle && problem4cycle(α,δ, β,γ) return nothing; end
                    res = nni!(vγ, v, uv, u, αu)
                else # if β->u: graft δ onto β
                    if no3cycle && problem4cycle(α,γ, β,δ) return nothing; end
                    res = nni!(vγ, v, uv, u, βu)
                # case when u is root already excluded (not DAG)
                end
            end
        end
    end
    return res
end

"""
    nni!(αu, u, uv::Edge, v, vδ)
    nni!(αu,u,uv,v,vδ, flip::Bool, inner::Bool, indices)

Transform a network locally around the focus edge `uv` with
the following NNI, that detaches u-β and grafts it onto vδ:

    α - u -- v ------ δ
        |    |
        β    γ

    α ------ v -- u - δ
             |    |
             γ    β

`flip` boolean indicates if the uv edge was flipped
`inner` boolean indicates if edges αu and uv both point toward node u,
i.e. α->u<-v<-δ. If this is true, we flip the hybrid status of αu and vδ.

`indices` give indices for nodes and edges u_in_αu, αu_in_u, vδ_in_v, and v_in_vδ.
These are interpreted as:
    u_in_αu: the index for u in the edge αu
    αu_in_u: the index for αu in node u
    vδ_in_v: the index for vδ in node v
    v_in_vδ: the index for v in edge vδ

**Warnings**:
- *No* check of assumed adjacencies
- Not implemented for cases that are not necessary thanks to symmetry,
  such as cases covered by `nni!(vδ, v, uv, u, αu)` or `nni!(βu, u, v, vγ)`.
  More specifically, these cases are not implemented (and not checked):
  * u not hybrid & v hybrid
  * u hybrid, v not hybrid, α -> u <- v -> δ
- Because of this, `nni(αu,u,uv,v,vδ, ...)` should not be used directly;
  use instead `nni!(net, uv, move_number)`.

Node numbers and edge numbers are not modified.
Edge `uv` keeps its direction unchanged *unless* the directions were
`α -> u -> v -> δ` or `α <- u <- v <- δ`,
in which case the direction of `uv` is flipped.

The second version's input has the same signature as the output, but 
will undo the NNI more easily. This means that if `output = nni!(input)`, 
then `nni!(output...)` is valid and undoes the first operation.

Right now, branch lengths are not modified. Future versions might implement 
options to modify branch lengths.
"""
function nni!(αu::Edge, u::Node, uv::Edge, v::Node, vδ::Edge)
    # find indices to detach αu from u, and to detach v from vδ
    u_in_αu = findfirst(n->n===u, αu.node)
    αu_in_u = findfirst(e->e===αu, u.edge)
    vδ_in_v = findfirst(e->e===vδ, v.edge)
    v_in_vδ = findfirst(n->n===v, vδ.node)
    # none of them should be 'nothing' --not checked
    αu_child = getChild(αu)
    uv_child = getChild(uv)
    vδ_child = getChild(vδ)
    # flip the direction of uv if α->u->v->δ or α<-u<-v<-δ
    flip = (αu_child === u && uv_child === v && vδ_child !== v) ||
             (αu_child !== u && uv_child === u && vδ_child === v)
    inner = (flip ? false : αu_child === u && vδ_child === v )
    # fixit: calculate new edge lengths here; give them as extra arguments to nni! below
    res = nni!(αu,u,uv,v,vδ, flip,inner, u_in_αu,αu_in_u,vδ_in_v,v_in_vδ)
    return res
end
function nni!(αu::Edge, u::Node, uv::Edge, v::Node, vδ::Edge,
              flip::Bool, inner::Bool,
              u_in_αu::Int, αu_in_u::Int, vδ_in_v::Int, v_in_vδ::Int)
              # extra arguments: new edge lengths
    # fixit: extract old edge lengths; update to new lengths; return old lengths as extra items
    ## TASK 1: do the NNI swap: to detach & re-attach at once
    (αu.node[u_in_αu], u.edge[αu_in_u], v.edge[vδ_in_v], vδ.node[v_in_vδ]) =
        (v, vδ, αu, u)
    ## TASK 2: update edges' directions
    if flip
        uv.isChild1 = !uv.isChild1
    end
    ## TASK 3: update hybrid status of nodes & edges, and edges containRoot field
    if u.hybrid && !v.hybrid
        if flip # RB, BR 1 or BR 2': flip hybrid status of uv and (αu or vδ)
            if uv.hybrid # BR 1 or BR 2'
                uv.hybrid = false
                vδ.hybrid = true
                norootbelow!(uv)
            else # RB
                uv.hybrid = true
                αu.hybrid = false
                if αu.containRoot
                    allowrootbelow!(v, αu)
                end
            end
        else # assumes α<-u or v<-δ --- but not checked
            # not implemented: α->u<-v->δ: do uv.hybrid=false and γv.hybrid=true
            if inner # BR 3 or 4': α->u<-v<-δ: flip hybrid status of αu and vδ
                αu.hybrid = false
                vδ.hybrid = true
                # containRoot: nothing to update
            else # BR 1' or 2: α<-u<-v->δ : hybrid status just fine
                norootbelow!(vδ)
                if uv.containRoot
                    allowrootbelow!(αu)
                end
            end
        end
    end
    # throw error if u not hybrid & v hybrid? (does not need to be implemented) #?
    return vδ, u, uv, v, αu, flip, inner, v_in_vδ, αu_in_u, vδ_in_v, u_in_αu
end

"""
    problem4cycle(β::Node, δ::Node, α::Node, γ::Node)

Check if the focus edge uv has a 4 cycle that could lead to a 3 cycle
    after an chosen NNI. Return true if there is a problem 4 cycle, false if none.
"""
function problem4cycle(β::Node, δ::Node, α::Node, γ::Node)
    isconnected(β, δ) || isconnected(α, γ)
end

""" 
    checkspeciesnetwork(network::HybridNetwork, cladeconstraints::TopologyConstraint)

Check user-provided species-level network for polytomies and unnecessary nodes 
(nodes with degree two). Fuze edges at nodes with degree two.
Return error for polytomies.
"""
function checkspeciesnetwork(network::HybridNetwork, cladeconstraints::Vector{TopologyConstraint}) #? one or multiple in a vector?
    for node in network.node
        if length(node.edge) < 3 && !node.leaf && !(node == network.root)
            fuseedgesat!(node,network)
        elseif length(node.edge) > 3 #? allow polytomies at root?
            error("node $node degree is too large: all interior nodes must have degree 3. A species level network is required.")
            #if error, breaks to return error
        end
    end
    # check if user-given clades violated by their own given network
    # if the function runs to here, no errors above. return !cladesviolated()
    return !cladesviolated(network, cladeconstraints)
end

# checknetwork for use in nni function
function checknetwork(network::HybridNetwork, cladeconstraints::Vector{TopologyConstraint})
    return !cladesviolated(network, cladeconstraints)
end

"""
    cladesviolated(network::HybridNetwork, cladeconstraints::TopologyConstraint)

Check if network violates user-given clade constraints. Return false if passes,
return true if violates clades.
TODO NOTE: previously cladeconstraints was a Dict
"""
function cladesviolated(net::HybridNetwork, cladeconstraints::Vector{TopologyConstraint})
    for c in cladeconstraints # checks directionality of stem edge hasn't change
        if !(getChild(net.edge[c.edgenum]).number == c.nodenum)
            return true
        end
    end
    return false
end