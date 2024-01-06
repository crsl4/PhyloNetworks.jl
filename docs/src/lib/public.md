# Public Documentation

Documentation for `PhyloNetworks`'s public (exported) interface.

See [Internal Documentation](@ref) for documentation on internal functions.

```@contents
Pages = ["public.md"]
```

## Index

```@index
Pages = ["public.md"]
```

## types

```@autodocs
Modules = [PhyloNetworks]
Private = false
Order   = [:type]
```

## basic utilities

```@docs
tipLabels
printEdges
printNodes
getroot
isrootof
#isleaf
#isexternal
isparentof
#ischildof
hassinglechild
getchild
#getchildren
#getchildedge
getparent
#getparents
#getparentminor
#getparentedge
#getparentedgeminor
getpartneredge
getNodeAges
pairwiseTaxonDistanceMatrix
```

## utilities to manipulate networks

```@docs
sorttaxa!
directEdges!
checkroot!
preorder!
cladewiseorder!
rootatnode!
rootonedge!
hybridatnode!
setLength!
setGamma!
deleteleaf!
deleteaboveLSA!
removedegree2nodes!
shrink2cycles!
shrink3cycles!
deleteHybridThreshold!
rotate!
biconnectedComponents
blobDecomposition
treeedgecomponents
nni!
```

## data and topology read/write

```@docs
readfastatodna
readTopology
readTopologyLevel1
readInputTrees
readMultiTopology
readnexus_treeblock
readSnaqNetwork
readTrees2CF
countquartetsintrees
readTableCF
readTableCF!
writeTableCF
readBootstrapTrees
writeSubTree!
writeTopology
writeMultiTopology
hybridlambdaformat
mapAllelesCFtable
```

## network inference

```@docs
snaq!
topologyMaxQPseudolik!
topologyQPseudolik!
summarizeDataCF
fittedQuartetCF
bootsnaq
calibrateFromPairwiseDistances!
undirectedOtherNetworks
nj
```
## network Comparisons

```@docs
majorTree
minorTreeAt
displayedTrees
displayedNetworkAt!
hardwiredClusters
hardwiredCluster
hardwiredClusterDistance
treeEdgesBootstrap
hybridDetection
summarizeHFdf
hybridBootstrapSupport
```

## continuous trait evolution

```@docs
phylolm
sigma2_phylo
sigma2_within
mu_phylo
lambda_estim
ancestralStateReconstruction
expectations
predint
expectationsPlot
predintPlot
simulate
shiftHybrid
getShiftEdgeNumber
getShiftValue
descendenceMatrix
regressorShift
regressorHybrid
sharedPathMatrix
vcv
getindex(::TraitSimulation, ::Symbol)
```

## discrete trait evolution

```@docs
parsimonySoftwired
parsimonyGF
Q
randomTrait
randomTrait!
fitdiscrete
maxParsimonyNet
getlabels
nstates
nparams
stationary
empiricalDNAfrequencies
phyLiNC
```
