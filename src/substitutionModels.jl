"""
    TraitSubstitutionModel

Abstract type for discrete trait substitution models,
using a continous time Markov model on a phylogeny.
Adapted from the SubstitutionModels module in BioJulia.
The same [`Q`](@ref) and [`P`](@ref) function names are used for the
transition rates and probabilities.

see [`BinaryTraitSubstitutionModel`](@ref),
[`EqualRatesSubstitutionModel`](@ref),
[`TwoBinaryTraitSubstitutionModel`](@ref)
"""
abstract type SubstitutionModel end #ideally, we'd like this to be SubstitutionModels.SubstitionModel
abstract type TraitSubstitutionModel{T} <: SubstitutionModel end #this accepts labels
abstract type NucleicAcidSubstitutionModel <: SubstitutionModel end
const SM = SubstitutionModel
const TSM = TraitSubstitutionModel{T} where T #T is type of labels
const NASM = NucleicAcidSubstitutionModel
const Qmatrix = SMatrix{4, 4, Float64} #for mutable, use MMatrix
const Pmatrix = SMatrix{4, 4, Float64}
const Bmatrix = SMatrix{2, 2, Float64}
#for nparams(), getlabels(), Q(), P() functions,
# changed model from TSM to SM to allow general NASM to be caught here too

"""
    nparams(model)

Number of parameters for a given trait evolution model
(length of field `model.rate`).
"""
nparams(mod::SM) = error("nparams not defined for $(typeof(mod)).")

function getlabels(mod::SM)
    error("Model must be of type TraitSubstitutionModel or NucleicAcidSubstitutionModel. Got $(typeof(mod))")
end

"""
    Q(model)

Substitution rate matrix for a given substitution model:
Q[i,j] is the rate of transitioning from state i to state j.
"""
Q(mod::SM) = error("rate matrix Q not defined for $(typeof(mod)).")

"""
    nstates(model)

return number of character states for a given trait evolution model.
"""
nstates(mod::TSM) = error("nStates not defined for $(typeof(mod)).")

"""
    getlabels(model)

Return labels for trait substitution model
"""
function getlabels(mod::TSM)
    return mod.label
end

"""
    showQ(IO, model)

Print the Q matrix to the screen, with trait states as labels on rows and columns.
adapted from prettyprint function by mcreel, found 2017/10 at
https://discourse.julialang.org/t/display-of-arrays-with-row-and-column-names/1961/6
"""
function showQ(io::IO, object::SM) #TODO make this work for NucleicAcidSubstitutionModel
    M = Q(object)
    pad = max(8,maximum(length.(object.label))+1)
    for i = 1:size(M,2) # print the header
        print(io, lpad(object.label[i],(i==1? 2*pad : pad), " "))
    end
    print(io, "\n")
    for i = 1:size(M,1) # print one row per state
        if object.label != ""
            print(io, lpad(object.label[i],pad," "))
        end
        for j = 1:size(M,2)
            if j == i
                print(io, lpad("*",pad," "))
            else
                fmt = "%$(pad).4f"
                @eval(@printf($io,$fmt,$(M[i,j])))
            end
        end
        print(io, "\n")
    end
end

"""
    P(mod, t)

Probability transition matrix for a [`TraitSubstitutionModel`](@ref), of the form

    P[1,1] ... P[1,k]
       .          .
       .          .
    P[k,1] ... P[k,k]

where P[i,j] is the probability of ending in state j after time t,
given that the process started in state i.
faster when t is scalar (not an array)
"""
@inline function P(mod::SM, t::Float64)
    t >= 0.0 || error("substitution model: >=0 branch lengths are needed")
    return expm(Q(mod) * t)
end

"""
    P(mod, t::Array{Float64})

When applied to a general substitution model, matrix exponentiation is used.
The time argument `t` can be an array.
"""
function P(mod::SM, t::Array{Float64})
    all(t .>= 0.0) || error("t's must all be positive")
    try
        eig_vals, eig_vecs = eig(Q(mod)) # Only hermitian matrices are diagonalizable by
        # *StaticArrays*. Non-Hermitian matrices should be converted to `Array`first.
        return [eig_vecs * expm(diagm(eig_vals)*i) * eig_vecs' for i in t]
    catch
        eig_vals, eig_vecs = eig(Array(Q(mod)))
        k = nstates(mod)
        return [Matrix{k,k}(eig_vecs * expm(diagm(eig_vals)*i) * inv(eig_vecs)) for i in t]
    end
end

"""
    BinaryTraitSubstitutionModel(α, β [, label])

[`TraitSubstitutionModel`](@ref) for binary traits (with 2 states).
Default labels are "0" and "1".
α is the rate of transition from "0" to "1", and β from "1" to "0".
"""
mutable struct BinaryTraitSubstitutionModel{T} <: TraitSubstitutionModel{T}
    rate::Vector{Float64}
    label::Vector{T} # most often: T = String, but could be BioSymbols.DNA
    function BinaryTraitSubstitutionModel{T}(rate, label::Vector{T}) where T
        @assert length(rate) == 2 "binary state: need 2 rates"
        rate[1] >= 0. || error("parameter α must be non-negative")
        rate[2] >= 0. || error("parameter β must be non-negative")
        ab = rate[1] + rate[1]
        ab > 0. || error("α+β must be positive")
        @assert length(label) == 2 "need 2 labels exactly"
        new(rate, label)
    end
end
const BTSM = BinaryTraitSubstitutionModel{T} where T
BinaryTraitSubstitutionModel(r::AbstractVector, label::AbstractVector) = BinaryTraitSubstitutionModel{eltype(label)}(r, label)
BinaryTraitSubstitutionModel(α::Float64, β::Float64, label) = BinaryTraitSubstitutionModel([α,β], label)
BinaryTraitSubstitutionModel(α::Float64, β::Float64) = BinaryTraitSubstitutionModel(α, β, ["0", "1"])

"""
# Examples

```julia-repl
julia> m1 = BinaryTraitSubstitutionModel([1.0,2.0], ["low","high"])
julia> nstates(m1)
2
```
"""
function nstates(::BTSM)
    return 2::Int
end

nparams(::BTSM) = 2::Int

"""
For a BinaryTraitSubstitutionModel, the rate matrix Q is of the form:

    -α  α
     β -β
"""
@inline function Q(mod::BTSM)
    return Bmatrix(-mod.rate[1], mod.rate[2], mod.rate[1], -mod.rate[2])
end

function Base.show(io::IO, object::BTSM)
    str = "Binary Trait Substitution Model:\n"
    str *= "rate $(object.label[1])→$(object.label[2]) α=$(object.rate[1])\n"
    str *= "rate $(object.label[2])→$(object.label[1]) β=$(object.rate[2])\n"
    print(io, str)
end

@inline function P(mod::BTSM, t::Float64)
    t >= 0.0 || error("substitution model: >=0 branch lengths are needed")
    ab = mod.rate[1] + mod.rate[2]
    e1 = exp(-ab*t)
    p0 = mod.rate[2]/ab # asymptotic frequency of state "0"
    p1 = mod.rate[1]/ab # asymptotic frequency of state "1"
    a0= p0 *e1
    a1= p1*e1
    return Bmatrix(p0+a1, p0-a0, p1-a1, p1+a0) # by columns
end

"""
    TwoBinaryTraitSubstitutionModel(rate [, label])

[`TraitSubstitutionModel`](@ref) for two binary traits, possibly correlated.
Default labels are "x0", "x1" for trait 1, and "y0", "y1" for trait 2.
If provided, `label` should be a vector of size 4, listing labels for
trait 1 first then labels for trait 2.
`rate` should be a vector of substitution rates of size 8.
rate[1],...,rate[4] describe rates of changes in trait 1.
rate[5],...,rate[8] describe rates of changes in trait 2.

In the transition matrix, trait combinations are listed in the following order:
x0-y0, x0-y1, x1-y0, x1-y1.

# example

```julia
model = TwoBinaryTraitSubstitutionModel([2.0,1.2,1.1,2.2,1.0,3.1,2.0,1.1],
        ["carnivory", "noncarnivory", "wet", "dry"]);
model
using PhyloPlots
plot(model) # to visualize states and rates
```
"""
mutable struct TwoBinaryTraitSubstitutionModel <: TraitSubstitutionModel{String}
    rate::Vector{Float64}
    label::Vector{String}
    function TwoBinaryTraitSubstitutionModel(α, label)
        all( x -> x >= 0., α) || error("rates must be non-negative")
        @assert length(α)==8 "need 8 rates"
        @assert length(label)==4 "need 4 labels for all combinations of 2 binary traits"
        new(α, [string(label[1], "-", label[3]), # warning: original type of 'label' lost here
                string(label[1], "-", label[4]),
                string(label[2], "-", label[3]),
                string(label[2], "-", label[4])])
    end
end
const TBTSM = TwoBinaryTraitSubstitutionModel
TwoBinaryTraitSubstitutionModel(α::Vector{Float64}) = TwoBinaryTraitSubstitutionModel(α, ["x0", "x1", "y0", "y1"])

nstates(::TBTSM) = 4::Int
nparams(::TBTSM) = 8::Int

function Q(mod::TBTSM)
    M = fill(0.0,(4,4))
    a = mod.rate
    M[1,3] = a[1]
    M[3,1] = a[2]
    M[2,4] = a[3]
    M[4,2] = a[4]
    M[1,2] = a[5]
    M[2,1] = a[6]
    M[3,4] = a[7]
    M[4,3] = a[8]
    M[1,1] = -M[1,2] - M[1,3]
    M[2,2] = -M[2,1] - M[2,4]
    M[3,3] = -M[3,4] - M[3,1]
    M[4,4] = -M[4,3] - M[4,2]
    return M
end

function Base.show(io::IO, object::TBTSM)
    print(io, "Substitution model for 2 binary traits, with rate matrix:\n")
    showQ(io, object)
end

"""
    EqualRatesSubstitutionModel(numberStates, α, labels)

[`TraitSubstitutionModel`](@ref) for traits with any k number of states
and equal substitution rates α between all states.
Default labels are "1","2",...
"""
mutable struct EqualRatesSubstitutionModel{T} <: TraitSubstitutionModel{T}
    k::Int
    rate::Vector{Float64}
    label::Vector{T}
    function EqualRatesSubstitutionModel{T}(k, rate, label::Vector{T}) where T
        k >= 2 || error("parameter k must be greater than or equal to 2")
        @assert length(rate)==1 "rate must be a vector of length 1"
        rate[1] > 0 || error("parameter α (rate) must be positive")
        @assert length(label)==k "label vector of incorrect length"
        new(k, rate, label)
    end
end
const ERSM = EqualRatesSubstitutionModel{T} where T
EqualRatesSubstitutionModel(k::Int, α::Float64, label::AbstractVector) = EqualRatesSubstitutionModel{eltype(label)}(k,[α],label)
EqualRatesSubstitutionModel(k::Int, α::Float64) = EqualRatesSubstitutionModel{String}(k, [α], string.(1:k))

function nstates(mod::ERSM)
    return mod.k
end
nparams(::ERSM) = 1::Int

function Base.show(io::IO, object::ERSM)
    str = "Equal Rates Substitution Model with k=$(object.k),\n"
    str *= "all rates equal to α=$(object.rate[1]).\n"
    str *= "rate matrix Q:\n"
    print(io, str)
    showQ(io, object)
end

function Q(mod::ERSM)
    α = mod.rate[1]
    M = fill(α, (mod.k,mod.k))
    d = -(mod.k-1) * α
    for i in 1:mod.k
        M[i,i] = d
    end
    return M
end

"""
    randomTrait(model, t, start)
    randomTrait!(end, model, t, start)

Simulate traits along one edge of length t.
`start` must be a vector of integers, each representing the starting value of one trait.
The bang version (ending with !) uses the vector `end` to store the simulated values.

# Examples
```julia-repl
julia> m1 = BinaryTraitSubstitutionModel(1.0, 2.0)

julia> srand(12345);

julia> randomTrait(m1, 0.2, [1,2,1,2,2])
 5-element Array{Int64,1}:
 1
 2
 1
 2
 2
```
"""
function randomTrait(mod::TSM, t::Float64, start::AbstractVector{Int})
    res = Vector{Int}(length(start))
    randomTrait!(res, mod, t, start)
end

function randomTrait!(endTrait::AbstractVector{Int}, mod::TSM, t::Float64, start::AbstractVector{Int})
    Pt = P(mod, t)
    k = size(Pt, 1) # number of states
    w = [aweights(Pt[i,:]) for i in 1:k]
    for i in 1:length(start)
        endTrait[i] =sample(1:k, w[start[i]])
    end
    return endTrait
end

"""
    randomTrait(model, net; ntraits=1, keepInternal=true, checkPreorder=true)

Simulate evolution of discrete traits on a rooted evolutionary network based on
the supplied evolutionary model. Trait sampling is uniform at the root.

optional arguments:

- `ntraits`: number of traits to be simulated (default: 1 trait).
- `keepInternal`: if true, export character states at all nodes, including
  internal nodes. if false, export character states at tips only.

output:

- matrix of character states with one row per trait, one column per node;
  these states are *indices* in `model.label`, not the trait labels themselves.
- vector of node labels (for tips) or node numbers (for internal nodes)
  in the same order as columns in the character state matrix

# examples

```julia-repl
julia> m1 = BinaryTraitSubstitutionModel(1.0, 2.0, ["low","high"]);
julia> net = readTopology("(((A:4.0,(B:1.0)#H1:1.1::0.9):0.5,(C:0.6,#H1:1.0::0.1):1.0):3.0,D:5.0);");
julia> srand(1234);
julia> trait, lab = randomTrait(m1, net)
([1 2 … 1 1], String["-2", "D", "-3", "-6", "C", "-4", "#H1", "B", "A"])
julia> trait
1×9 Array{Int64,2}:
 1  2  1  1  2  2  1  1  1
julia> lab
9-element Array{String,1}:
 "-2" 
 "D"  
 "-3" 
 "-6" 
 "C"  
 "-4" 
 "#H1"
 "B"  
 "A"  
```
"""

function randomTrait(mod::TSM, net::HybridNetwork;
    ntraits=1::Int, keepInternal=true::Bool, checkPreorder=true::Bool)
    net.isRooted || error("net needs to be rooted for preorder recursion")
    if(checkPreorder)
        preorder!(net)
    end
    nnodes = net.numNodes
    M = Matrix{Int}(ntraits, nnodes) # M[i,j]= trait i for node j
    randomTrait!(M,mod,net)
    if !keepInternal
        M = getTipSubmatrix(M, net, indexation=:cols) # subset columns only. rows=traits
        nodeLabels = [n.name for n in net.nodes_changed if n.leaf]
    else
        nodeLabels = [n.name == "" ? string(n.number) : n.name for n in net.nodes_changed]    
    end
    return M, nodeLabels
end

@doc (@doc randomTrait) randomTrait!
function randomTrait!(M::Matrix{Int}, mod::TSM, net::HybridNetwork)
    recursionPreOrder!(net.nodes_changed, M, # updates M in place
            updateRootRandomTrait!,
            updateTreeRandomTrait!,
            updateHybridRandomTrait!,
            mod)
end

function updateRootRandomTrait!(V::AbstractArray, i::Int, mod)
    sample!(1:nstates(mod), view(V, :, i)) # uniform at the root
    return
end

function updateTreeRandomTrait!(V::Matrix,
    i::Int,parentIndex::Int,edge::Edge,
    mod)
    randomTrait!(view(V, :, i), mod, edge.length, view(V, :, parentIndex))
end

function updateHybridRandomTrait!(V::Matrix,
        i::Int, parentIndex1::Int, parentIndex2::Int,
        edge1::Edge, edge2::Edge, mod)
    randomTrait!(view(V, :, i), mod, edge1.length, view(V, :, parentIndex1))
    tmp = randomTrait(mod, edge2.length, view(V, :, parentIndex2))
    for j in 1:size(V,1) # loop over traits
        if V[j,i] == tmp[j] # both parents of the hybrid node have the same trait
            continue # skip the rest: go to next trait
        end
        if rand() > edge1.gamma
            V[j,i] = tmp[j] # switch to inherit trait of parent 2
        end
    end
end

function Base.show(io::IO, object::NASM) #add this to TSM and change to SM if NASM, add pi
    str = "$(object) Nucleic Acid Substitution Model \n"
    str *= "rates: $(object.rate)\n"
    str *= "pi: $(object.pi)\n"
    str *= "rate matrix Q:\n"
    print(io, str)
    showQ(io, object)
end

"""
    JC69Model ()

[`JC69Model`](@ref) nucleic acid substitution model based on Jukes and Cantor's 1969 substitution model. 
Default is relative rate model. Based on depricated PhyloModels.jl by Justin Angevaare

# examples

```julia-repl
julia> m1 = JC69Model()
julia> nstates(m1)
4
julia> m2 = JC69Model([0.5])
julia> nparams(m2)
1
```
"""
struct JC69Model <:  NucleicAcidSubstitutionModel
    rate::Vector{Float64}
    pi::Vector{Float64}
    relativerate::Bool
  
    function JC69Model(rate::Vector{Float64})
      if !(0 <= length(rate) <= 1)
        error("rate not a valid length for a JC69 model")
      elseif any(rate .<= 0.)
        error("All elements of rate must be positive for a JC69 model")
      end
      pi = [0.25, 0.25, 0.25, 0.25]
      if length(rate) == 0
        new(rate, pi, true)
      else
        new(rate, pi, false)
    end
  end
const JC69 = JC69Model

"""
    HKY85Model ()

[`HKY85Model`](@ref) nucleic acid substitution model based on Hasegawa et al. 1984 substitution model. 
Default is relative rate model. Based on depricated PhyloModels.jl by Justin Angevaare

# examples

```julia-repl
julia> m1 = HKY85Model([.5], [0.25, 0.25, 0.25, 0.25])
julia> nstates(m1)
4
julia> m2 = HKY85Model([0.5, 0.5], [0.25, 0.25, 0.25, 0.25])
julia> nstates(m2)
4
```
"""
struct HKY85Model <: NucleicAcidSubstitutionModel
    rate::Vector{Float64}
    pi::Vector{Float64}
    relative::Bool
    
    function HKY85Model(rate::Vector{Float64}, pi::Vector{Float64}, relative::Bool)
        if any(rate .<= 0.)
            error("All elements of rate must be positive")
        elseif !(1 <= length(rate) <= 2)
            error("rate is not a valid length for HKY85 model")
        elseif length(pi) !== 4
            error("pi must be of length 4")
        elseif !all(0. .< pi.< 1.)
            error("All base proportions must be between 0 and 1")
        elseif sum(pi) !== 1.
            error("Base proportions must sum to 1")
        end
      
          if length(rate) == 1
            new(rate, pi, true) 
          else
            new(rate, pi, false)
          end
        end
      end
const HKY = HKY85Model
#TODO remove variableratemodel

"""
    nstates(model::NASM)

return number of character states for a NucleicAcidSubstitutionModel

# Examples

```julia-repl
julia> nstates(JC69Model())
4
julia> nstates(HKY85Model([.5], [0.25, 0.25, 0.25, 0.25]))
4
```
"""
function nstates(mod::NASM)
    return 4::Int
end

"""
    nparams(model::JC69Model)

return number of parameters for JC69Model

"""
@inline function nparams(mod::JC69)
    (mod.relative ? 0 : 1)
end

"""
    nparams(model::HKY85Model)

Return number of parameters for HKY85Model
"""
@inline function nparams(mod::HKY85)
    (mod.relative ? 4 : 5)
end

"""
    getlabels(mod:SM)
require:
    PhyloModels

return labels for a given nuceleic acid substitution model. 
If model is a NASM, returns ACGT. 

# examples

```julia-repl 
julia> getlabels(JC69Model())
(DNA_A, DNA_C, DNA_G, DNA_T)
julia> getlabels(HKY85Model([.5], [0.25, 0.25, 0.25, 0.25]))
(DNA_A, DNA_C, DNA_G, DNA_T)
````
"""
function getlabels(::NASM)
    return BioSymbols.ACGT
end


"""
    Q(mod::JC69Model)
return Q rate matrix for the given model. Mutable version modeled after BioJulia/SubstitionModel.jl
and PyloModels.jl

Substitution rate matrix for a given substitution model:
Q[i,j] is the rate of transitioning from state i to state j.
"""

@inline function Q(mod::JC69Model)
    if mod.relativerate
        lambda = 1.0/3.0 #this allows branch lengths to be interpreted as substitutions/site (pi-weighted avg of diagonal is -1)
    else
        lambda = (1.0/3.0)*mod.rate[1]
    end

    return QMatrix(-3*lambda, lambda, lambda, lambda,
            lambda, -3*lambda, lambda, lambda,
            lambda, lambda, -3*lambda, lambda,
            lambda, lambda, lambda, -3*lambda)
end

"""
Q(mod::JC69Model)
    return Q rate matrix. Mutable version modeled after BioJulia/SubstitionModel.jl
    and PyloModels.jl
    
    Substitution rate matrix for a given substitution model:
    Q[i,j] is the rate of transitioning from state i to state j.
    For absolute, 
    average number of substitutions per site for time 1. lambda (or d) = (2*(piT*piC + piA*piG)*alpha + 2*(piY+piR)*beta)
    For relative,
    average number of substitutions per site is 1 (lambda = 1). kappa = alpha/beta. 
"""
@inline function Q(mod::HKY85Model)
    piA = mod.pi[1]; piC = mod.pi[2]; piG = mod.pi[3]; piT = mod.pi[4]
    if HKY85Model.relative == true #TODO reoganaize
        k = mod.rate[1]
        lambda = (2*(piT*piC + piA*piG)k + 2*(piY+piR)) #for sub/year interpretation

        Q₁  = piA/lambda
        Q₂  = k * Q₁
        Q₃  = piC/lambda
        Q₄  = k * Q₃
        Q₆  = piG/lambda
        Q₅  = k * Q₆
        Q₇  = piT/lambda
        Q₈  = k * Q₇
        Q₉  = -(Q₃ + Q₅ + Q₇)
        Q₁₀ = -(Q₁ + Q₆ + Q₈)
        Q₁₁ = -(Q₂ + Q₃ + Q₇)
        Q₁₂ = -(Q₁ + Q₄ + Q₆)
    else 
        a = mod.rate[1]; b = mod.rate[2]      
        Q₁  = a * piA
        Q₂  = a * piA
        Q₃  = b * piC
        Q₄  = a * piC
        Q₅  = a * piG
        Q₆  = b * piG
        Q₇  = b * piT
        Q₈  = a * piT
        Q₉  = -(Q₃ + Q₅ + Q₇)
        Q₁₀ = -(Q₁ + Q₆ + Q₈)
        Q₁₁ = -(Q₂ + Q₃ + Q₇)
        Q₁₂ = -(Q₁ + Q₄ + Q₆)
    end
    return Qmatrix(Q₉,  Q₁,  Q₂,  Q₁,
                    Q₃,  Q₁₀, Q₃,  Q₄,
                    Q₅,  Q₆,  Q₁₁, Q₆,
                    Q₇,  Q₈,  Q₇,  Q₁₂)

end

"""
P(NASM, t)

Probability transition matrix for a [`NucleicAcidSubstitutionModel`](@ref), of the form

P[1,1] ... P[1,k]
   .          .
   .          .
P[k,1] ... P[k,k]

where P[i,j] is the probability of ending in state j after time t,
given that the process started in state i.
"""

@inline function P(mod::JC69Model, t::Float64)
    if t < 0
        error("Time must be positive")
    end
    if mod.relativerate
        lambda = (4.0/3.0) #to make branch lengths interpretable. lambda = substitutions/year
    else
        lambda = (4.0/3.0)*mod.rate[1]
    end
      
    P_0 = 0.25 + 0.75 * exp(-t * lambda)
    P_1 = 0.25 - 0.25 * exp(-t * lambda)
    return PMatrix(P_0, P_1, P_1, P_1, 
            P_1, P_0, P_1, P_1,
            P_1, P_1, P_0, P_1,
            P_1, P_1, P_1, P_0)
end
"""
takes a slice of logtrans as first argument
"""
function P!(Pmat::AbstractMatrix, mod::JC69Model, t::Float64)
    if t < 0
        error("Time must be positive")
    end
    if mod.relativerate #TODO update with new lambda
        lambda = 1.
    else
        lambda = mod.rate[1]
    end
      
    P_0 = 0.25 + 0.75 * exp(-t * lambda)
    P_1 = 0.25 - 0.25 * exp(-t * lambda)
    Pmat[:,:] = P_1
    for i in 1:4 Pmat[i,i]=P_0;end
    return Pmat
end
#TODO add this for HKY P! (one entry at a time)
"""
for absolute version in book (TODO cite and check)
for relative, 
"""
@inline function P(mod::HKY85Model, t::Float64)
    if t < 0.0
        error("t must be positive")
    end
    piA = mod.pi[1]; piC = mod.pi[2]; piG = mod.pi[3]; piT = mod.pi[4]
    piR = piA + piG
    piY = piT + piC
    
    if HKY85Model.relative == false
        a = mod.rate[1]/(); b = mod.rate[2]/() #alpha and beta
          
        e₁ = exp(-b * t)
        e₂ = exp(-(piR * a + piY * b) * t)
        e₃ = exp(-(piY * a + piR * b) * t)
        
        P₁  = piA + (piA * piY / piR) * e₁ + (piG / piR) * e₂
        P₂  = piC + (piT * piR / piY) * e₁ + (piT / piY) * e₃
        P₃  = piG + (piG * piY / piR) * e₁ + (piA / piR) * e₂
        P₄  = piT + (piT * piR / piY) * e₁ + (piC / piY) * e₃
        P₅  = piA * (1 - e₁)
        P₆  = piA + (piA * piY / piR) * e₁ - (piA / piR) * e₂
        P₇  = piC * (1 - e₁)
        P₈  = piC + (piT * piR / piY) * e₁ - (piC / piY) * e₃
        P₉  = piG + (piG * piY / piR) * e₁ - (piG / piR) * e₂
        P₁₀ = piG * (1 - e₁)
        P₁₁ = piT * (1 - e₁)
        P₁₂ = piT + (piT * piR / piY) * e₁ - (piT / piY) * e₃
    else #relative version
        k = mod.rate[1] #kappa = alpha 
        s = t/(2*(piT*piC + piA*piG)k + 2*(piY+piR)) #t/lambda
        e₁ = exp(-s)
        e₂ = exp(-(piR * k + piY) * s)
        e₃ = exp(-(piY * k + piR) * s)
        
        P₁  = piA + (piA * piY / piR) * e₁ + (piG / piR) * e₂
        P₂  = piC + (piT * piR / piY) * e₁ + (piT / piY) * e₃
        P₃  = piG + (piG * piY / piR) * e₁ + (piA / piR) * e₂
        P₄  = piT + (piT * piR / piY) * e₁ + (piC / piY) * e₃
        P₅  = piA * (1 - e₁)
        P₆  = piA + (piA * piY / piR) * e₁ - (piA / piR) * e₂
        P₇  = piC * (1 - e₁)
        P₈  = piC + (piT * piR / piY) * e₁ - (piC / piY) * e₃
        P₉  = piG + (piG * piY / piR) * e₁ - (piG / piR) * e₂
        P₁₀ = piG * (1 - e₁)
        P₁₁ = piT * (1 - e₁)
        P₁₂ = piT + (piT * piR / piY) * e₁ - (piT / piY) * e₃
    end
    return Pmatrix(P₁,  P₅,  P₆,  P₅,
                    P₇,  P₂,  P₇,  P₈,
                    P₉,  P₁₀, P₃,  P₁₀,
                    P₁₁, P₁₂, P₁₁, P₄)
    #? Are subscripts okay on PCs?
end

"""
    VariableRateModel ()

[`VariableRateModel`](@ref) Allow variable substitution rates across sites using the discrete gamma model
(Yang 1994, Journal of Molecular Evolution). Turn any NASM to NASM + gamma.

Because mean(gamma) should equal 1, alpha = beta. Refer to this parameter as alpha here.
"""
mutable struct RateVariationAcrossSites #TODO change everywhere
    alpha::Float64
    ncat::Int #k changed to ncat TODO
    ratemultiplier::Array{Float64}
    function VariableRateModel(alpha::Float64, k = 4::Int) #TODO add types everywhere
        @assert alpha >= 0 "alpha must be >= 0"
        if k = 1
            ratemultiplier = [1.0]
        else
            cuts = (0:(k-1))/k + 1/2k
            ratemultiplier = quantile.(Distributions.Gamma(alpha, alpha), cuts)
            new(alpha, k, ratemultiplier)
        end
    end
end
const VRM = VariableRateModel


function setalpha(obj::RateVariationAcrossSites, alpha)
    @assert alpha >= 0 "alpha must be >= 0"
    obj.alpha = alpha
    cuts = (0:(obj.ncat-1))/obj.ncat + 1/2obj.ncat
    obj.ratemultiplier[:] = quantile.(Distributions.Gamma(alpha, alpha), cuts)
end
function Base.show(io::IO, object::RateVariationAcrossSites)
    str = "$(object) Rate Variation Across Sites using Discretized Gamma Model\n"
    str *= "alpha: $(object.alpha)\n"
    str *= "categories for Gamma discretization: $(object.ncat)\n"
    str *= "ratemultiplier: $(object.ratemultiplier)\n"
    print(io, str)
    showQ(io, object)
end

#add nparams for variablerate model