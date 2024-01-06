using Weave, Fontconfig, Cairo

set_chunk_defaults(Dict{Symbol, Any}(:results => "hidden", :eval => false))

files_to_weave = ["installation.jmd",
                  "inputdata.jmd",
                  "trait_tree.jmd",
                  "snaq_plot.jmd",
                  "dist_reroot.jmd",
                  "fixednetworkoptim.jmd",
                  "expectedCFs.jmd",
                  "bootstrap.jmd"]


for file in files_to_weave
    println(file)
    weave(Pkg.dir("PhyloNetworks","docs","src", "man", "src", file),
        informat = "markdown",
        out_path = Pkg.dir("PhyloNetworks","docs","src", "man"),
        fig_path = "../assets/figures",
        fig_ext  = ".png",
        doctype  = "github")
end
