using Documenter

using Pkg
Pkg.add(PackageSpec(name="PhyloPlots", rev="master"))

using PhyloNetworks
DocMeta.setdocmeta!(PhyloNetworks, :DocTestSetup, :(using PhyloNetworks); recursive=true)
using PhyloPlots # to trigger any precompilation warning outside jldoctests

makedocs(
    sitename = "PhyloNetworks.jl",
    authors = "Claudia Solís-Lemus, Cécile Ané, Paul Bastide and contributors.",
    modules = [PhyloNetworks], # to list methods from PhyloNetworks only, not from Base etc.
    format = Documenter.HTML(
        prettyurls = get(ENV, "CI", nothing) == "true", # easier local build
        size_threshold = 600 * 2^10, size_threshold_warn = 500 * 2^10), # 600 KiB
    # exception, so warning-only for :missing_docs. List all others:
    warnonly = Documenter.except(:autodocs_block, :cross_references, :docs_block,
        :doctest, :eval_block, :example_block, :footnote, :linkcheck_remotes,
        :linkcheck, :meta_block, :parse_error, :setup_block),
    pages = [
        "Home" => "index.md",
        "Manual" => [
            "Installation" => "man/installation.md",
            "Network manipulation" => "man/netmanipulation.md",
            "Input Data for SNaQ" => "man/inputdata.md",
            "TICR pipeline" => "man/ticr_howtogetQuartetCFs.md",
            "Network estimation and display" => "man/snaq_plot.md",
            "Network comparison and manipulation" => "man/dist_reroot.md",
            "Candidate Networks" => "man/fixednetworkoptim.md",
            "Extract Expected CFs" => "man/expectedCFs.md",
            "Bootstrap" => "man/bootstrap.md",
            "Multiple Alleles" => "man/multiplealleles.md",
            "Continuous Trait Evolution" => "man/trait_tree.md",
            "Parsimony on networks" => "man/parsimony.md",
            "Discrete Trait Evolution" => "man/fitDiscrete.md",
            "Neighbour Joining" => "man/nj.md",
            "Networks from Concatenated DNA with PhyLiNC" => "man/phyLiNC.md",
        ],
        "Library" => [
            "Public" => "lib/public.md",
            "Internals" => "lib/internals.md",
        ]
    ],
)

deploydocs(
    repo = "github.com/crsl4/PhyloNetworks.jl.git",
    push_preview = true,
)
