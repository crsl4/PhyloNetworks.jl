@testset "deterministic topologies" begin
@test PhyloNetworks.startree_newick(3) == "(t1:1.0,t2:1.0,t3:1.0);"
@test PhyloNetworks.symmetrictree_newick(2, 0.1, 2) == "((A2:0.1,A3:0.1):0.1,(A4:0.1,A5:0.1):0.1);"
@test PhyloNetworks.symmetricnet_newick(3, 2, 1, 0.1, 1) ==
    "(((#H:1::0.1,(A1:1,A2:1):0.5):0.5,((A3:0.5)#H:0.5::0.9,A4:1):1):1,((A5:1,A6:1):1,(A7:1,A8:1):1):1);"
@test PhyloNetworks.symmetricnet_newick(3, 3, 3, 0.1, 1) ==
    "((#H:1::0.1,((A1:1,A2:1):1,(A3:1,A4:1):1):0.5):0.5,(((A5:1,A6:1):1,(A7:1,A8:1):1):0.5)#H:0.5::0.9);"
@test PhyloNetworks.symmetricnet_newick(4, 2, 0.1) ==
    "((((#H1:0.25::0.1,(A1:0.25,A2:0.25):0.125):0.125,((A3:0.125)#H1:0.125::0.9,A4:0.25):0.25):0.25,((#H2:0.25::0.1,(A5:0.25,A6:0.25):0.125):0.125,((A7:0.125)#H2:0.125::0.9,A8:0.25):0.25):0.25):0.25,(((#H3:0.25::0.1,(A9:0.25,A10:0.25):0.125):0.125,((A11:0.125)#H3:0.125::0.9,A12:0.25):0.25):0.25,((#H4:0.25::0.1,(A13:0.25,A14:0.25):0.125):0.125,((A15:0.125)#H4:0.125::0.9,A16:0.25):0.25):0.25):0.25);"
end