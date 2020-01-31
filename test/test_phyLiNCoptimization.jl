@testset "optimizelocalBL! and optimizelocalgammas! with simple example" begin
net_simple = readTopology("(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);")
fastafile = abspath(joinpath(dirname(Base.find_package("PhyloNetworks")), "..", "examples", "simple.aln"))
obj = PhyloNetworks.StatisticalSubstitutionModel(net_simple, fastafile, :JC69)

## Local BL: unzip = true
lengthe = obj.net.edge[4].length
lengthep = obj.net.edge[4].node[1].edge[1].length
@test typeof(PhyloNetworks.optimizelocalBL!(obj, obj.net, obj.net.edge[4], true)) == Vector{PhyloNetworks.Edge}
@test obj.net.edge[4].length != lengthe
@test obj.net.edge[4].node[1].edge[1].length != lengthep

## Local BL: unzip = false
lengthe = obj.net.edge[9].length
lengthep = obj.net.edge[9].node[1].edge[1].length
@test typeof(PhyloNetworks.optimizelocalBL!(obj, obj.net, obj.net.edge[9], false)) == Vector{PhyloNetworks.Edge}
@test obj.net.edge[9].length != lengthe
@test obj.net.edge[9].node[1].edge[1].length != lengthep

# ## Local Gamma: unzip = true
hybridmajorparent = PhyloNetworks.getMajorParentEdge(obj.net.hybrid[1])
@test typeof(PhyloNetworks.optimizelocalgammas!(obj, obj.net, hybridmajorparent,
    true)) == Vector{PhyloNetworks.Edge}
@test hybridmajorparent.gamma != 0.9
@test PhyloNetworks.getMinorParentEdge(obj.net.hybrid[1]).gamma != 0.1

# ## Local Gamma: unzip = false
obj = PhyloNetworks.StatisticalSubstitutionModel(net_simple, fastafile, :JC69)
hybridmajorparent = PhyloNetworks.getMajorParentEdge(obj.net.hybrid[1])
@test typeof(PhyloNetworks.optimizelocalgammas!(obj, obj.net, hybridmajorparent,
    false)) == Vector{PhyloNetworks.Edge}
@test hybridmajorparent.gamma != 0.9
@test PhyloNetworks.getMinorParentEdge(obj.net.hybrid[1]).gamma != 0.1
end

@testset "optimizelocalBL! optimizelocalgammas! with complex network and 8 sites" begin
fastafile = joinpath(@__DIR__, "..", "examples", "Ae_bicornis_8sites.aln") # 8 sites only
fastafile = abspath(joinpath(dirname(Base.find_package("PhyloNetworks")), "..", "examples", "Ae_bicornis_8sites.aln"))
dna_dat, dna_weights = readfastatodna(fastafile, true); # 22 species, 3 hybrid nodes, 103 edges
net = readTopology("((((((((((((((Ae_caudata_Tr275,Ae_caudata_Tr276),Ae_caudata_Tr139))#H1,#H2),(((Ae_umbellulata_Tr266,Ae_umbellulata_Tr257),Ae_umbellulata_Tr268),#H1)),((Ae_comosa_Tr271,Ae_comosa_Tr272),(((Ae_uniaristata_Tr403,Ae_uniaristata_Tr357),Ae_uniaristata_Tr402),Ae_uniaristata_Tr404))),(((Ae_tauschii_Tr352,Ae_tauschii_Tr351),(Ae_tauschii_Tr180,Ae_tauschii_Tr125)),(((((((Ae_longissima_Tr241,Ae_longissima_Tr242),Ae_longissima_Tr355),(Ae_sharonensis_Tr265,Ae_sharonensis_Tr264)),((Ae_bicornis_Tr408,Ae_bicornis_Tr407),Ae_bicornis_Tr406)),((Ae_searsii_Tr164,Ae_searsii_Tr165),Ae_searsii_Tr161)))#H2,#H4))),(((T_boeoticum_TS8,(T_boeoticum_TS10,T_boeoticum_TS3)),T_boeoticum_TS4),((T_urartu_Tr315,T_urartu_Tr232),(T_urartu_Tr317,T_urartu_Tr309)))),(((((Ae_speltoides_Tr320,Ae_speltoides_Tr323),Ae_speltoides_Tr223),Ae_speltoides_Tr251))H3,((((Ae_mutica_Tr237,Ae_mutica_Tr329),Ae_mutica_Tr244),Ae_mutica_Tr332))#H4))),Ta_caputMedusae_TB2),S_vavilovii_Tr279),Er_bonaepartis_TB1),H_vulgare_HVens23);");
PhyloNetworks.fuseedgesat!(93, net)
for edge in net.edge # reset network
    setLength!(edge,1.0)
end
for h in net.hybrid
    setGamma!(PhyloNetworks.getMajorParentEdge(h),0.7)
end
obj = PhyloNetworks.StatisticalSubstitutionModel(net, fastafile, :JC69);
@test length(obj.net.leaf) == 22

## Local BL: unzip = true
lengthe = obj.net.edge[48].length
lengthep = obj.net.edge[48].node[1].edge[1].length
@test typeof(PhyloNetworks.optimizelocalBL!(obj, obj.net, obj.net.edge[48], true)) == Vector{PhyloNetworks.Edge}
@test obj.net.edge[48].length != lengthe
@test obj.net.edge[48].node[1].edge[1].length == 0.0 # below hybrid node

# ## Local Gamma: unzip = truE
@test typeof(PhyloNetworks.optimizelocalgammas!(obj, obj.net,
    PhyloNetworks.getMajorParentEdge(obj.net.hybrid[1]), true)) == Vector{PhyloNetworks.Edge}
@test PhyloNetworks.getMajorParentEdge(obj.net.hybrid[1]).gamma != 0.7
@test PhyloNetworks.getMinorParentEdge(obj.net.hybrid[1]).gamma != 0.3
end #of local branch length and gamma optimization with localgamma! localBL! with 8 sites

@testset "global branch length and gamma optimization with 8 sites" begin
fastafile = abspath(joinpath(dirname(Base.find_package("PhyloNetworks")), "..", "examples", "Ae_bicornis_Tr406_Contig10132.aln"))
dna_dat, dna_weights = readfastatodna(fastafile, true);
net = readTopology("((((((((((((((Ae_caudata_Tr275,Ae_caudata_Tr276),Ae_caudata_Tr139))#H1,#H2),(((Ae_umbellulata_Tr266,Ae_umbellulata_Tr257),Ae_umbellulata_Tr268),#H1)),((Ae_comosa_Tr271,Ae_comosa_Tr272),(((Ae_uniaristata_Tr403,Ae_uniaristata_Tr357),Ae_uniaristata_Tr402),Ae_uniaristata_Tr404))),(((Ae_tauschii_Tr352,Ae_tauschii_Tr351),(Ae_tauschii_Tr180,Ae_tauschii_Tr125)),(((((((Ae_longissima_Tr241,Ae_longissima_Tr242),Ae_longissima_Tr355),(Ae_sharonensis_Tr265,Ae_sharonensis_Tr264)),((Ae_bicornis_Tr408,Ae_bicornis_Tr407),Ae_bicornis_Tr406)),((Ae_searsii_Tr164,Ae_searsii_Tr165),Ae_searsii_Tr161)))#H2,#H4))),(((T_boeoticum_TS8,(T_boeoticum_TS10,T_boeoticum_TS3)),T_boeoticum_TS4),((T_urartu_Tr315,T_urartu_Tr232),(T_urartu_Tr317,T_urartu_Tr309)))),(((((Ae_speltoides_Tr320,Ae_speltoides_Tr323),Ae_speltoides_Tr223),Ae_speltoides_Tr251))H3,((((Ae_mutica_Tr237,Ae_mutica_Tr329),Ae_mutica_Tr244),Ae_mutica_Tr332))#H4))),Ta_caputMedusae_TB2),S_vavilovii_Tr279),Er_bonaepartis_TB1),H_vulgare_HVens23);");
PhyloNetworks.fuseedgesat!(93, net)
for edge in net.edge #adds branch lengths
    setLength!(edge,1.0)
end
for h in net.hybrid
    setGamma!(PhyloNetworks.getMajorParentEdge(h),0.6)
end
obj = PhyloNetworks.StatisticalSubstitutionModel(net, fastafile, :JC69);

## optimizeBL: unzip = true
@test typeof(PhyloNetworks.optimizeBL!(obj, obj.net, obj.net.edge, true)) == Vector{PhyloNetworks.Edge}
@test obj.net.edge[10] != 1.0
@test obj.net.edge[40] != 1.0

## optimizegammas: unzip = true
@test typeof(PhyloNetworks.optimizeallgammas!(obj, obj.net, true)) == Vector{PhyloNetworks.Edge}
@test PhyloNetworks.getMajorParentEdge(obj.net.hybrid[1]).gamma != 0.6
@test PhyloNetworks.getMinorParentEdge(obj.net.hybrid[1]).gamma != 0.4
end

@testset "data to SSM pruning: simple example" begin
net_simple = readTopology("(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);")
fastafile = abspath(joinpath(dirname(Base.find_package("PhyloNetworks")), "..", "examples", "simple_missingone.aln"))
obj = PhyloNetworks.StatisticalSubstitutionModel(net_simple, fastafile, :JC69)
@test length(obj.net.edge) == 7
@test length(obj.net.hybrid) == 1
@test length(obj.net.leaf) == 3
@test !PhyloNetworks.hashybridladder(obj.net)
end

@testset "data to SSM pruning: complex network" begin
fastafile = abspath(joinpath(dirname(Base.find_package("PhyloNetworks")), "..", "examples", "Ae_bicornis_8sites.aln"))
net = readTopology("((((((((((((((Ae_caudata_Tr275,Ae_caudata_Tr276),Ae_caudata_Tr139))#H1,#H2),(((Ae_umbellulata_Tr266,Ae_umbellulata_Tr257),Ae_umbellulata_Tr268),#H1)),((Ae_comosa_Tr271,Ae_comosa_Tr272),(((Ae_uniaristata_Tr403,Ae_uniaristata_Tr357),Ae_uniaristata_Tr402),Ae_uniaristata_Tr404))),(((Ae_tauschii_Tr352,Ae_tauschii_Tr351),(Ae_tauschii_Tr180,Ae_tauschii_Tr125)),(((((((Ae_longissima_Tr241,Ae_longissima_Tr242),Ae_longissima_Tr355),(Ae_sharonensis_Tr265,Ae_sharonensis_Tr264)),((Ae_bicornis_Tr408,Ae_bicornis_Tr407),Ae_bicornis_Tr406)),((Ae_searsii_Tr164,Ae_searsii_Tr165),Ae_searsii_Tr161)))#H2,#H4))),(((T_boeoticum_TS8,(T_boeoticum_TS10,T_boeoticum_TS3)),T_boeoticum_TS4),((T_urartu_Tr315,T_urartu_Tr232),(T_urartu_Tr317,T_urartu_Tr309)))),(((((Ae_speltoides_Tr320,Ae_speltoides_Tr323),Ae_speltoides_Tr223),Ae_speltoides_Tr251))H3,((((Ae_mutica_Tr237,Ae_mutica_Tr329),Ae_mutica_Tr244),Ae_mutica_Tr332))#H4))),Ta_caputMedusae_TB2),S_vavilovii_Tr279),Er_bonaepartis_TB1),H_vulgare_HVens23);");
PhyloNetworks.fuseedgesat!(93, net)
for edge in net.edge # reset network
    setLength!(edge,1.0)
end
for h in net.hybrid
    setGamma!(PhyloNetworks.getMajorParentEdge(h),0.6)
end
obj = PhyloNetworks.StatisticalSubstitutionModel(net, fastafile, :JC69);
@test length(obj.net.leaf) == 22
@test length(obj.net.edge) == 52
@test length(obj.net.hybrid) == 3
@test !PhyloNetworks.hashybridladder(obj.net)
end

@testset "checknetworkbeforeLiNC" begin
tree = readTopology("(A:3.0,(B:2.0,(C:1.0,D:1.0):1.0):1.0);");
@test !all([!(length(n.edge) == 2) for n in tree.node]) # one node of degree 2
PhyloNetworks.checknetworkbeforeLiNC!(tree, 1, true, true, true)
@test all([!(length(n.edge) == 2) for n in tree.node]) # no nodes of degree 2

net = readTopology("(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);")
@test !all([!(length(n.edge) == 2) for n in net.node]) # one node of degree 2
PhyloNetworks.checknetworkbeforeLiNC!(net, 1, true, true, true)
@test all([!(length(n.edge) == 2) for n in net.node]) # no nodes of degree 2
@test all([(PhyloNetworks.getChildEdge(h).length == 0.0) for h in net.hybrid])# edges below hybrid node are of length zero
@test_throws ErrorException PhyloNetworks.checknetworkbeforeLiNC!(net, 0, true, true, true)
end

@testset "optimizestructure with simple example" begin
maxmoves = 20
maxhybrid = 3
net = readTopology("(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);")
fastafile = abspath(joinpath(dirname(Base.find_package("PhyloNetworks")), "..", "examples", "simple.aln"))
obj = PhyloNetworks.StatisticalSubstitutionModel(net, fastafile, :JC69, maxhybrid)
PhyloNetworks.checknetworkbeforeLiNC!(obj.net, maxhybrid, true, true, true)
PhyloNetworks.discrete_corelikelihood!(obj)
@test typeof(PhyloNetworks.optimizestructure!(obj, maxmoves, maxhybrid, true, true, true)) == Bool
@test writeTopology(obj.net) != "(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);"

# allow 3-cycles
net = readTopology("(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);")
obj = PhyloNetworks.StatisticalSubstitutionModel(net, fastafile, :JC69, maxhybrid)
PhyloNetworks.checknetworkbeforeLiNC!(obj.net, maxhybrid, false, true, true)
PhyloNetworks.discrete_corelikelihood!(obj)
@test typeof(PhyloNetworks.optimizestructure!(obj, maxmoves, maxhybrid, false, true, true)) == Bool
@test writeTopology(obj.net) != "(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);"

# unzip = false
net = readTopology("(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);")
obj = PhyloNetworks.StatisticalSubstitutionModel(net, fastafile, :JC69, maxhybrid)
PhyloNetworks.checknetworkbeforeLiNC!(obj.net, maxhybrid, true, false, true)
PhyloNetworks.discrete_corelikelihood!(obj)
@test typeof(PhyloNetworks.optimizestructure!(obj, maxmoves, maxhybrid, true, false, true)) == Bool
@test writeTopology(obj.net) != "(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);"

# allow hybrid ladders
net = readTopology("(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);")
obj = PhyloNetworks.StatisticalSubstitutionModel(net, fastafile, :JC69, maxhybrid)
PhyloNetworks.checknetworkbeforeLiNC!(obj.net, maxhybrid, true, true, false)
PhyloNetworks.discrete_corelikelihood!(obj)
@test typeof(PhyloNetworks.optimizestructure!(obj, maxmoves, maxhybrid, true, true, false)) == Bool
@test writeTopology(obj.net) != "(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);"
end # of optimizestructure with simple example

@testset "phyLiNC with simple net, no constraints" begin
#for no3cycle in [true, false] #TODO in future make loops for options to test all
#for unzip in [true, false]
#for nohybridladder in [true, false]
maxhybrid = 2
net = readTopology("(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);")
fastafile = abspath(joinpath(dirname(Base.find_package("PhyloNetworks")), "..",
            "examples", "simple.aln"))
obj = PhyloNetworks.phyLiNC!(net, fastafile, :JC69, maxhybrid, true, true,
                            true, 20, 5, true) # maxmoves = 20, nreject = 5
@test typeof(obj) == PhyloNetworks.StatisticalSubstitutionModel
@test writeTopology(obj.net) != "(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);"

maxhybrid = 0
@test_throws ErrorException PhyloNetworks.phyLiNC!(net, fastafile, :JC69,
                                                maxhybrid, true, true, true, 20,
                                                5, true) # maxmoves = 20, nreject = 5
end
