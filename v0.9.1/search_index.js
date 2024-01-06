var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "#PhyloNetworks.jl-1",
    "page": "Home",
    "title": "PhyloNetworks.jl",
    "category": "section",
    "text": "PhyloNetworks is a Julia package for the manipulation, visualization, inference of phylogenetic networks, and their use for trait evolution.How to get helpthe package wiki has a step-by-step tutorial, done for the 2018 MBL workshop, with background on networks and explanations.\nthe google group has answers to common questions.\nthe Manual below has a quick tutorial (navigation on the left).\nthe Index further below has the full list of documented functions."
},

{
    "location": "#References-1",
    "page": "Home",
    "title": "References",
    "category": "section",
    "text": "Claudia Solís-Lemus, Paul Bastide and Cécile Ané (2017). PhyloNetworks: a package for phylogenetic networks. Molecular Biology and Evolution 34(12):3292–3298. doi:10.1093/molbev/msx235\nBastide, Solís-Lemus, Kriebel, Sparks, Ané (2018). Phylogenetic Comparative Methods for Phylogenetic Networks with Reticulations. Systematic Biology, 67(5):800–820. doi:10.1093/sysbio/syy033.\nClaudia Solís-Lemus and Cécile Ané(2016). Inferring Phylogenetic Networks with Maximum Pseudolikelihood under Incomplete Lineage Sorting. PLoS Genet 12(3):e1005896. doi:10.1371/journal.pgen.1005896"
},

{
    "location": "#Manual-Outline-1",
    "page": "Home",
    "title": "Manual Outline",
    "category": "section",
    "text": "Pages = [\n    \"man/installation.md\",\n    \"man/inputdata.md\",\n    \"man/ticr_howtogetQuartetCFs.md\",\n    \"man/snaq_plot.md\",\n    \"man/dist_reroot.md\",\n    \"man/fixednetworkoptim.md\",\n    \"man/expectedCFs.md\",\n    \"man/bootstrap.md\",\n    \"man/multiplealleles.md\",\n    \"man/trait_tree.md\",\n    \"man/parsimony.md\"\n]\nDepth = 3"
},

{
    "location": "#Library-Outline-1",
    "page": "Home",
    "title": "Library Outline",
    "category": "section",
    "text": "Pages = [\"lib/public.md\", \"lib/internals.md\"]\nDepth = 2"
},

{
    "location": "#main-index-1",
    "page": "Home",
    "title": "Index",
    "category": "section",
    "text": ""
},

{
    "location": "#Functions-1",
    "page": "Home",
    "title": "Functions",
    "category": "section",
    "text": "Pages = [\"lib/public.md\", \"lib/internals.md\"]\nOrder = [:function]"
},

{
    "location": "#Types-1",
    "page": "Home",
    "title": "Types",
    "category": "section",
    "text": "Pages = [\"lib/public.md\", \"lib/internals.md\"]\nOrder = [:type]"
},

{
    "location": "man/installation/#",
    "page": "Installation",
    "title": "Installation",
    "category": "page",
    "text": ""
},

{
    "location": "man/installation/#Installation-1",
    "page": "Installation",
    "title": "Installation",
    "category": "section",
    "text": ""
},

{
    "location": "man/installation/#Installation-of-Julia-1",
    "page": "Installation",
    "title": "Installation of Julia",
    "category": "section",
    "text": "Julia is a high-level and interactive programming language (like R or Matlab), but it is also high-performance (like C). To install Julia, follow instructions here. For a quick & basic tutorial on Julia, see learn x in y minutes.Editors:Visual Studio Code provides an editor and an integrated development environment (IDE) for Julia: highly recommended!\nJuno provides an IDE for Julia, based on the Atom editor.\nyou can also run Julia within a Jupyter notebook (formerly IPython notebook).IMPORTANT: Julia code is just-in-time compiled. This means that the first time you run a function, it will be compiled at that moment. So, please be patient! Future calls to the function will be much much faster. Trying out toy examples for the first calls is a good idea."
},

{
    "location": "man/installation/#Installation-of-the-package-PhyloNetworks-1",
    "page": "Installation",
    "title": "Installation of the package PhyloNetworks",
    "category": "section",
    "text": "To install the package, type inside Julia:using Pkg\nPkg.add(\"PhyloNetworks\")The first step can take a few minutes, be patient. If you already installed the package and want the latest registered version, just do this (which will update all of your packages):Pkg.update()Warning: It is important to update the package regularly as it is undergoing constant development. Join the google group for updates here.Pkg.update() will install the latest registered version, but there could be other improvements in the master branch of the repository. If you want to update to the latest unregistered version of the package, you can do Pkg.add(PackageSpec(name=\"PhyloNetworks\", rev=\"master\")) just beware that the latest changes could be not as robust. If you want to go back to the registered package, you can do Pkg.free(\"PhyloNetworks\").Similarly, you can pin a version of the package Pkg.pin(\"PhyloNetworks\") so that Pkg.update() will not modify it. You can always free a pinned package with Pkg.free(\"PhyloNetworks\"). More on package management here.The PhyloNetworks package has dependencies like NLopt and DataFrames (see the REQUIRE file for the full list), but everything is installed automatically.The companion package PhyloPlots has utilities to visualize networks, and for interoperability, such as to export networks to R (which can then be plotted via R). To install:using Pkg\nPkg.add(\"PhyloPlots\")PhyloPlots depends on PhyloNetworks, and has further dependencies like Gadfly and RCall"
},

{
    "location": "man/installation/#Test-example-1",
    "page": "Installation",
    "title": "Test example",
    "category": "section",
    "text": "To check that your installation worked, type this in Julia to load the package. This is something to type every time you start a Julia session:using PhyloNetworks;This step can also take a while, if Julia needs to pre-compile the code (after a package update for instance). Here is a very small test for the installation of PhyloNetworks.net = readTopology(\"(A,(B,(C,D)));\");\ntipLabels(net)You can see a list of all the functions withvarinfo(PhyloNetworks)and press ? inside Julia to switch to help mode, followed by the name of a function (or type) to get more details about it."
},

{
    "location": "man/installation/#Julia-types-1",
    "page": "Installation",
    "title": "Julia types",
    "category": "section",
    "text": "Each object in Julia has a type. We show here small examples on how to get more info on an object, what\'s its type, and how to manipulate objects. For example, let\'s take an object raxmlCF created from reading in some data (see Input for SNaQ):raxmltrees = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"raxmltrees.tre\");\nraxmlCF = readTrees2CF(raxmltrees);Typing varinfo() will provide a list of objects and packages in memory, including raxmlCF that we just created. If we want to know the type of a particular object, we do:typeof(raxmlCF)which shows us that raxmlCF is of type DataCF. If we want to know about the attributes the object has, we can type ? in Julia, followed by DataCF for a description. We can also ask for a list of all its attributes withfieldnames(typeof(raxmlCF))For example, we see that one attribute is numQuartets: its the number of 4-taxon subsets in the data. To see what this number is:raxmlCF.numQuartetsWe also noticed an attribute quartet. It is a vector of Quartet objects inside raxmlCF, soraxmlCF.quartet[2].taxonwill provide the list of taxon names for the second 4-taxon subset in the data. To see the observed CF, we can typeraxmlCF.quartet[2].obsCFWe can verify the type withtypeof(raxmlCF.quartet[2])We can also read a simple network in Julia and print the list of edgesstr = \"(A,((B,#H1),(C,(D)#H1)));\";\nnet = readTopology(str);\nprintEdges(net)We see that the edges do not have branch lengths, and the hybrid edges do not have gamma values. We can set them withsetLength!(net.edge[1],1.9)\nsetGamma!(net.edge[3],0.8)\nprintEdges(net)where 1 and 3 correspond to the position of the given edge to modify in the list of edges. We can only change the gamma value of hybrid edges (not tree edges). Such an attempt below will cause an error with a message to explain that the edge was a tree edge:setGamma!(net.edge[4],0.7)\n# should return this:\n# ERROR: cannot change gamma in a tree edge"
},

{
    "location": "man/inputdata/#",
    "page": "Input Data for SNaQ",
    "title": "Input Data for SNaQ",
    "category": "page",
    "text": ""
},

{
    "location": "man/inputdata/#Input-for-SNaQ-1",
    "page": "Input Data for SNaQ",
    "title": "Input for SNaQ",
    "category": "section",
    "text": "SNaQ is a method implemented in the package to estimate a phylogenetic network from multiple molecular sequence alignments. There are two alternatives for the input data:A list of estimated gene trees for each locus, which can be obtained using MrBayes or RAxML. Or:\nA table of concordance factors (CF), i.e. gene tree frequencies, for each 4-taxon subset. This table can be obtained from BUCKy, to account for gene tree uncertaintyThis pipeline can be used to obtain the table of quartet CF needed as input for SNaQ (see also the wiki.) It starts from the sequence alignments, runs MrBayes and then BUCKy (both parallelized), producing the table of estimated CFs and their credibility intervals. Additional details on this TICR pipeline describe how to insert data at various stages (e.g. after running MrBayes on each locus)."
},

{
    "location": "man/inputdata/#Tutorial-data:-gene-trees-1",
    "page": "Input Data for SNaQ",
    "title": "Tutorial data: gene trees",
    "category": "section",
    "text": "We suggest that you create a special directory for running these examples, where input files can be downloaded and where output files will be created (with estimated networks for instance). Enter this directory and run Julia from there.Suppose you have a file with a list of gene trees in parenthetical format called raxmltrees.tre. You can access the example file of input trees here or here for easier download.Do not copy-paste into a \"smart\" text-editor. Instead, save the file directly into your working directory using \"save link as\" or \"download linked file as\". This file contains 30 gene trees, each in parenthetical format on 6 taxa like this (with rounded branch lengths):(E:0.038,((A:0.014,B:0.010):0.010,(C:0.008,D:0.002):0.010):0.025,O:0.078);If raxmltrees.tre is in your working directory, you can view its content within Julia:less(\"raxmltrees.tre\")or like this, to view the version downloaded with the package:raxmltrees = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"raxmltrees.tre\")\nless(raxmltrees)Just type q to quit viewing this file. You could read in these 30 trees and visualize the third one (say) like this:using PhyloNetworks\nraxmltrees = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"raxmltrees.tre\");genetrees = readMultiTopology(raxmltrees);\ngenetrees[3]To visualize any of these input trees, use the PhyloPlots package:using PhyloPlots\nusing RCall # hide\nmkpath(\"../assets/figures\") # hide\nR\"name <- function(x) file.path(\'..\', \'assets\', \'figures\', x)\" # hide\nR\"svg(name(\'inputdata_gene3.svg\'), width=4, height=3)\" # hide\nR\"par\"(mar=[0,0,0,0])                          # hide\nplot(genetrees[3], :R); # tree for 3rd gene\nR\"dev.off()\"                                   # hide\nnothing # hide(Image: gene3)To read in all gene trees and directly summarize them by a list of quartet CFs (proportion of input trees with a given quartet):raxmlCF = readTrees2CF(raxmltrees, CFfile=\"tableCF.csv\");\ndf = writeTableCF(raxmlCF)   # data frame with observed CFs: gene frequencies\nCSV.write(\"tableCF.csv\", df) # to save the data frame to a file\nrm(\"tableCF.csv\") # hide\nrm(\"summaryTreesQuartets.txt\") # hideless(\"tableCF.csv\") lets you see the content of the newly created file \"tableCF.csv\", within Julia. Again, type q to quit viewing this file.In this table, each 4-taxon set is listed in one row. The 3 \"CF\" columns gives the proportion of genes that has each of the 3 possible trees on these 4 taxa.For more help on any function, type ? to enter the help mode, then type the name of the function. For example: type ? then readTrees2CF for information on the various options of that function.When there are many more taxa, the number of quartets might be very large and we might want to use a subset to speed things up. Here, if we wanted to use a random sample of 10 quartets instead of all quartets, we could do:readTrees2CF(raxmltrees, whichQ=\"rand\", numQ=10, CFfile=\"tableCF10.txt\")Be careful to use a numQ value smaller than the total number of possible 4-taxon subsets, which is n choose 4 on n taxa (e.g. 15 on 6 taxa). To get a predictable random sample, you may set the seed with using Random; Random.seed!(12321) (for instance) prior to sampling the quartets as above."
},

{
    "location": "man/inputdata/#Tutorial-data:-quartet-CFs-1",
    "page": "Input Data for SNaQ",
    "title": "Tutorial data: quartet CFs",
    "category": "section",
    "text": "If we already have a table of quartet concordance factor (CF) values in a file buckyCF.csv in this formatTaxon1 Taxon2 Taxon3 Taxon4 CF12_34 CF13_24 CF14_23\nD A E O 0.565 0.0903 0.3447\n...      ...we would read it in one step like this: readTableCF(\"buckyCF.csv\"). An example file comes with the package, available here or here.buckyCFfile = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"buckyCF.csv\");\nbuckyCF = readTableCF(buckyCFfile)The same thing could be done in 2 steps: first to read the file and convert it to a \'DataFrame\' object, and then to convert this DataFrame into a DataCF object.using CSV, DataFrames\ndat = CSV.read(buckyCFfile);\nfirst(dat, 6) # to see the first 6 rows\nbuckyCF = readTableCF(dat)\nwriteTableCF(buckyCF)In the input file, columns need to be in the right order: with the first 4 columns giving the names of the taxa in each 4-taxon set. The CF values are assumed to be in columns named \"CF12_34\", etc., or else in columns 5,6,7. If available, a column named \"ngenes\" will be taken to have the the number of genes for each 4-taxon subset."
},

{
    "location": "man/inputdata/#Tutorial-data:-starting-tree-1",
    "page": "Input Data for SNaQ",
    "title": "Tutorial data: starting tree",
    "category": "section",
    "text": "If we have a tree for the data set at hand, it can be used as a starting point for the optimization. From our gene trees, we estimated a species tree with ASTRAL. This tree comes with the package in file astral.tre here. This file has 102 trees: 100 bootstrap species trees, followed by their greedy consensus, followed by the best tree on the original data. It\'s this last tree that we are most interested in. We can read it withastralfile = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"astral.tre\");\nastraltree = readMultiTopology(astralfile)[102] # 102th tree: last tree here\nR\"svg(name(\'inputdata_astraltree.svg\'), width=4, height=3)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(astraltree, :R, showEdgeLength=true);\nR\"dev.off()\"; # hide(Image: astraltree)To start its search, SNaQ will need a network of \"level 1\". All trees and all networks with 1 hybridization are of level 1. To make sure that a network with 2 or more hybridizations is of level 1, we can read it in with readTopologyLevel1 (which also unroots the tree, resolves polytomies, replaces missing branch lengths by 1 for starting values etc.):T=readTopologyLevel1(\"startNetwork.txt\")(here startNetwork.txt is a hypothetical file: replace this by the name of a file that contains your network of interest.)Next: Getting a Network"
},

{
    "location": "man/ticr_howtogetQuartetCFs/#",
    "page": "TICR pipeline",
    "title": "TICR pipeline",
    "category": "page",
    "text": ""
},

{
    "location": "man/ticr_howtogetQuartetCFs/#TICR-pipeline-1",
    "page": "TICR pipeline",
    "title": "TICR pipeline",
    "category": "section",
    "text": "PhyloNetworks\' wiki has a step-by-step tutorial, to go from multiple sequence alignments to a table of quartet gene frequencies (concordance factors: CFs), through BUCKy (to integrate out gene tree uncertainty) or through RAxML. To get the raxml.pl perl script to run RAxML on each gene, download the content of that wiki withgit clone https://github.com/crsl4/PhyloNetworks.jl.wiki.gitthen go to the script/ folder.   Full information and code is here. Below is more detail to insert data into the pipeline at various stages, using one of two pipelines, depending on your machine configuration:\"no-scheduler\" pipeline: original set of Perl scripts from the TICR pipeline, well suited for a machine or a cluster of machines without a job scheduler. The scripts automatically parallelize the work across the available cores.\n\"slurm\" pipeline: well suited for a cluster where users submit jobs via a job scheduler like SLURM or SGE. The job scheduler does the work of parallelizing the work across available cores. The scripts, in this second pipeline, were created to take full advantage of job scheduler capabilities. They were developed for a cluster running SLURM. Adjustments to the submit scripts will be needed, to adapt to your own SLURM configuration or to the syntax that your job scheduler wants."
},

{
    "location": "man/ticr_howtogetQuartetCFs/#To-run-MrBayes:-we-already-have-alignments-1",
    "page": "TICR pipeline",
    "title": "To run MrBayes: we already have alignments",
    "category": "section",
    "text": ""
},

{
    "location": "man/ticr_howtogetQuartetCFs/#no-scheduler-pipeline-1",
    "page": "TICR pipeline",
    "title": "no-scheduler pipeline",
    "category": "section",
    "text": "We don\'t need to run mdl.pl if we already have aligned gene sequences from separate loci. To run MrBayes on each locus, we can simply create a tarball of the Nexus files we wish to use (fasta won\'t work at this stage). The command below assumes that we want to use all the files ending with \".nex\" in the current directory, one file per locus:tar czf my-genes.tar.gz *.nexOnce the tarball has been successfully generated, we can then specify this file as input for mb.pl assuming we have a valid MrBayes block located in the file \"bayes.txt\":mb.pl my-genes.tar.gz -m bayes.txt -o my-genes-mbIf we get an error message like mb.pl: Command not found, it might be because mb.pl has no execute permission, or the current directory is not in our \"path\". An easy fix is to run this command instead:perl mb.pl my-genes.tar.gz -m bayes.txt -o my-genes-mbThe resulting output tarball would now be located in my-genes-mb/my-genes.mb.tar, and can be used normally with bucky.pl, that is, like this:bucky.pl my-genes-mb/my-genes.mb.tar -o mygenes-buckyThe output, with the table of concordance factors for all sets of 4 taxa, will be in a file named my-genes.CFs.csv inside a directory named mygenes-bucky. That\'s the file containing the quartet concordance factors to give to SNaQ as input. There is no need to do any of the steps below: they are already done by bucky.pl."
},

{
    "location": "man/ticr_howtogetQuartetCFs/#slurm-pipeline-1",
    "page": "TICR pipeline",
    "title": "slurm pipeline",
    "category": "section",
    "text": "SLURM will parallelize the MrBayes runs across genes.Navigate in some \"working\" directory where you place:\na folder containing all nexus files, which we will call \"nexusfolder\" below\na text file named mb-block.txt with the MrBayes block to be used\nfor all the genes (containing the options for MrBayes: model of sequence evolution, number of generations etc.). If we want a different MrBayes block for different genes, step 2 should be skipped, and we should instead find some other way to put the specific MrBayes block at the end of each nexus file.\nIn the \"working\" directory above, run the julia script paste-mb-block.jl with \"nexusfolder\" as argument, to tell the script where to find all the nexus files:\njulia path/to/paste-mb-block.jl nexusfolder\nThis script will read all the nexus files in the directory nexusfolder, will create a new directory nexusfolder-block, and will create new nexus files (containing the MrBayes block found in file mb-block.txt) as 1.nex, 2.nex, ... in the new directory. A translate.txt file will also be created to map the original gene file names to the new (numbered) file names. If we named our MrBayes block file differently: we can edit the script and modify it to replace mb-block.txt by our actual file name for the MrBayes block.\nModify the submit script mb-slurm-submit.sh, which will parallelize all the individual-gene MrBayes runs with SLURM:\nchange --array to the correct number of genes\nchange --mail-user to the user\'s email (if this is an option for your job scheduler)\nreplace the /workspace/software/bin in PATH=\"/workspace/software/bin:$PATH\" to the path where the mb executable is located or put the whole path in the command: /s/mrbayes-3.2.6-1/bin/mb\nIn slurm, we can then submit the MrBayes array job with:sbatch mb-slurm-submit.shWith this slurm pipeline, the steps below are needed: keep reading."
},

{
    "location": "man/ticr_howtogetQuartetCFs/#To-run-mbsum-on-the-output-of-MrBayes-for-each-gene-1",
    "page": "TICR pipeline",
    "title": "To run mbsum on the output of MrBayes for each gene",
    "category": "section",
    "text": "If we have the output of MrBayes and want to run BUCKy, we must first run mbsum on the output from MrBayes, separately for each gene.For a gene with output tree files named gene1.run1.t, gene1.run2.t and gene1.run3.t, and a desired burnin of 1000 trees per tree file, we do this:mbsum -n 1000 -o gene1.in gene1.run1.t gene1.run2.t gene1.run3.tThis mbsum command will need to be executed for each gene. Then we can continue to the next section to run bucky.Alternatively, we can use the julia script mbsum-t-files.jl, and give it as argument the directory that has the output tree files from MrBayes, to run mbsum for all the genes. mbsum is fast, so there is no attempt to parallelize the various mbsum commands.julia mbsum-t-files.jl mbfolderWarning: a burnin of 2500 generations is hard coded in this script. This can easily be changed: edit this short script near the top of the file, to change the value of burnin."
},

{
    "location": "man/ticr_howtogetQuartetCFs/#To-run-bucky-on-all-4-taxon-sets:-we-already-have-the-mbsum-output-1",
    "page": "TICR pipeline",
    "title": "To run bucky on all 4-taxon sets: we already have the mbsum output",
    "category": "section",
    "text": ""
},

{
    "location": "man/ticr_howtogetQuartetCFs/#no-scheduler-pipeline-2",
    "page": "TICR pipeline",
    "title": "no-scheduler pipeline",
    "category": "section",
    "text": "If we already ran mbsum on the output from MrBayes, for each individual gene, we can simply create a tarball containing all the mbsum output files. So if we had mbsum output in files named gene1.in, gene2.in, ... , gene100.in, we would want to run something similar to the following command to create the tarball:tar czf my-genes-mbsum.tar.gz gene*.inWe can now use this tarball along with the -s option in bucky.pl like this:bucky.pl my-genes-mbsum.tar.gz -s -o mygenes-buckyAgain, if we get an error like bucky.pl: Command not found, we could run insteadperl bucky.pl my-genes-mbsum.tar.gz -s -o mygenes-buckyThe output, with the table of concordance factors for all sets of 4 taxa, will be in a file named my-genes.CFs.csv inside directory mygenes-bucky. That\'s the file containing the quartet concordance factors to give to SNaQ as input."
},

{
    "location": "man/ticr_howtogetQuartetCFs/#slurm-pipeline-2",
    "page": "TICR pipeline",
    "title": "slurm pipeline",
    "category": "section",
    "text": "We want to run bucky on every 4-taxon set. SLURM will parallelize these jobs with the submit script bucky-slurm-submit.sh, which calls the perl script bucky-slurm.pl.The perl script bucky-slurm.pl runs bucky on a single 4-taxon set. It takes the following arguments, which must be modified in the submit script bucky-slurm-submit.sh:name of the folder containing the mbsum output files (one per locus) from previous step. This folder is named mbsum in the submit script: adapt if needed.\noutput name: -o or --out-dir name of the directory to store output files in. This option is not used in the default submit script\nbucky arguments: -a or --alpha for the prior alpha value, and -n or --ngen number of generations. These options are not used either, in the script: the defaults are used then (α=1, 1 million generations)\ninteger for the given quartet, via option -q. The quartet ID is specified by SLURM with its own array ID: $SLURM_ARRAY_TASK_ID.In the submit script that gives instructions to the job scheduler:adapt the name of the $SLURM_ARRAY_TASK_ID variable, which captures the task number in the array of tasks, to your scheduler syntax\nchange --array to the correct number of 4-taxon sets. For example, if there are 15 taxa in the dataset, there are 1365 4-taxon sets. To get this number, if you are unsure, use choose(15,4) in R or binomial(15,4) in Julia, but replace 15 by your actual number of individuals.\nchange --mail-user to the user\'s email (if this is an option for your job scheduler)\nreplace the /workspace/software/bin in PATH=\"/workspace/software/bin:$PATH\" by the path where the bucky executable is located. Also, replace /workspace/claudia/software/TICR/scripts/ by the full path where the bucky-slurm.pl script is located.In slurm, we would submit the BUCKy array job with:sbatch bucky-slurm-submit.shAt the end, the array job will producea .concordance file for every 4-taxon set\na .cf file with the parsed output for that same 4-taxon set, in the format needed for the final CF table.The .cf files can be concatenated to produce the file containing the quartet concordance factors across all 4-taxon sets, to give to SNaQ as input:cat *.cf > CFtable.csvAlternatively, if the list of .cf files is not easily captured by *.cf (because the list is too long for a shell command), the following julia script can do the concatenation. Just copy-paste the commands below within a Julia session, started from the directory that contains the .cf files:files = String[] # empty vector of strings: will contain the .cf file names later\nfor f in filter(x -> endswith(x, \".cf\"), readdir())\n    push!(files,f)\nend\nprintln(\"found $(length(files)) cf files\") # to check how many .cf output files were found\nopen(\"CFtable.csv\",\"w\") do f_out\n  for file in files\n    @show file # to see the .cf file name: comment this out if that\'s too much screen output\n    open(file) do f_in\n        line = read(f_in, String)\n        write(f_out, string(line,\"\\n\"))\n    end # closes \"file\" safely\n  end\nend # closes \"CFtable.csv\" safelyWhen this is done, we will have a file CFtable.csv containing the quartet concordance factors, to give to SNaQ as input :smiley:"
},

{
    "location": "man/snaq_plot/#",
    "page": "Network estimation and display",
    "title": "Network estimation and display",
    "category": "page",
    "text": "using PhyloNetworks\nmkpath(\"../assets/figures\")\nraxmltrees = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"raxmltrees.tre\")\nraxmlCF = readTrees2CF(raxmltrees, writeTab=false, writeSummary=false)\nastralfile = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"astral.tre\")\nastraltree = readMultiTopology(astralfile)[102] # 102th tree = last tree here\nnet0 = readTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"net0.out\"))\nnet1 = readTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"net1.out\"))\nnet2 = readTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"net2.out\"))\nnet3 = readTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"net3.out\"))\nnet0.loglik = 53.53150526187732\nnet1.loglik = 28.31506721890958\nnet2.loglik = 28.31506721890957\nnet3.loglik = 28.315067218909626"
},

{
    "location": "man/snaq_plot/#Getting-a-Network-1",
    "page": "Network estimation and display",
    "title": "Getting a Network",
    "category": "section",
    "text": ""
},

{
    "location": "man/snaq_plot/#Network-Estimation-1",
    "page": "Network estimation and display",
    "title": "Network Estimation",
    "category": "section",
    "text": "SNaQ implements the statistical inference method in Sol&iacute;s-Lemus and An&eacute; 2016. The procedure involves a numerical optimization of branch lengths and inheritance probabilities and a heuristic search in the space of phylogenetic networks.After Input for SNaQ, we can estimate the network using the input data raxmlCF and starting from tree (or network) astraltree. We first impose the constraint of at most 0 hybrid node, that is, we ask for a tree.net0 = snaq!(astraltree,raxmlCF, hmax=0, filename=\"net0\", seed=1234)Part of the screen output shows this:MaxNet is (C,D,((B,A):1.395762055180493,(O,E):0.48453400554506426):10.0);\nwith -loglik 53.53150526187732This parenthetical (extended Newick) description is not very human-friendly, so we plot the tree (more about plotting networks below: Network Visualization ).using PhyloPlots\nusing RCall # hide\nR\"name <- function(x) file.path(\'..\', \'assets\', \'figures\', x)\" # hide\nR\"svg(name(\'snaqplot_net0_1.svg\'), width=4, height=3)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net0, :R);\nR\"dev.off()\"; # hide(Image: net0_1)We can use this tree as a starting point to search for the best network allowing for at most hmax=1 hybrid node (which is the default).net1 = snaq!(net0, raxmlCF, hmax=1, filename=\"net1\", seed=2345)part of screen output:best network and networks with different hybrid/gene flow directions printed to .networks file\nMaxNet is (C,D,((O,(E,#H7:::0.19558838614943078):0.31352437658618976):0.6640664399202987,(B,(A)#H7:::0.8044116138505693):10.0):10.0);\nwith -loglik 28.31506721890958We can visualize the estimated network and its inheritance values γ, which measure the proportion of genes inherited via each parent at a reticulation event (e.g. proportion of genes inherited via gene flow).R\"svg(name(\'snaqplot_net1_1.svg\'), width=4, height=3)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, showGamma=true);\nR\"dev.off()\"; # hide(Image: net1_1)This network has A as a hybrid, 80.4% sister to B, and 19.6% sister to E (which is otherwise sister to O). C & D are sister to each other. We can also check the output files created by snaq!:less(\"net1.err\") # would provide info about errors, if any\nless(\"net1.out\") # main output file with the estimated network from each run\nless(\"net1.networks\") # extra infowhen viewing these result files with less within Julia, use arrows to scroll down and type q to quit viewing the files. The file net1.networks contains a list of networks that are slight modifications of the best (estimated) network net1. The modifications changed the direction of one reticulation at a time, by moving the placement of one hybrid node to another node inside the same cycle. For each modified network, the pseudolikelihood score was calculated.The function name snaq! ends with ! because it modifies the argument raxmlCF by including the expected CF. Type ? then snaq! to get help on that function.The main output file, here net1.out (or snaq.out by default) has the estimated network in parenthetical format, but we can also print it directly to the screen:net1\nwriteTopology(net1)  # writes to screen, full precision for branch lengths and γ\nwriteTopology(net1, round=true, digits=2)\nwriteTopology(net1,di=true) # γ omitted: for dendroscope\nwriteTopology(net1, \"bestnet_h1.tre\") # writes to file: creates or overwrites file\nrm(\"bestnet_h1.tre\") # hideThe option di=true is for the parenthetical format used by Dendroscope (without reticulation heritabilities). Copy this parenthetical description and paste it into Dendroscope, or use the plotting function described below.We can go on and let the network have up to 2 or 3 hybrid nodes:net2 = snaq!(net1,raxmlCF, hmax=2, filename=\"net2\", seed=3456)\nnet3 = snaq!(net0,raxmlCF, hmax=3, filename=\"net3\", seed=4567)and plot them (they are identical and they both have a single reticulation):R\"svg(name(\'snaqplot_net23.svg\'), width=7, height=3)\" # hide\nusing RCall                  # to be able to tweak our plot within R\nR\"layout(matrix(1:2, 1, 2))\" # to get 2 plots into a single figure: 1 row, 2 columns\nR\"par\"(mar=[0,0,1,0])        # for smaller margins\nplot(net2, :R, showGamma=true);\nR\"mtext\"(\"hmax=2\")           # add text annotation: title here\nplot(net3, :R, showGamma=true);\nR\"mtext\"(\"hmax=3\")\nR\"dev.off()\"; # hide(Image: net23)with this screen output for net2 (only 1 hybrid node found):MaxNet is (C,D,((B,(A)#H7:::0.804411606649347):10.0,(O,(#H7:::0.19558839335065303,E):0.3135243143217013):0.664066456871298):10.0);\nwith -loglik 28.31506721890957and this output for net3 (again, only 1 hybrid found):MaxNet is (D,C,((O,(E,#H7:::0.19558839257941849):0.3135243301652981):0.6640664138384673,(B,(A)#H7:::0.8044116074205815):10.0):10.0);\nwith -loglik 28.315067218909626"
},

{
    "location": "man/snaq_plot/#parallel-computations-1",
    "page": "Network estimation and display",
    "title": "parallel computations",
    "category": "section",
    "text": "For network estimation, multiple runs can done in parallel. For example, if your machine has 4 or more processors (or cores), you can tell julia to use 4 processors by starting julia with julia -p 4, or by starting julia the usual way (julia) and then adding processors with:using Distributed\naddprocs(4)If we load a package (using PhyloNetworks) before adding processors, then we need to re-load it again so that all processors have access to it:@everywhere using PhyloNetworksAfter that, running any of the snaq!(...) command will use different cores for different runs, as processors become available. Fewer details are printed to the log file when multiple cores are used in parallel.When running bootsnaq, the analysis of each bootstrap replicate will use multiple cores to parallelize separate runs of that particular bootstrap replicate. You may parallelize things further by running bootsnaq multiple times (on separate machines for instance), each time for a small subset of bootstrap replicates, and with a different seed each time.We may tell julia to add more processors than our machine has, but we will not receive any performance benefits. At any time during the julia session, nworkers() tells us how many worker processors julia has access to.Below is an example of how to use a cluster, to run many independent snaq! searches in parallel on a cluster running the slurm job manager (other managers would require a different, but similar submit file). This example uses 2 files:a julia script file, to do many runs of snaq! in parallel, asking for many cores (default: 10 runs, asking for 10 cores). This julia script can take arguments: the maximum allowed number of hybridizations hmax, and the number of runs (to run 50 runs instead of 10, say).\na submit file, to launch the julia script.First: the example julia script, below, is assumed (by the submit file) to be called runSNaQ.jl. It uses a starting tree that is assumed to be available in a file named astraltree.tre, but that could be modified (to use a network with h=1 to start the search with hmax=2 for instance). It also assumes that the quartet concordance factor data are in file tableCF_speciesNames.csv. Again, this file name should be adjusted. To run this julia script for 50 runs and hmax=3, do julia runSNaQ.jl 3 50.#!/usr/bin/env julia\n\n# file \"runSNaQ.jl\". run in the shell like this in general:\n# julia runSNaQ.jl hvalue nruns\n# example for h=2 and default 10 runs:\n# julia runSNaQ.jl 2\n# or example for h=3 and 50 runs:\n# julia runSNaQ.jl 3 50\n\nlength(ARGS) > 0 ||\n    error(\"need 1 or 2 arguments: # reticulations (h) and # runs (optional, 10 by default)\")\nh = parse(Int, ARGS[1])\nnruns = 10\nif length(ARGS) > 1\n    nruns = parse(Int, ARGS[2])\nend\noutputfile = string(\"net\", h, \"_\", nruns, \"runs\") # example: \"net2_10runs\"\nseed = 1234 + h # change as desired! Best to have it different for different h\n@info \"will run SNaQ with h=$h, # of runs=$nruns, seed=$seed, output will go to: $outputfile\"\n\nusing Distributed\naddprocs(nruns)\n@everywhere using PhyloNetworks\nnet0 = readTopology(\"astraltree.tre\");\nusing CSV\ndf_sp = CSV.read(\"tableCF_speciesNames.csv\", categorical=false);\nd_sp = readTableCF!(df_sp);\nnet = snaq!(net0, d_sp, hmax=h, filename=outputfile, seed=seed, runs=nruns)When julia is called on a script, whatever comes after \"julia scriptname\" is given to julia in an array of values. This array is called ARGS. So if we call a script like this: julia runSNaQ.jl 2 then the script will know the arguments through ARGS, which would contain a single element, \"2\". This first element is just a string, at this stage. We want to use it as a number, so we ask julia to parse the string into an integer.Second: we need a \"submit\" file to ask a job scheduler like slurm to submit our julia script to a cluster. In the submit file below, the first 5 lines set things up for slurm. They are most likely to be specific to your cluster. The main idea here is to use a slurm \"array\" from 0 to 3, to run our julia script multiple times, 4 times actually: from hmax=0 to hmax=3. Each would do 30 runs (and each would be allocated 30 cores in the submit script below). Then log out of the cluster and go for coffee.#!/bin/bash\n#SBATCH -o path/to/slurm/log/file/runsnaq_slurm%a.log\n#SBATCH -J runsnaq\n#SBATCH --array=0-3\n#SBATCH -c 30\n## --array: to run multiple instances of this script,\n##          one for each value in the array.\n##          1 instance = 1 task\n## -J job name\n## -c number of cores (CPUs) per task\n\necho \"slurm task ID = $SLURM_ARRAY_TASK_ID used as hmax\"\necho \"start of SNaQ parallel runs on $(hostname)\"\n# finally: launch the julia script, using Julia executable appropriate for slurm, with full paths:\n/workspace/software/bin/julia --history-file=no -- runSNaQ.jl $SLURM_ARRAY_TASK_ID 30 > net$SLURM_ARRAY_TASK_ID_30runs.screenlog 2>&1\necho \"end of SNaQ run ...\""
},

{
    "location": "man/snaq_plot/#choosing-the-number-of-hybridizations-1",
    "page": "Network estimation and display",
    "title": "choosing the number of hybridizations",
    "category": "section",
    "text": "Each network has a loglik attribute, which is its pseudo deviance: twice the negative log-likelihood up to a constant (the constant is such that the score is 0 if the network fits the data perfectly). The lower the better. We can plot these scores across hybrid values:scores = [net0.loglik, net1.loglik, net2.loglik, net3.loglik]\nR\"svg(name(\'snaqplot_scores_heuristic.svg\'), width=4, height=3)\" # hide\nR\"par\"(mar=[2.5,2.5,.5,.5], mgp=[1.4,.4,0], tck=-0.02);  # hide\nR\"plot\"(scores, type=\"b\", ylab=\"network score\", xlab=\"hmax\", col=\"blue\");\nR\"dev.off()\"; # hide(Image: scores_heuristic)Here the slope heuristic suggests a single hybrid node: the score does not get much better beyond h=1.We made the plot via R above. A more Julian way would use a Julia plotting package such as Gadfly or Plots, like this for instance:using Gadfly\nplot(x=collect(0:3), y=scores, Geom.point, Geom.line)(btw, cool blog about using ggplot within julia)"
},

{
    "location": "man/snaq_plot/#Network-Visualization-1",
    "page": "Network estimation and display",
    "title": "Network Visualization",
    "category": "section",
    "text": "To visualize the estimated network, we can use the companion package PhyloPlots. In the example below, julia creates and sends the plot to R via RCall, so we can tweak the plot in various ways via commands sent to R. To save the plot in a file: we first tell R to create an image file, then we send the plot of the network, then we tell R to wrap up and save its image file.using PhyloPlots # to visualize networks\nusing RCall      # to send additional commands to R like this: R\"...\"\nR\"name = function(x) file.path(\'..\', \'assets\', \'figures\', x)\" # function to create file name in appropriate folder\nR\"svg(name(\'snaqplot_net1_2.svg\'), width=4, height=3)\" # starts image file\nR\"par\"(mar=[0,0,0,0]) # to reduce margins (no margins at all here)\nplot(net1, :R, showGamma=true, showEdgeNumber=true); # network is plotted & sent to file\nR\"dev.off()\"; # wrap up and save image file(Image: net1_2)The plot function has many options, to annotate nodes and edges. In the example above, hybrid edges were annotated with their γ inheritance values (in blue: light blue for the minor edge with γ<0.5, and dark blue for the major edge with γ>0.5), and edges were annotated with their internal numbers.Type ? to switch to the help mode of Julia, then type the name of the function, here plot. Edge colors can be modified, for instance.R\"svg(name(\'snaqplot_net1_3.svg\'), width=4, height=3)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, showEdgeLength=true, minorHybridEdgeColor=\"tan\")\nR\"dev.off()\"; # hide(Image: net1_3)(for a Gadfly-based plot, do using Colors and change the color option to minorHybridEdgeColor=colorant\"tan\")Edge lengths are shown, too. They were estimated in coalescent units: number of generations / effective population size. Some edge lengths are not identifiable, hence not shown.Below is another example, where space was added between the network and the taxon names via the tipOffset option. Also, edge colors were changed, and the nodes numbers are shown (used internally)R\"svg(name(\'snaqplot_net1_4.svg\'), width=4, height=3)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1,:R, tipOffset=0.5, showNodeNumber=true, edgeColor=\"tomato4\",\n     minorHybridEdgeColor=\"skyblue\", majorHybridEdgeColor=\"tan\");\nR\"dev.off()\"; # hide(Image: net1_4)Without the :R argument, a Gadly-based plot will be produced: would open a browser where the plot will appear (unless you use Juno, which would capture and display the plot). To get a pdf version for instance (see Gadfly tutorial for other formats) using Gadfly; p=pdf(...); draw(PDF(\"bestnet_h1.pdf\", 4inch, 4inch),p)."
},

{
    "location": "man/snaq_plot/#Re-rooting-networks-1",
    "page": "Network estimation and display",
    "title": "Re-rooting networks",
    "category": "section",
    "text": "SNaQ infers an unrooted semi-directed network. The direction of hybrid edges can be inferred, but the direction of tree edges cannot be inferred. To obtain a representative visualization, it is best to root the network first, using one or more outgroup. Go to Re-rooting trees and networks for this. If your outgroup conflicts with the direction of reticulations in the estimated network, see section Candidate networks compatible with a known outgroup."
},

{
    "location": "man/snaq_plot/#Candidate-Network-Evaluation-1",
    "page": "Network estimation and display",
    "title": "Candidate Network Evaluation",
    "category": "section",
    "text": "From a set of candidate networks, one might simply need to score of each network to pick the best. Here, the score is the negative log pseudo-likelihood, and the lower the better. See the section to get the score of Candidate Networks."
},

{
    "location": "man/snaq_plot/#SNaQ-error-reporting-1",
    "page": "Network estimation and display",
    "title": "SNaQ error reporting",
    "category": "section",
    "text": "Please report any bugs and errors by opening an issue. The easiest way to provide information on the error is by checking the .err file, which will show the number of runs that failed and the corresponding seed to replicate the run. In case of an error, the .err file might look like: Total errors: 1 in seeds [4545]. This file and any information that will help replicating the error will be immensely helpful to fix the error/bug."
},

{
    "location": "man/dist_reroot/#",
    "page": "Network comparison and manipulation",
    "title": "Network comparison and manipulation",
    "category": "page",
    "text": "using PhyloNetworks\nmkpath(\"../assets/figures\")\nraxmltrees = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"raxmltrees.tre\")\nraxmlCF = readTrees2CF(raxmltrees, writeTab=false, writeSummary=false)\nastralfile = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"astral.tre\")\nastraltree = readMultiTopology(astralfile)[102] # 102th tree = last tree here\nnet0 = readTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"net0.out\"))\nnet1 = readTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"net1.out\"))\nnet0.loglik = 53.53150526187732\nnet1.loglik = 28.31506721890958"
},

{
    "location": "man/dist_reroot/#Comparing-and-manipulating-networks-1",
    "page": "Network comparison and manipulation",
    "title": "Comparing and manipulating networks",
    "category": "section",
    "text": "Examples below follow those in Getting a Network."
},

{
    "location": "man/dist_reroot/#Comparing-networks-/-trees-1",
    "page": "Network comparison and manipulation",
    "title": "Comparing networks / trees",
    "category": "section",
    "text": "Is the SNaQ tree (network with h=0) the same as the ASTRAL tree? We can calculate their Robinson-Foulds distance:hardwiredClusterDistance(astraltree, net0, false)The last option false is to consider topologies as unrooted. The RF distance is 0, so the two unrooted topologies are the same. If we had considered them as rooted, with whatever root they currently have in their internal representation, we would find a difference:hardwiredClusterDistance(astraltree, net0, true)"
},

{
    "location": "man/dist_reroot/#Re-rooting-trees-and-networks-1",
    "page": "Network comparison and manipulation",
    "title": "Re-rooting trees and networks",
    "category": "section",
    "text": "We can re-root our networks with the outgroup, O, and then re-compare the ASTRAL tree and the SNaQ tree as rooted topologies (and find no difference):rootatnode!(astraltree, \"O\")\nrootatnode!(net0, \"O\")\nhardwiredClusterDistance(astraltree, net0, true)using PhyloPlots, RCall\nR\"name <- function(x) file.path(\'..\', \'assets\', \'figures\', x)\" \nR\"svg(name(\'net0_O.svg\'), width=4, height=4)\" \nR\"par\"(mar=[0,0,0,0])\nplot(net0, :R);\nR\"dev.off()\" \nnothing # hide(Image: net0_O)Note that, as in previous chapters, we use the possibilities of RCall to save the plot. We only show this commands once, but they will be run behind the scene each time a plot is called.After trees/networks are rooted with a correct outgroup, their visualization is more meaningful.Networks can be re-rooted at a given node or along a given edge. Get help (type ?) on the functions rootatnode! and rootonedge! for more info. There are examples in the Bootstrap section.If the network is plotted with crossing edges, you may identify ways to rotate the children edges at some nodes to untangle some crossing edges. This can be done using the function rotate!. See an example in the Bootstrap section, or type ? then rotate!."
},

{
    "location": "man/dist_reroot/#What-if-the-root-conflicts-with-the-direction-of-a-reticulation?-1",
    "page": "Network comparison and manipulation",
    "title": "What if the root conflicts with the direction of a reticulation?",
    "category": "section",
    "text": "With 1 hybridization or more, the direction of hybrid edges constrain the position of the root. The root cannot be downstream of hybrid edges. Any hybrid node has to be younger than, or of the same age as both of its parents. So time has to flow \"downwards\" of any hybrid node, and the root cannot be placed \"below\" a hybrid node. An attempt to re-root the network at a position incompatible with hybrid edges will fail, with a RootMismatch error. To show an example, let\'s use the network below. We plotted the edge numbers, because we will want to use them later to place the root.net7taxa = readTopology(\"(C,D,((O,(E,#H7:::0.196):0.314):0.664,(B,((A1,A2))#H7:::0.804):10.0):10.0);\")\nR\"svg(name(\'reroot_net7taxa_1.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net7taxa, :R, showGamma=true, showEdgeNumber=true, tipOffset=0.2);\nR\"dev.off()\"; # hide(Image: reroot net7taxa 1)Let\'s imagine that the A1 and A2 are our outgroups, and we estimated the network above. According to this network, time must flow from the hybrid node towards A1 and A2. So any attempt to reroot the network with A1 as outgroup, or with A2 as outgroup, or with the A clade (on edge 11), will fail with a RootMismatch error:rootatnode!(net7taxa, \"A1\"); # ERROR: RootMismatch: non-leaf node 5 had 0 children. ...\nrootatnode!(net7taxa, \"A2\"); # ERROR: RootMismatch (again)\nrootonedge!(net7taxa, 11);   # ERROR: RootMismatch (again)In this case, however, it is possible to root the network on either parent edge of the hybrid node. These edges have numbers 12 and 5, based on the plot above. We get these 2 rooted versions of the network:R\"svg(name(\'reroot_net7taxa_2.svg\'), width=7, height=4)\"; # hide\nR\"layout(matrix(1:2,1,2))\";\nR\"par\"(mar=[0,0,0.5,0]); # hide\nrootonedge!(net7taxa, 12);\nplot(net7taxa, :R, showGamma=true, tipOffset=0.2);\nR\"mtext\"(\"rooted on hybrid edge 12 (major)\", line=-1)\nrootonedge!(net7taxa, 5);\nplot(net7taxa, :R, showGamma=true, tipOffset=0.2);\nR\"mtext\"(\"rooted on hybrid edge 5 (minor)\", line=-1);\nR\"dev.off()\"; # hide(Image: reroot net7taxa 2)On the second plot, the A clade does not appear to be an outgroup, but this is just because the plot follows the major tree primarily, based the major hybrid edges (those with γ>0.5). We can display the exact same network differently, by changing the γ inheritance values to invert the major/minor consideration of the hybrid edges.net7taxa.edge[5] # just to check that it\'s one of the 2 hybrid edges of interest\nsetGamma!(net7taxa.edge[5], 0.501) # switch major/minor edges\nR\"svg(name(\'reroot_net7taxa_3.svg\'), width=4, height=4)\"; # hide\nR\"layout(matrix(1,1,1))\"; # hide\nR\"par\"(mar=[0,0,0,0]); # hide\nplot(net7taxa, :R, tipOffset=0.2); # not showing gamma values, because we changed them artificially\nR\"mtext\"(\"rooted on hybrid edge 5 (considered major)\", line=-1);\nR\"dev.off()\"; # hide(Image: reroot net7taxa 3)Conclusion, in this particular example: it is possible to re-root the network to a place where the A clade is indeed an outgroup. But it did require some care, and we discovered that there are 2 acceptable rooting options. The first is more plausible, if we think that the species tree is the major tree, meaning that any gene flow or introgression event replaced less than 50% of the genes in the recipient population.In other cases, it may not be possible to re-root the network with a known outgroup. It would be the case if A1 was the only outgroup, and if A2 was an ingroup taxon. In such a case, the outgroup knowledge tells us that our estimated network is wrong. One (or more) reticulation in the network must be incorrect. Its placement might be correct, but then its direction would be incorrect. If the network was estimated via snaq!, check tips about Candidate networks compatible with a known outgroup."
},

{
    "location": "man/dist_reroot/#Extracting-the-major-tree-1",
    "page": "Network comparison and manipulation",
    "title": "Extracting the major tree",
    "category": "section",
    "text": "We can also compare the networks estimated with h=0 (net0) and h=1 (net1):rootatnode!(net1, \"O\"); # the ; suppresses screen output\nhardwiredClusterDistance(net0, net1, true)R\"svg(name(\'net1_O.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, showGamma=true);\nR\"dev.off()\" # hide\nnothing # hide(Image: net1_O)They differ by 2 clusters: that\'s because A is of hybrid descent in net1, not in net0.To beyond this hybrid difference, we can extract the major tree from the network with 1 hybridization, that is, delete the hybrid edge supported by less than 50% of genes. Then we can compare this tree with the ASTRAL/SNaQ tree net0.tree1 = majorTree(net1); # major tree from net1\nhardwiredClusterDistance(net0, tree1, true)They are identical (at distance 0), so here the species network with 1 hybrid node is a refinement of the estimated species tree (this needs not be the case always).Is the SNaQ network with 1 hybrid node the same as the true network, the one that was initially used to simulate the data?(digression on the data: gene trees were simulated under the coalescent along some \"true\" network, then 500 base-pair alignments were simulated along each gene tree with the HKY model, gene trees were estimated from each alignment with RAxML, and these estimated gene trees served as input to both ASTRAL and SNaQ.)The true network is shown below, correctly rooted at the outgroup O, and plotted with branch lengths proportional to their values in coalescence units:truenet = readTopology(\"((((D:0.4,C:0.4):4.8,((A:0.8,B:0.8):2.2)#H1:2.2::0.7):4.0,(#H1:0::0.3,E:3.0):6.2):2.0,O:11.2);\");\nhardwiredClusterDistance(net1, truenet, true)R\"svg(name(\'truenet.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(truenet, :R, useEdgeLength=true, showGamma=true);\nR\"dev.off()\" # hide\nnothing # hide(Image: truenet)Our estimated network is not the same as the true network:the underlying tree is correctly estimated\nthe origin of gene flow is correctly estimated: E\nthe target of gene flow is not correctly estimated: it was the lineage ancestral to (A,B), but it is estimated to be A only.For networks, the distance here is the hardwired cluster distance: the number of hardwired clusters found in one network and not in the other. The hardwired cluster associated with an edge is the set of all tips descendant from that edge, i.e. all tips that inherited at least some genetic material from that edge."
},

{
    "location": "man/dist_reroot/#Displayed-trees-and-subnetworks-1",
    "page": "Network comparison and manipulation",
    "title": "Displayed trees and subnetworks",
    "category": "section",
    "text": "We can extract all trees displayed in a network. These trees are obtained by picking one parent hybrid edge at each hybrid node, and dropping the other parent hybrid edge. We can choose to pick the \"important\" hybrid edges only, with heritability γ at or above a threshold. Below we use a γ threshold of 0, so we get all displayed trees:t = displayedTrees(net1, 0.0) # list of trees displayed in network\nwriteTopology(t[1], round=true)\nwriteTopology(t[2], round=true)If we decide to keep edges with γ>0.2 only, then we are left with a single tree in the list (the major tree). This is because our example has 1 hybrid node with minor γ=0.196.t = displayedTrees(net1, 0.2)We can also delete all \"non-important\" reticulations, those with a minor heritability γ below some threshold. The function below changes our network net1, as indicated by its name ending with a !.deleteHybridThreshold!(net1, 0.1)Nothing happened to our network: because its γ is above 0.1. But if we set the threshold to 0.3, then our reticulation disappears:deleteHybridThreshold!(net1, 0.3)See also function displayedNetworkAt! to get the network with a single reticulation of interest, and eliminate all other reticulations."
},

{
    "location": "man/fixednetworkoptim/#",
    "page": "Candidate Networks",
    "title": "Candidate Networks",
    "category": "page",
    "text": ""
},

{
    "location": "man/fixednetworkoptim/#Candidate-Networks-1",
    "page": "Candidate Networks",
    "title": "Candidate Networks",
    "category": "section",
    "text": ""
},

{
    "location": "man/fixednetworkoptim/#Optimizing-parameters-for-a-given-network-1",
    "page": "Candidate Networks",
    "title": "Optimizing parameters for a given network",
    "category": "section",
    "text": "For a given network topology, we can optimize the branch lengths and inheritance probabilities (γ) with the pseudolikelihood. This is useful if we have a few candidate networks to compare. Each network can be optimized individually, and the network with the best pseudolikelihood can be chosen.The score being optimized is the pseudo-deviance, i.e. the negative log pseudo-likelihood up to an additive constant (the lower the better).Following our example in Getting a Network, we can optimize parameters on the true network (the one originally used to simulate the data):using PhyloNetworks\nusing Logging # to suppress info messages below\nbaselogger = global_logger()\nmkpath(\"../assets/figures\")\nraxmltrees = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"raxmltrees.tre\")\nraxmlCF = readTrees2CF(raxmltrees, writeTab=false, writeSummary=false)truenet = readTopology(\"((((D:0.4,C:0.4):4.8,((A:0.8,B:0.8):2.2)#H1:2.2::0.7):4.0,(#H1:0::0.3,E:3.0):6.2):2.0,O:11.2);\");\nnet1alt = topologyMaxQPseudolik!(truenet, raxmlCF);\nwriteTopology(net1alt, round=true)\nnet1alt.loglik # pseudo deviance, actuallyusing PhyloPlots, RCall\nR\"name <- function(x) file.path(\'..\', \'assets\', \'figures\', x)\" \nR\"svg(name(\'truenet_opt.svg\'), width=4, height=4)\" \nR\"par\"(mar=[0,0,0,0])\nplot(net1alt, :R, showGamma=true);\nR\"dev.off()\" \nnothing # hide(Image: truenet_opt)We get a score of 29.941, which is comparable to the score of the SNaQ network (net1: 28.315), especially compared to the score of the best tree (net0: 53.532). This begs the question: is the true network within the \"range\" of uncertainty? We can run a Bootstrap analysis to measure uncertainty in our network inference.For a more thorough optimization, we may increase the requirements before the search stops (but the optimization will take longer). It makes no difference on this small data set.net1par = topologyMaxQPseudolik!(truenet, raxmlCF, ftolRel=1e-10, xtolAbs=1e-10)\nnet1par.loglik"
},

{
    "location": "man/fixednetworkoptim/#Network-Score-with-no-optimization-1",
    "page": "Candidate Networks",
    "title": "Network Score with no optimization",
    "category": "section",
    "text": "For a network with given branch lengths and γ heritabilies, we can compute the pseudolikelihood with:topologyQPseudolik!(truenet,raxmlCF);\ntruenet.loglikThis function is not maximizing the pseudolikelihood, it is simply computing the pseudolikelihood (or deviance) for the given branch lengths and probabilities of inheritance. At the moment, both of these functions require that the given network is of level 1 (cycles don\'t overlap)."
},

{
    "location": "man/fixednetworkoptim/#Candidate-networks-compatible-with-a-known-outgroup-1",
    "page": "Candidate Networks",
    "title": "Candidate networks compatible with a known outgroup",
    "category": "section",
    "text": "If the network was estimated via snaq!, it might turn out to be impossible to root our estimated network with a known outgroup (see section What if the root conflicts with the direction of a reticulation?.) At this time, snaq! does not impose any rooting constraint on the network: the search for the lowest score considers all level-1 networks, including those that are incompatible with a known outgroup. (The monophyly of outgroups is not imposed either, like in many other methods.)If the estimated network cannot be rooted with the known outgroup, we can check the .networks output file. It has a list of networks that are slight modifications of the best network, where the modifications changed the direction of one reticulation at a time. For each modified network, the score was calculated. So if we find in this list a modified network that has a score close to that of the best network, and that can be re-rooted with our known root position, then this modified network is a better candidate than the network with the best score.Below is what the net1.networks file looks like, after performing the analysis in the section Network Estimation. Scroll to the right to see the scores.(C,D,((O,(E,#H7:::0.19558838614943078):0.31352437658618976):0.6640664399202987,(B,(A)#H7:::0.8044116138505693):10.0):10.0);, with -loglik 28.31506721890958 (best network found, remaining sorted by log-pseudolik; the smaller, the better)\n(C,D,((O,(E)#H7:::0.8150784689693145):0.9336405757682176,(B,(A,#H7:::0.18492153103068557):0.25386142779877724):1.8758156446611114):10.0);, with -loglik 31.535560380783814\n(B,#H7:9.90999345612101::0.2555404440833535,(A,(E,(O,((C,D):10.0)#H7:0.3419231810962026::0.7444595559166465):0.19994859441332047):2.5014911511063644):0.7957621793330066);, with -loglik 56.64548310161462\n(C,D,((O,(E,((B)#H7:::0.7957543284159452,A):4.786202415937916):0.004527712280136759):1.7952610454570868,#H7:::0.20424567158405482):10.0);, with -loglik 67.17775727492258\n(C,D,(#H7:::0.32947301811471164,(B,(A,(E,(O)#H7:::0.6705269818852884):1.371799259141243):0.0):6.397073999864152):7.677245926003807);, with -loglik 199.11401961057143We can read this file and look at its list of networks like this:file = \"net1.networks\";\n# or use the example file available with the package:\nfile = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"net1.networks\");\nnetlist = readMultiTopology(file) # read the full list of networks in that fileNext, we would like to extract the network scores from the file. Below is a one-liner to do this (we make Julia send a sed command to the shell –sorry, Mac or Linux for this.)scoresInString = read(`sed -E \'s/.+with -loglik ([0-9]+.[0-9]+).+/\\1/\' $file`, String)\nscores = parse.(Float64, split(scoresInString))\n# next: update the \"loglik\" of each network with the score read from the file\nfor i in eachindex(netlist)\n   netlist[i].loglik = scores[i]\n   println(\"net $i in the list: score = \",scores[i])\nendThe first network in the list is the best network returned by snaq!. We see that the second network has a score that\'s not too far, but the other networks have worse scores. The best network and its best modification (second network in the list) are shown below. We chose to show edge numbers, to use them later to re-root the networks.R\"svg(name(\'fixednetworkoptim_othernets1.svg\'), width=7, height=4)\" # hide\nR\"layout(matrix(1:2,1,2))\"; # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(netlist[1], :R, showGamma=true, showEdgeNumber=true, tipOffset=0.1);\nR\"mtext\"(\"best net, score=28.3\", line=-1);\nplot(netlist[2], :R, showGamma=true, showEdgeNumber=true, tipOffset=0.1);\nR\"mtext\"(\"direction modified, score=31.5\", line=-1);\nR\"dev.off()\"; # hide(Image: othernets before reroot)Now imagine that our outgroup is taxon A.best network: we would get a \"RootMismatch\" error if we tried to set the root on the external edge 9 to A, with rootatnode!(netlist[1], \"A\") (see section What if the root conflicts with the direction of a reticulation?). But we could root the best network on the major parent edge to A, edge 10 (rooted network on the left below).\nFor the second best network in our list, there are 2 ways to root it with A: on the external edge 8 to A (top right), or on its parent edge 10 (bottom right). These 2 options give quite different rooted versions of the network, one of which requires the existence of an unsampled taxon, sister to BOECD, that would have contributed to introgression into an ancestor of E. The second rooted version says that an ancestor of (or sister to) A contributed to the introgression into the ancestor of E. A is an outgroup in both cases, but the second case is more parsimonious, in the sense that it does not require the existence of an unsampled taxon.R\"svg(name(\'fixednetworkoptim_othernets2.svg\'), width=7, height=7)\" # hide\nR\"layout(matrix(c(1,4,2,3),2,2))\"; # hide\nR\"par\"(mar=[0,0,0.5,0]) # hide\nrootonedge!(netlist[1], 10); # root best net to make A outgroup\nrotate!(netlist[1], -4); # to \'un-cross\' edges\nrotate!(netlist[1], -6);\nplot(netlist[1], :R, showGamma=true, tipOffset=0.1);\nR\"mtext\"(\"best net, score=28.3\", line=-1);\nglobal_logger(NullLogger()); # hide\nrootatnode!(netlist[2], \"A\"); # net with modified direction: first way to make A outgroup\nglobal_logger(baselogger);   # hide\nplot(netlist[2], :R, showGamma=true, tipOffset=0.1);\nR\"mtext\"(\"second best in list, score=31.5\\nrequires unsampled population\", line=-2);\nrootonedge!(netlist[2], 10) # net with modified direction: second way to make A outgroup\nplot(netlist[2], :R, showGamma=true, tipOffset=0.1);\nR\"mtext\"(\"second best in list, score=31.5\\ndifferent root position\", line=-2);\nR\"dev.off()\"; # hide(Image: othernets after reroot)"
},

{
    "location": "man/expectedCFs/#",
    "page": "Extract Expected CFs",
    "title": "Extract Expected CFs",
    "category": "page",
    "text": "using PhyloNetworks\nmkpath(\"../assets/figures\")\nraxmltrees = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"raxmltrees.tre\")\nraxmlCF = readTrees2CF(raxmltrees, writeTab=false, writeSummary=false)\ntruenet = readTopology(\"((((D:0.4,C:0.4):4.8,((A:0.8,B:0.8):2.2)#H1:2.2::0.7):4.0,(#H1:0::0.3,E:3.0):6.2):2.0,O:11.2);\");"
},

{
    "location": "man/expectedCFs/#Extract-Expected-CFs-1",
    "page": "Extract Expected CFs",
    "title": "Extract Expected CFs",
    "category": "section",
    "text": "A good way to visualize the \"goodness-of-fit\" of a given estimated network to the data is to plot the observed CF versus the expected CF. If the network is a good fit, then the dots in the plot will be close to the diagonal (x=y line). The following function will create a dataframe with the observed and expected CFs, which are all saved in the DataCF object after running snaq:topologyMaxQPseudolik!(truenet, raxmlCF);\ndf_wide = fittedQuartetCF(raxmlCF) # same as fittedQuartetCF(raxmlCF, :wide)\ndf_long = fittedQuartetCF(raxmlCF, :long)It is important to have run snaq!, topologyQPseudolik! or topologyMaxQPseudolik! before making these tables, or the result would be meaningless. These functions update the fitted concordance factors (those expected under the network) inside the DataCF object raxmlCF.Here is one way to plot them, via R again, and using the R package ggplot2.using RCall\nobsCF = df_long[:obsCF]; expCF = df_long[:expCF]; # hide\nR\"name <- function(x) file.path(\'..\', \'assets\', \'figures\', x)\"; # hide\nR\"svg(name(\'expCFs_obsvsfitted.svg\'), width=5, height=4)\"; # hide\nR\"par\"(mar=[2.5,2.6,.5,.5], mgp=[1.5,.4,0], tck=-0.01, las=1, pty=\"s\"); # hide\nR\"plot(0:1, 0:1, type=\'l\', bty=\'L\', lwd=0.3, col=\'#008080\', xlab=\'quartet CF observed in gene trees\', ylab=\'quartet CF expected from network\')\"; # hide\nR\"set.seed\"(1234); # hide\nR\"points(jitter($obsCF,amount=0.005),jitter($expCF,amount=0.005),col=\'#008080\',bg=\'#00808090\',pch=21)\"; # hide\nR\"dev.off()\"; # hideTo install ggplot2 if not installed already, do: R\"install.packages(\'ggplot2\', dep=TRUE)\"@rlibrary ggplot2\nggplot(df_long, aes(x=:obsCF,y=:expCF)) + theme_classic() +\n    geom_segment(x=0,y=0,xend=1,yend=1, color=\"#008080\", size=0.3) + # diagonal line\n    geom_point(alpha=0.5, color=\"#008080\", position=position_jitter(width=0.005, height=0.005)) +\n    ylab(\"quartet CF expected from network\") + xlab(\"quartet CF observed in gene trees\") + coord_equal(ratio=1);\n# if needed, save with:\nggsave(\"expCFs_obsvsfitted.svg\", scale=1, width=6, height=5);(Image: obsvsfitted)Many points are overlapping, so they were \"jittered\" a little to see them all better. There are always many points overlapping on the bottom-left corner: concordance factors of 0.0 for quartet resolutions not observed, and not expected.   To export the table of quartet CFs and explore the fit of the network with other tools:using CSV\nCSV.write(\"fittedCF.csv\", df_long)alternative code to get a similar plot with Gadfly:using Gadfly\nplot(layer(df_long, Geom.point, x=\"obsCF\", y=\"expCF\"),\n     layer(x=0:1,y=0:1, Geom.line), # diagonal line\n     Guide.xlabel(\"CF observed in gene trees\"), Guide.ylabel(\"CF expected from network\"))We could highlight quartets that include taxon A, say, if we suspect that it is an unrecognized hybrid. Many points are overlapping, like before, so they are again \"jittered\" a bit.using DataFrames\ndf_long[:has_A] = \"no\" # add a column to our data, to indicate which 4-taxon sets have A or not\nfor r in eachrow(df_long)\n    if \"A\" ∈ [r[:tx1], r[:tx2], r[:tx3], r[:tx4]]\n       r[:has_A]=\"yes\"\n    end\nend\nhas_A = df_long[:has_A]; # hide\nnq = length(has_A) # hide\nR\"colA=rep(\'#008080\',$nq); bgA=rep(\'#00808090\',$nq);\"; # hide\nR\"colA[$has_A==\'yes\']=\'#F8766D\'; bgA[$has_A==\'yes\']=\'#F8766D90\'\"; # hide\nR\"svg(name(\'expCFs_obsvsfitted_A.svg\'), width=5, height=4)\"; # hide\nR\"par\"(mar=[2.5,2.6,.5,.5], mgp=[1.5,.4,0], tck=-0.01, las=1, pty=\"s\"); # hide\nR\"plot(0:1, 0:1, type=\'l\', bty=\'L\', lwd=0.3, col=\'black\', xlab=\'quartet CF observed in gene trees\', ylab=\'quartet CF expected from network\')\"; # hide\nR\"set.seed\"(2345) # hide\nR\"points(jitter($obsCF,amount=0.005),jitter($expCF,amount=0.005),col=colA,bg=bgA,pch=21)\"; # hide\nR\"legend(x=0.7,y=0.3,pch=21,col=c(\'#008080\',\'#F8766D\'),legend=c(\'no\',\'yes\'),title=\'has A?\', bty=\'n\',bg=c(\'#00808090\',\'#F8766D90\'))\"; # hide\nR\"dev.off()\"; # hide\nfirst(df_long, 7) # first 7 rowsggplot(df_long, aes(x=:obsCF, y=:expCF, color=:has_A)) + theme_classic() +\n    geom_segment(x=0,y=0,xend=1,yend=1, color=\"black\", size=0.3) + # diagonal line\n    geom_point(alpha=0.5, position=position_jitter(width=0.005, height=0.005)) +\n    ylab(\"quartet CF expected from network\") + xlab(\"quartet CF observed in gene trees\") + coord_equal(ratio=1);\n# can be saved:\nggsave(\"expCFs_obsvsfitted_A.svg\", width=6, height=5);(Image: obsvsfitted A present or not)"
},

{
    "location": "man/bootstrap/#",
    "page": "Bootstrap",
    "title": "Bootstrap",
    "category": "page",
    "text": "# using Gadfly\nusing PhyloNetworks\nmkpath(\"../assets/figures\")"
},

{
    "location": "man/bootstrap/#Bootstrap-1",
    "page": "Bootstrap",
    "title": "Bootstrap",
    "category": "section",
    "text": ""
},

{
    "location": "man/bootstrap/#Running-a-bootstrap-analysis-1",
    "page": "Bootstrap",
    "title": "Running a bootstrap analysis",
    "category": "section",
    "text": "There are two ways to do a bootstrap analysis.From quartet CFs with credibility intervals, such as if we used BUCKy. The TICR pipeline outputs a CF table with extra columns for credibility intervals. We could then read that table and get bootstrap networks like this, and tweak options as needed:using CSV\ndf = CSV.read(\"tableCF_withCI.csv\")\nbootnet = bootsnaq(startnetwork, df, hmax=1, filename=\"bootstrap\")Alternatively, we can use bootstrap gene trees: one file of bootstrap trees per gene. Here, the input is a text file that lists all the bootstrap files (one per gene). We demonstrate this option here.The names of all our bootstrap files are listed in \"BSlistfiles\". (ASTRAL can use the same file to do its own bootstrap, see the wiki for more details). The function readBootstrapTrees can read this list of file names, then read each bootstrap file to get the bootstrap sample for each gene. We can use them to sample input gene trees at random, one per gene, and estimate a network from them. We ask the bootsnaq function to repeat this resampling of bootstrap gene trees several times.bootTrees = readBootstrapTrees(\"BSlistfiles\");\nbootnet = bootsnaq(net0, bootTrees, hmax=1, nrep=10, runs=3,\n                   filename=\"bootsnaq\", seed=4321)The bootstrap networks are saved in the boostrap.out file, so they can be read in a new session with bootnet = readMultiTopology(\"bootsnap.out\"). To save the bootstrap networks to a different file (perhaps after having re-rooted them with an outgroup), we could do this: writeMultiTopology(bootnet, \"bootstrapNets.tre\").The example above asks for 10 bootstrap replicates, which is definitely too few, to make the example run faster. We might also increase the number of optimization runs (runs) done for each bootstrap replicate. This bootstrap was run with the default 10 runs per replicate, and 100 bootstrap replicates, and the 100 bootstrap networks come with the package:bootnet = readMultiTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"bootsnaq.out\"));\nlength(bootnet)If we used a specified list of quartets on the original data, we should use that same list for the bootstrap analysis through the option quartetfile."
},

{
    "location": "man/bootstrap/#support-for-tree-edges-1",
    "page": "Bootstrap",
    "title": "support for tree edges",
    "category": "section",
    "text": "Now that we have 100 bootstrap networks, we need to summarize what they have in common (highly supported features) and what they don\'t (areas of uncertainty).Before summarizing these bootstrap networks on the best network, it is best to re-read this network to get a reproducible internal numbering of its nodes and edges, used later for mapping bootstrap support to edges.net1 = readTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"net1.out\"))It turns out that the direction of gene flow is quite uncertain in this example (see below) with a wrong direction inferred sometimes, so we re-root our best network net1 to the base of O,E, for the figures to be less confusing later.rootonedge!(net1, 7)using PhyloPlots, RCall\nR\"name <- function(x) file.path(\'..\', \'assets\', \'figures\', x)\" # hide\nR\"svg(name(\'net1_rotate1_1.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, showEdgeNumber=true); # edge 7 leads to O+E\nR\"dev.off()\" # hide\nrootonedge!(net1, 7) # makes (O,E) outgroup clade\nR\"svg(name(\'net1_rotate1_2.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, showNodeNumber=true);\nR\"dev.off()\" # hide\nnothing # hide(Image: net1_rotate1 1) (Image: net1_rotate1 2)Edges cross: but rotating at node -6 should remove this crossing of edgesrotate!(net1, -6)R\"svg(name(\'net1_rotate2.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, showGamma=true);\nR\"dev.off()\" # hide\nnothing # hide(Image: net1_rotate2)We can now summarize our bootstrap networks. The functions treeEdgesBootstrap and hybridBootstrapSupport read all bootstrap networks and map the edges / nodes onto a reference network: here net1.BSe_tree, tree1 = treeEdgesBootstrap(bootnet,net1);This calculates the major tree tree1 displayed in net1, that is, the tree obtained by following the major parent (γ>0.5) of each hybrid node. This tree can be visualized like this, with edge numbers shown for later use.R\"svg(name(\'major_tree.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(tree1, :R, showEdgeNumber=true);\nR\"dev.off()\" # hide\nnothing # hide(Image: major_tree)Next, we can look at bootstrap table BSe_tree, which has one row for each tree edge in net1. One column contains the edge number (same as shown in the plot) and another column contains the edge bootstrap support: the proportion of bootstrap replicates in which this edge was found in the major tree of the inferred network. We can see the full bootstrap table and see which tree edges have bootstrap support lower than 100% (none here) withusing DataFrames # for showall() below\nshow(BSe_tree, allrows=true, allcols=true)\nBSe_tree[BSe_tree[:proportion] .< 100.0, :]Finally, we can map the bootstrap proportions onto the network or its main tree by passing the bootstrap table to the edgeLabel option of plot:R\"svg(name(\'boot_tree_net_1.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(tree1, :R, edgeLabel=BSe_tree);\nR\"dev.off()\" # hide\nR\"svg(name(\'boot_tree_net_2.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, edgeLabel=BSe_tree);\nR\"dev.off()\" # hide\nnothing # hide(Image: boot_tree_net 1) (Image: boot_tree_net 2)(Here, it is important that the numbers assigned to edges when building the boostrap table –those in net1 at the time– correspond to the current edge numbers in tree1 and net1. That was the purpose of reading the network from the output file of snaq! earlier, for consistency across different Julia sessions.)If we wanted to plot only certain bootstrap values, like those below 100% (1.0), we could do this:plot(net1, :R, edgeLabel=BSe_tree[BSe_tree[:proportion] .< 100.0, :]);"
},

{
    "location": "man/bootstrap/#support-for-hybrid-edges-and-hybrid-nodes-1",
    "page": "Bootstrap",
    "title": "support for hybrid edges and hybrid nodes",
    "category": "section",
    "text": "Summarizing the placement of reticulations is not standard. The function hybridBootstrapSupport attempts to do so. The descendants of a given hybrid node form the \"recipient\" or \"hybrid\" clade, and is obtained after removing all other reticulations. If reticulation is due to gene flow or introgression, the minor hybrid edge (with γ<0.5) represents this event. The descendants of the lineage from which gene flow originated is then a second \"sister\" of the hybrid clade. Because of the reticulation event, the hybrid clade has 2 sister clades, not 1: the major sister (through the major hybrid edge with γ>0.5) and the minor sister (through the minor hybrid edge with γ<0.5). Note that the network says nothing about the process: its shows the relationships only. We can calculate the frequency that each clade is a hybrid clade, or a major or minor sister for some other hybrid, in the bootstrap networks:BSn, BSe, BSc, BSgam, BSedgenum = hybridBootstrapSupport(bootnet, net1);Let\'s look at the results. We can list all the clades and the percentage of bootstrap networks (bootstrap support) in which each clade is a hybrid or sister to a hybrid:BSnIf a clade contains a single taxon, it is listed with its taxon name. The clade found in the best network is listed with its tag, starting with H (e.g. \"H7\"). The name of other clades start with \"c_\" followed by their number in the best network, if they do appear in the best network. The node numbers, as used internally in the best network, are listed in a separate column. They can be used later to display the bootstrap support values onto the network. Various columns give the bootstrap support that each clade is a hybrid, or a (major/minor) sister to a hybrid. The last column gives the bootstrap support for the full relationship in the best network: same hybrid with same two sisters. These bootstrap values are associated with nodes (or possibly, their parent edges).To see what is the clade named \"H7\", for instance:BSc # this might be too big\nshow(BSc, allrows=true, allcols=true)\nBSc[:taxa][BSc[:H7]]We can also get bootstrap values associated with edges, to describe the support that a given hybrid clade has a given sister clade.BSeHere, each row describes a pair of 2 clades: one being the hybrid, the other being its sister, connected by a hybrid edge. The first rows corresponds to hybrid edges in the best network. Other rows correspond to edges seen in bootstrap networks but not in the reference network.BSedgenumlists all the hybrid edges in the best network, two for each hybrid node: the major parent edge and then the minor parent edge. In our case, there is only one reticulation, so only 2 hybrid edges.We can plot the bootstrap values of the 2 hybrid edges in the best network:R\"svg(name(\'boot_net_net.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, edgeLabel=BSe[[:edge,:BS_hybrid_edge]]);\nR\"dev.off()\" # hide\nnothing # hide(Image: boot_net_net)This is showing the bootstrap support each hybrid edge: percentage of bootstrap trees with an edge from the same sister clade to the same hybrid clade. Alternatively, we could show the bootstrap support for the full reticulation relationships in the network, one at each hybrid node (support for same hybrid with same sister clades). Here, we find that A received gene flow from E (and is sister to B otherwise) in just 32% of bootstrap networks. In another 1% bootstrap, A received gene flow from another source.R\"svg(name(\'boot_net_ret.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, nodeLabel=BSn[[:hybridnode,:BS_hybrid_samesisters]]);\nR\"dev.off()\" # hide\nnothing # hide(Image: boot_net_ret)Below is example code to place tree edge support and hybrid edge support on the same plot.tmp = BSe[!isna(BSe[:edge]),[:edge,:BS_hybrid_edge]]\nrename!(tmp, :BS_hybrid_edge, :proportion)\nrename!(tmp, :edge, :edgeNumber)\ntmp = vcat(BSe_tree, tmp)\nplot(net1, edgeLabel=tmp, nodeLabel=BSn[[:hybridnode,:BS_hybrid_samesisters]])"
},

{
    "location": "man/bootstrap/#Who-are-the-hybrids-in-bootstrap-networks?-1",
    "page": "Bootstrap",
    "title": "Who are the hybrids in bootstrap networks?",
    "category": "section",
    "text": "On a different plot, we can show the bootstrap support for hybrid clades, first mapped to each node with positive hybrid support, and then mapped on the parent edge of these nodes. A is estimated as a hybrid in only 33% of our bootstrap networks. In another 44%, it is the lineage to (E,O) that is estimated as being of hybrid origin.R\"svg(name(\'boot_net_hyb_1.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, nodeLabel=BSn[BSn[:BS_hybrid].>0, [:hybridnode,:BS_hybrid]]);\nR\"dev.off()\" # hide\nnothing # hide\nR\"svg(name(\'boot_net_hyb_2.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, edgeLabel=BSn[BSn[:BS_hybrid].>0, [:edge,:BS_hybrid]]);\nR\"dev.off()\" # hide\nnothing # hide(Image: boot_net_hyb 1) (Image: boot_net_hyb 2)"
},

{
    "location": "man/bootstrap/#Where-is-the-origin-of-gene-flow?-1",
    "page": "Bootstrap",
    "title": "Where is the origin of gene flow?",
    "category": "section",
    "text": "We can plot the support for the various placements of the gene flow origin (minor sister clade), first mapped to each node with positive support for being the origin of gene flow, and then mapped along the parent edge of these nodes. We filtered clades to show those with sister support > 5%:R\"svg(name(\'boot_net_clade_1.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, nodeLabel=BSn[BSn[:BS_minor_sister].>5, [:node,:BS_minor_sister]]);\nR\"dev.off()\" # hide\nnothing # hide\nR\"svg(name(\'boot_net_clade_2.svg\'), width=4, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(net1, :R, edgeLabel=BSn[BSn[:BS_minor_sister].>5, [:edge,:BS_minor_sister]]);\nR\"dev.off()\" # hide\nnothing # hide(Image: boot_net_clade 1) (Image: boot_net_clade 2)In our best network, the lineage to E is estimated as the origin of gene flow, but this is recovered in only 41% of our bootstrap networks. In another 49%, it is the lineage to A that is estimated as the origin of gene flow: so gene flow is estimated in the opposite direction. In this example, there is support for gene flow between (A,B) and (E,O), but there is much uncertainty about its exact placement and about its direction.Mapping the support for major sister clades might be interesting too:plot(net1, nodeLabel=BSn[BSn[:BS_major_sister].>5, [:node,:BS_major_sister]])The estimated heritability γ on hybrid edges in the reference network, when present in a bootstrap network, was also extracted:BSgam[1:3,:] # first 3 rows onlyγ=0 values are for bootstrap replicates that did not have the edge in their network. Basic summaries on γ values for a given edge, say the minor parent, could be obtained like this:minimum(BSgam[:,2])\nmaximum(BSgam[:,2])\nusing Statistics # for functions like mean and std (standard deviation)\nmean(BSgam[:,2])\nstd(BSgam[:,2])"
},

{
    "location": "man/multiplealleles/#",
    "page": "Multiple Alleles",
    "title": "Multiple Alleles",
    "category": "page",
    "text": ""
},

{
    "location": "man/multiplealleles/#Multiple-alleles-per-species-1",
    "page": "Multiple Alleles",
    "title": "Multiple alleles per species",
    "category": "section",
    "text": "The default setting for SNaQ considers that each allele in a gene tree corresponds to a taxon (a tip) in the network. If instead each allele/individual can be mapped confidently to a species, and if only the species-level network needs to be estimated, then the following functions should be used:df_sp = mapAllelesCFtable(mappingFile, CFtable_ind);\nd_sp = readTableCF!(df_sp);where the mapping file can be a text (or csv) file with two columns named allele and species, mapping each allele name to a species name. The CF table CFtable_ind should be a table of concordance factors at the level of individuals. In other words, it should list CFs using one row for each set of 4 alleles/individuals. The first command creates a new data frame df_sp of quartet concordance factors at the species level: with the allele names replaced by the appropriate species names.The second command modifies this data frame df_sp by deleting rows that are uninformative about between-species relationships, such as rows corresponding to 4 individuals from the same species. The output d_sp of this second command is an object of type DataCF at the species level, which can be used as input for networks estimation with snaq!. But before, it is safe to save the concordance factor of quartets of species, which can be calculated by averaging the CFs of quartets of individuals from the associated species:df_sp = writeTableCF(d_sp) # data frame, quartet CFs averaged across individuals of same species\nCSV.write(\"CFtable_species.csv\", df_sp) # save to fileSome quartets have the same species repeated twice, representing cases when 2 of the 4 individuals came from the same species. These quartets, with repeated species, are informative about the population size of extant populations, i.e. about the lengths of external branches in coalescent units.now we can run snaq:net = snaq!(T_sp, d_sp);where T_sp should be a starting topology with one tip per species, labelled with the same species names as the names used in the mapping file.If snaq! takes too long that way, we can try a less ambitious estimation that does not estimate the external branch lengths, that is, without using quartets that have 2 individuals from the same species. To do so, we can use the quartet concordance factors at the species level, but filter out the quartets with one (or more) species repeated:df_sp = writeTableCF(d_sp) # some quartets have the same species twice\nfunction hasrep(row) # see if a row (4-taxon set) has a species name ending with \"__2\": repeated species\n  occursin(r\"__2$\", row[:tx1]) || occursin(r\"__2$\", row[:tx2]) ||\n    occursin(r\"__2$\", row[:tx3]) || occursin(r\"__2$\", row[:tx4])\nend\ndf_sp_reduced = filter(!hasrep, df_sp) # removes rows with repeated species\ndf_sp_reduced # should have fewer rows than df_sp\nCSV.write(\"CFtable_species_norep.csv\", df_sp_reduced) # to save to file\nd_sp_reduced = readTableCF(df_sp_reduced) # DataCF object, for input to snaq!and now we can run snaq! on the reduced set of quartets without repeats, which should be faster:net = snaq!(T_sp, d_sp_reduced);Warnings:This feature has not been fully tested\nThis procedure is slow and should be made faster, when working with gene trees as input.\nIf input data are gene trees, the CF table at the individual level should be created first, like this:\nCFtable_ind = readTrees2CF(gene tree file);\nbefore applying the two commands above. At this time, however, this procedure requires that all alleles from the same individual are given the same name (the individual\'s \'name\') across all genes for which that individual was sequenced."
},

{
    "location": "man/trait_tree/#",
    "page": "Continuous Trait Evolution",
    "title": "Continuous Trait Evolution",
    "category": "page",
    "text": "using PhyloNetworks\nmkpath(\"../assets/figures\")"
},

{
    "location": "man/trait_tree/#Continuous-Trait-Evolution-1",
    "page": "Continuous Trait Evolution",
    "title": "Continuous Trait Evolution",
    "category": "section",
    "text": "Once the network is inferred, we can take these species relationships into account when studying the distribution of quantitative traits measured for extant species. This is the goal of phylogenetic comparative methods (PCM). More details can be found on the developments below in Bastide et al. 2018 [B18]We assume a fixed network, correctly rooted, with branch lengths proportional to calendar time. Here, we consider the true network that was used in the previous sections, and which is ultrametric (all the tips are contemporary).truenet = readTopology(\"((((D:0.4,C:0.4):4.8,((A:0.8,B:0.8):2.2)#H1:2.2::0.7):4.0,(#H1:0::0.3,E:3.0):6.2):2.0,O:11.2);\");As previously, we can plot the network thanks to the RCall package. The name function is only instrumental here, to ensure that the figure is saved in the correct directory when the documentation is built. We only show the commands to actually save the plot in this first example for the interested reader, but we will hide those in the rest of the chapter, for the sake of clarity.using PhyloPlots, RCall\nR\"name <- function(x) file.path(\'..\', \'assets\', \'figures\', x)\"\nR\"svg(name(\'truenet.svg\'), width=8, height=4)\"\nR\"par\"(mar=[0,0,0,0])\nplot(truenet, :R, useEdgeLength=true, showGamma=true);\nR\"dev.off()\"\nnothing # hide(Image: truenet)"
},

{
    "location": "man/trait_tree/#Model-and-Variance-Matrix-1",
    "page": "Continuous Trait Evolution",
    "title": "Model and Variance Matrix",
    "category": "section",
    "text": "Assuming that the network is known and that the continuous traits evolve like a Brownian Motion (BM) in time, it is possible to compute the expected variance covariance matrix between tip measurements. This can be done using function vcv, whose syntax is inspired from the well known corresponding ape function.C = vcv(truenet)The matrix is returned as a DataFrame, with columns named by the tips of the network to allow for easy identification. Each row also corresponds to a tip in the network, and rows are ordered in the same way as columns.The computation of this matrix is based on the more general function sharedPathMatrix. It is at the core of all the Phylogenetic Comparative Methods described below."
},

{
    "location": "man/trait_tree/#Trait-simulation-1",
    "page": "Continuous Trait Evolution",
    "title": "Trait simulation",
    "category": "section",
    "text": "We start by generating continuous traits to study. We simulate three traits on the network (two independent, one dependent), using a Brownian Motion (BM) model of trait evolution on the network. We start by choosing the parameters of the BM (ancestral mean and variance), by creating objects of class ParamsBM<:ParamsProcess.params_trait1 = ParamsBM( 2, 0.5) # BM with mean  2 and variance 0.5\nparams_trait2 = ParamsBM(-2, 1)   # BM with mean -2 and variance 1.0\nnothing # hideWe then simulate the independent traits according to these parameters, using function simulate (fixing the seed, for reproducibility).using Random\nRandom.seed!(18480224);\nsim1 = simulate(truenet, params_trait1) # simulate a BM on truenet\nsim2 = simulate(truenet, params_trait2)\nnothing # hideThis creates objects of class TraitSimulation, from which we can extract the data at the tips, thanks to the method getindex(::TraitSimulation, ::Symbol).trait1 = sim1[:Tips] # trait 1 at the tips (data)\ntrait2 = sim2[:Tips]\nnothing # hideThis extractor creates an Array with one column, and as many lines as the number of tips there are in the phylogeny.  It is sorted in the same order as the tips of the phylogeny used to simulate it.   If needed, we could also extract the simulated values at the internal nodes in the network:sim1[:InternalNodes]\nnothing # hideFinally, we generate the last trait correlated with trait 1 (but not trait 2), with phylogenetic noise.Random.seed!(18700904);\nnoise = simulate(truenet, ParamsBM(0, 0.1)) # phylogenetic residuals\ntrait3 = 10 .+ 2 * trait1 .+ noise[:Tips] # trait to study. independent of trait2\nnothing # hide"
},

{
    "location": "man/trait_tree/#Phylogenetic-regression-1",
    "page": "Continuous Trait Evolution",
    "title": "Phylogenetic regression",
    "category": "section",
    "text": "Assume that we measured the three traits above, and that we wanted to study the impact of traits 1 and 2 on trait 3. To do that, we can perform a phylogenetic regression.In order to avoid confusion, the function takes in a DataFrame, that has an extra column with the names of the tips of the network, labeled tipNames. Here, we generated the traits ourselves, so they are all in the same order.using DataFrames\ndat = DataFrame(trait1 = trait1, trait2 = trait2, trait3 = trait3,\n                tipNames = tipLabels(sim1))Phylogenetic regression / ANOVA is based on the GLM package, with the network as an extra argument, using function phyloNetworklm.using StatsModels # for statistical model formulas\nfitTrait3 = phyloNetworklm(@formula(trait3 ~ trait1 + trait2), dat, truenet)From this, we can see that the intercept, the coefficient for trait 1 and the variance of the noise are correctly estimated (given that there are only 6 taxa). In addition, the Student T test for the coefficient associated with trait 2 has a high p-value, which means that this coefficient is not significantly different from 0. This is consistent with the way we simulated trait 3.The function returns an object of type PhyloNetworkLinearModel<:LinPredModel. It is a subtype of the GLM type LinPredModel, which means that all base functions from Julia StatsBase can be applied to it. See the documentation for this type for a list of all functions that can be used. Some functions allow the user to retrieve directly the estimated parameters of the BM, and are specific to this object.sigma2_estim(fitTrait3) # estimated variance of the BM\nmu_estim(fitTrait3) # estimated root value of the BM"
},

{
    "location": "man/trait_tree/#Ancestral-State-Reconstruction-1",
    "page": "Continuous Trait Evolution",
    "title": "Ancestral State Reconstruction",
    "category": "section",
    "text": ""
},

{
    "location": "man/trait_tree/#From-known-parameters-1",
    "page": "Continuous Trait Evolution",
    "title": "From known parameters",
    "category": "section",
    "text": "If we assume that we know the exact model of evolution that generated the traits, we can do ancestral trait reconstruction. Here, we simulated trait 1 ourselves, so we can use the true process, with the true parameters. In other words, we can reconstruct the state at the internal nodes, given the values at the tips, the known value at the root and the known BM variance.ancTrait1 = ancestralStateReconstruction(truenet, trait1, params_trait1)\nnothing # hideFunction ancestralStateReconstruction creates an object with type ReconstructedStates. Several extractors can be applied to it:expectations(ancTrait1) # predictions\nusing StatsBase # for stderror(), aic(), likelihood() etc.\nstderror(ancTrait1) # associated standard errors\npredint(ancTrait1, level=0.9) # prediction interval (with level 90%)We can plot the ancestral states or prediction intervals on the tree, using the nodeLabel argument of the plot function.ancExpe = expectationsPlot(ancTrait1); # format expected ancestral states for the plot\nR\"svg(name(\'ancestral_expe.svg\'), width=8, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(truenet, :R, nodeLabel = ancExpe);\nR\"dev.off()\" # hide\nnothing # hide(Image: ancestral_expe)ancInt = predintPlot(ancTrait1) # format the prediction intervals for the plot\nR\"svg(name(\'ancestral_predint.svg\'), width=8, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(truenet,:R, nodeLabel = ancInt);\nR\"dev.off()\" # hide\nnothing # hide(Image: ancestral_predint)The predint and predintPlot functions have an optional argument to state the level of the prediction interval. If not given, the default value is 0.95.It is also possible to plot both the reconstructed state and the predicted value on the same plot, using the optional keyword argument withExp. As shown below, we could also use the RCall method from the plot function.plot(truenet, :R, nodeLabel = predintPlot(ancTrait1, withExp=true));\nnothing # hideThese plots tend to be quite busy, even for small networks.As we know the true ancestral states here, we can compare them to our estimation.predictions = DataFrame(infPred=predint(ancTrait1)[1:7, 1],\n                        trueValue=sim1[:InternalNodes],\n                        supPred=predint(ancTrait1)[1:7, 2])"
},

{
    "location": "man/trait_tree/#From-estimated-parameters-1",
    "page": "Continuous Trait Evolution",
    "title": "From estimated parameters",
    "category": "section",
    "text": "In real applications though, we do not have access to the true parameters of the process that generated the data. We can estimate it using the previous function. To fit a regular BM, we just need to do a regression of trait 1 against a simple intercept:fitTrait1 = phyloNetworklm(@formula(trait1 ~ 1), dat, truenet)\nnothing # hideWe can then apply the ancestralStateReconstruction function directly to the fitted object:ancTrait1Approx = ancestralStateReconstruction(fitTrait1)\nnothing # hideThe prediction intervals ignore the fact that we estimated the process parameters, so they are less accurate and the function throws a warning. The output is an object of the same ReconstructedStates type as earlier, and the same extractors can be applied to it:R\"svg(name(\'ancestral1.svg\'), width=8, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(truenet, :R, nodeLabel = expectationsPlot(ancTrait1Approx));\nR\"dev.off()\" # hide\nnothing # hide(Image: ancestral1)For convenience, the two steps described above (fitting against the intercept, and then do ancestral state reconstruction) can be done all at once with a single call of the function ancestralStateReconstruction on a DataFrame with the trait to reconstruct, and the tip labels:datTrait1 = DataFrame(trait1 = trait1, tipNames = tipLabels(sim1))\nancTrait1Approx = ancestralStateReconstruction(datTrait1, truenet)\nnothing # hideR\"svg(name(\'ancestral2.svg\'), width=8, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(truenet, :R, nodeLabel = predintPlot(ancTrait1Approx, level=0.9));\nR\"dev.off()\" # hide\nnothing # hide(Image: ancestral2)This produces the exact same results. Here, we chose a level of 90% for the plotted prediction intervals."
},

{
    "location": "man/trait_tree/#Data-imputation-1",
    "page": "Continuous Trait Evolution",
    "title": "Data imputation",
    "category": "section",
    "text": "Note that there is no theoretical difference between an internal node, for which we could not measure the value of the trait, and a missing value at a tip of the network. Consequently, the previous ancestralStateReconstruction function can be used to do data imputation. To see this, let\'s add some missing values in trait 1.allowmissing!(datTrait1, :trait1)\ndatTrait1[2, :trait1] = missing; # second row: for taxon C\nancTrait1Approx = ancestralStateReconstruction(datTrait1, truenet)\nnothing # hideR\"svg(name(\'ancestral3.svg\'), width=8, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(truenet, :R, nodeLabel = predintPlot(ancTrait1Approx));\nR\"dev.off()\" # hide\nnothing # hide(Image: ancestral3)A prediction interval is shown for the missing values."
},

{
    "location": "man/trait_tree/#With-known-predictors-1",
    "page": "Continuous Trait Evolution",
    "title": "With known predictors",
    "category": "section",
    "text": "At this point, it might be tempting to apply this function to trait 3 we simulated earlier as a linear combination of trait 1 and a phylogenetic noise. However, this cannot be done directly:ancTrait3 = ancestralStateReconstruction(fitTrait3) # Throws an error !This is because the model we used to fit the trait (a regression with one predictor and an intercept) is not compatible with the simple model of Brownian evolution that we assumed for the ancestral state reconstruction. As the predictor used is not known for ancestral states, it is not possible to reconstruct the trait for this particular model.The only option we have is to provide the function with the predictor\'s ancestral states, if they are known. They are known indeed in this toy example that we generated ourselves, so we can reconstruct our trait doing the following:ancTrait3 = ancestralStateReconstruction(fitTrait3,\n              [ones(7, 1) sim1[:InternalNodes] sim2[:InternalNodes]])\nnothing # hideR\"svg(name(\'ancestral4.svg\'), width=8, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(truenet, :R, nodeLabel = predintPlot(ancTrait3));\nR\"dev.off()\" # hide\nnothing # hide(Image: ancestral4)where we provided the ancestral predictors as a matrix, containing the intercept, and the known predictor at the nodes. The user must be very careful with this function, as no check is done for the order of the predictors, that must be in the same order as the internal nodes of the phylogeny. As ancestral predictors are often unknown, the use of this functionality is discouraged."
},

{
    "location": "man/trait_tree/#Phylogenetic-ANOVA-1",
    "page": "Continuous Trait Evolution",
    "title": "Phylogenetic ANOVA",
    "category": "section",
    "text": "The phyloNetworklm function is based on the lm function from GLM. This means that it inherits from most of its features, and in particular, it can handle formulas with factors or interactions. For example, in lizards, we might want to do a regression of toe length against body length and the region where each species is found, where this region is coded into 4 categories (say). We might also want to include an interaction effect between body length and region. (This model has no biological basis. It is just meant to show the possibilities of the function).To illustrate the use of categorical predictors of particular interest in a network with reticulations, let\'s assume that some transgressive evolution took place after the hybridization event, so that tips \"A\" and \"B\" have larger mean compared to the others (see [B18] for transgressive evolution after a reticulation event).delta = 5.0; # value of heterosis\nunderHyb = [(n == \"A\" || n == \"B\") for n in tipLabels(sim1)] # tips under hybrid\nunderHyb\nfor i in 1:length(trait3)\n    underHyb[i] && (trait3[i]+=delta) # add delta to tips A and B\nend\nnothing # hidetrait3 # changed: +5 was added by the previous loop to A and BThe categorical variable underHyb separates tips \"A\" and \"B\" from the others. We need to mark it as a categorical variable, not a numerical variable, i.e. as a PooledDataArray.dat = DataFrame(trait1 = trait1, trait2 = trait2, trait3 = trait3,\n                underHyb = underHyb,\n                tipNames = tipLabels(sim1))\ncategorical!(dat, :underHyb)\nnothing # hidedatNow we can include this reticulation variable in the regression.fitTrait = phyloNetworklm(@formula(trait3 ~ trait1 + underHyb), dat, truenet)In this case, the categorical variable indicating which tips are descendants of the reticulation event is indeed relevant, and the transgressive evolution effect is recovered.This is a very simple example of how to include transgressive evolution, but some general functions to test for it, on networks with more than on hybrid, are also available."
},

{
    "location": "man/trait_tree/#Pagel\'s-Lambda-1",
    "page": "Continuous Trait Evolution",
    "title": "Pagel\'s Lambda",
    "category": "section",
    "text": "One classical question about trait evolution is the amount of \"phylogenetic signal\" in a dataset, that is, the importance of the tree structure to explain variation in the observed traits. One way of doing measuring that is to use Pagel\'s lambda transformation of the branch lengths [P99]. This model assumes a BM on a tree where the internal branches are multiplied by a factor λ, while the external branches are modified so that the total height of the tree is constant. Hence, λ varies between 0 (the tree has no influence on the data) and 1 (the tree is unchanged). Using the same branch length transformations, this model can be straightforwardly extended to phylogenetic networks.We can illustrate this with the predictor trait we used earlier. We use the same function as before, only indicating the model we want to use:fitPagel = phyloNetworklm(@formula(trait1 ~ 1), dat, truenet, model=\"lambda\")As it is indeed generated according to a plain BM on the phylogeny, the estimated λ should be close to 1. It can be extracted with function lambda_estim:lambda_estim(fitPagel)"
},

{
    "location": "man/trait_tree/#Shifts-and-transgressive-evolution-1",
    "page": "Continuous Trait Evolution",
    "title": "Shifts and transgressive evolution",
    "category": "section",
    "text": "In the ANOVA section above, we showed how to include transgressive evolution in a simple case. In general, transgressive evolution can be seen as a particular example of a shifted BM on the phylogenetic network."
},

{
    "location": "man/trait_tree/#Simulation-of-a-Shifted-BM-1",
    "page": "Continuous Trait Evolution",
    "title": "Simulation of a Shifted BM",
    "category": "section",
    "text": "In a shifted BM, the trait evolves as a BM on the network most of the time, but shifts on some of the branches. The positions and values of the shifts can be stored in a ShiftNet object. For identifiability reasons, shifts are only allowed on tree-like branches. The position of the shifts can be given using vector of edges. To see this, let\'s first plot the network with its associated edges and node numbers.R\"svg(name(\'truenet_with_numbers.svg\'), width=8, height=4)\" # hide\nR\"par\"(mar=[0,0,0,0]) # hide\nplot(truenet, :R, useEdgeLength=true, showEdgeNumber=true);\nR\"dev.off()\" # hide\nnothing # hide(Image: truenet_with_numbers)Let\'s say that we want to add a shift with value 5.0 on the branch directly following the hybridization event, in order to model transgressive evolution. We can see on the plot above that this branch is number 6, so we define the following object:shift = ShiftNet(truenet.edge[6], 5.0,  truenet)\nnothing # hideNote that the edge numbers and values of a ShiftNet object can be retrieved thanks to functions getShiftEdgeNumber and getShiftValue. The constructor can take a single edge and associated value, like here, or two vectors of edges and matching values.Because we often need to put shifts only on edges right after hybrids, there is a special function shiftHybrid to do that, so that  we do not have to find out their edges number. Here, the shift object could hence have been defined as:shift = shiftHybrid(5.0,  truenet)The parameters for the simulation are then defined as above, just adding the ShiftNet object as a parameter.params_sh = ParamsBM(2, 0.5, shift) # BM with mean 2, variance 0.5, and shifts.\nnothing # hideThe traits are simulated using the same function simulate, and extracted at the tips as before.Random.seed!(18700904)\nsim_sh = simulate(truenet, params_sh) # simulate a shifted BM on truenet\ntrait_sh = sim_sh[:Tips]              # trait at the tips (data)\nnothing # hide"
},

{
    "location": "man/trait_tree/#Fit-of-a-Shifted-BM-1",
    "page": "Continuous Trait Evolution",
    "title": "Fit of a Shifted BM",
    "category": "section",
    "text": "Let\'s assume that we measured trait_sh, and that we want to test whether there were some ancestral hybridizations. To do that, we can use the  custom columns of the descendenceMatrix, that can be directly defined thanks to function regressorHybrid.df_shift = regressorHybrid(truenet) # Regressors matching Hybrid Shifts\nnothing # hideThis creates a dataframe, with as many columns as the number of hybrids in the network, each named according to the number of the edge after the hybrid. We can use this dataframe as regressors in the phyloNetworklm function.dat = DataFrame(trait = trait_sh, tipNames = tipLabels(sim_sh))  # Data\ndat = join(dat, df_shift, on=:tipNames)                          # join the two\nfit_sh = phyloNetworklm(@formula(trait ~ shift_6), dat, truenet) # fitHere, because there is only one hybrid in the network, we can directly see whether the ancestral transgressive evolution is significant or not thanks to the Student T test on the coefficient associated with shift_6. In more complex cases, it is possible to do a Fisher F test, thanks to the GLM function ftest.fit_null = phyloNetworklm(@formula(trait ~ 1), dat, truenet) # fit against the null (no shift)\nftest(fit_sh, fit_null)                                      # nested models, from more complex to most simpleHere, this test is equivalent to the Fisher F test, and gives the same p-value.Note that, for conventional reasons, the ftest function always takes the most complex model as the first one. This means that, in the table of results, the models are actually named in a reverse order, so that \"Model 2\" is actually our model under H₀ (null model), and \"Model 1\" the one under H₁ (model with shifts)."
},

{
    "location": "man/trait_tree/#References-1",
    "page": "Continuous Trait Evolution",
    "title": "References",
    "category": "section",
    "text": "[B18]: Bastide, Solís-Lemus, Kriebel, Sparks, Ané (2018): Phylogenetic Comparative Methods for Phylogenetic Networks with Reticulations. Systematic Biology 67(5):800–820. doi:10.1093/sysbio/syy033[P99]: Pagel M (1999). Inferring the historical patterns of biological evolution. Nature. 401: 877–884. doi:10.1038/44766"
},

{
    "location": "man/parsimony/#",
    "page": "Parsimony on networks",
    "title": "Parsimony on networks",
    "category": "page",
    "text": ""
},

{
    "location": "man/parsimony/#Parsimony-on-networks-1",
    "page": "Parsimony on networks",
    "title": "Parsimony on networks",
    "category": "section",
    "text": ""
},

{
    "location": "man/parsimony/#Parsimony-score-of-a-given-network-1",
    "page": "Parsimony on networks",
    "title": "Parsimony score of a given network",
    "category": "section",
    "text": "We can calculate the parsimony score of a given network topology and a given set of characters. The characters could be in a CSV file in this format:taxon trait1 trait2 trait3 trait4 trait5 trait6 ...\nEnglish 1 2 1 1 1 3\n...      ...The trait values can be integer numbers, or strings. The data table may have missing data, and may contain extra taxa that we might want to exclude.An example file comes with the package, available here or here.using PhyloNetworks\nmkpath(\"../assets/figures\")\nusing RCall\nR\"name <- function(x) file.path(\'..\', \'assets\', \'figures\', x)\"\n# net1 = readTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"swadesh.out\"))\n# we would get net1 from analyzing the complete data, but not available with the packageFirst, we need to read the trait table as a DataFrame object:using CSV, DataFrames\ncsvfile = joinpath(dirname(pathof(PhyloNetworks)), \"..\",\"examples\",\"Swadesh.csv\");\ndat = CSV.read(csvfile);\nfirst(dat, 6) # to see the first 6 rowsThen, we need to convert the DataFrame object dat into a vector of species and traits. The species names are in column 1 named taxon, and the traits are in columns 2-11. The trait data need to be converted to a list of vectors, with one vector for each species. An internal function is provided for this:species, traits = PhyloNetworks.readCSVtoArray(dat);\nspecies\ntraitsThen, we read the network as usual:net = readTopology(\"(Spanish,((English)#H1,(Norwegian,(German,#H1))));\");using PhyloPlots, RCall\nR\"svg(name(\'parsimony-fixed-net.svg\'), width=4, height=4)\"; # hide\nR\"par\"(mar = [0,0,0,0]);\nplot(net, :R, xlim=[0.8,7.5]);\nR\"dev.off\"(); # hide(Image: parsimony-fixed-net)There are different types of parsimony scores on networks. Currently, we have implemented the softwired criterion only, with two different functions: parsimonySoftwired and parsimonyGF.The function parsimonySoftwired uses a faster algorithm than parsimonyGF, but can solve the softwired criterion only.score = parsimonySoftwired(net, species, traits)\nscore = parsimonyGF(net,species,traits,:softwired)"
},

{
    "location": "man/parsimony/#Finding-the-most-parsimonious-network-1",
    "page": "Parsimony on networks",
    "title": "Finding the most parsimonious network",
    "category": "section",
    "text": "The function maxParsimonyNet searches for the most parsimonious level-1 network. It uses the parsimonyGF function, with softwired criterion as default, which will be extended to other criteria later.Just like snaq!, maxParsimonyNet requires a starting topology, which can be a tree or a level-1 network, and returns a level-1 network. Taxa present in the data but absent from the starting topology will be ignored during the search.starttree = readTopology(\"(((English,German),Norwegian),Spanish);\");\nnet1 = maxParsimonyNet(starttree, dat, hmax=1, outgroup=\"Spanish\", rootname=\"swadesh\")The example data is very small: only 1 of the 11 traits is parsimony informative, on the 4 taxa specified by the starting topology. So these data happen to be compatible with a tree, and that tree is returned despite allowing for up to 1 reticulation: (Spanish,((English,Norwegian),German));."
},

{
    "location": "lib/public/#",
    "page": "Public",
    "title": "Public",
    "category": "page",
    "text": ""
},

{
    "location": "lib/public/#Public-Documentation-1",
    "page": "Public",
    "title": "Public Documentation",
    "category": "section",
    "text": "Documentation for PhyloNetworks\'s public (exported) interface.See Internal Documentation for documentation on internal functions.DocTestSetup = quote\n    using PhyloNetworks\nendPages = [\"public.md\"]"
},

{
    "location": "lib/public/#Index-1",
    "page": "Public",
    "title": "Index",
    "category": "section",
    "text": "Pages = [\"public.md\"]"
},

{
    "location": "lib/public/#PhyloNetworks.BinaryTraitSubstitutionModel",
    "page": "Public",
    "title": "PhyloNetworks.BinaryTraitSubstitutionModel",
    "category": "type",
    "text": "BinaryTraitSubstitutionModel(α, β [, label])\n\nTraitSubstitutionModel for binary traits (with 2 states). Default labels are \"0\" and \"1\". α is the rate of transition from \"0\" to \"1\", and β from \"1\" to \"0\".\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.DataCF",
    "page": "Public",
    "title": "PhyloNetworks.DataCF",
    "category": "type",
    "text": "DataCF\n\ntype that contains the following attributes:\n\nquartet (vector of Quartets)\nnumQuartets\ntree (vector of trees: empty if a table of CF was input instead of list of trees)\nnumTrees (-1 if a table CF was input instead of list of trees)\nrepSpecies (taxon names that were repeated in table of CF or input gene trees: used inside snaq for multiple alleles case)\n\nThe list of Quartet may be accessed with the attribute .quartet. If the input was a list of trees, the HybridNetwork\'s can be accessed with the attribute .tree. For example, if the DataCF object is named d, d.quartet[1] will show the first quartet and d.tree[1] will print the first input tree.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.EqualRatesSubstitutionModel",
    "page": "Public",
    "title": "PhyloNetworks.EqualRatesSubstitutionModel",
    "category": "type",
    "text": "EqualRatesSubstitutionModel(numberStates, α, labels)\n\nTraitSubstitutionModel for traits with any number of states and equal substitution rates α between all states. Default labels are \"1\",\"2\",...\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.HybridNetwork",
    "page": "Public",
    "title": "PhyloNetworks.HybridNetwork",
    "category": "type",
    "text": "HybridNetwork\n\nSubtype of abstract Network type. Explicit network or tree with the following attributes:\n\nnumTaxa\nnumNodes (total number of nodes)\nnumEdges\nnumHybrids (number of hybrid nodes)\nedge (array of Edges)\nnode (array of Nodes)\nroot (index of root in vector \'node\'. May be artificial, for printing and traversal purposes only.)\nhybrid (array of Nodes: those are are hybrid nodes)\nleaf (array of Nodes: those that are leaves)\nloglik (negative log pseudolik after estimation)\nisRooted (true or false)\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.ParamsBM",
    "page": "Public",
    "title": "PhyloNetworks.ParamsBM",
    "category": "type",
    "text": "ParamsBM <: ParamsProcess\n\nType for a BM process on a network. Fields are mu (expectation), sigma2 (variance), randomRoot (whether the root is random, default to false), and varRoot (if the root is random, the variance of the root, defalut to NaN).\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.PhyloNetworkLinearModel",
    "page": "Public",
    "title": "PhyloNetworks.PhyloNetworkLinearModel",
    "category": "type",
    "text": "PhyloNetworkLinearModel<:LinPredModel\n\nRegression object for a phylogenetic regression. Result of fitting function phyloNetworklm. Dominated by the LinPredModel class, from package GLM.\n\nThe following StatsBase functions can be applied to it: coef, nobs, vcov, stderror, confint, coeftable, dof_residual, dof, deviance, residuals, response, predict, loglikelihood, nulldeviance, nullloglikelihood, r2, adjr2, aic, aicc, bic.\n\nThe following StatsModels functions can also be applied to it: ModelFrame, ModelMatrix, Formula.\n\nEstimated variance and mean of the BM process used can be retrieved with functions sigma2_estim and mu_estim.\n\nIf a Pagel\'s lambda model is fitted, the parameter can be retrieved with function lambda_estim.\n\nAn ancestral state reconstruction can be performed from this fitted object using function: ancestralStateReconstruction.\n\nThe PhyloNetworkLinearModel object has fields: lm, V, Vy, RL, Y, X, logdetVy, ind, nonmissing, model, lambda. Type in \"?PhyloNetworkLinearModel.field\" to get help on a specific field.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.Quartet",
    "page": "Public",
    "title": "PhyloNetworks.Quartet",
    "category": "type",
    "text": "Quartet\n\ntype that saves the information on a given 4-taxon subset. It contains the following attributes:\n\nnumber: integer\ntaxon: vector of taxon names, like t1 t2 t3 t4\nobsCF: vector of observed CF, in order 12|34, 13|24, 14|23\nlogPseudoLik\nngenes: number of gene trees used to compute the observed CF; -1.0 if unknown\nqnet: QuartetNetwork, which saves the expCF after snaq estimation to emphasize that the expCF depend on a specific network, not the data\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.ReconstructedStates",
    "page": "Public",
    "title": "PhyloNetworks.ReconstructedStates",
    "category": "type",
    "text": "ReconstructedStates\n\nType containing the inferred information about the law of the ancestral states given the observed tips values. The missing tips are considered as ancestral states.\n\nThe following functions can be applied to it: expectations (vector of expectations at all nodes), stderror (the standard error), predint (the prediction interval).\n\nThe ReconstructedStates object has fields: traits_nodes, variances_nodes, NodeNumbers, traits_tips, tipNumbers, model. Type in \"?ReconstructedStates.field\" to get help on a specific field.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.ShiftNet",
    "page": "Public",
    "title": "PhyloNetworks.ShiftNet",
    "category": "type",
    "text": "ShiftNet\n\nShifts associated to a HybridNetwork sorted in topological order. Its shift field is a vector of shift values, one for each node, corresponding to the shift on the parent edge of the node (which makes sense for tree nodes only: they have a single parent edge).\n\nTwo ShiftNet objects on the same network can be concatened with *.\n\nShiftNet(node::Vector{Node}, value::AbstractVector, net::HybridNetwork; checkPreorder=true::Bool)\n\nConstructor from a vector of nodes and associated values. The shifts are located on the edges above the nodes provided. Warning, shifts on hybrid edges are not allowed.\n\nShiftNet(edge::Vector{Edge}, value::AbstractVector, net::HybridNetwork; checkPreorder=true::Bool)\n\nConstructor from a vector of edges and associated values. Warning, shifts on hybrid edges are not allowed.\n\nExtractors: getShiftEdgeNumber, getShiftValue\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.TraitSimulation",
    "page": "Public",
    "title": "PhyloNetworks.TraitSimulation",
    "category": "type",
    "text": "TraitSimulation\n\nResult of a trait simulation on an HybridNetwork with function simulate.\n\nThe following functions and extractors can be applied to it: tipLabels, obj[:Tips], obj[:InternalNodes] (see documentation for function getindex(::TraitSimulation, ::Symbol)).\n\nThe TraitSimulation object has fields: M, params, model.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.TraitSubstitutionModel",
    "page": "Public",
    "title": "PhyloNetworks.TraitSubstitutionModel",
    "category": "type",
    "text": "TraitSubstitutionModel\n\nAbstract type for discrete trait substitution models, using a continous time Markov model on a phylogeny. Adapted from the substitutionModels module in BioJulia. The same Q and P function names are used for the transition rates and probabilities.\n\nsee BinaryTraitSubstitutionModel, EqualRatesSubstitutionModel, TwoBinaryTraitSubstitutionModel\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.TwoBinaryTraitSubstitutionModel",
    "page": "Public",
    "title": "PhyloNetworks.TwoBinaryTraitSubstitutionModel",
    "category": "type",
    "text": "TwoBinaryTraitSubstitutionModel(rate [, label])\n\nTraitSubstitutionModel for two binary traits, possibly correlated. Default labels are \"x0\", \"x1\" for trait 1, and \"y0\", \"y1\" for trait 2. If provided, label should be a vector of size 4, listing labels for trait 1 first then labels for trait 2. rate should be a vector of substitution rates of size 8. rate[1],...,rate[4] describe rates of changes in trait 1. rate[5],...,rate[8] describe rates of changes in trait 2.\n\nIn the transition matrix, trait combinations are listed in the following order: x0-y0, x0-y1, x1-y0, x1-y1.\n\nexample\n\nmodel = TwoBinaryTraitSubstitutionModel([2.0,1.2,1.1,2.2,1.0,3.1,2.0,1.1],\n        [\"carnivory\", \"noncarnivory\", \"wet\", \"dry\"]);\nmodel\nusing PhyloPlots\nplot(model) # to visualize states and rates\n\n\n\n\n\n"
},

{
    "location": "lib/public/#types-1",
    "page": "Public",
    "title": "types",
    "category": "section",
    "text": "Modules = [PhyloNetworks]\nPrivate = false\nOrder   = [:type]"
},

{
    "location": "lib/public/#PhyloNetworks.tipLabels",
    "page": "Public",
    "title": "PhyloNetworks.tipLabels",
    "category": "function",
    "text": "tipLabels(x)\n\nReturn a vector of taxon names at the leaves, for objects of various types: HybridNetwork, Vector of HybridNetworks (in which case the union is taken then sorted), Vector of Quartets, DataCF, TraitSimulation, MatrixTopologicalOrder.\n\nFor a network, the taxon names are coerced to strings.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.sorttaxa!",
    "page": "Public",
    "title": "PhyloNetworks.sorttaxa!",
    "category": "function",
    "text": "sorttaxa!(DataFrame, columns)\n\nReorder the 4 taxa and reorders the observed concordance factors accordingly, on each row of the data frame. If columns is ommitted, taxon names are assumed to be in columns 1-4 and CFs are assumed to be in columns 5-6 with quartets in this order: 1234, 1324, 14_23. Does not reorder credibility interval values, if present.\n\nsorttaxa!(DataCF)\nsorttaxa!(Quartet, permutation_tax, permutation_cf)\n\nReorder the 4 taxa in each element of the DataCF quartet. For a given Quartet, reorder the 4 taxa in its fields taxon and qnet.quartetTaxon (if non-empty) and reorder the 3 concordance values accordingly, in obsCF and qnet.expCF.\n\npermutation_tax and permutation_cf should be vectors of short integers (Int8) of length 4 and 3 respectively, whose memory allocation gets reused. Their length is not checked.\n\nqnet.names is unchanged: the order of taxon names here relates to the order of nodes in the network (???)\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.printEdges",
    "page": "Public",
    "title": "PhyloNetworks.printEdges",
    "category": "function",
    "text": "printEdges(net)\nprintEdges(io::IO, net)\n\nPrint information on the edges of a HybridNetwork or QuartetNetwork object net: edge number, numbers of nodes attached to it, edge length, whether it\'s a hybrid edge, its γ inheritance value, whether it\'s a major edge, if it could contain the root (this field is not always updated, though) and attributes pertaining to level-1 networks used in SNaQ: in which cycle it is contained (-1 if no cycle), and if the edge length is identifiable (based on quartet concordance factors).\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.printNodes",
    "page": "Public",
    "title": "PhyloNetworks.printNodes",
    "category": "function",
    "text": "printNodes(net)\nprintNodes(io, net)\n\nPrint information on the nodes of a HybridNetwork net: node number, whether it\'s a leaf, whether it\'s a hybrid node, whether it\'s connected to one or more hybrid edges, it\'s name (label), the cycle in which it is belong (-1 if no cycle; makes sense for level-1 networks), and the list of edges attached to it, by their numbers.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.summarizeDataCF",
    "page": "Public",
    "title": "PhyloNetworks.summarizeDataCF",
    "category": "function",
    "text": "summarizeDataCF(d::DataCF)\n\nfunction to summarize the information contained in a DataCF object. It has the following optional arguments:\n\nfilename: if provided, the summary will be saved in the filename, not to screen\npc (number between (0,1)): threshold of percentage of missing genes to identify 4-taxon subsets with fewer genes than the threshold\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.directEdges!",
    "page": "Public",
    "title": "PhyloNetworks.directEdges!",
    "category": "function",
    "text": "directEdges!(net::HybridNetwork; checkMajor=true::Bool)\n\nUpdates the edges\' attribute isChild1, according to the root placement. Also updates edges\' attribute containRoot, for other possible root placements compatible with the direction of existing hybrid edges. Relies on hybrid nodes having exactly 1 major hybrid parent edge, but checks for that if checkMajor=true.\n\nWarning: Assumes that isChild1 is correct on hybrid edges (to avoid changing the identity of which nodes are hybrids and which are not).\n\nReturns the network. Throws a \'RootMismatch\' Exception if the root was found to conflict with the direction of any hybrid edge.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.preorder!",
    "page": "Public",
    "title": "PhyloNetworks.preorder!",
    "category": "function",
    "text": "preorder!(net::HybridNetwork)\n\nUpdates attribute net.nodes_changed in which the nodes are pre-ordered (also called topological sorting), such that each node is visited after its parent(s). The edges\' direction needs to be correct before calling preorder!, using directEdges!\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.cladewiseorder!",
    "page": "Public",
    "title": "PhyloNetworks.cladewiseorder!",
    "category": "function",
    "text": "cladewiseorder!(net::HybridNetwork)\n\nUpdates attribute net.cladewiseorder_nodeIndex. Used for plotting the network. In the major tree, all nodes in a given clade are consecutive. On a tree, this function also provides a pre-ordering of the nodes. The edges\' direction needs to be correct before calling cladewiseorder!, using directEdges!\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.rootatnode!",
    "page": "Public",
    "title": "PhyloNetworks.rootatnode!",
    "category": "function",
    "text": "rootatnode!(HybridNetwork, nodeNumber::Integer; index=false::Bool, verbose=true::Bool)\nrootatnode!(HybridNetwork, Node; verbose=true)\nrootatnode!(HybridNetwork, nodeName::AbstractString; verbose=true)\n\nRoot the network/tree object at the node with name \'nodeName\' or number \'nodeNumber\' (by default) or with index \'nodeNumber\' if index=true. Attributes isChild1 and containRoot are updated along the way. Use plot(net, showNodeNumber=true, showEdgeLength=false) to visualize and identify a node of interest. (see package PhyloPlots)\n\nReturn the network.\n\nWarnings:\n\nIf the node is a leaf, the root will be placed along the edge adjacent to the leaf. This might add a new node.\nIf the desired root placement is incompatible with one or more hybrids, then\na RootMismatch error is thrown; use verbose=false to silence the root mismatch info printed before the error is thrown.\nthe input network will still have some attributes modified.\n\nSee also: rootonedge!.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.rootonedge!",
    "page": "Public",
    "title": "PhyloNetworks.rootonedge!",
    "category": "function",
    "text": "rootonedge!(HybridNetwork, edgeNumber::Integer; index=false::Bool, verbose=true::Bool)\nrootonedge!(HybridNetwork, Edge; verbose=true::Bool)\n\nRoot the network/tree along an edge with number edgeNumber (by default) or with index edgeNumber if index=true. Attributes isChild1 and containRoot are updated along the way.\n\nThis adds a new node and a new edge to the network. Use plot(net, showEdgeNumber=true, showEdgeLength=false) to visualize and identify an edge of interest. (see package PhyloPlots)\n\nSee also: rootatnode!.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.hybridatnode!",
    "page": "Public",
    "title": "PhyloNetworks.hybridatnode!",
    "category": "function",
    "text": "hybridatnode!(net::HybridNetwork, nodeNumber::Integer)\n\nChange the status of edges in network net, to move the hybrid node in a cycle to the node with number nodeNumber. This node must be in one (and only one) cycle, otherwise an error will be thrown.\n\nnet is assumed to be of level 1, that is, each blob has a single cycle with a single reticulation. Check and update the nodes\' field inCycle.\n\nExample #\"\n\njulia> net = readTopology(\"(A:1.0,((B:1.1,#H1:0.2::0.2):1.2,(((C:0.52,(E:0.5)#H2:0.02::0.7):0.6,(#H2:0.01::0.3,F:0.7):0.8):0.9,(D:0.8)#H1:0.3::0.8):1.3):0.7):0.1;\");\njulia> using PhyloPlots\njulia> plot(net, showNodeNumber=true)\njulia> hybridatnode!(net, -4)\njulia> plot(net)\n\n\n\n\n\nhybridatnode!(net, hybrid::Node, newNode::Node)\n\nMove the reticulation from hybrid to newNode, which must in the same cycle. net is assumed to be of level 1, but no checks are made and fields are supposed up-to-date.\n\nCalled by hybridatnode!(net, node number), which is itself called by undirectedOtherNetworks.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.setLength!",
    "page": "Public",
    "title": "PhyloNetworks.setLength!",
    "category": "function",
    "text": "setLength!(Edge,new length)\n\nset a new length for an object Edge. The new length needs to be positive. For example, if you have a HybridNetwork object net, and do printEdges(net), you can see the list of Edges and their lengths. You can then change the length of the 3rd edge with setLength!(net.edge[3],1.2). If new length is above 10, the value 10 will be used, as an upper limit to coalescent units that can be reliably estimated.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.setGamma!",
    "page": "Public",
    "title": "PhyloNetworks.setGamma!",
    "category": "function",
    "text": "setGamma!(Edge, new γ)\nsetGamma!(Edge, new γ, change other=true::Bool)\n\nSet inheritance probability γ for an edge, which must be a hybrid edge. The new γ needs to be in [0,1]. The γ of the \"partner\" hybrid edge is changed accordingly, to 1-γ. The field isMajor is also changed accordingly. If the new γ is approximately 0.5, Edge is set to the major parent, its partner is set to the minor parent.\n\nIf net is a HybridNetwork object, printEdges(net) will show the list of edges and their γ\'s. The γ of the third hybrid edge (say) can be changed to 0.2 with setGamma!(net.edge[3],0.2). This will automatically set γ of the partner hybrid edge to 0.8.\n\nThe last argument is true by default. If false: the partner edge is not updated.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.deleteleaf!",
    "page": "Public",
    "title": "PhyloNetworks.deleteleaf!",
    "category": "function",
    "text": "deleteleaf!(HybridNetwork, leafName::AbstractString; simplify=true)\ndeleteleaf!(HybridNetwork, Node; simplify=true)\ndeleteleaf!(HybridNetwork, Integer; index=false, simplify=true)\n\nDeletes a leaf node from the network, possibly from its name, number, or index in the network\'s array of nodes.\n\nsimplify: if true and if deleting the node results in 2 hybrid edges forming a cycle of k=2 nodes, then these hybrid edges are merged and simplified as a single tree edge.\n\nThe first 2 versions require that node is a leaf. The 3rd version does not require that node is a leaf. If node has degree 3 or more, nothing happens. If it has degree 1 or 2, it is deleted.\n\nWarning: does not update attributes related to level-1 networks, such as inCycle, partition, gammaz, etc. Does not require branch lengths, and designed to work on networks of all levels.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.deleteHybridThreshold!",
    "page": "Public",
    "title": "PhyloNetworks.deleteHybridThreshold!",
    "category": "function",
    "text": "deleteHybridThreshold!(net::HybridNetwork, threshold::Float64, keepNodes=false)\n\nDeletes from a network all hybrid edges with heritability below a threshold gamma. Returns the network.\n\nif threshold<0.5: delete minor hybrid edges with γ < threshold (or with a missing γ, for any threshold > -1.0)\nif threshold=0.5: delete all minor hybrid edges (i.e normally with γ < 0.5, if γ non-missing)\nkeepNodes: if true, keep all original nodes; delete edges only.\n\nWarnings:\n\nby default, keepNodes is false, and partner hybrid edges have their γ changed to 1.0. If keepNodes is true: the γ\'s of partner hybrid edges are unchanged.\nassumes correct isMajor attributes.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.rotate!",
    "page": "Public",
    "title": "PhyloNetworks.rotate!",
    "category": "function",
    "text": "rotate!(net::HybridNetwork, nodeNumber::Integer; orderedEdgeNum::Array{Int,1})\n\nRotates the order of the node\'s children edges. Useful for plotting, to remove crossing edges. If node is a tree node with no polytomy, the 2 children edges are switched and the optional argument orderedEdgeNum is ignored.\n\nUse plot(net, showNodeNumber=true, showEdgeNumber=false) to map node and edge numbers on the network, as shown in the examples below. (see package PhyloPlots)\n\nWarning: assumes that edges are correctly directed (isChild1 updated). This is done by plot(net). Otherwise run directEdges!(net).\n\nExample\n\njulia> net = readTopology(\"(A:1.0,((B:1.1,#H1:0.2::0.2):1.2,(((C:0.52,(E:0.5)#H2:0.02::0.7):0.6,(#H2:0.01::0.3,F:0.7):0.8):0.9,(D:0.8)#H1:0.3::0.8):1.3):0.7):0.1;\");\njulia> using PhyloPlots\njulia> plot(net, showNodeNumber=true)\njulia> rotate!(net, -4)\njulia> plot(net)\njulia> net=readTopology(\"(4,((1,(2)#H7:::0.864):2.069,(6,5):3.423):0.265,(3,#H7:::0.136):10.0);\");\njulia> plot(net, showNodeNumber=true, showEdgeNumber=true)\njulia> rotate!(net, -1, orderedEdgeNum=[1,12,9])\njulia> plot(net, showNodeNumber=true, showEdgeNumber=true)\njulia> rotate!(net, -3)\njulia> plot(net)\n\n\n\n\n\n"
},

{
    "location": "lib/public/#Base.getindex-Tuple{TraitSimulation,Symbol}",
    "page": "Public",
    "title": "Base.getindex",
    "category": "method",
    "text": "getindex(obj, d)\n\nGetting submatrices of an object of type TraitSimulation.\n\nArguments\n\nobj::TraitSimulation: the matrix from which to extract.\nd::Symbol: a symbol precising which sub-matrix to extract. Can be:\n:Tips columns and/or rows corresponding to the tips\n:InternalNodes columns and/or rows corresponding to the internal nodes\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.getNodeAges",
    "page": "Public",
    "title": "PhyloNetworks.getNodeAges",
    "category": "function",
    "text": "getNodeAges(net)\n\nvector of node ages in pre-order, as in nodes_changed, which is assumed to have been calculated before.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.pairwiseTaxonDistanceMatrix",
    "page": "Public",
    "title": "PhyloNetworks.pairwiseTaxonDistanceMatrix",
    "category": "function",
    "text": "pairwiseTaxonDistanceMatrix(net; keepInternal=false,\n                            checkPreorder=true, nodeAges=[])\npairwiseTaxonDistanceMatrix!(M, net, nodeAges)\n\nReturn the matrix M of pairwise distances between nodes in the network:\n\nbetween all nodes (internal and leaves) if keepInternal=true, in which case the nodes are listed in M in the order in which they appear in net.nodes_changed\nbetween taxa only otherwise, in which case the nodes are listed in M in the order in which they appear in tipLabels(net) (i.e. same order as in net.leaf)\n\nThe second form modifies M in place, assuming all nodes.\n\nThe distance between the root and a given hybrid node (to take an example) is the weighted average of path lengths from the root to that node, where each path is weighted by the product of γs of all edges on that path. This distance measures the average genetic distance across the genome, if branch lengths are in substitutions/site.\n\noptional arguments:\n\ncheckPreorder: if true, net.nodes_changed is updated to get a topological ordering of nodes.\nnodeAges: if not provided, i.e. empty vector, the network is not modified.   If provided and non-empty, nodeAges should list node ages in the pre-order in which nodes are listed in nodes_changed (including leaves), and edge lengths in net are modified accordingly.\n\nProviding node ages hence makes the network time consistent: such that all paths from the root to a given hybrid node have the same length. If node ages are not provided, the network need not be time consistent.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.biconnectedComponents",
    "page": "Public",
    "title": "PhyloNetworks.biconnectedComponents",
    "category": "function",
    "text": "biconnectedComponents(network, ignoreTrivial=false)\n\nCalculate biconnected components (aka \"blobs\") using Tarjan\'s algorithm: the output is an array of arrays of edges. These blobs are returned in post-order, but within a blob, edges are not necessarily sorted in topological order. If ignoreTrivial is true, trivial components (of a single edge) are not returned. The network is assumed to be connected.\n\nWarnings: for nodes, fields k, inCycle, and prev are modified during the algorithm. They are used to store the node\'s \"index\" (time of visitation), \"lowpoint\", and the node\'s \"parent\", as defined by the order in which nodes are visited.\n\nReferences:\n\np. 153 of Tarjan (1972). Depth first search and linear graph algorithms, SIAM Journal on Computing, 1(2):146-160\non geeksforgeeks, there is an error (as of 2018-01-30): elif v != parent[u] and low[u] > disc[v]: (python version) should be replaced by elif v != parent[u] and disc[u] > disc[v]:\nnice explanation at this url\n\n\n\n\n\nbiconnectedComponents(node, index, S, blobs, ignoreTrivial)\n\nHelper recursive function starting at a node (not a network). index is an array containing a single integer, thus mutable: order in which nodes are visited.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.blobDecomposition",
    "page": "Public",
    "title": "PhyloNetworks.blobDecomposition",
    "category": "function",
    "text": "blobDecomposition!(network)\nblobDecomposition(network)\n\nFind blobs using biconnectedComponents; find their roots using blobInfo; create a forest in the form of a disconnected network (for efficiency), by deconnecting the root of each non-trivial blob from its parent. The root of each blob corresponds to a new leaf (in another tree of the forest): the number of the blob\'s root is given to the newly created leaf.\n\nThe first (bang) version modifies the network and returns the array of blob roots. The second version copies the network then returns a tuple: the forest and the blob roots.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#utilities-1",
    "page": "Public",
    "title": "utilities",
    "category": "section",
    "text": "tipLabels\nsorttaxa!\nprintEdges\nprintNodes\nsummarizeDataCF\ndirectEdges!\npreorder!\ncladewiseorder!\nrootatnode!\nrootonedge!\nhybridatnode!\nsetLength!\nsetGamma!\ndeleteleaf!\ndeleteHybridThreshold!\nrotate!\ngetindex(::TraitSimulation, ::Symbol)\ngetNodeAges\npairwiseTaxonDistanceMatrix\nbiconnectedComponents\nblobDecomposition"
},

{
    "location": "lib/public/#PhyloNetworks.readTopology",
    "page": "Public",
    "title": "PhyloNetworks.readTopology",
    "category": "function",
    "text": "readTopology(file name)\nreadTopology(parenthetical description)\n\nRead tree or network topology from parenthetical format (extended Newick). If the root node has a single child: ignore (i.e. delete from the topology) the root node and its child edge.\n\nInput: text file or parenthetical format directly. The file name may not start with a left parenthesis, otherwise the file name itself would be interpreted as the parenthetical description.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.readTopologyLevel1",
    "page": "Public",
    "title": "PhyloNetworks.readTopologyLevel1",
    "category": "function",
    "text": "readTopologyLevel1(filename)\nreadTopologyLevel1(parenthetical format)\n\nsame as readTopology, reads a tree or network from parenthetical format, but this function enforces the necessary conditions for any starting topology in SNaQ: non-intersecting cycles, no polytomies, unrooted. It sets any missing branch length to 1.0.\n\nIf the network has a bad diamond II (in which edge lengths are γ\'s are not identifiable) and if the edge below this diamond has a length t different from 0, then this length is set back to 0 and the major parent hybrid edge is lengthened by t.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.readInputTrees",
    "page": "Public",
    "title": "PhyloNetworks.readInputTrees",
    "category": "function",
    "text": "readInputTrees(file)\n\nRead a text file with a list of trees/networks in parenthetical format (one tree per line) and transform them like readTopologyLevel1 does: to be unrooted, with resolved polytomies, missing branch lengths set to 1.0, etc. See readMultiTopology to read multiple trees or networks with no modification.\n\nOutput: array of HybridNetwork objects.\n\nEach line starting with \"(\" will be considered as describing one topology. The file can have extra lines that are ignored.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.readMultiTopology",
    "page": "Public",
    "title": "PhyloNetworks.readMultiTopology",
    "category": "function",
    "text": "readMultiTopology(file)\n\nRead a text file with a list of networks in parenthetical format (one per line). Each network is read with readTopology. Return an array of HybridNetwork object.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.readSnaqNetwork",
    "page": "Public",
    "title": "PhyloNetworks.readSnaqNetwork",
    "category": "function",
    "text": "readSnaqNetwork(output file)\n\nfunction to read the estimated network from an .out file generated by the snaq function\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.readTrees2CF",
    "page": "Public",
    "title": "PhyloNetworks.readTrees2CF",
    "category": "function",
    "text": "readTrees2CF(treefile)\nreadTrees2CF(vector of trees)\n\nRead trees in parenthetical format from a file, or take a vector of trees already read, and calculate the proportion of these trees having a given quartet (concordance factor: CF), for all quartets or for a sample of quartets. Optional arguments include:\n\nquartetfile: name of text file with list of 4-taxon subsets to be analyzed. If none is specified, the function will list all possible 4-taxon subsets.\nwhichQ=\"rand\": to choose a random sample of 4-taxon subsets\nnumQ: size of random sample (ignored if whichQ is not set to \"rand\")\nwriteTab=false: does not write the observedCF to a table (default true)\nCFfile: name of file to save the observedCF (default tableCF.txt)\nwriteQ=true: save intermediate files with the list of all 4-taxon subsets and chosen random sample (default false).\nwriteSummary: write descriptive stats of input data (default: true)\nnexus: if true, it assumes the gene trees are written in nexus file (default: false)\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.readTableCF",
    "page": "Public",
    "title": "PhyloNetworks.readTableCF",
    "category": "function",
    "text": "readTableCF(file)\nreadTableCF(data frame)\nreadTableCF!(data frame)\n\nRead a file or DataFrame object containing a table of concordance factors (CF), with one row per 4-taxon set. The first 4 columns are assumed to give the labels of the 4 taxa in each set (tx1, tx2, tx3, tx4). Columns containing the CFs are assumed to be named CF12_34, CF13_24 and CF14_23; or CF12.34, CF13.24 and CF14.23; or else are assumed to be columns 5,6,7. If present, a column named \'ngenes\' will be used to get the number of loci used to estimate the CFs for each 4-taxon set.\n\nOutput: DataCF object\n\nOptional arguments:\n\nsummaryfile: if specified, a summary file will be created with that name.\ndelim (for the first form only): to specify how columns are delimited, with single quotes: delim=\';\'. Default is a csv file, i.e. delim=\',\'.\n\nThe last version modifies the input data frame, if species are represented by multiple alleles for instance (see readTableCF!(data frame, columns)).\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.readTableCF!",
    "page": "Public",
    "title": "PhyloNetworks.readTableCF!",
    "category": "function",
    "text": "readTableCF!(data frame, columns)\n\nRead in quartet CFs from data frame, assuming information is in columns numbered columns, of length 7 or 8: 4 taxon labels then 3 CFs then ngenes possibly.\n\nIf some species appears more than once in the same 4-taxon set (e.g. t1,t1,t2,t3), then the data frame is modified to remove rows (4-taxon sets) that are uninformative about between-species relationships. This situation may occur if multiple individuals are sampled from the same species. A 4-taxon set is uninformative (and its row is removed) if one taxon is repeated 3 or 4 times (like t1,t1,t1,t1 or t1,t2,t2,t2). The list of species appearing twice in some 4-taxon sets is stored in the output DataCF object. For these species, the length of their external edge is identifiable (in coalescent units). If multiple rows correspond to the same 4-taxon set, these rows are merged and their CF values (and number of genes) are averaged.\n\nreadTableCF!(DataCF, data frame, columns)\n\nModify the .quartet.obsCF values in the DataCF object with those read from the data frame in columns numbered columns. columns should have 3 columns numbers for the 3 CFs in this order: 1234, 1324 and 14_23.\n\nAssumptions:\n\nsame 4-taxon sets in DataCF and in the data frame, and in the same order, but this assumption is not checked (for speed, e.g. during bootstrapping).\none single row per 4-taxon set (multiple individuals representatives of the same 4-taxon set should have been already merged); basically: the DataCF should have been created from the data frame by readTableCF!(df, colums)\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.writeTableCF",
    "page": "Public",
    "title": "PhyloNetworks.writeTableCF",
    "category": "function",
    "text": "writeTableCF(vector of quartets)\nwriteTableCF(DataCF)\n\nBuild a DataFrame containing observed quartet concordance factors, with columns named:\n\n:tx1, :tx2, :tx3, :tx4 for the four taxon names in each quartet\n:CF12_34, :CF13_24, :CF14_23 for the 3 quartets of a given four-taxon set\n:ngenes if this information is available for some quartets\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.readBootstrapTrees",
    "page": "Public",
    "title": "PhyloNetworks.readBootstrapTrees",
    "category": "function",
    "text": "readBootstrapTrees(listfile; relative2listfile=true)\n\nRead the list of file names in listfile, then read all the trees in each of these files. Output: vector of vectors of trees (networks with h>0 allowed).\n\nlistfile should be the name of a file containing the path/name to multiple bootstrap files, one on each line (no header). Each named bootstrap file should contain multiple trees, one per line (such as bootstrap trees from a single gene).\n\nThe path/name to each bootstrap file should be relative to listfile. Otherwise, use option relative2listfile=false, in which case the file names are interpreted as usual: relative to the user\'s current directory if not given as absolute paths.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.writeSubTree!",
    "page": "Public",
    "title": "PhyloNetworks.writeSubTree!",
    "category": "function",
    "text": "writeSubTree!(IO, network, dendroscope::Bool, names::Bool,\n              round_branch_lengths::Bool, digits::Integer)\n\nWrite to IO the extended newick format (parenthetical description) of a network. If written for dendroscope, inheritance γ\'s are not written. If names is true, taxon names are written, otherwise taxon numbers are written instead of taxon names. If unspecified, branch lengths and γ\'s are rounded to 3 digits.\n\n\n\n\n\nwriteSubTree!(IO, node, edge, dendroscope::Bool, names::Bool,\n              round_branch_lengths::Bool, digits::Integer)\n\nWrite the extended newick format of the sub-network rooted at node and assuming that edge is a parent of node.\n\nIf parent is nothing, the edge attribute isChild1 is used and assumed to be correct to write the subtree rooted at node. This is useful to write a subtree starting at a non-root node. Example:\n\nnet = readTopology(\"(((A,(B)#H1:::0.9),(C,#H1:::0.1)),D);\")\ndirectEdges!(net)\ns = IOBuffer()\nPhyloNetworks.writeSubTree!(s, net.node[7], nothing, false, true)\nString(take!(s))\n\nUsed by writeTopology.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.writeTopology",
    "page": "Public",
    "title": "PhyloNetworks.writeTopology",
    "category": "function",
    "text": "writeTopology(net)\nwriteTopology(net, filename)\nwriteTopology(net, IO)\n\nWrite the parenthetical extended Newick format of a network, as a string, to a file or to an IO buffer / stream. Optional arguments (default values):\n\ndi (false): write in format for Dendroscope\nround (false): rounds branch lengths and heritabilities γ\ndigits (3): digits after the decimal place for rounding\nappend (false): if true, appends to the file\n\nIf the current root placement is not admissible, other placements are tried. The network is updated with this new root placement, if successful.\n\nUses lower-level function writeSubTree!.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.writeMultiTopology",
    "page": "Public",
    "title": "PhyloNetworks.writeMultiTopology",
    "category": "function",
    "text": "writeMultiTopology(nets, file_name; append=false)\nwriteMultiTopology(nets, IO)\n\nWrite an array of networks in parenthetical extended Newick format, one network per line. Use the option append=true to append to the file. Otherwise, the default is to create a new file or overwrite it, if it already existed. Each network is written with writeTopology.\n\nExamples #\"\n\njulia> net = [readTopology(\"(D,((A,(B)#H7:::0.864):2.069,(F,E):3.423):0.265,(C,#H7:::0.1361111):10);\"),\n              readTopology(\"(A,(B,C));\"),readTopology(\"(E,F);\"),readTopology(\"(G,H,F);\")];\n\njulia> writeMultiTopology(net, \"fournets.net\") # to (over)write to file \"fournets.net\"\njulia> writeMultiTopology(net, \"fournets.net\", append=true) # to append to this file\njulia> writeMultiTopology(net, stdout)         # to write to the screen (standard out)\n(D,((A,(B)#H7:::0.864):2.069,(F,E):3.423):0.265,(C,#H7:::0.1361111):10.0);\n(A,(B,C));\n(E,F);\n(G,H,F);\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.mapAllelesCFtable",
    "page": "Public",
    "title": "PhyloNetworks.mapAllelesCFtable",
    "category": "function",
    "text": "mapAllelesCFtable(mapping file, CF file; filename, columns, delim)\n\nCreate a new DataFrame containing the same concordance factors as in the input CF file, but with modified taxon names. Each allele name in the input CF table is replaced by the species name that the allele maps onto, based on the mapping file. The mapping file should have column names: allele and species.\n\nOptional arguments:\n\nfile name to write/save resulting CF table. If not specified, then the output data frame is not saved to a file.\ncolumn numbers for the taxon names. 1-4 by default.\nany keyword arguments that CSV.read would accept. For example, delim=\',\' by default: columns are delimited by commas. Unless specified otherwise by the user, categorical=false (to read taxon names as Strings, not levels of a categorical factor, for combining the 4 columns with taxon names more easily). The same CSV arguments are used to read both input file (mapping file and quartet file)\n\nSee also mapAllelesCFtable! to input DataFrames instead of file names.\n\nIf a filename is specified, such as \"quartetCF_speciesNames.csv\" in the example below, this file is best read later with the option categorical=false. example:\n\nmapAllelesCFtable(\"allele-species-map.csv\", \"allele-quartet-CF.csv\";\n                  filename = \"quartetCF_speciesNames.csv\")\ndf_sp = CSV.read(\"quartetCF_speciesNames.csv\", categorical=false); # DataFrame object\ndataCF_specieslevel = readTableCF!(df_sp); # DataCF object\n\n\n\n\n\n"
},

{
    "location": "lib/public/#data-and-topology-read/write-1",
    "page": "Public",
    "title": "data and topology read/write",
    "category": "section",
    "text": "readTopology\nreadTopologyLevel1\nreadInputTrees\nreadMultiTopology\nreadSnaqNetwork\nreadTrees2CF\nreadTableCF\nreadTableCF!\nwriteTableCF\nreadBootstrapTrees\nwriteSubTree!\nwriteTopology\nwriteMultiTopology\nmapAllelesCFtable"
},

{
    "location": "lib/public/#PhyloNetworks.snaq!",
    "page": "Public",
    "title": "PhyloNetworks.snaq!",
    "category": "function",
    "text": "snaq!(T::HybridNetwork, d::DataCF)\n\nEstimate the network (or tree) to fit observed quartet concordance factors (CFs) stored in a DataCF object, using maximum pseudo-likelihood. A level-1 network is assumed. The search starts from topology T, which can be a tree or a network with no more than hmax hybrid nodes. The function name ends with ! because it modifies the CF data d by updating its attributes expCF: CFs expected under the network model. It does not modify T. The quartet pseudo-deviance is the negative log pseudo-likelihood, up to an additive constant, such that a perfect fit corresponds to a deviance of 0.0.\n\nOutput:\n\nestimated network in file .out (also in .log): best network overall and list of networks from each individual run.\nthe best network and modifications of it, in file .networks. All networks in this file have the same undirected topology as the best network, but have different hybrid/gene flow directions. These other networks are reported with their pseudo-likelihood scores, because  non-identifiability issues can cause them to have very similar scores, and because  SNaQ was shown to estimate the undirected topology accurately but not the direction of  hybridization in cases of near non-identifiability.\nif any error occurred, file .err provides information (seed) to reproduce the error.\n\nThere are many optional arguments, including\n\nhmax (default 1): maximum number of hybridizations allowed\nverbose (default false): if true, print information about the numerical optimization\nruns (default 10): number of independent starting points for the search\noutgroup (default none): outgroup taxon to root the estimated topology at the very end\nfilename (default \"snaq\"): root name for the output files (.out, .err). If empty (\"\"), files are not created, progress log goes to the screen only (standard out).\nseed (default 0 to get it from the clock): seed to replicate a given search\nprobST (default 0.3): probability to start from T at each given run. With problability 1-probST, the search is started from an NNI modification of T along a tree edge with no hybrid neighbor, with a possible modification of one reticulation if T has one.\nupdateBL (default true): If true and if T is a tree, the branch lengths in T are first optimized roughly with updateBL! by using the average CF of all quartets defining each branch and back-calculating the coalescent units.\n\nThe following optional arguments control when to stop the optimization of branch lengths and γ\'s on each individual candidate network. Defaults are in parentheses:\n\nftolRel (1e-6) and ftolAbs (1e-6): relative and absolute differences of the network score between the current and proposed parameters,\nxtolRel (1e-2) and xtolAbs (1e-3): relative and absolute differences between the current and proposed parameters.\n\nGreater values will result in a less thorough but faster search. These parameters are used when evaluating candidate networks only. The following optional arguments control when to stop proposing new network topologies:\n\nNfail (75): maximum number of times that new topologies are proposed and rejected (in a row).\nliktolAbs (1e-6): the proposed network is accepted if its score is better than the current score by at least liktolAbs.\n\nLower values of Nfail and greater values of liktolAbs and ftolAbs would result in a less thorough but faster search.\n\nAt the end, branch lengths and γ\'s are optimized on the last \"best\" network with different and very thorough tolerance parameters: 1e-12 for ftolRel, 1e-10 for ftolAbs, xtolRel, xtolAbs.\n\nSee also: topologyMaxQPseudolik! to optimize parameters on a fixed topology, and topologyQPseudolik! to get the deviance (pseudo log-likelihood up to a constant) of a fixed topology with fixed parameters.\n\nReference:   Claudia Solís-Lemus and Cécile Ané (2016). Inferring phylogenetic networks with maximum pseudolikelihood under incomplete lineage sorting. PLoS Genetics 12(3):e1005896\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.topologyMaxQPseudolik!",
    "page": "Public",
    "title": "PhyloNetworks.topologyMaxQPseudolik!",
    "category": "function",
    "text": "topologyMaxQPseudolik!(net::HybridNetwork, d::DataCF)\n\nEstimate the branch lengths and inheritance probabilities (γ\'s) for a given network topology. The network is not modified, only the object d is, with updated expected concordance factors.\n\nOuput: new network, with optimized parameters (branch lengths and gammas). The maximized quartet pseudo-deviance is the negative log pseudo-likelihood, up to an additive constant, such that a perfect fit corresponds to a deviance of 0.0. This is also an attribute of the network, which can be accessed with net.loglik.\n\nOptional arguments (default value):\n\nverbose (false): if true, information on the numerical optimization is printed to screen\nftolRel (1e-5), ftolAbs (1e-6), xtolRel (1e-3), xtolAbs (1e-4): absolute and relative tolerance values for the pseudo-deviance function and the parameters\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.topologyQPseudolik!",
    "page": "Public",
    "title": "PhyloNetworks.topologyQPseudolik!",
    "category": "function",
    "text": "topologyQPseudolik!(net::HybridNetwork, d::DataCF)\n\nCalculate the quartet pseudo-deviance of a given network/tree for DataCF d. This is the negative log pseudo-likelihood, up to an additive constant, such that a perfect fit corresponds to a deviance of 0.0.\n\nBe careful if the net object does not have all internal branch lengths specified because then the pseudolikelihood will be meaningless.\n\nThe loglik attribute of the network is undated, and d is updated with the expected concordance factors under the input network.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.fittedQuartetCF",
    "page": "Public",
    "title": "PhyloNetworks.fittedQuartetCF",
    "category": "function",
    "text": "fittedQuartetCF(d::DataCF, format::Symbol)\n\nreturn a data frame with the observed and expected quartet concordance factors after estimation of a network with snaq(T,d). The format can be :wide (default) or :long.\n\nif wide, the output has one row per 4-taxon set, and each row has 10 columns: 4 columns for the taxon names, 3 columns for the observed CFs and 3 columns for the expected CF.\nif long, the output has one row per quartet, i.e. 3 rows per 4-taxon sets, and 7 columns: 4 columns for the taxon names, one column to give the quartet resolution, one column for the observed CF and the last column for the expected CF.\n\nsee also: topologyQPseudolik! and topologyMaxQPseudolik! to update the fitted CF expected under a specific network, inside the DataCF object d.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.bootsnaq",
    "page": "Public",
    "title": "PhyloNetworks.bootsnaq",
    "category": "function",
    "text": "bootsnaq(T::HybridNetwork, df::DataFrame)\nbootsnaq(T::HybridNetwork, vector of tree lists)\n\nBootstrap analysis for SNaQ. Bootstrap data can be quartet concordance factors (CF), drawn from sampling uniformly in their credibility intervals, as given in the data frame df. Alternatively, bootstrap data can be gene trees sampled from a vector of tree lists: one list of bootstrap trees per locus (see readBootstrapTrees to generate this, from a file containing a list of bootstrap files: one per locus).\n\nFrom each bootstrap replicate, a network is estimated with snaq!, with a search starting from topology T. Optional arguments include the following, with default values in parentheses:\n\nhmax (1): max number of reticulations in the estimated networks\nnrep (10): number of bootstrap replicates.\nruns (10): number of independent optimization runs for each replicate\nfilename (\"bootsnaq\"): root name for output files. No output files if \"\".\nseed (0 to get a random seed from the clock): seed for random number generator\notherNet (empty): another starting topology so that each replicate will start prcnet% runs on otherNet and (1-prcnet)% runs on T\nprcnet (0): percentage of runs starting on otherNet; error if different than 0.0, and otherNet not specified.\nftolRel, ftolAbs, xtolRel, xtolAbs, liktolAbs, Nfail, probST, verbose, outgroup: see snaq!, same defaults.\n\nIf T is a tree, its branch lengths are first optimized roughly with updateBL! (by using the average CF of all quartets defining each branch and calculating the coalescent units corresponding to this quartet CF). If T has one or more reticulations, its branch lengths are taken as is to start the search. The branch lengths of otherNet are always taken as is to start the search.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.calibrateFromPairwiseDistances!",
    "page": "Public",
    "title": "PhyloNetworks.calibrateFromPairwiseDistances!",
    "category": "function",
    "text": "calibrateFromPairwiseDistances!(net, distances::Matrix{Float64},\n    taxon_names::Vector{String})\n\nCalibrate the network to match (as best as possible) input pairwise distances between taxa, such as observed from sequence data. taxon_names should provide the list of taxa, in the same order in which they they are considered in the distances matrix. The optimization criterion is the sum of squares between the observed distances, and the distances from the network (weighted average of tree distances, weighted by γ\'s). The network\'s edge lengths are modified.\n\nWarning: for many networks, mutiple calibrations can fit the pairwise distance data equally well (lack of identifiability). This function will output one of these equally good calibrations.\n\noptional arguments (default):\n\ncheckPreorder (true)\nforceMinorLength0 (false) to force minor hybrid edges to have a length of 0\nNLoptMethod (:LDMMA) for the optimization algorithm. Other options include :LNCOBYLA (derivative-free); see NLopt package.\ntolerance values to control when the optimization is stopped: ftolRel (1e-12), ftolAbs (1e-10) on the criterion, and xtolRel (1e-10), xtolAbs (1e-10) on branch lengths / divergence times.\nverbose (false)\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.ticr",
    "page": "Public",
    "title": "PhyloNetworks.ticr",
    "category": "function",
    "text": "ticr!(net, D::DataFrame, optimizeBL::Bool)\nticr!(net, D::DataCF,    optimizeBL::Bool)\nticr(D::DataCF)\n\nGoodness-of-fit test for the adequacy of the multispecies network coalescent, to see if a given population or species network explains the quartet concordance factor data adequately (see Stenz et al 2015 and addendum for the method on trees) Obviously the acronym TICR (Tree Incongruence Checking with R) becomes outdated: with a method extended to networks and implemented in Julia. Oh well :smiley:.\n\nThe tree / network needs to have branch lengths in coalescent units, must be fully resolved, and must be of level 1.\n\nThe model assumes a Dirichlet distribution for the observed quartet concordance factor, with concentration parameter estimated from the data. An outlier p-value is calculated for each four-taxon set. Four-taxon sets are then binned into  categories according to their p-values: 0-0.01, 0.01-0.05, 0.05-0.10, and 0.10-1. Finally, a chi-square goodness-of-fit test is performed on these binned frequency with 3 degrees of freedom, to determine if they departs from the expected proportions (0.01, 0.04, 0.05, 0.90).\n\nThe first version takes a DataFrame object where each row corresponds to a given four-taxon set. The DataFrame is modified by having an additional another column containing the p-values corresponding to each four-taxon set.\nThe second version takes a DataCF object and modifies it by updating the expected concordance factors stored in that object.\nThe last version (which all others call) assumes that the expected concordance factors in the DataCF object are correctly calculated from the test network.\n\noptimizeBL: when false, the loglik field of net is updated; when true, a copy of net with updated branch lengths (in coalescent units) and update loglik is returned.\n\noutput:\n\np-value of the χ^2 test\nχ^2 statistic\nvalue of the pseudo likelihood\nvalue of the concentration parameter α\na vector of outlier p-values, one for each four-taxon set\nnetwork (first and second versions): net with loglik field updated if optimizeBL is false;  copy of net with optimized branch lengths and loglik if optimizeBL is true\n\nReferences\n\nNWM Stenz, B Larget, DA Baum and C Ané (2015). Exploring tree-like and non-tree-like patterns using genome sequences: An example using the inbreeding plant species Arabidopsis thaliana (L.) Heynh. Systematic Biology, 64(5):809-823. doi: 10.1093/sysbio/syv039\n\n\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.ticr!",
    "page": "Public",
    "title": "PhyloNetworks.ticr!",
    "category": "function",
    "text": "ticr!(net, D::DataFrame, optimizeBL::Bool)\nticr!(net, D::DataCF,    optimizeBL::Bool)\nticr(D::DataCF)\n\nGoodness-of-fit test for the adequacy of the multispecies network coalescent, to see if a given population or species network explains the quartet concordance factor data adequately (see Stenz et al 2015 and addendum for the method on trees) Obviously the acronym TICR (Tree Incongruence Checking with R) becomes outdated: with a method extended to networks and implemented in Julia. Oh well :smiley:.\n\nThe tree / network needs to have branch lengths in coalescent units, must be fully resolved, and must be of level 1.\n\nThe model assumes a Dirichlet distribution for the observed quartet concordance factor, with concentration parameter estimated from the data. An outlier p-value is calculated for each four-taxon set. Four-taxon sets are then binned into  categories according to their p-values: 0-0.01, 0.01-0.05, 0.05-0.10, and 0.10-1. Finally, a chi-square goodness-of-fit test is performed on these binned frequency with 3 degrees of freedom, to determine if they departs from the expected proportions (0.01, 0.04, 0.05, 0.90).\n\nThe first version takes a DataFrame object where each row corresponds to a given four-taxon set. The DataFrame is modified by having an additional another column containing the p-values corresponding to each four-taxon set.\nThe second version takes a DataCF object and modifies it by updating the expected concordance factors stored in that object.\nThe last version (which all others call) assumes that the expected concordance factors in the DataCF object are correctly calculated from the test network.\n\noptimizeBL: when false, the loglik field of net is updated; when true, a copy of net with updated branch lengths (in coalescent units) and update loglik is returned.\n\noutput:\n\np-value of the χ^2 test\nχ^2 statistic\nvalue of the pseudo likelihood\nvalue of the concentration parameter α\na vector of outlier p-values, one for each four-taxon set\nnetwork (first and second versions): net with loglik field updated if optimizeBL is false;  copy of net with optimized branch lengths and loglik if optimizeBL is true\n\nReferences\n\nNWM Stenz, B Larget, DA Baum and C Ané (2015). Exploring tree-like and non-tree-like patterns using genome sequences: An example using the inbreeding plant species Arabidopsis thaliana (L.) Heynh. Systematic Biology, 64(5):809-823. doi: 10.1093/sysbio/syv039\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.undirectedOtherNetworks",
    "page": "Public",
    "title": "PhyloNetworks.undirectedOtherNetworks",
    "category": "function",
    "text": "undirectedOtherNetworks(net::HybridNetwork)\n\nReturn a vector of HybridNetwork objects, obtained by switching the placement of each hybrid node to other nodes inside its cycle. This amounts to changing the direction of a gene flow event (recursively to move around the whole cycle of each reticulation).\n\nOptional argument: outgroup, as a String. If an outgroup is specified, then networks conflicting with the placement of the root are avoided.\n\nAssumptions: net is assumed to be of level 1, that is, each blob has a single cycle with a single reticulation. All level-1 fields of net are assumed up-to-date.\n\nExample\n\njulia> net = readTopology(\"(A:1.0,((B:1.1,#H1:0.2::0.2):1.2,(((C:0.52,(E:0.5)#H2:0.02::0.7):0.6,(#H2:0.01::0.3,F:0.7):0.8):0.9,(D:0.8)#H1:0.3::0.8):1.3):0.7):0.1;\");\njulia> vnet = undirectedOtherNetworks(net)\n\n\n\n\n\n"
},

{
    "location": "lib/public/#network-inference-1",
    "page": "Public",
    "title": "network inference",
    "category": "section",
    "text": "snaq!\ntopologyMaxQPseudolik!\ntopologyQPseudolik!\nfittedQuartetCF\nbootsnaq\ncalibrateFromPairwiseDistances!\nticr\nticr!\nundirectedOtherNetworks"
},

{
    "location": "lib/public/#PhyloNetworks.majorTree",
    "page": "Public",
    "title": "PhyloNetworks.majorTree",
    "category": "function",
    "text": "majorTree(net::HybridNetwork)\n\nWarning: assumes correct isMajor attributes.\n\nExtracts the major tree displayed in a network, keeping the major edge and dropping the minor edge at each hybrid node. Returns a HybridNetwork object.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.minorTreeAt",
    "page": "Public",
    "title": "PhyloNetworks.minorTreeAt",
    "category": "function",
    "text": "minorTreeAt(net::HybridNetwork, hybindex::Integer, keepNodes=false)\n\nExtract the tree displayed in the network, following the major hybrid edge at each hybrid node, except at the ith hybrid node (i=hybindex), where the minor hybrid edge is kept instead of the major hybrid edge. If keepNodes is true, all nodes are kept during edge removal.\n\nWarning: assume correct isMajor fields.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.displayedTrees",
    "page": "Public",
    "title": "PhyloNetworks.displayedTrees",
    "category": "function",
    "text": "displayedTrees(net::HybridNetwork, gamma::Float64; keepNodes=false::Bool)\n\nExtracts all trees displayed in a network, following hybrid edges with heritability >= γ threshold (or >0.5 if threshold=0.5) and ignoring any hybrid edge with heritability lower than γ. Returns an array of trees, as HybridNetwork objects.\n\nkeepNodes: if true, keep all nodes during hybrid edge removal.\n\nWarnings:\n\nif keepNodes is true: the retained partner hybrid edges have their γ values unchanged, but their isMajor is changed to true\nassume correct isMajor attributes.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.displayedNetworkAt!",
    "page": "Public",
    "title": "PhyloNetworks.displayedNetworkAt!",
    "category": "function",
    "text": "displayedNetworkAt!(net::HybridNetwork, node::Node, keepNodes=false)\n\nDelete all the minor hybrid edges, except at input node. The network is left with a single hybridization, and otherwise displays the same major tree as before. If keepNodes is true, all nodes are kept during edge removal.\n\nWarning: assume correct isMajor fields.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.hardwiredClusters",
    "page": "Public",
    "title": "PhyloNetworks.hardwiredClusters",
    "category": "function",
    "text": "hardwiredClusters(net::HybridNetwork, S::Union{Vector{String},Vector{Int}})\n\nReturns a matrix describing all the hardwired clusters in a network. Warnings: Clusters are rooted, so the root must be correct.           Allows for missing taxa, with entries all 0.\n\nEach row corresponds to one internal edge, that is, external edges are excluded. If the root is a leaf node, the external edge to that leaf is included (first row). Both parent hybrid edges to a given hybrid node only contribute a single row (they share the same hardwired cluster).\n\nfirst column: edge number\nnext columns: 0/1 values. 1=descendant of edge, 0=not a descendant, or missing taxon.\nlast column:  10/11 values. 10=tree edge, 11=hybrid edge\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.hardwiredCluster",
    "page": "Public",
    "title": "PhyloNetworks.hardwiredCluster",
    "category": "function",
    "text": "hardwiredCluster(edge::Edge,taxa::Union{Vector{String},Vector{Int}})\nhardwiredCluster!(v::Vector{Bool},edge::Edge,taxa::Union{Vector{String},Vector{Int}})\nhardwiredCluster!(v::Vector{Bool},edge::Edge,taxa::Union{Vector{String},Vector{Int}},\n                  visited::Vector{Int})\n\nCalculate the hardwired cluster of node, coded a vector of booleans: true for taxa that are descendent of nodes, false for other taxa (including missing taxa).\n\nThe node should belong in a rooted network for which isChild1 is up-to-date. Run directEdges! beforehand. This is very important, otherwise one might enter an infinite loop, and the function does not test for this.\n\nvisited: vector of node numbers, of all visited nodes.\n\nExamples: #\"\n\njulia> net5 = \"(A,((B,#H1),(((C,(E)#H2),(#H2,F)),(D)#H1)));\" |> readTopology |> directEdges! ;\n\njulia> taxa = net5 |> tipLabels # ABC EF D\n6-element Array{String,1}:\n \"A\"\n \"B\"\n \"C\"\n \"E\"\n \"F\"\n \"D\"\n\njulia> hardwiredCluster(net5.edge[12], taxa) # descendants of 12th edge = CEF\n6-element Array{Bool,1}:\n false\n false\n  true\n  true\n  true\n false\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.hardwiredClusterDistance",
    "page": "Public",
    "title": "PhyloNetworks.hardwiredClusterDistance",
    "category": "function",
    "text": "hardwiredClusterDistance(net1::HybridNetwork, net2::HybridNetwork, rooted::Bool)\n\nTakes 2 networks and returns their hardwired cluster distance, that is, the number of hardwired clusters found in one network and not in the other. Note that this is not a distance per se on the full space of hybrid networks: there are pairs of different networks for which this measure is 0. But it is a distance on some network subspaces.\n\nIf the 2 networks are trees, this is the Robinson-Foulds distance. If rooted=false, the trees are considered unrooted.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.treeEdgesBootstrap",
    "page": "Public",
    "title": "PhyloNetworks.treeEdgesBootstrap",
    "category": "function",
    "text": "treeEdgesBootstrap(boot_net::Vector{HybridNetwork}, ref_net::HybridNetwork)\n\nRead a list of bootstrap networks (boot_net) and a reference network (ref_net), and calculate the bootstrap support of the tree edges in the reference network. All minor hybrid edges (γ<0.5) are removed to extract the major tree from each network. All remaining edges are tree edges, each associated with a bipartition.\n\noutput:\n\na data frame with one row per tree edge and two columns: edge number, bootstrap support (as a percentage)\nthe major tree from the reference network, where minor hybrid edges (with γ<0.5) have been removed.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.hybridDetection",
    "page": "Public",
    "title": "PhyloNetworks.hybridDetection",
    "category": "function",
    "text": "hybridDetection(net::Vector{HybridNetwork}, net1::HybridNetwork, outgroup::AbstractString)\n\nfunction can only compare hybrid nodes in networks that have the same underlying major tree also, need to root all networks in the same place, and the root has to be compatible with the direction of the hybrid edges\n\nit computes the rooted hardwired distance between networks, the root matters. input: vector of bootstrap networks (net), estimated network (net1), outgroup\n\nreturns\n\na matrix with one row per bootstrap network, and 2*number of hybrids in net1,\n\ncolumn i corresponds to whether hybrid i (net1.hybrid[i]) is found in the bootstrap network, column 2i+1 corresponds to the estimated gamma on the bootstrap network (0.0 if hybrid not found). To know the order of hybrids, print net1.hybrid[i] i=1,...,num of hybrids\n\nlist of discrepant trees (trees not matching the main tree in net1)\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.summarizeHFdf",
    "page": "Public",
    "title": "PhyloNetworks.summarizeHFdf",
    "category": "function",
    "text": "summarizeHFdf(HFmat::Matrix)\n\nSummarize data frame output from hybridDetection. Output: dataframe with one row per hybrid, and 5 columns:\n\nhybrid index (order from estimated network, see hybridDetection,\nnumber of bootstrap trees that match the underlying tree of estimated network\nnumber of bootstrap networks that have the hybrid\nmean estimated gamma in the bootstrap networks that have the hybrid\nsd estimated gamma in the bootstrap networks that have the hybrid also\n\nlast row has index -1, and the third column has the number of networks that have all hybrids (hybrid index, mean gamma, sd gamma are meaningless in this last row)\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.hybridBootstrapSupport",
    "page": "Public",
    "title": "PhyloNetworks.hybridBootstrapSupport",
    "category": "function",
    "text": "hybridBootstrapSupport(boot_net::Vector{HybridNetwork}, ref_net::HybridNetwork; rooted=false)\n\nMatch hybrid nodes in a reference network with those in an array of networks, like bootstrap networks. All networks must be fully resolved, and on the same taxon set. If rooted=true, all networks are assumed to have been properly rooted beforehand. Otherwise, the origin of each hybrid edge is considered as an unrooted bipartition (default).\n\nTwo hybrid edges in two networks are said to match if they share the same \"hybrid\" clade (or recipient) and the same \"donor clade\", which is a sister to the hybrid clade in the network. Since a hybrid clade has 2 parent edges, it is sister to two clades simultaneously: one is its major sister (following the major hybrid edge with γ>0.5) and one is its minor sister (following the major hybrid edge with γ<0.5).\n\nTo calculate these hybrid and sister clades at a given hybrid node, all other hybrid edges are first removed from the network. Then, the hybrid clade is the hardwired cluster (descendants) of either hybrid edge and major/minor clade is the hardwired cluster of the sibling edge of the major/minor hybrid parent. If rooted=false, sister clades are considered as bipartitions.\n\nOutput:\n\na \"node\" data frame (see below)\nan \"edge\" data frame (see below)\na \"clade\" data frame to describe the make up of all clades found as hybrids or sisters, starting with a column taxa that lists all taxa. All other columns correspond to a given clade and contain true/false values. true means that a given taxon belongs in a given clade. For a clade named H1, for instance, and if the data frame was named cla, the list of taxa in this clade can be obtained with cla[:taxa][cla[:H1]].\nan array of gamma values, with one row for each bootstrap network and two columns (major/minor) for each hybrid edge in the reference network. If this hybrid edge was found in the bootstrap network (i.e. same hybrid and sister clades, after removal of all other hybrid nodes), its bootstrap gamma value is recorded here. Otherwise, the gamma entry is 0.0.\na vector with the number of each hybrid edge in the reference network, in the same order as for the columns in the array of gamma values above.\n\nThe \"node\" data frame has one row per clade and 9 columns giving:\n\nclade: the clade\'s name, like the taxon name (if a hybrid is a single taxon) or the hybrid tag (like \'H1\') in the reference network\nnode: the node number in the reference network. missing if the clade is not in this network.\nhybridnode: typically the same node number as above, except for hybrid clades in the reference network. For those, the hybrid node number is listed here.\nedge: number of the parent edge, parent to the node in column 2, if found in the ref network. missing otherwise.\nBS_hybrid: percentage of bootstrap networks in which the clade is found to be a hybrid clade.\nBS_sister: percentage of bootstrap networks in which the clade is found to be sister to some hybrid clade (sum of the next 2 columns)\nBSmajorsister: percentage of bootstrap networks in which the clade is found to be the major sister to some hybrid clade\nBSminorsister: same as previous, but minor\nBShybridsamesisters: percentage of bootstrap networks in which the clade is found to be a hybrid and with the same set of sister clades as in the reference network. Applies to hybrid clades found in the reference network only, missing for all other clades.\n\nThe \"edge\" data frame has one row for each pair of clades, and 8 columns:\n\nedge: hybrid edge number, if the edge appears in the reference network. missing otherwise.\nhybrid_clade: name of the clade found to be a hybrid, descendent of \'edge\'\nhybrid: node number of that clade, if it appears in the reference network. missing otherwise.\nsister_clade: name of the clade that is sister to \'edge\', i.e. be sister to a hybrid\nsister: node number of that clade, if in the ref network.\nBShybridedge: percentage of bootstrap networks in which \'edge\' is found to be a hybrid  edge, i.e. when the clade in the \'hybrid\' column is found to be a hybrid and the clade in  the \'sister\' column is one of its sisters.\nBS_major: percentage of bootstrap networks in which \'edge\' is found to be a major hybrid  edge, i.e. when \'hybrid\' is found to be a hybrid clade and \'sister\' is found to be its  major sister.\nBS_minor: same as previous, but minor\n\n\n\n\n\n"
},

{
    "location": "lib/public/#network-Comparisons-1",
    "page": "Public",
    "title": "network Comparisons",
    "category": "section",
    "text": "majorTree\nminorTreeAt\ndisplayedTrees\ndisplayedNetworkAt!\nhardwiredClusters\nhardwiredCluster\nhardwiredClusterDistance\ntreeEdgesBootstrap\nhybridDetection\nsummarizeHFdf\nhybridBootstrapSupport"
},

{
    "location": "lib/public/#PhyloNetworks.simulate",
    "page": "Public",
    "title": "PhyloNetworks.simulate",
    "category": "function",
    "text": "simulate(net::HybridNetwork, params::ParamsProcess, checkPreorder=true::Bool)\n\nSimulate traits on net using the parameters params. For now, only parameters of type ParamsBM (Brownian Motion) are accepted.\n\nThe simulation using a recursion from the root to the tips of the network, therefore, a pre-ordering of nodes is needed. If checkPreorder=true (default), preorder! is called on the network beforehand. Otherwise, it is assumed that the preordering has already been calculated.\n\nReturns an object of type TraitSimulation, which has a matrix with two rows: row 1 for the trait expectations at all the nodes, and row 2 for the actual simulated trait values at all the nodes.\n\nExamples\n\njulia> phy = readTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\", \"examples\", \"carnivores_tree.txt\"));\n\njulia> par = ParamsBM(1, 0.1) # BM with expectation 1 and variance 0.1.\nParamsBM:\nParameters of a BM with fixed root:\nmu: 1\nSigma2: 0.1\n\n\njulia> using Random; Random.seed!(17920921); # for reproducibility\n\njulia> sim = simulate(phy, par) # Simulate on the tree.\nTraitSimulation:\nTrait simulation results on a network with 16 tips, using a BM model, with parameters:\nmu: 1\nSigma2: 0.1\n\n\njulia> traits = sim[:Tips] # Extract simulated values at the tips.\n16-element Array{Float64,1}:\n  2.17618427971927   \n  1.0330846124205684 \n  3.048979175536912  \n  3.0379560744947876 \n  2.189704751299587  \n  4.031588898597555  \n  4.647725850651446  \n -0.8772851731182523 \n  4.625121065244063  \n -0.5111667949991542 \n  1.3560351170535228 \n -0.10311152349323893\n -2.088472913751017  \n  2.6399137689702723 \n  2.8051193818084057 \n  3.1910928691142915 \n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.shiftHybrid",
    "page": "Public",
    "title": "PhyloNetworks.shiftHybrid",
    "category": "function",
    "text": "shiftHybrid(value::Vector{T} where T<:Real, net::HybridNetwork; checkPreorder=true::Bool)\n\nConstruct an object ShiftNet with shifts on all the edges below hybrid nodes, with values provided. The vector of values must have the same length as the number of hybrids in the network.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.getShiftEdgeNumber",
    "page": "Public",
    "title": "PhyloNetworks.getShiftEdgeNumber",
    "category": "function",
    "text": "getShiftEdgeNumber(shift::ShiftNet)\n\nGet the edge numbers where the shifts are located, for an object ShiftNet.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.getShiftValue",
    "page": "Public",
    "title": "PhyloNetworks.getShiftValue",
    "category": "function",
    "text": "getShiftValue(shift::ShiftNet)\n\nGet the values of the shifts, for an object ShiftNet.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.phyloNetworklm",
    "page": "Public",
    "title": "PhyloNetworks.phyloNetworklm",
    "category": "function",
    "text": "phyloNetworklm(f, fr, net, model=\"BM\",\n    fTolRel=1e^-10, fTolAbs=1e^-10, xTolRel=1e^-10, xTolAbs=1e^-10,\n    startingValue=0.5)`\n\nPhylogenetic regression, using the correlation structure induced by the network.\n\nReturns an object of class PhyloNetworkLinearModel. See documentation for this type and example to see all the functions that can be applied to it.\n\nArguments\n\nf::Formula: formula to use for the regression (see the DataFrame package)\nfr::AbstractDataFrame: DataFrame containing the data and regressors at the tips. It should have an extra column labelled \"tipNames\", that gives the names of the taxa for each observation.\nnet::HybridNetwork: phylogenetic network to use. Should have labelled tips.\nmodel::AbstractString=\"BM\": the model to use, \"BM\" (default) or \"lambda\" (for Pagel\'s lambda).\nno_names::Bool=false: if true, force the function to ignore the tips names. The data is then assumed to be in the same order as the tips of the network. Default to false, setting it to true is dangerous, and strongly discouraged.\n\nIf model=\"lambda\", these parameters control the optimization of lambda:\n\nfTolRel::AbstractFloat=1e-10: relative tolerance on the likelihood value for the optimization in lambda.\nfTolAbs::AbstractFloat=1e-10: absolute tolerance on the likelihood value for the optimization in lambda.\nxTolRel::AbstractFloat=1e-10: relative tolerance on the parameter value for the optimization in lambda.\nxTolAbs::AbstractFloat=1e-10: absolute tolerance on the parameter value for the optimization in lambda.\nstartingValue::Real=0.5: the starting value for the parameter in the optimization in lambda.\n\nSee also\n\nType PhyloNetworkLinearModel, Function ancestralStateReconstruction\n\nExamples\n\njulia> phy = readTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\", \"examples\", \"caudata_tree.txt\"));\n\njulia> using CSV # to read data file, next\n\njulia> dat = CSV.read(joinpath(dirname(pathof(PhyloNetworks)), \"..\", \"examples\", \"caudata_trait.txt\"));\n\njulia> using StatsModels # for stat model formulas\n\njulia> fitBM = phyloNetworklm(@formula(trait ~ 1), dat, phy);\n\njulia> fitBM # Shows a summary\nStatsModels.DataFrameRegressionModel{PhyloNetworkLinearModel,Array{Float64,2}}\n\nFormula: trait ~ +1\n\nModel: BM\n\nParameter(s) Estimates:\nSigma2: 0.00294521\n\nCoefficients:\n             Estimate Std.Error t value Pr(>|t|)\n(Intercept)     4.679  0.330627 14.1519   <1e-31\n\nLog Likelihood: -78.9611507833\nAIC: 161.9223015666\n\njulia> round(sigma2_estim(fitBM), digits=6) # rounding for jldoctest convenience\n0.002945\n\njulia> round(mu_estim(fitBM), digits=4)\n4.679\n\njulia> using StatsBase # for aic() stderror() loglikelihood() etc.\n\njulia> round(loglikelihood(fitBM), digits=10)\n-78.9611507833\n\njulia> round(aic(fitBM), digits=10)\n161.9223015666\n\njulia> round(aicc(fitBM), digits=10)\n161.9841572367\n\njulia> round(bic(fitBM), digits=10)\n168.4887090241\n\njulia> round.(coef(fitBM), digits=4)\n1-element Array{Float64,1}:\n 4.679\n\njulia> confint(fitBM)\n1×2 Array{Float64,2}:\n 4.02696  5.33104\n\njulia> abs(round(r2(fitBM), digits=10)) # absolute value for jldoctest convenience\n0.0\n\njulia> abs(round(adjr2(fitBM), digits=10))\n0.0\n\njulia> round.(vcov(fitBM), digits=6)\n1×1 Array{Float64,2}:\n 0.109314\n\njulia> round.(residuals(fitBM), digits=6)\n197-element Array{Float64,1}:\n -0.237648\n -0.357937\n -0.159387\n -0.691868\n -0.323977\n -0.270452\n -0.673486\n -0.584654\n -0.279882\n -0.302175\n  ⋮\n -0.777026\n -0.385121\n -0.443444\n -0.327303\n -0.525953\n -0.673486\n -0.603158\n -0.211712\n -0.439833\n\njulia> round.(response(fitBM), digits=5)\n197-element Array{Float64,1}:\n 4.44135\n 4.32106\n 4.51961\n 3.98713\n 4.35502\n 4.40855\n 4.00551\n 4.09434\n 4.39912\n 4.37682\n ⋮\n 3.90197\n 4.29388\n 4.23555\n 4.3517\n 4.15305\n 4.00551\n 4.07584\n 4.46729\n 4.23917\n\njulia> round.(predict(fitBM), digits=5)\n197-element Array{Float64,1}:\n 4.679\n 4.679\n 4.679\n 4.679\n 4.679\n 4.679\n 4.679\n 4.679\n 4.679\n 4.679\n ⋮\n 4.679\n 4.679\n 4.679\n 4.679\n 4.679\n 4.679\n 4.679\n 4.679\n 4.679\n\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.sigma2_estim",
    "page": "Public",
    "title": "PhyloNetworks.sigma2_estim",
    "category": "function",
    "text": "sigma2_estim(m::PhyloNetworkLinearModel)\n\nEstimated variance for a fitted object.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.mu_estim",
    "page": "Public",
    "title": "PhyloNetworks.mu_estim",
    "category": "function",
    "text": "mu_estim(m::PhyloNetworkLinearModel)\n\nEstimated root value for a fitted object.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.lambda_estim",
    "page": "Public",
    "title": "PhyloNetworks.lambda_estim",
    "category": "function",
    "text": "lambda_estim(m::PhyloNetworkLinearModel)\n\nEstimated lambda parameter for a fitted object.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.ancestralStateReconstruction",
    "page": "Public",
    "title": "PhyloNetworks.ancestralStateReconstruction",
    "category": "function",
    "text": "ancestralStateReconstruction(net::HybridNetwork, Y::Vector, params::ParamsBM)\n\nCompute the conditional expectations and variances of the ancestral (un-observed) traits values at the internal nodes of the phylogenetic network (net), given the values of the traits at the tips of the network (Y) and some known parameters of the process used for trait evolution (params, only BM with fixed root works for now).\n\nThis function assumes that the parameters of the process are known. For a more general function, see ancestralStateReconstruction(obj::PhyloNetworkLinearModel[, X_n::Matrix]).\n\n\n\n\n\nancestralStateReconstruction(obj::PhyloNetworkLinearModel[, X_n::Matrix])\n\nFunction to find the ancestral traits reconstruction on a network, given an object fitted by function phyloNetworklm. By default, the function assumes that the regressor is just an intercept. If the value of the regressor for all the ancestral states is known, it can be entered in X_n, a matrix with as many columns as the number of predictors used, and as many lines as the number of unknown nodes or tips.\n\nReturns an object of type ReconstructedStates. See documentation for this type and examples for functions that can be applied to it.\n\nExamples\n\njulia> using CSV # to read data file\n\njulia> phy = readTopology(joinpath(dirname(pathof(PhyloNetworks)), \"..\", \"examples\", \"carnivores_tree.txt\"));\n\njulia> dat = CSV.read(joinpath(dirname(pathof(PhyloNetworks)), \"..\", \"examples\", \"carnivores_trait.txt\"));\n\njulia> using StatsModels # for statistical model formulas\n\njulia> fitBM = phyloNetworklm(@formula(trait ~ 1), dat, phy);\n\njulia> ancStates = ancestralStateReconstruction(fitBM) # Should produce a warning, as variance is unknown.\n┌ Warning: These prediction intervals show uncertainty in ancestral values,\n│ assuming that the estimated variance rate of evolution is correct.\n│ Additional uncertainty in the estimation of this variance rate is\n│ ignored, so prediction intervals should be larger.\n└ @ PhyloNetworks ~/build/crsl4/PhyloNetworks.jl/src/traits.jl:2163\nReconstructedStates:\n     Node index     Pred.       Min. Max. (95%)\n           -5.0   1.32139  -0.288423     2.9312\n           -8.0   1.03258  -0.539072    2.60423\n           -7.0   1.41575 -0.0934395    2.92495\n           -6.0   1.39417 -0.0643135    2.85265\n           -4.0   1.39961 -0.0603343    2.85955\n           -3.0   1.51341  -0.179626    3.20644\n          -13.0    5.3192    3.96695    6.67145\n          -12.0   4.51176    2.94268    6.08085\n          -16.0   1.50947  0.0290151    2.98992\n          -15.0   1.67425   0.241696    3.10679\n          -14.0   1.80309   0.355568     3.2506\n          -11.0    2.7351    1.21896    4.25123\n          -10.0   2.73217    1.16545    4.29889\n           -9.0   2.41132   0.639075    4.18357\n           -2.0   2.04138 -0.0340955    4.11686\n           14.0   1.64289    1.64289    1.64289\n            8.0   1.67724    1.67724    1.67724\n            5.0  0.331568   0.331568   0.331568\n            2.0   2.27395    2.27395    2.27395\n            4.0  0.275237   0.275237   0.275237\n            6.0   3.39094    3.39094    3.39094\n           13.0  0.355799   0.355799   0.355799\n           15.0  0.542565   0.542565   0.542565\n            7.0  0.773436   0.773436   0.773436\n           10.0   6.94985    6.94985    6.94985\n           11.0   4.78323    4.78323    4.78323\n           12.0   5.33016    5.33016    5.33016\n            1.0 -0.122604  -0.122604  -0.122604\n           16.0   0.73989    0.73989    0.73989\n            9.0   4.84236    4.84236    4.84236\n            3.0    1.0695     1.0695     1.0695\n\n\njulia> expectations(ancStates)\n31×2 DataFrames.DataFrame\n│ Row │ nodeNumber │ condExpectation │\n│     │ Int64      │ Float64         │\n├─────┼────────────┼─────────────────┤\n│ 1   │ -5         │ 1.32139         │\n│ 2   │ -8         │ 1.03258         │\n│ 3   │ -7         │ 1.41575         │\n│ 4   │ -6         │ 1.39417         │\n│ 5   │ -4         │ 1.39961         │\n│ 6   │ -3         │ 1.51341         │\n│ 7   │ -13        │ 5.3192          │\n⋮\n│ 24  │ 7          │ 0.773436        │\n│ 25  │ 10         │ 6.94985         │\n│ 26  │ 11         │ 4.78323         │\n│ 27  │ 12         │ 5.33016         │\n│ 28  │ 1          │ -0.122604       │\n│ 29  │ 16         │ 0.73989         │\n│ 30  │ 9          │ 4.84236         │\n│ 31  │ 3          │ 1.0695          │\n\njulia> predint(ancStates)\n31×2 Array{Float64,2}:\n -0.288423    2.9312\n -0.539072    2.60423\n -0.0934395   2.92495\n -0.0643135   2.85265\n -0.0603343   2.85955\n -0.179626    3.20644\n  3.96695     6.67145\n  2.94268     6.08085\n  0.0290151   2.98992\n  0.241696    3.10679\n  ⋮\n  0.542565    0.542565\n  0.773436    0.773436\n  6.94985     6.94985\n  4.78323     4.78323\n  5.33016     5.33016\n -0.122604   -0.122604\n  0.73989     0.73989\n  4.84236     4.84236\n  1.0695      1.0695\n\njulia> expectationsPlot(ancStates) # format the ancestral states\n31×2 DataFrames.DataFrame\n│ Row │ nodeNumber │ PredInt   │\n│     │ Int64      │ Abstract… │\n├─────┼────────────┼───────────┤\n│ 1   │ -5         │ 1.32      │\n│ 2   │ -8         │ 1.03      │\n│ 3   │ -7         │ 1.42      │\n│ 4   │ -6         │ 1.39      │\n│ 5   │ -4         │ 1.4       │\n│ 6   │ -3         │ 1.51      │\n│ 7   │ -13        │ 5.32      │\n⋮\n│ 24  │ 7          │ 0.77      │\n│ 25  │ 10         │ 6.95      │\n│ 26  │ 11         │ 4.78      │\n│ 27  │ 12         │ 5.33      │\n│ 28  │ 1          │ -0.12     │\n│ 29  │ 16         │ 0.74      │\n│ 30  │ 9          │ 4.84      │\n│ 31  │ 3          │ 1.07      │\n\njulia> using PhyloPlots # next: plot ancestral states on the tree\n\njulia> plot(phy, :RCall, nodeLabel = expectationsPlot(ancStates));\n\njulia> predintPlot(ancStates)\n31×2 DataFrames.DataFrame\n│ Row │ nodeNumber │ PredInt       │\n│     │ Int64      │ Abstract…     │\n├─────┼────────────┼───────────────┤\n│ 1   │ -5         │ [-0.29, 2.93] │\n│ 2   │ -8         │ [-0.54, 2.6]  │\n│ 3   │ -7         │ [-0.09, 2.92] │\n│ 4   │ -6         │ [-0.06, 2.85] │\n│ 5   │ -4         │ [-0.06, 2.86] │\n│ 6   │ -3         │ [-0.18, 3.21] │\n│ 7   │ -13        │ [3.97, 6.67]  │\n⋮\n│ 24  │ 7          │ 0.77          │\n│ 25  │ 10         │ 6.95          │\n│ 26  │ 11         │ 4.78          │\n│ 27  │ 12         │ 5.33          │\n│ 28  │ 1          │ -0.12         │\n│ 29  │ 16         │ 0.74          │\n│ 30  │ 9          │ 4.84          │\n│ 31  │ 3          │ 1.07          │\n\njulia> plot(phy, :RCall, nodeLabel = predintPlot(ancStates));\n\njulia> using DataFrames # to use allowmissing!\n\njulia> allowmissing!(dat, :trait);\n\njulia> dat[[2, 5], :trait] = missing; # missing values allowed to fit model\n\njulia> fitBM = phyloNetworklm(@formula(trait ~ 1), dat, phy);\n\njulia> ancStates = ancestralStateReconstruction(fitBM);\n┌ Warning: These prediction intervals show uncertainty in ancestral values,\n│ assuming that the estimated variance rate of evolution is correct.\n│ Additional uncertainty in the estimation of this variance rate is\n│ ignored, so prediction intervals should be larger.\n└ @ PhyloNetworks ~/build/crsl4/PhyloNetworks.jl/src/traits.jl:2163\n\njulia> expectations(ancStates)\n31×2 DataFrames.DataFrame\n│ Row │ nodeNumber │ condExpectation │\n│     │ Int64      │ Float64         │\n├─────┼────────────┼─────────────────┤\n│ 1   │ -5         │ 1.42724         │\n│ 2   │ -8         │ 1.35185         │\n│ 3   │ -7         │ 1.61993         │\n│ 4   │ -6         │ 1.54198         │\n│ 5   │ -4         │ 1.53916         │\n│ 6   │ -3         │ 1.64984         │\n│ 7   │ -13        │ 5.33508         │\n⋮\n│ 24  │ 7          │ 0.773436        │\n│ 25  │ 10         │ 6.94985         │\n│ 26  │ 11         │ 4.78323         │\n│ 27  │ 12         │ 5.33016         │\n│ 28  │ 1          │ -0.122604       │\n│ 29  │ 16         │ 0.73989         │\n│ 30  │ 9          │ 4.84236         │\n│ 31  │ 3          │ 1.0695          │\n\njulia> predint(ancStates)\n31×2 Array{Float64,2}:\n -0.31245     3.16694\n -0.625798    3.3295\n -0.110165    3.35002\n -0.0710391   3.15501\n -0.0675924   3.14591\n -0.197236    3.49692\n  3.89644     6.77373\n  2.8741      6.22808\n -0.0358627   3.12834\n  0.182594    3.2534\n  ⋮\n  0.542565    0.542565\n  0.773436    0.773436\n  6.94985     6.94985\n  4.78323     4.78323\n  5.33016     5.33016\n -0.122604   -0.122604\n  0.73989     0.73989\n  4.84236     4.84236\n  1.0695      1.0695\n\njulia> expectationsPlot(ancStates) # format node <-> ancestral state\n31×2 DataFrames.DataFrame\n│ Row │ nodeNumber │ PredInt   │\n│     │ Int64      │ Abstract… │\n├─────┼────────────┼───────────┤\n│ 1   │ -5         │ 1.43      │\n│ 2   │ -8         │ 1.35      │\n│ 3   │ -7         │ 1.62      │\n│ 4   │ -6         │ 1.54      │\n│ 5   │ -4         │ 1.54      │\n│ 6   │ -3         │ 1.65      │\n│ 7   │ -13        │ 5.34      │\n⋮\n│ 24  │ 7          │ 0.77      │\n│ 25  │ 10         │ 6.95      │\n│ 26  │ 11         │ 4.78      │\n│ 27  │ 12         │ 5.33      │\n│ 28  │ 1          │ -0.12     │\n│ 29  │ 16         │ 0.74      │\n│ 30  │ 9          │ 4.84      │\n│ 31  │ 3          │ 1.07      │\n\njulia> plot(phy, :RCall, nodeLabel = expectationsPlot(ancStates));\n\njulia> predintPlot(ancStates) # prediction intervals, in data frame, useful to plot\n31×2 DataFrames.DataFrame\n│ Row │ nodeNumber │ PredInt       │\n│     │ Int64      │ Abstract…     │\n├─────┼────────────┼───────────────┤\n│ 1   │ -5         │ [-0.31, 3.17] │\n│ 2   │ -8         │ [-0.63, 3.33] │\n│ 3   │ -7         │ [-0.11, 3.35] │\n│ 4   │ -6         │ [-0.07, 3.16] │\n│ 5   │ -4         │ [-0.07, 3.15] │\n│ 6   │ -3         │ [-0.2, 3.5]   │\n│ 7   │ -13        │ [3.9, 6.77]   │\n⋮\n│ 24  │ 7          │ 0.77          │\n│ 25  │ 10         │ 6.95          │\n│ 26  │ 11         │ 4.78          │\n│ 27  │ 12         │ 5.33          │\n│ 28  │ 1          │ -0.12         │\n│ 29  │ 16         │ 0.74          │\n│ 30  │ 9          │ 4.84          │\n│ 31  │ 3          │ 1.07          │\n\njulia> plot(phy, :RCall, nodeLabel = predintPlot(ancStates));\n\n\n\n\n\nancestralStateReconstruction(fr::AbstractDataFrame, net::HybridNetwork; kwargs...)\n\nFunction to find the ancestral traits reconstruction on a network, given some data at the tips. Uses function phyloNetworklm to perform a phylogenetic regression of the data against an intercept (amounts to fitting an evolutionary model on the network, BM being the only option available for now).\n\nSee documentation on phyloNetworklm and ancestralStateReconstruction(obj::PhyloNetworkLinearModel[, X_n::Matrix]) for further details.\n\nReturns an object of type ReconstructedStates.\n\n\n\n\n\nancestralStateReconstruction(obj::SSM, trait::Integer)\nancestralStateReconstruction(obj::SSM)\n\nEstimate the marginal probability of ancestral states for discrete character number trait, or for the active trait if trait is unspecified: obj.activetrait. The parameters of the StatisticalSubstitutionModel object obj must first be fitted using fitDiscrete, and ancestral state reconstruction is conditional on the estimated parameters. If these parameters were estimated using all traits, they are used as is to do ancestral state reconstruction of the particular trait of interest.\n\noutput: data frame with a first column for the node numbers, a second column for the node labels, and a column for each possible state: the entries in these columns give the marginal probability that a given node has a given state.\n\nwarnings\n\nnode numbers and node labels refer to those in obj.net, which might have a different internal representation of nodes than the original network used to build obj.\nobj is modified: its likelihood fields (forward, directional & backward) are updated to make sure that they correspond to the current parameter values in obj.model, and to the trait of interest.\n\nSee also discrete_backwardlikelihood_tree! to update obj.backwardlik.\n\nexamples\n\njulia> net = readTopology(\"(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);\");\n\njulia> m1 = BinaryTraitSubstitutionModel([0.1, 0.1], [\"lo\", \"hi\"]);\n\njulia> using DataFrames\n\njulia> dat = DataFrame(species=[\"C\",\"A\",\"B\",\"D\"], trait=[\"hi\",\"lo\",\"lo\",\"hi\"]);\n\njulia> fit1 = fitDiscrete(net, m1, dat);\n\njulia> asr = ancestralStateReconstruction(fit1)\n9×4 DataFrames.DataFrame\n│ Row │ nodenumber │ nodelabel │ lo       │ hi       │\n│     │ Int64      │ String    │ Float64  │ Float64  │\n├─────┼────────────┼───────────┼──────────┼──────────┤\n│ 1   │ 1          │ A         │ 1.0      │ 0.0      │\n│ 2   │ 2          │ B         │ 1.0      │ 0.0      │\n│ 3   │ 3          │ C         │ 0.0      │ 1.0      │\n│ 4   │ 4          │ D         │ 0.0      │ 1.0      │\n│ 5   │ 5          │ 5         │ 0.286019 │ 0.713981 │\n│ 6   │ 6          │ 6         │ 0.319454 │ 0.680546 │\n│ 7   │ 7          │ 7         │ 0.168549 │ 0.831451 │\n│ 8   │ 8          │ 8         │ 0.76736  │ 0.23264  │\n│ 9   │ 9          │ #H1       │ 0.782777 │ 0.217223 │\n\njulia> round.(exp.(fit1.postltw), digits=6) # marginal (posterior) probability that the trait evolved on each displayed tree\n2-element Array{Float64,1}:\n 0.919831 \n 0.080169\n\njulia> using PhyloPlots\n\njulia> plot(fit1.net, :R, nodeLabel = asr[[:nodenumber, :lo]], tipOffset=0.2); # pp for \"lo\" state\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.expectations",
    "page": "Public",
    "title": "PhyloNetworks.expectations",
    "category": "function",
    "text": "expectations(obj::ReconstructedStates)\n\nEstimated reconstructed states at the nodes and tips.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.predint",
    "page": "Public",
    "title": "PhyloNetworks.predint",
    "category": "function",
    "text": "predint(obj::ReconstructedStates; level=0.95::Real)\n\nPrediction intervals with level level for internal nodes and missing tips.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.expectationsPlot",
    "page": "Public",
    "title": "PhyloNetworks.expectationsPlot",
    "category": "function",
    "text": "expectationsPlot(obj::ReconstructedStates)\n\nCompute and format the expected reconstructed states for the plotting function. The resulting dataframe can be readily used as a nodeLabel argument to plot from package PhyloPlots. Keyword argument markMissing is a string that is appended to predicted tip values, so that they can be distinguished from the actual datapoints. Default to \"*\". Set to \"\" to remove any visual cue.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.predintPlot",
    "page": "Public",
    "title": "PhyloNetworks.predintPlot",
    "category": "function",
    "text": "predintPlot(obj::ReconstructedStates; level=0.95::Real, withExp=false::Bool)\n\nCompute and format the prediction intervals for the plotting function. The resulting dataframe can be readily used as a nodeLabel argument to plot from package PhyloPlots. Keyworks argument level control the confidence level of the prediction interval. If withExp is set to true, then the best predicted value is also shown along with the interval.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.descendenceMatrix",
    "page": "Public",
    "title": "PhyloNetworks.descendenceMatrix",
    "category": "function",
    "text": "descendenceMatrix(net::HybridNetwork; checkPreorder=true::Bool)\n\nThis function computes the inciednce matrix between all the nodes of a network. It assumes that the network is in the pre-order. If checkPreorder is true (default), then it runs function preoder on the network beforehand.\n\nReturns an object of type MatrixTopologicalOrder.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.regressorShift",
    "page": "Public",
    "title": "PhyloNetworks.regressorShift",
    "category": "function",
    "text": "regressorShift(node::Vector{Node}, net::HybridNetwork; checkPreorder=true::Bool)\n\nregressorShift(edge::Vector{Edge}, net::HybridNetwork; checkPreorder=true::Bool)\n\nCompute the regressor vectors associated with shifts on edges that are above nodes node, or on edges edge, on a network net. It uses function descendenceMatrix, so net might be modified to sort it in a pre-order. Return a DataFrame with as many rows as there are tips in net, and a column for each shift, each labelled according to the pattern shift{numberof_edge}. It has an aditional column labelled tipNames to allow easy fitting afterward (see example).\n\nExamples\n\njulia> net = readTopology(\"(A:2.5,((B:1,#H1:0.5::0.4):1,(C:1,(D:0.5)#H1:0.5::0.6):1):0.5);\");\n\njulia> preorder!(net)\n\njulia> using PhyloPlots\n\njulia> plot(net, :RCall, showNodeNumber=true); # to locate nodes\n\njulia> nodes_shifts = indexin([1,-5], [n.number for n in net.node]) # Put a shift on edges ending at nodes 1 and -5\n2-element Array{Union{Nothing, Int64},1}:\n 1\n 7\n\njulia> params = ParamsBM(10, 0.1, ShiftNet(net.node[nodes_shifts], [3.0, -3.0],  net))\nParamsBM:\nParameters of a BM with fixed root:\nmu: 10\nSigma2: 0.1\n\nThere are 2 shifts on the network:\n     Edge Number Shift Value\n             8.0        -3.0\n             1.0         3.0\n\njulia> using Random; Random.seed!(2468); # sets the seed for reproducibility\n\njulia> sim = simulate(net, params); # simulate a dataset with shifts\n\njulia> using DataFrames # to handle data frames\n\njulia> dat = DataFrame(trait = sim[:Tips], tipNames = sim.M.tipNames)\n4×2 DataFrames.DataFrame\n│ Row │ trait   │ tipNames │\n│     │ Float64 │ String   │\n├─────┼─────────┼──────────┤\n│ 1   │ 13.392  │ A        │\n│ 2   │ 9.55741 │ B        │\n│ 3   │ 7.17704 │ C        │\n│ 4   │ 7.88906 │ D        │\n\njulia> dfr_shift = regressorShift(net.node[nodes_shifts], net) # the regressors matching the shifts.\n4×3 DataFrames.DataFrame\n│ Row │ shift_1 │ shift_8 │ tipNames │\n│     │ Float64 │ Float64 │ String   │\n├─────┼─────────┼─────────┼──────────┤\n│ 1   │ 1.0     │ 0.0     │ A        │\n│ 2   │ 0.0     │ 0.0     │ B        │\n│ 3   │ 0.0     │ 1.0     │ C        │\n│ 4   │ 0.0     │ 0.6     │ D        │\n\njulia> dfr = join(dat, dfr_shift, on=:tipNames); # join data and regressors in a single dataframe\n\njulia> using StatsModels # for statistical model formulas\n\njulia> fitBM = phyloNetworklm(@formula(trait ~ shift_1 + shift_8), dfr, net) # actual fit\nStatsModels.DataFrameRegressionModel{PhyloNetworkLinearModel,Array{Float64,2}}\n\nFormula: trait ~ 1 + shift_1 + shift_8\n\nModel: BM\n\nParameter(s) Estimates:\nSigma2: 0.0112618\n\nCoefficients:\n             Estimate Std.Error  t value Pr(>|t|)\n(Intercept)   9.48238  0.327089  28.9902   0.0220\nshift_1        3.9096   0.46862  8.34279   0.0759\nshift_8       -2.4179  0.422825 -5.71843   0.1102\n\nLog Likelihood: 1.8937302027\nAIC: 4.2125395947\n\n\nSee also\n\nphyloNetworklm, descendenceMatrix, regressorHybrid.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.regressorHybrid",
    "page": "Public",
    "title": "PhyloNetworks.regressorHybrid",
    "category": "function",
    "text": "regressorHybrid(net::HybridNetwork; checkPreorder=true::Bool)\n\nCompute the regressor vectors associated with shifts on edges that imediatly below all hybrid nodes of net. It uses function descendenceMatrix through a call to regressorShift, so net might be modified to sort it in a pre-order. Return a DataFrame with as many rows as there are tips in net, and a column for each hybrid, each labelled according to the pattern shift{numberof_edge}. It has an aditional column labelled tipNames to allow easy fitting afterward (see example).\n\nThis function can be used to test for heterosis.\n\nExamples\n\njulia> using DataFrames # Needed to handle data frames.\n\njulia> net = readTopology(\"(A:2.5,((B:1,#H1:0.5::0.4):1,(C:1,(D:0.5)#H1:0.5::0.6):1):0.5);\");\n\njulia> preorder!(net)\n\njulia> using PhyloPlots\n\njulia> plot(net, :RCall, showNodeNumber=true); # to locate nodes: node 5 is child of hybrid node\n\njulia> nodes_hybrids = indexin([5], [n.number for n in net.node]) # Put a shift on edges below hybrids\n1-element Array{Union{Nothing, Int64},1}:\n 5\n\njulia> params = ParamsBM(10, 0.1, ShiftNet(net.node[nodes_hybrids], [3.0],  net))\nParamsBM:\nParameters of a BM with fixed root:\nmu: 10\nSigma2: 0.1\n\nThere are 1 shifts on the network:\n     Edge Number Shift Value\n             6.0         3.0\n\n\n\njulia> using Random; Random.seed!(2468); # sets the seed for reproducibility\n\njulia> sim = simulate(net, params); # simulate a dataset with shifts\n\njulia> dat = DataFrame(trait = sim[:Tips], tipNames = sim.M.tipNames)\n4×2 DataFrames.DataFrame\n│ Row │ trait   │ tipNames │\n│     │ Float64 │ String   │\n├─────┼─────────┼──────────┤\n│ 1   │ 10.392  │ A        │\n│ 2   │ 9.55741 │ B        │\n│ 3   │ 10.177  │ C        │\n│ 4   │ 12.6891 │ D        │\n\njulia> dfr_hybrid = regressorHybrid(net) # the reressors matching the hybrids.\n4×3 DataFrames.DataFrame\n│ Row │ shift_6 │ tipNames │ sum     │\n│     │ Float64 │ String   │ Float64 │\n├─────┼─────────┼──────────┼─────────┤\n│ 1   │ 0.0     │ A        │ 0.0     │\n│ 2   │ 0.0     │ B        │ 0.0     │\n│ 3   │ 0.0     │ C        │ 0.0     │\n│ 4   │ 1.0     │ D        │ 1.0     │\n\njulia> dfr = join(dat, dfr_hybrid, on=:tipNames); # join data and regressors in a single dataframe\n\njulia> using StatsModels\n\njulia> fitBM = phyloNetworklm(@formula(trait ~ shift_6), dfr, net) # actual fit\nStatsModels.DataFrameRegressionModel{PhyloNetworkLinearModel,Array{Float64,2}}\n\nFormula: trait ~ 1 + shift_6\n\nModel: BM\n\nParameter(s) Estimates:\nSigma2: 0.041206\n\nCoefficients:\n             Estimate Std.Error t value Pr(>|t|)\n(Intercept)    10.064  0.277959 36.2068   0.0008\nshift_6       2.72526  0.315456 8.63912   0.0131\n\nLog Likelihood: -0.7006021946\nAIC: 7.4012043891\n\n\nSee also\n\nphyloNetworklm, descendenceMatrix, regressorShift.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.sharedPathMatrix",
    "page": "Public",
    "title": "PhyloNetworks.sharedPathMatrix",
    "category": "function",
    "text": "sharedPathMatrix(net::HybridNetwork; checkPreorder=true::Bool)\n\nThis function computes the shared path matrix between all the nodes of a network. It assumes that the network is in the pre-order. If checkPreorder is true (default), then it runs function preoder on the network beforehand.\n\nReturns an object of type MatrixTopologicalOrder.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.vcv",
    "page": "Public",
    "title": "PhyloNetworks.vcv",
    "category": "function",
    "text": "vcv(net::HybridNetwork; model=\"BM\"::AbstractString, \n                        corr=false::Bool,\n                        checkPreorder=true::Bool)\n\nThis function computes the variance covariance matrix between the tips of the network, assuming a Brownian model of trait evolution (with unit variance). If optional argument corr is set to true, then the correlation matrix is returned instead.\n\nThe function returns a DataFrame object, with columns named by the tips of the network.\n\nThe calculation of the covariance matrix requires a pre-ordering of nodes to be fast. If checkPreorder is true (default), then preorder! is run on the network beforehand. Otherwise, the network is assumed to be already in pre-order.\n\nThis function internally calls sharedPathMatrix, that computes the variance matrix between all the nodes of the network.\n\nExamples\n\njulia> tree_str = \"(((t2:0.14,t4:0.33):0.59,t3:0.96):0.14,(t5:0.70,t1:0.18):0.90);\";\n\njulia> tree = readTopology(tree_str);\n\njulia> C = vcv(tree)\n5×5 DataFrames.DataFrame\n│ Row │ t2      │ t4      │ t3      │ t5      │ t1      │\n│     │ Float64 │ Float64 │ Float64 │ Float64 │ Float64 │\n├─────┼─────────┼─────────┼─────────┼─────────┼─────────┤\n│ 1   │ 0.87    │ 0.73    │ 0.14    │ 0.0     │ 0.0     │\n│ 2   │ 0.73    │ 1.06    │ 0.14    │ 0.0     │ 0.0     │\n│ 3   │ 0.14    │ 0.14    │ 1.1     │ 0.0     │ 0.0     │\n│ 4   │ 0.0     │ 0.0     │ 0.0     │ 1.6     │ 0.9     │\n│ 5   │ 0.0     │ 0.0     │ 0.0     │ 0.9     │ 1.08    │\n\n\nThe following block needs ape to be installed (not run):\n\njulia> using RCall # Comparison with ape vcv function\n\njulia> R\"ape::vcv(ape::read.tree(text = $tree_str))\"\nRCall.RObject{RCall.RealSxp}\n     t2   t4   t3  t5   t1\nt2 0.87 0.73 0.14 0.0 0.00\nt4 0.73 1.06 0.14 0.0 0.00\nt3 0.14 0.14 1.10 0.0 0.00\nt5 0.00 0.00 0.00 1.6 0.90\nt1 0.00 0.00 0.00 0.9 1.08\n\n\nThe covariance can also be calculated on a network (for the model, see for Bastide et al. 2018)\n\njulia> net = readTopology(\"((t1:1.0,#H1:0.1::0.30):0.5,((t2:0.9)#H1:0.2::0.70,t3:1.1):0.4);\");\n\njulia> C = vcv(net)\n3×3 DataFrames.DataFrame\n│ Row │ t1      │ t2      │ t3      │\n│     │ Float64 │ Float64 │ Float64 │\n├─────┼─────────┼─────────┼─────────┤\n│ 1   │ 1.5     │ 0.15    │ 0.0     │\n│ 2   │ 0.15    │ 1.248   │ 0.28    │\n│ 3   │ 0.0     │ 0.28    │ 1.5     │\n\n\n\n\n\n"
},

{
    "location": "lib/public/#continuous-trait-evolution-1",
    "page": "Public",
    "title": "continuous trait evolution",
    "category": "section",
    "text": "simulate\nshiftHybrid\ngetShiftEdgeNumber\ngetShiftValue\nphyloNetworklm\nsigma2_estim\nmu_estim\nlambda_estim\nancestralStateReconstruction\nexpectations\npredint\nexpectationsPlot\npredintPlot\ndescendenceMatrix\nregressorShift\nregressorHybrid\nsharedPathMatrix\nvcv"
},

{
    "location": "lib/public/#PhyloNetworks.parsimonySoftwired",
    "page": "Public",
    "title": "PhyloNetworks.parsimonySoftwired",
    "category": "function",
    "text": "parsimonySoftwired(net, tipdata)\nparsimonySoftwired(net, species, sequences)\n\nCalculate the most parsimonious (MP) score of a network given a discrete character at the tips. The softwired parsimony concept is used: where the number of state transitions is minimized over all trees displayed in the network.\n\nData can given in one of the following:\n\ntipdata: data frame for a single trait, in which case the taxon names  are to appear in column 1 or in a column named \"taxon\" or \"species\", and  trait values are to appear in column 2 or in a column named \"trait\".\ntipdata: dictionary taxon => state, for a single trait.\nspecies: array of strings, and sequences: array of sequences,  in the order corresponding to the order of species names.\n\nalgorithm\n\nThe dynamic programming algorithm by Fischer et al. (2015) is used. The function loops over all the displayed subtrees within a blob (biconnected component), so its complexity is of the order of n * m * c^2 * 2^level where n is the number of tips, m the number of traits, c the number of states, and level is the level of the network: the maximum number of hybridizations within a blob.\n\nSee parsimonyGF for a different algorithm, slower but extendable to other parsimony criteria.\n\nreferences\n\nFischer, M., van Iersel, L., Kelk, S., Scornavacca, C. (2015). On computing the Maximum Parsimony score of a phylogenetic network. SIAM J. Discrete Math., 29(1):559-585.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.parsimonyGF",
    "page": "Public",
    "title": "PhyloNetworks.parsimonyGF",
    "category": "function",
    "text": "parsimonyGF(net, tip_dictionary, criterion=:softwired)\nparsimonyGF(net, species, sequenceData, criterion=:softwired)\n\nCalculate the most parsimonious score of a network given discrete characters at the tips using a general framework (Van Iersel et al. 2018) allowing for various parsimony criteria: softwired (default), hardwired, parental etc. Only softwired is implemented at the moment.\n\nData can given in one of the following:\n\ntipdata: data frame for a single trait, in which case the taxon names  are to appear in column 1 or in a column named \"taxon\" or \"species\", and  trait values are to appear in column 2 or in a column named \"trait\".\ntipdata: dictionary taxon => state, for a single trait.\nspecies: array of strings, and sequences: array of sequences,   in the order corresponding to the order of species names.\n\nalgorithm\n\nThe complexity of the algorithm is exponential in the level of the network, that is, the maximum number of hybridizations in a single blob, or biconnected component (Fischer et al. 2015). The function loops over all the state assignments of the minor parent of each hybrid node within a blob, so its complexity is of the order of n * m * c^2 * c^level where n is the number of tips, m the number of traits and c the number of states.\n\nSee parsimonySoftwired for a faster algorithm, but solving the softwired criterion only.\n\nreferences\n\nLeo Van Iersel, Mark Jones, Celine Scornavacca (2017). Improved Maximum Parsimony Models for Phylogenetic Networks, Systematic Biology, (https://doi.org/10.1093/sysbio/syx094).\nFischer, M., van Iersel, L., Kelk, S., Scornavacca, C. (2015). On computing the Maximum Parsimony score of a phylogenetic network. SIAM J. Discrete Math., 29(1):559-585.\n\nUse the recursive helper function parsimonyBottomUpGF!. Use the fields isChild1, isExtBadTriangle to know which nodes are at the root of a blob, and fromBadDiamondI to know which edges are cut (below the minor parent of each hybrid).\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.nStates",
    "page": "Public",
    "title": "PhyloNetworks.nStates",
    "category": "function",
    "text": "nStates(model)\n\nNumber of character states for a given trait evolution model.\n\n\n\n\n\nExamples\n\njulia> m1 = BinaryTraitSubstitutionModel([1.0,2.0], [\"low\",\"high\"])\nBinary Trait Substitution Model:\nrate low→high α=1.0\nrate high→low β=2.0\n\n\njulia> nStates(m1)\n2\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.Q",
    "page": "Public",
    "title": "PhyloNetworks.Q",
    "category": "function",
    "text": "Q(model)\n\nSubstitution rate matrix for a given substitution model: Q[i,j] is the rate of transitioning from state i to state j.\n\n\n\n\n\nFor a BinaryTraitSubstitutionModel, the rate matrix Q is of the form:\n\n-α  α\n β -β\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.P",
    "page": "Public",
    "title": "PhyloNetworks.P",
    "category": "function",
    "text": "P(mod, t)\n\nProbability transition matrix for a TraitSubstitutionModel, of the form\n\nP[1,1] ... P[1,k]\n   .          .\n   .          .\nP[k,1] ... P[k,k]\n\nwhere P[i,j] is the probability of ending in state j after time t, given that the process started in state i.\n\n\n\n\n\nP(mod, t::Array{Float64})\n\nWhen applied to a general substitution model, matrix exponentiation is used. The time argument t can be an array.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.randomTrait",
    "page": "Public",
    "title": "PhyloNetworks.randomTrait",
    "category": "function",
    "text": "randomTrait(model, t, start)\nrandomTrait!(end, model, t, start)\n\nSimulate traits along one edge of length t. start must be a vector of integers, each representing the starting value of one trait. The bang version (ending with !) uses the vector end to store the simulated values.\n\nExamples\n\njulia> m1 = BinaryTraitSubstitutionModel(1.0, 2.0)\nBinary Trait Substitution Model:\nrate 0→1 α=1.0\nrate 1→0 β=2.0\n\n\njulia> using Random; Random.seed!(12345);\n\njulia> randomTrait(m1, 0.2, [1,2,1,2,2])\n5-element Array{Int64,1}:\n 1\n 2\n 1\n 1\n 2\n\n\n\n\n\nrandomTrait(model, net; ntraits=1, keepInternal=true, checkPreorder=true)\n\nSimulate evolution of discrete traits on a rooted evolutionary network based on the supplied evolutionary model. Trait sampling is uniform at the root.\n\noptional arguments:\n\nntraits: number of traits to be simulated (default: 1 trait).\nkeepInternal: if true, export character states at all nodes, including internal nodes. if false, export character states at tips only.\n\noutput:\n\nmatrix of character states with one row per trait, one column per node; these states are indices in model.label, not the trait labels themselves.\nvector of node labels (for tips) or node numbers (for internal nodes) in the same order as columns in the character state matrix\n\nexamples\n\njulia> m1 = BinaryTraitSubstitutionModel(1.0, 2.0, [\"low\",\"high\"]);\n\njulia> net = readTopology(\"(((A:4.0,(B:1.0)#H1:1.1::0.9):0.5,(C:0.6,#H1:1.0::0.1):1.0):3.0,D:5.0);\");\n\njulia> using Random; Random.seed!(1234);\n\njulia> trait, lab = randomTrait(m1, net)\n([1 2 … 1 1], [\"-2\", \"D\", \"-3\", \"-6\", \"C\", \"-4\", \"#H1\", \"B\", \"A\"])\n\njulia> trait\n1×9 Array{Int64,2}:\n 1  2  1  1  2  2  1  1  1\n\njulia> lab\n9-element Array{String,1}:\n \"-2\" \n \"D\"  \n \"-3\" \n \"-6\" \n \"C\"  \n \"-4\" \n \"#H1\"\n \"B\"  \n \"A\"  \n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.randomTrait!",
    "page": "Public",
    "title": "PhyloNetworks.randomTrait!",
    "category": "function",
    "text": "randomTrait(model, t, start)\nrandomTrait!(end, model, t, start)\n\nSimulate traits along one edge of length t. start must be a vector of integers, each representing the starting value of one trait. The bang version (ending with !) uses the vector end to store the simulated values.\n\nExamples\n\njulia> m1 = BinaryTraitSubstitutionModel(1.0, 2.0)\nBinary Trait Substitution Model:\nrate 0→1 α=1.0\nrate 1→0 β=2.0\n\n\njulia> using Random; Random.seed!(12345);\n\njulia> randomTrait(m1, 0.2, [1,2,1,2,2])\n5-element Array{Int64,1}:\n 1\n 2\n 1\n 1\n 2\n\n\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.fitDiscrete",
    "page": "Public",
    "title": "PhyloNetworks.fitDiscrete",
    "category": "function",
    "text": "fitDiscrete(net, model, tipdata)\nfitDiscrete(net, model, species, traits)\n\nCalculate the maximum likelihood (ML) score of a network given one or more discrete characters at the tips. Along each edge, transitions are modelled with a continous time Markov model, whose parameters are estimated (by maximizing the likelihood). At each hybrid node, the trait is assumed to be inherited from either of the two immediate parents according to the parents\' average genetic contributions (inheritance γ). The model ignores incomplete lineage sorting. The algorithm extracts all trees displayed in the network.\n\nData can given in one of the following:\n\ntipdata: dictionary taxon => state label, for a single trait.\ntipdata: data frame for a single trait, in which case the taxon names are to appear in column 1 or in a column named \"taxon\" or \"species\", and trait labels are to appear in column 2 or in a column named \"trait\". Here, trait labels should be as they appear in model.label.\nspecies: vector of strings, and traits: DataFrame of traits, with rows in the order corresponding to the order of species names. Again, trait labels should be as they appear in model.label. All traits are assumed to follow the same model, with same parameters.\n\nOptional arguments (default):\n\nfixedparam (false): should model rate parameters be fixed, or should they be optimized?\nNLoptMethod (:LN_COBYLA, derivative-free) for the optimization algorithm. For other options, see the NLopt.\ntolerance values to control when the optimization is stopped: ftolRel (1e-12), ftolAbs (1e-10) on the likelihood, and xtolRel (1e-10), xtolAbs (1e-10) on the model parameters.\nverbose (false): if true, more information is output.\n\nexamples:\n\njulia> net = readTopology(\"(((A:2.0,(B:1.0)#H1:0.1::0.9):1.5,(C:0.6,#H1:1.0::0.1):1.0):0.5,D:2.0);\");\n\njulia> m1 = BinaryTraitSubstitutionModel([0.1, 0.1], [\"lo\", \"hi\"]);\n\njulia> using DataFrames\n\njulia> dat = DataFrame(species=[\"C\",\"A\",\"B\",\"D\"], trait=[\"hi\",\"lo\",\"lo\",\"hi\"]);\n\njulia> fit1 = fitDiscrete(net, m1, dat; fixedparam=true)\nPhyloNetworks.StatisticalSubstitutionModel{String}:\nBinary Trait Substitution Model:\nrate lo→hi α=0.1\nrate hi→lo β=0.1\n1 traits, 4 species, on a network with 1 reticulations\nlog-likelihood: -3.10754\n\njulia> PhyloNetworks.fit!(fit1; fixedparam=false)\nPhyloNetworks.StatisticalSubstitutionModel{String}:\nBinary Trait Substitution Model:\nrate lo→hi α=0.27222\nrate hi→lo β=0.34981\n1 traits, 4 species, on a network with 1 reticulations\nlog-likelihood: -2.7277\n\njulia> tips = Dict(\"A\" => \"lo\", \"B\" => \"lo\", \"C\" => \"hi\", \"D\" => \"hi\");\n\njulia> fit2 = fitDiscrete(net, m1, tips; xtolRel=1e-16, xtolAbs=1e-16, ftolRel=1e-16)\nPhyloNetworks.StatisticalSubstitutionModel{String}:\nBinary Trait Substitution Model:\nrate lo→hi α=0.27222\nrate hi→lo β=0.34981\n1 traits, 4 species, on a network with 1 reticulations\nlog-likelihood: -2.7277\n\nNote that a copy of the network is stored in the fitted object, but the internal representation of the network may be different in fit1.net and in the original network net:\n\njulia> [n.number for n in fit2.net.node]\n9-element Array{Int64,1}:\n 1\n 2\n 9\n 8\n 3\n 7\n 6\n 4\n 5\n\njulia> [n.number for n in net.node]\n9-element Array{Int64,1}:\n  1\n  2\n  3\n -4\n  4\n -6\n -3\n  5\n -2\n\n\n\n\n\n"
},

{
    "location": "lib/public/#PhyloNetworks.maxParsimonyNet",
    "page": "Public",
    "title": "PhyloNetworks.maxParsimonyNet",
    "category": "function",
    "text": "maxParsimonyNet(T::HybridNetwork, df::DataFrame)\n\nSearch for the most parsimonious network (or tree). A level-1 network is assumed. df should be a data frame containing the species names in column 1, or in a column named species or taxon. Trait data are assumed to be in all other columns. The search starts from topology T, which can be a tree or a network with no more than hmax hybrid nodes (see optional arguments below for hmax).\n\nOutput:\n\nestimated network in file .out (also in .log): best network overall and list of networks from each individual run.\nif any error occurred, file .err provides information (seed) to reproduce the error.\n\nOptional arguments include\n\nhmax: maximum number of hybridizations allowed (default 1)\nruns: number of starting points for the search (default 10); each starting point is T with probability probST=0.3 or a modification of T otherwise (using a NNI move, or a hybrid edge direction change)\nNfail: number of failures (proposed networks with equal or worse score) before the search is aborted. 75 by default: this is quite small, which is okay for a first trial. Larger values are recommended.\noutgroup: outgroup taxon.           It can be a taxon name (String) or Node number (Integer).           If none provided, or if the outgroup conflicts the starting           topology, the function returns an error\nfilename: root name for the output files. Default is \"mp\". If empty (\"\"), files are not created, progress log goes to the screen only (standard out).\nseed: seed to replicate a given search\ncriterion: parsimony score could be hardwired, softwired (default) or parental. Currently,            only softwired is implemented\n\nReferences\n\nLeo Van Iersel, Mark Jones, Celine Scornavacca (2017). Improved Maximum Parsimony Models for Phylogenetic Networks, Systematic Biology, (https://doi.org/10.1093/sysbio/syx094).\nFischer, M., van Iersel, L., Kelk, S., Scornavacca, C. (2015). On computing the Maximum Parsimony score of a phylogenetic network. SIAM J. Discrete Math., 29(1):559-585.\n\nFor a roadmap of the functions inside maxParsimonyNet, see maxParsimonyNetRun1!.\n\n\n\n\n\n"
},

{
    "location": "lib/public/#discrete-trait-evolution-1",
    "page": "Public",
    "title": "discrete trait evolution",
    "category": "section",
    "text": "parsimonySoftwired\nparsimonyGF\nnStates\nQ\nP\nrandomTrait\nrandomTrait!\nfitDiscrete\nmaxParsimonyNetDocTestSetup = nothing"
},

{
    "location": "lib/internals/#",
    "page": "Internals",
    "title": "Internals",
    "category": "page",
    "text": "CurrentModule = PhyloNetworks\nDocTestSetup = quote\n  using PhyloNetworks\nend"
},

{
    "location": "lib/internals/#Internal-Documentation-1",
    "page": "Internals",
    "title": "Internal Documentation",
    "category": "section",
    "text": ""
},

{
    "location": "lib/internals/#Contents-1",
    "page": "Internals",
    "title": "Contents",
    "category": "section",
    "text": "Pages = [\"internals.md\"]"
},

{
    "location": "lib/internals/#Index-1",
    "page": "Internals",
    "title": "Index",
    "category": "section",
    "text": "Pages = [\"internals.md\"]"
},

{
    "location": "lib/internals/#PhyloNetworks.ANode",
    "page": "Internals",
    "title": "PhyloNetworks.ANode",
    "category": "type",
    "text": "ANode\n\nAbstract node. An object of type Edge has a node attribute, which is an vector of 2 ANode objects. The object of type Node is an ANode, and has an edge attribute, which is vector of Edge objects.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.Edge",
    "page": "Internals",
    "title": "PhyloNetworks.Edge",
    "category": "type",
    "text": "Edge(number)\n\nData structure for an edge and its various attributes. Most notably:\n\nnumber (integer): serves as unique identifier; remains unchanged when the network is modified, with a nearest neighbor interchange for example\nnode: a vector of [Node]s, normally just 2 of them\nisChild1 (boolean): true if node[1] is the child node of the edge, false if node[1] is the parent node of the edge\nlength: branch length\nhybrid (boolean): whether the edge is a tree edge or a hybrid edge (in which case isChild1 is important, even if the network is semi-directed)\ngamma: proportion of genetic material inherited by the child node via the edge; 1.0 for a tree edge\nisMajor (boolean): whether the edge is the major path to the child node; true for tree edges, since a tree edge is the only path to its child node; normally true if gamma>0.5.\n\nand other fields, used very internally\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.MatrixTopologicalOrder",
    "page": "Internals",
    "title": "PhyloNetworks.MatrixTopologicalOrder",
    "category": "type",
    "text": "MatrixTopologicalOrder\n\nMatrix associated to an HybridNetwork sorted in topological order.\n\nThe following functions and extractors can be applied to it: tipLabels, obj[:Tips], obj[:InternalNodes], obj[:TipsNodes] (see documentation for function getindex(::MatrixTopologicalOrder, ::Symbol)).\n\nFunctions sharedPathMatrix and simulate return objects of this type.\n\nThe MatrixTopologicalOrder object has fields: V, nodeNumbersTopOrder, internalNodeNumbers, tipNumbers, tipNames, indexation. Type in \"?MatrixTopologicalOrder.field\" to get documentation on a specific field.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.Node",
    "page": "Internals",
    "title": "PhyloNetworks.Node",
    "category": "type",
    "text": "Node(number, leaf)\n\nData structure for an edge and its various attributes. Most notably:\n\nnumber (integer): serves as unique identifier; remains unchanged when the network is modified, with a nearest neighbor interchange for example\nleaf (boolean): whether the node is a leaf (with data typically) or an internal node (no data typically)\nname (string): taxon name for leaves; internal node may or may not have a name\nedge: vector of [Edge]s that the node is attached to; 1 if the node is a leaf, 2 if the node is the root, 3 otherwise, and potentially more if the node has a polytomy\nhybrid (boolean): whether the node is a hybrid node (with 2 or more parents) or a tree node (with a single parent)\n\nOther more internal attributes include:\n\nisBadDiamondI and isBadDiamondII (booleans): whether the node is a hybrid node where the reticulation forms a cycle of 4 nodes (diamond), and where both parents of the hybrid nodes are connected to a leaf. In a bad diamond of type I, the hybrid node itself is also connected to a leaf but the common neighbor of the 2 hybrid\'s parents is not connected to a leaf. In a bad diamond of type II, the hybrid node has an internal node as child, and the common neighbor of the 2 hybrid\'s parents is connected to a leaf.\nisBadTriangle, isVeryBadTriangle and isExtBadTriangle (booleans): true if the reticulation forms a cycle of 3 nodes (triangle) and depending on the number of leaves attached these 3 nodes. The triangle means that the 2 parents of the hybrid node are directly related: one is the child of the other. isBadTriangle is true if the triangle is \"good\", as per Solís-Lemus & Ané (2016), that is, if all 3 nodes in the cycle are not connected to any leaves (the reticulation is detectable from quartet concordance factors, even though all branch lengths are not identifiable). isVeryBadTriangle is true if 2 (or all) of the 3 nodes are connected to a leaf, in which case the reticulation is undetectable from unrooted gene tree topologies (thus it\'s best to exclude these reticulations from a search). isBadTriangle is true if exactly 1 of the 3 nodes is connected to a leaf.\n\nFor details see Solís-Lemus & Ané (2016, doi:10.1371/journal.pgen.1005896)\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.QuartetNetwork",
    "page": "Internals",
    "title": "PhyloNetworks.QuartetNetwork",
    "category": "type",
    "text": "QuartetNetwork(net::HybridNetwork)\n\nSubtype of Network abstract type. need documentation!\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.StatisticalSubstitutionModel",
    "page": "Internals",
    "title": "PhyloNetworks.StatisticalSubstitutionModel",
    "category": "type",
    "text": "StatisticalSubstitutionModel\n\nSubtype of StatsBase.StatisticalModel, to fit discrete data to a model of trait substitution along a network. See fitDiscrete to fit a trait substitution model to discrete data. It returns an object of type StatisticalSubstitutionModel, to which standard functions can be applied, like loglikelihood(object), aic(object) etc.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#types-1",
    "page": "Internals",
    "title": "types",
    "category": "section",
    "text": "Modules = [PhyloNetworks]\nPublic = false\nOrder   = [:type]"
},

{
    "location": "lib/internals/#Base.getindex",
    "page": "Internals",
    "title": "Base.getindex",
    "category": "function",
    "text": "getindex(obj, d)\n\nGetting submatrices of an object of type TraitSimulation.\n\nArguments\n\nobj::TraitSimulation: the matrix from which to extract.\nd::Symbol: a symbol precising which sub-matrix to extract. Can be:\n:Tips columns and/or rows corresponding to the tips\n:InternalNodes columns and/or rows corresponding to the internal nodes\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#Base.getindex",
    "page": "Internals",
    "title": "Base.getindex",
    "category": "function",
    "text": "getindex(obj, d,[ indTips, nonmissing])\n\nGetting submatrices of an object of type MatrixTopologicalOrder.\n\nArguments\n\nobj::MatrixTopologicalOrder: the matrix from which to extract.\nd::Symbol: a symbol precising which sub-matrix to extract. Can be:\n:Tips columns and/or rows corresponding to the tips\n:InternalNodes columns and/or rows corresponding to the internal nodes\n:TipsNodes columns corresponding to internal nodes, and row to tips (works only is indexation=\"b\")\nindTips::Vector{Int}: optional argument precising a specific order for the tips (internal use).\nnonmissing::BitArray{1}: optional argument saying which tips have data (internal use).\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.addAlternativeHybridizations!-Tuple{HybridNetwork,DataFrames.DataFrame}",
    "page": "Internals",
    "title": "PhyloNetworks.addAlternativeHybridizations!",
    "category": "method",
    "text": "addAlternativeHybridizations!(net::HybridNetwork, BSe::DataFrame;\n                              cutoff=10::Number, top=3::Int)\n\nModify the network net (the best network estimated with snaq) by adding other hybridizations that are present in the bootstrap networks. By default, it will only consider hybrid edges with more than 10% bootstrap support (cutoff) and it will only include the three top hybridizations (top) sorted by bootstrap support. The function also modifies the dataframe BSe obtained with hybridBootstrapSupport. In the original BSe dataframe, hybrid edges that do not appear in the best network have a missing number. After the hybrid edges are added with addAlternativeHybridizations, BSe is modified to include the edge numbers of the newly added hybrid edges. Note that the function only adds the hybrid edges as minor to keep the underlying tree topology.\n\nexample\n\nbootnet = readMultiTopology(\"bootstrap-networks.txt\")\nbestnet = readTopology(\"best.tre\")\nBSn, BSe, BSc, BSgam, BSedgenum = hybridBootstrapSupport(bootnet, bestnet);\naddAlternativeHybridizations!(bestnet,BSe)\nusing PhyloPlots\nplot(bestnet, edgeLabel=BSe[[:edge,:BS_hybrid_edge]])\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.afterOptBL!-Tuple{HybridNetwork,DataCF,Bool,Bool,Bool,Integer,Array{Int64,1}}",
    "page": "Internals",
    "title": "PhyloNetworks.afterOptBL!",
    "category": "method",
    "text": "afterOptBL road map\n\nFunction that will check if there are h==0,1;t==0,hz==0,1 cases in a network after calling optBL!.\n\nArguments:\n\ncloseN=true will move origin/target, if false, add/delete N times before giving up (we have only tested closeN=true)\norigin=true will move origin, false will move target. We added this to avoid going back and forth between the same networks\nmovesgamma vector of counts of number of times each move is proposed to fix a gamma zero problem: (add,mvorigin,mvtarget,chdir,delete,nni)\n\nProcedure:\n\nFirst we split the ht vector in nh,nt,nhz (gammas, lengths, gammaz)\nIf we find a h==0,1, we loop through nh to find a hybrid edge with h==0 or 1 and want to try to fix this by doing:\ngammaZero!(currT,d,edge,closeN,origin,N,movesgamma) which returns true if there was a successful change, and we stop the loop\nIf we find a t==0, we loop through all nt to find such edge, and do NNI move on this edge; return true if change successful and we stop the loop\nIf we find a hz==0,1, we loop through nhz to find such hybrid edge and call gammaZero again\nIf we did a successful change, we run optBL again, and recheck if there are no more problems.\nReturns successchange, flagh, flagt,flaghz (flag=true means no problems)\nIf it is the multiple alleles case, it will not try to fix h==0,1;hz==0,1 because it can reach a case that violates the multiple alleles condition. If we add a check here, things become horribly slow and inefficient, so we just delete a hybridization that has h==0,1;hz==0,1\n\n** Important: ** afterOptBL is doing only one change, but we need to repeat multiple times to be sure that we fix all the gamma zero problems, which is why we call afterOptBLRepeat\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.afterOptBLAll!-Tuple{HybridNetwork,DataCF,Integer,Bool,Float64,Float64,Bool,Array{Int64,1},Float64,Float64,Float64}",
    "page": "Internals",
    "title": "PhyloNetworks.afterOptBLAll!",
    "category": "method",
    "text": "afterOptBLAll road map\n\nAfter optBL, we want to call afterOptBLAll (or afterOptBLAllMultipleAlleles) to check if there are h==0,1; t==0; hz==0,1. This function will try to fix the gamma zero problem, but if it cannot, it will call moveDownLevel, to delete the hybridization from the network.\n\nProcedure:\n\nWhile startover=true and tries<N\n\nWhile badliks < N2 (number of bad pseudolikelihoods are less than N2)\nRun success = afterOptBLRepeat\nIf success = true (it changed something):\nIf worse pseudolik, then go back to original topology currT, set startover=true and badliks++\nIf better pseudolik, then check flags. If all good, then startover=false; otherwise startover = true\nIf success = false (nothing changed), then set badliks=N2+1 (to end the while on currT)\nIf all flags are ok, then startover = false\nIf bad h or hz, then call moveDownLevel (delete one hybridization), and set startover = true (maybe deleting that hybridization did not fix other gamma zero problems)\nIf bad t, then set startover = false\nIf left second while by back to original currT, and still bad h/hz, then move down one level, and startover=true; otherwise startover=false\n\nIf first while ends by tries>N, then it checks one last time the flags, if bad h/hz will move down one level, and exit\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.afterOptBLRepeat!-Tuple{HybridNetwork,DataCF,Integer,Bool,Bool,Bool,Array{Int64,1}}",
    "page": "Internals",
    "title": "PhyloNetworks.afterOptBLRepeat!",
    "category": "method",
    "text": "afterOptBLRepeat road map\n\nafterOptBL is doing only one change, but we need to repeat multiple times to be sure that we fix all the gamma zero problems, which is why we call afterOptBLRepeat. This function will repeat afterOptBL every time a successful change happened; this is done only if closeN=false, because we would delete/add hybridizations and need to stop after tried N times. If closeN=true (default), then afterOptBLRepeat only does one afterOptBL, because in this case, only the neighbor edges need to be tested, and this would have been done already in gammaZero.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.anova-Union{Tuple{Vararg{DataFrameRegressionModel{PhyloNetworkLinearModel,T},N} where N}, Tuple{T}} where T",
    "page": "Internals",
    "title": "PhyloNetworks.anova",
    "category": "method",
    "text": "anova(objs::PhyloNetworkLinearModel...)\n\nTakes several nested fits of the same data, and computes the F statistic for each pair of models.\n\nThe fits must be results of function phyloNetworklm called on the same data, for models that have more and more effects.\n\nReturns a DataFrame object with the anova table.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.assignhybridnames!-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.assignhybridnames!",
    "category": "method",
    "text": "assignhybridnames!(net)\n\nAssign names to hybrid nodes in the network net. Hybrid nodes with an empty name field (\"\") are modified with a name that does not conflict with other hybrid names in the network. The preferred name is \"#H3\" if the node number is 3 or -3, but an index other than 3 would be used if \"#H3\" were the name of another hybrid node already.\n\nIf two hybrid nodes have non-empty and equal names, the name of one of them is changed and re-assigned as described above (with a warning).\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.blobInfo",
    "page": "Internals",
    "title": "PhyloNetworks.blobInfo",
    "category": "function",
    "text": "blobInfo(network, ignoreTrivial=true)\n\nCalculate the biconnected components (blobs) using function biconnectedComponents then:\n\nset node field isExtBadTriangle to true at the root of each non-trivial blob (and at the network root), false otherwise. (a better name for the field would be something like \"isBlobRoot\".)\noutput:\narray of nodes that are the roots of each non-trivial blob,\nand the network root. If the root of the full network is   not part of a non-trivial blob, a corresponding blob is   added to the list.\narray of arrays: for each non-trivial blob, array of major hybrid edges in that blob.\narray of arrays: same as #2 but for minor hybrid edges, with hybrids listed in the same order, for each blob.\n\nBlobs are ordered in reverse topological ordering (aka post order). If ignoreTrivial is true, trivial components are ignored.\n\nkeyword argument: checkPreorder, true by default. If false, the isChild1 edge field and the net.nodes_changed network field are supposed to be correct.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.breakedge!-Tuple{PhyloNetworks.Edge,HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.breakedge!",
    "category": "method",
    "text": "breakedge!(Edge, HybridNetwork)\n\nbreaks an edge into 2 edges (each of length half that of original edge). creates new node of degree 2. Useful to root network along an edge.\n\nwarning: updates isChild1 and containRoot, but does NOT update attributes like: inCycle, partition, gammaz, etc.\n\nreturns the index of the newly created node in the network\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.calculateObsCFAll!-Tuple{DataCF,Union{Array{Int64,1}, Array{String,1}}}",
    "page": "Internals",
    "title": "PhyloNetworks.calculateObsCFAll!",
    "category": "method",
    "text": "calculateObsCFAll!(DataCF, taxa::Union{Vector{String}, Vector{Int}})\n\nCalculate observed concordance factors: update the .quartet[i].obsCF values of the DataCF object based on its .tree vector.\n\ncalculateObsCFAll!(vector of quartets, vector of trees, taxa)\n\nCalculate observed concordance factors: update the .obsCF values of the quartets, based on the trees, and returns a new DataCF object with these updated quartets and trees.\n\ncalculateObsCFAll_noDataCF!(vector of quartets, vector of trees, taxa)\n\nupdate the .obsCF values of the quartets based on the trees, but returns nothing.\n\nWarning: all these functions need input trees (h=0).\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.checkNumHybEdges!-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.checkNumHybEdges!",
    "category": "method",
    "text": "`checkNumHybEdges!(net)`\n\nCheck for consistency between hybrid-related attributes in the network:\n\nfor each hybrid node: 2 or more hybrid edges\nexception: allows for a leaf to be attached to a single hybrid edge\nexactly 2 incoming parent hybrid edges\n\nRun after storeHybrids!. See also check2HybEdges.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.check_matchtaxonnames!-Tuple{AbstractArray{T,1} where T,AbstractArray{T,1} where T,HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.check_matchtaxonnames!",
    "category": "method",
    "text": "check_matchtaxonnames!(species, data, net)\n\nModify species and dat by removing the species (rows) absent from the network. Return a new network (net is not modified) with tips matching those in species: if some species in net have no data, these species are pruned from the network. The network also has its node names reset, such that leaves have nodes have consecutive numbers starting at 1, with leaves first. Used by fitDiscrete to build a new StatisticalSubstitutionModel.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.deleteEdge!-Tuple{HybridNetwork,PhyloNetworks.Edge}",
    "page": "Internals",
    "title": "PhyloNetworks.deleteEdge!",
    "category": "method",
    "text": "deleteEdge!(net::HybridNetwork,  e::Edge, part=true)\ndeleteEdge!(net::QuartetNetwork, e::Edge)\n\nDelete edge e from net.edge and update net.numEdges. If part is true, update the network\'s partition field.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.deleteHybridEdge!",
    "page": "Internals",
    "title": "PhyloNetworks.deleteHybridEdge!",
    "category": "function",
    "text": "deleteHybridEdge!(net::HybridNetwork, edge::Edge, keepNodes=false)\n\nDeletes a hybrid edge from a network. The network does not have to be of level 1, and may contain some polytomies. Updates branch lengths, allowing for missing values. Returns the network.\n\nAt each of the 2 junctions, the child edge is retained (below the hybrid node). If keepNodes is true, all nodes are retained during edge removal.\n\nWarnings:\n\nif keepNodes is true: partner hybrid parent edge has its γ value unchanged\nif the parent of edge is the root and if keepNodes is false, the root is moved to keep the network unrooted with a root of degree two.\ndoes not update containRoot (could be implemented later)\ndoes not update attributes needed for snaq! (like containRoot, inCycle, edge.z, edge.y etc.)\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.deleteLeaf!-Tuple{PhyloNetworks.Network,AbstractString}",
    "page": "Internals",
    "title": "PhyloNetworks.deleteLeaf!",
    "category": "method",
    "text": "deleteLeaf!(net::HybridNetwork, leaf::AbstractString) deleteLeaf!(net::Network, leaf::Node)\n\nDeletes the leaf taxon from the network. The leaf argument is the name of the taxon to delete.\n\nWarnings:\n\nrequires a level-1 network with up-to-date attributes for snaq! (e.g. non-missing branch lengths, gammaz, etc.)\ndoes not care where the root is and does not update it to a sensible location if the root is affected by the leaf removal.\ndoes not merge edges, i.e. does not remove all nodes of degree 2. Within snaq!, this is used to extract quartets and to keep track of which edge lengths in the original network map to the quartet network.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.deleteNode!-Tuple{HybridNetwork,PhyloNetworks.Node}",
    "page": "Internals",
    "title": "PhyloNetworks.deleteNode!",
    "category": "method",
    "text": "deleteNode!(net::HybridNetwork, n::Node)\n\ndeletes a Node from a network, i.e. removes it from net.node, and from net.hybrid or net.leaf as appropriate. Updates attributes numNodes, numTaxa, numHybrids (it does not update net.names though).\n\nWarning: if the root is deleted, the new root is arbitrarily set to the first node in the list. This is intentional to save time because this function is used frequently in snaq!, which handles semi-directed (unrooted) networks.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.descendants-Tuple{PhyloNetworks.Edge}",
    "page": "Internals",
    "title": "PhyloNetworks.descendants",
    "category": "method",
    "text": "descendants(edge::Edge)\n\nReturn the node numbers of all the descendants of a given edge.\n\nThe node should belong in a rooted network for which isChild1 is up-to-date. Run directEdges! beforehand. This is very important, otherwise one might enter an infinite loop, and the function does not test for this.\n\nExamples\n\njulia> net5 = \"(A,((B,#H1),(((C,(E)#H2),(#H2,F)),(D)#H1)));\" |> readTopology |> directEdges! ;\n\njulia> PhyloNetworks.descendants(net5.edge[12]) # descendants of 12th\n7-element Array{Int64,1}:\n -6\n -7\n  4\n  6\n  5\n -9\n  7\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.discrete_backwardlikelihood_tree!-Tuple{PhyloNetworks.StatisticalSubstitutionModel,Integer,Integer}",
    "page": "Internals",
    "title": "PhyloNetworks.discrete_backwardlikelihood_tree!",
    "category": "method",
    "text": "discrete_backwardlikelihood_tree!(obj::SSM, tree::Integer, trait::Integer)\n\nUpdate obj.backwardlik; assume correct forward likelihood, directional likelihood and transition probabilities.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.discrete_corelikelihood!-Tuple{PhyloNetworks.StatisticalSubstitutionModel}",
    "page": "Internals",
    "title": "PhyloNetworks.discrete_corelikelihood!",
    "category": "method",
    "text": "discrete_corelikelihood!(obj::StatisticalSubstitutionModel; whichtrait=:all)\ndiscrete_corelikelihood_tree!(obj, t::Integer, traitrange::AbstractArray)\n\nCalculate the likelihood and update obj.loglik for discrete characters on a network (or on a single tree: tth tree displayed in the network, for the second form). Update forward and direct partial likelihoods while doing so. The algorithm extracts all displayed trees and weights the likelihood under all these trees.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.discrete_corelikelihood_tree!",
    "page": "Internals",
    "title": "PhyloNetworks.discrete_corelikelihood_tree!",
    "category": "function",
    "text": "discrete_corelikelihood!(obj::StatisticalSubstitutionModel; whichtrait=:all)\ndiscrete_corelikelihood_tree!(obj, t::Integer, traitrange::AbstractArray)\n\nCalculate the likelihood and update obj.loglik for discrete characters on a network (or on a single tree: tth tree displayed in the network, for the second form). Update forward and direct partial likelihoods while doing so. The algorithm extracts all displayed trees and weights the likelihood under all these trees.\n\n\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.displayedNetworks!",
    "page": "Internals",
    "title": "PhyloNetworks.displayedNetworks!",
    "category": "function",
    "text": "displayedNetworks!(net::HybridNetwork, node::Node, keepNode=false)\n\nExtracts the two networks that simplify a given network at a given hybrid node: deleting either one or the other parent hybrid edge. If keepNodes is true, all original nodes are kept in both networks.\n\nthe original network is modified: the minor edge removed.\nreturns one HybridNetwork object: the network with the major edge removed\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.fuseedgesat!-Tuple{Integer,HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.fuseedgesat!",
    "category": "method",
    "text": "fuseedgesat!(i::Integer,net::HybridNetwork)\n\nRemoves ith node in net.node, if it is of degree 2. The parent and child edges of this node are fused. Reverts the action of breakedge!.\n\nreturns the fused edge.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.gammaZero!-Tuple{HybridNetwork,DataCF,PhyloNetworks.Edge,Bool,Bool,Integer,Array{Int64,1}}",
    "page": "Internals",
    "title": "PhyloNetworks.gammaZero!",
    "category": "method",
    "text": "gammaZero road map\n\nFunction that tries to fix a gamma zero problem (h==0,1; t==0; hz==0,1)\n\nFirst tries to do changeDirection\nIf not successful from start, we call moveHybrid\nIf successful move (change direction), we call optBL and check if we fixed the problem\nIf problem fixed and we do not have worse pseudolik, we return success=true\nIf still problem or worse pseudolik, we call moveHybrid\n\n** Important: ** Any function (afterOptBL) calling gammaZero is assuming that it only made a change, so if the returned value is true, then a change was made, and the other function needs to run optBL and check that all parameters are \'valid\'. If the returned value is false, then no change was possible and we need to remove a hybridization if the problem is h==0,1; hz==0,1. If the problem is t==0, we ignore this problem.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getChild-Tuple{PhyloNetworks.Edge}",
    "page": "Internals",
    "title": "PhyloNetworks.getChild",
    "category": "method",
    "text": "getChild(edge::Edge)\n\nReturn child node using the isChild1 attribute of the edge.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getChildren-Tuple{PhyloNetworks.Node}",
    "page": "Internals",
    "title": "PhyloNetworks.getChildren",
    "category": "method",
    "text": "getChildren(node)\n\nreturn a vector with all children nodes of node.   warning: assume isChild1 field (for edges) are correct\n\nTo get all parent nodes: see getParents.  \n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getDataValue!-Tuple{IO,Int64,Array{Int64,1}}",
    "page": "Internals",
    "title": "PhyloNetworks.getDataValue!",
    "category": "method",
    "text": "getdataValue!(s::IO, int, numLeft::Array{Int,1})\n\nHelper function for parseEdgeData!. Read a single floating point edge data value in a tree topology. Return -1.0 if no value exists before the next colon, return the value as a float otherwise. Modifies s by advancing past the next colon character. Only call this function to read a value when you know a numerical value exists!\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getGammas-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.getGammas",
    "category": "method",
    "text": "getGammas(net)\n\nGet inheritance γ\'s of major hybrid edges. Assume pre-order calculated already (with up-to-date field nodes_changed). See setGammas!\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getHeights-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.getHeights",
    "category": "method",
    "text": "getHeights(net)\n\nReturn the height (distance to the root) of all nodes, assuming a time-consistent network (where all paths from the root to a given hybrid node have the same length). Also assumes that the network has been preordered, because it uses getGammas and setGammas!).\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getMajorParent-Tuple{PhyloNetworks.Node}",
    "page": "Internals",
    "title": "PhyloNetworks.getMajorParent",
    "category": "method",
    "text": "getMajorParent(node::Node)\ngetMinorParent(node::Node)\n\nReturn major or minor parent of a node using the isChild1 field of edges (and assuming correct isMajor field). See also getMajorParentEdge and getMinorParentEdge\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getMajorParentEdge-Tuple{PhyloNetworks.Node}",
    "page": "Internals",
    "title": "PhyloNetworks.getMajorParentEdge",
    "category": "method",
    "text": "getMajorParentEdge(node)\ngetMinorParentEdge(node)\n\nreturn the parent edge of a given node: the major / minor if hybrid.   warning: assume isChild1 and isMajor attributes are correct\n\nTo get all parent nodes: see getParents.  \n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getMinorParent",
    "page": "Internals",
    "title": "PhyloNetworks.getMinorParent",
    "category": "function",
    "text": "getMajorParent(node::Node)\ngetMinorParent(node::Node)\n\nReturn major or minor parent of a node using the isChild1 field of edges (and assuming correct isMajor field). See also getMajorParentEdge and getMinorParentEdge\n\n\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getMinorParentEdge",
    "page": "Internals",
    "title": "PhyloNetworks.getMinorParentEdge",
    "category": "function",
    "text": "getMajorParentEdge(node)\ngetMinorParentEdge(node)\n\nreturn the parent edge of a given node: the major / minor if hybrid.   warning: assume isChild1 and isMajor attributes are correct\n\nTo get all parent nodes: see getParents.  \n\n\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getParent-Tuple{PhyloNetworks.Edge}",
    "page": "Internals",
    "title": "PhyloNetworks.getParent",
    "category": "method",
    "text": "getParent(e::Edge)\n\nReturn parent node of edge e using the isChild1 attribute of the edge. To get parents of nodes: see getParents.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getParents-Tuple{PhyloNetworks.Node}",
    "page": "Internals",
    "title": "PhyloNetworks.getParents",
    "category": "method",
    "text": "getParents(n::Node)\n\nGet vector of all parent nodes of n, based on isChild1 field (for edges). To get the parent node of an edge: see getParent.   To get individual parent edges (rather than all parent nodes): see getMajorParentEdge and getMinorParentEdge.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getPartner-Tuple{Any}",
    "page": "Internals",
    "title": "PhyloNetworks.getPartner",
    "category": "method",
    "text": "getPartner(edge::Edge)\ngetPartner(edge::Edge, node::Node)\n\nReturn hybrid partner of edge, that is, hybrid edge pointing to the same child as edge. Assumptions (not checked):\n\ncorrect isChild1 field for edge and for hybrid edges\nno in-coming polytomy: a node has 0, 1 or 2 parents, no more\n\nWhen node is given, it is assumed to be the child of edge (the first form calls the second).\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.getTipSubmatrix-Tuple{Array{T,2} where T,HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.getTipSubmatrix",
    "category": "method",
    "text": "getTipSubmatrix(M, net; indexation=:both)\n\nExtract submatrix of M, with rows and/or columns corresponding to tips in the network, ordered like in net.leaf. In M, rows and/or columns are assumed ordered as in net.nodes_changed.\n\nindexation: one of :rows, :cols or :both: are nodes numbers indexed in the matrix by rows, by columns, or both? Subsetting is taken accordingly.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.hybridEdges-Tuple{PhyloNetworks.Node,PhyloNetworks.Edge}",
    "page": "Internals",
    "title": "PhyloNetworks.hybridEdges",
    "category": "method",
    "text": "hybridEdges(node::Node, e::Edge)\n\nReturn the 2 edges connected to node other than e, in the same order as node.edge, except that e absent from the list.\n\nDespite what the name suggest, node need not be a hybrid node! node is assumed to have 3 edges, though.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.hybridEdges-Tuple{PhyloNetworks.Node}",
    "page": "Internals",
    "title": "PhyloNetworks.hybridEdges",
    "category": "method",
    "text": "hybridEdges(node::Node)\n\nReturn the 3 edges attached to node in a specific order [e1,e2,e3]. Warning: assume a level-1 network with node field hasHybEdge and edge field inCycle up-to-date.\n\nIf node is a hybrid node:\n\ne1 is the major hybrid parent edge of node\ne2 is the minor hybrid parent edge\ne3 is the tree edge, child of node.\n\nIf node is a tree node parent of one child edge:\n\ne1 is the hybrid edge, child of node\ne2 is the tree edge that belongs to the cycle created by e1\ne3 is the other tree edge attached to node (not in a cycle)\n\nOtherwise:\n\ne3 is an external edge from node to a leaf, if one exists.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.hybridatnode",
    "page": "Internals",
    "title": "PhyloNetworks.hybridatnode",
    "category": "function",
    "text": "hybridatnode!(net::HybridNetwork, nodeNumber::Integer)\n\nChange the status of edges in network net, to move the hybrid node in a cycle to the node with number nodeNumber. This node must be in one (and only one) cycle, otherwise an error will be thrown.\n\nnet is assumed to be of level 1, that is, each blob has a single cycle with a single reticulation. Check and update the nodes\' field inCycle.\n\nExample #\"\n\njulia> net = readTopology(\"(A:1.0,((B:1.1,#H1:0.2::0.2):1.2,(((C:0.52,(E:0.5)#H2:0.02::0.7):0.6,(#H2:0.01::0.3,F:0.7):0.8):0.9,(D:0.8)#H1:0.3::0.8):1.3):0.7):0.1;\");\njulia> using PhyloPlots\njulia> plot(net, showNodeNumber=true)\njulia> hybridatnode!(net, -4)\njulia> plot(net)\n\n\n\n\n\nhybridatnode!(net, hybrid::Node, newNode::Node)\n\nMove the reticulation from hybrid to newNode, which must in the same cycle. net is assumed to be of level 1, but no checks are made and fields are supposed up-to-date.\n\nCalled by hybridatnode!(net, node number), which is itself called by undirectedOtherNetworks.\n\n\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.inheritanceWeight-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.inheritanceWeight",
    "category": "method",
    "text": "inheritanceWeight(tree::HybridNetwork)\n\nReturn the log inheritance weight of a network or tree (as provided by displayedTrees with keepNodes = true for instance). For a tree displayed in a network, its inheritance weight is the log of the product of γ\'s of all edges retained in the tree. To avoid underflow, the log is calculated: i.e. sum of log(γ) across retained edges.\n\nIf any edge has a negative γ, it is assumed to mean that its γ is missing, and the function returns missing.\n\nExample\n\njulia> net = readTopology(\"(((A,(B)#H1:::0.9),(C,#H1:::0.1)),D);\");\n\njulia> trees = displayedTrees(net,0.0; keepNodes=true);\n\njulia> PhyloNetworks.inheritanceWeight.(trees)\n2-element Array{Float64,1}:\n -0.105361\n -2.30259 \n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.initializeWeightsFromLeaves!-Tuple{AbstractArray,HybridNetwork,Any,Any,Symbol}",
    "page": "Internals",
    "title": "PhyloNetworks.initializeWeightsFromLeaves!",
    "category": "method",
    "text": "initializeWeightsFromLeaves!(w, net, tips, stateset, criterion)\n\nModify weight in w: to Inf for w[n, i] if the \"tips\" data has a state different from the lineage state of index i at node number n. Assumes that w was initialized to 0 for the leaves.\n\ncriterion: should be one of :softwired, :parental or :hardwired.\n\nsoftwired parsimony: lineage states are in this order: ∅,{1},{2},{3},...,{nstates}\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.initializeWeightsFromLeavesSoftwired!-Tuple{AbstractArray,HybridNetwork,Any,Any}",
    "page": "Internals",
    "title": "PhyloNetworks.initializeWeightsFromLeavesSoftwired!",
    "category": "method",
    "text": "initializeWeightsFromLeavesSoftwired!(w, net, tips, charset)\n\nModify weight in w: to Inf for w[n, s] if the \"tips\" data has a state different from s at node number n. Assumes that w was initialized to 0 for the leaves.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.majoredgelength-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.majoredgelength",
    "category": "method",
    "text": "majoredgelength(net::HybridNetwork)\n\nGenerate vector of edge lengths of major net edges organized in the same order as the edge matrix created via majoredgematrix. Considers values of -1.0 as missing values, recognized as NA in R. Output: vector allowing for missing values.\n\nAssume nodes_changed was updated, to list nodes in pre-order.\n\nExamples\n\njulia> net = readTopology(\"(((A:3.1,(B:0.2)#H1:0.3::0.9),(C,#H1:0.3::0.1):1.1),D:0.7);\");\n\njulia> directEdges!(net); preorder!(net);\n\njulia> PhyloNetworks.majoredgelength(net)\n8-element Array{Union{Missing, Float64},1}:\n  missing\n 0.7     \n  missing\n 1.1     \n  missing\n 3.1     \n 0.3     \n 0.2     \n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.majoredgematrix-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.majoredgematrix",
    "category": "method",
    "text": "majoredgematrix(net::HybridNetwork)\n\nMatrix of major edges from net where edge[i,1] is the number of the parent node of edge i and edge[i,2] is the number of the child node of edge i. Assume nodes_changed was updated, to list nodes in pre-order.\n\nExamples\n\njulia> net = readTopology(\"(A,(B,(C,D)));\");\n\njulia> PhyloNetworks.resetNodeNumbers!(net);\n\njulia> PhyloNetworks.majoredgematrix(net)\n6×2 Array{Int64,2}:\n 5  1\n 5  6\n 6  2\n 6  7\n 7  3\n 7  4\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.makemissing!-Tuple{AbstractArray{T,1} where T}",
    "page": "Internals",
    "title": "PhyloNetworks.makemissing!",
    "category": "method",
    "text": "makemissing!(x::AbstractVector)\n\nTurn to missing any element of x exactly equal to -1.0. Used for branch lengths and γs. x needs to accept missing values. If not, this can be done with allowmissing(x).\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.mapAllelesCFtable!-Tuple{DataFrames.DataFrame,DataFrames.DataFrame,Array{Int64,1},Bool,AbstractString}",
    "page": "Internals",
    "title": "PhyloNetworks.mapAllelesCFtable!",
    "category": "method",
    "text": "mapAllelesCFtable!(quartet CF DataFrame, mapping DataFrame, columns, write?, filename)\n\nModify (and return) the quartet concordance factor (CF) DataFrame: replace each allele name by the species name that the allele maps onto based on the mapping data frame. This mapping data frame should have columns named \"allele\" and \"species\" (see rename! to change column names if need be).\n\nIf write? is true, the modified data frame is written to a file named \"filename\".\n\nWarning: mapAllelesCFtable takes the quartet data file as its second argument, while mapAllelesCFtable! takes the quartet data (which it modifies) as its first argument.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.maxParsimonyNetRun1",
    "page": "Internals",
    "title": "PhyloNetworks.maxParsimonyNetRun1",
    "category": "function",
    "text": "Road map for various functions behind maxParsimonyNet\n\nmaxParsimonyNet\nmaxParsimonyNetRun1\nmaxParsimonyNetRun1!\n\nAll return their optimized network. Only maxParsimonyNet returns a rooted network (though all functions guarantee that the returned networks agree with the outgroup).\n\nmaxParsimonyNet calls maxParsimonyNetRun1 per run, after a read(write(.)) of the starting network (to ensure level-1 and semi-directedness).\nmaxParsimonyNetRun1 will make a copy of the topology, and will call findStartingTopology! to modify the topology according to random NNI/move origin/move target moves. It then calls maxParsimonyNetRun1! on the modified network\nmaxParsimonyNetRun1! proposes new network with various moves (same moves as snaq), and stops when it finds the most parsimonious network, using parsimonyGF.\n\nNone of these functions allow for multiple alleles yet.\n\nNote that the search algorithm keeps two HybridNetworks at a time: currT (current topology) and newT (proposed topology). Both are kept unrooted (semi-directed), otherwise the moves in proposedTop! function fail. We only root the topologies to calculate the parsimony, so we create a rooted copy (currTr, newTr) to compute parsimony score in this copied topology. We do not root and calculate parsimony score in the original HybridNetworks objects (currT,newT) because the computation of the parsimony score overwrites the inCycle attribute of the Nodes, which messes with the search moves.\n\nExtensions:\n\nother criteria: hardwired, parental (only softwired implemented now)\nremove level-1 restriction: this will involve changing the proposedTop! function to use rSPR or rNNI moves (instead of the level-1 moves coded for snaq!). We need:\nfunctions for rSPR and rNNI moves\ncreate new proposedTop! function (proposedRootedTop?) to choose from the rSPR/rNNI/other moves\nhave the search in maxParsimonuNetRun1! to have rooted currT and rooted newT, instead of keeping semi-directed objects (currT, newT), only to root for the parsimony score (currTr, newTr)\noutgroup is currently String or Node number, but it would be good if it allowed Edge number as an option too. Not sure best way to distinguish between Node number and Edge number, which is why left as Node number for now.\n\n\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.maxParsimonyNetRun1!",
    "page": "Internals",
    "title": "PhyloNetworks.maxParsimonyNetRun1!",
    "category": "function",
    "text": "Road map for various functions behind maxParsimonyNet\n\nmaxParsimonyNet\nmaxParsimonyNetRun1\nmaxParsimonyNetRun1!\n\nAll return their optimized network. Only maxParsimonyNet returns a rooted network (though all functions guarantee that the returned networks agree with the outgroup).\n\nmaxParsimonyNet calls maxParsimonyNetRun1 per run, after a read(write(.)) of the starting network (to ensure level-1 and semi-directedness).\nmaxParsimonyNetRun1 will make a copy of the topology, and will call findStartingTopology! to modify the topology according to random NNI/move origin/move target moves. It then calls maxParsimonyNetRun1! on the modified network\nmaxParsimonyNetRun1! proposes new network with various moves (same moves as snaq), and stops when it finds the most parsimonious network, using parsimonyGF.\n\nNone of these functions allow for multiple alleles yet.\n\nNote that the search algorithm keeps two HybridNetworks at a time: currT (current topology) and newT (proposed topology). Both are kept unrooted (semi-directed), otherwise the moves in proposedTop! function fail. We only root the topologies to calculate the parsimony, so we create a rooted copy (currTr, newTr) to compute parsimony score in this copied topology. We do not root and calculate parsimony score in the original HybridNetworks objects (currT,newT) because the computation of the parsimony score overwrites the inCycle attribute of the Nodes, which messes with the search moves.\n\nExtensions:\n\nother criteria: hardwired, parental (only softwired implemented now)\nremove level-1 restriction: this will involve changing the proposedTop! function to use rSPR or rNNI moves (instead of the level-1 moves coded for snaq!). We need:\nfunctions for rSPR and rNNI moves\ncreate new proposedTop! function (proposedRootedTop?) to choose from the rSPR/rNNI/other moves\nhave the search in maxParsimonuNetRun1! to have rooted currT and rooted newT, instead of keeping semi-directed objects (currT, newT), only to root for the parsimony score (currTr, newTr)\noutgroup is currently String or Node number, but it would be good if it allowed Edge number as an option too. Not sure best way to distinguish between Node number and Edge number, which is why left as Node number for now.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.minorreticulationgamma-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.minorreticulationgamma",
    "category": "method",
    "text": "minorreticulationgamma(net::HybridNetwork)\n\nVector of minor edge gammas (inheritance probabilities) organized in the same order as in the matrix created via minorreticulationmatrix. Considers values of -1.0 as missing values, recognized as NA in R. Output: vector allowing for missing values.\n\nExamples\n\njulia> net = readTopology(\"(((A,(B)#H1:::0.9),(C,#H1:::0.1)),D);\");\n\njulia> PhyloNetworks.minorreticulationgamma(net)\n1-element Array{Union{Float64, Missings.Missing},1}:\n 0.1\n\n\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.minorreticulationlength-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.minorreticulationlength",
    "category": "method",
    "text": "minorreticulationlength(net::HybridNetwork)\n\nVector of lengths for the minor hybrid edges, organized in the same order as in the matrix created via minorreticulationmatrix. Replace values of -1.0 with missing values recognized by R. Output: vector allowing for missing values.\n\nExamples\n\njulia> net = readTopology(\"(((A:3.1,(B:0.2)#H1:0.4::0.9),(C,#H1:0.3::0.1):1.1),D:0.7);\");\n\njulia> PhyloNetworks.minorreticulationlength(net)\n1-element Array{Union{Missing, Float64},1}:\n 0.3\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.minorreticulationmatrix-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.minorreticulationmatrix",
    "category": "method",
    "text": "minorreticulationmatrix(net::HybridNetwork)\n\nMatrix of integers, representing the minor hybrid edges in net. edge[i,1] is the number of the parent node of the ith minor hybrid edge, and edge[i,2] is the number of its child node. Node numbers may be negative, unless they were modified by resetNodeNumbers!. Assumes correct isChild1 fields.\n\nExamples\n\njulia> net = readTopology(\"(((A,(B)#H1:::0.9),(C,#H1:::0.1)),D);\");\njulia> PhyloNetworks.minorreticulationmatrix(net)\n1×2 Array{Int64,2}:\n -6  3\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.moveHybrid!-Tuple{HybridNetwork,PhyloNetworks.Edge,Bool,Bool,Integer,Array{Int64,1}}",
    "page": "Internals",
    "title": "PhyloNetworks.moveHybrid!",
    "category": "method",
    "text": "moveHybrid road map\n\nFunction that tries to fix a gamma zero problem (h==0,1; t==0; hz==0,1) after changing direction of hybrid edge failed. This function is called in gammaZero.\n\nArguments:\n\ncloseN=true will try move origin/target on all neighbors (first choose minor/major edge at random, then make list of all neighbor edges and tries to put the hybrid node in all the neighbors until successful move); if false, will delete and add hybrid until successful move up to N times (this is never tested)\n\nReturns true if change was successful (not testing optBL again), and false if we could not move anything\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.nparams-Tuple{TraitSubstitutionModel}",
    "page": "Internals",
    "title": "PhyloNetworks.nparams",
    "category": "method",
    "text": "nparams(model)\n\nNumber of parameters for a given trait evolution model (length of field model.rate).\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.optBL!-Tuple{HybridNetwork,DataCF,Bool,Float64,Float64,Float64,Float64}",
    "page": "Internals",
    "title": "PhyloNetworks.optBL!",
    "category": "method",
    "text": "optBL road map\n\nFunction that optimizes the numerical parameters (branch lengths and inheritance probabilities) for a given network. This function is called multiple times inside optTopLevel!.\n\nInput: network net, data d\nNumerical tolerances: ftolAbs, ftolRel, xtolAbs, xtolRel\nFunction based on MixedModels fit function\nThe function assumes net has all the right attributes, and cannot check this inside because it would be inefficient\n\nProcedure:\n\nht = parameters!(net) extracts the vector of parameters to estimate (h,t,gammaz), and sets as net.ht; identifies a bad diamond I, sets net.numht (vector of hybrid node numbers for h, edge numbers for t, hybrid node numbers for gammaz), and net.index to keep track of the vector of parameters to estimate\nextractQuartet!(net,d) does the following for all quartets in d.quartet:\nExtract quartet by deleting all leaves not in q -> create QuartetNetwork object saved in q.qnet\nThis network is ugly and does not have edges collapsed. This is done to keep a one-to-one correspondence between the edges in q.qnet and the edges in net (if we remove nodes with only two edges, we will lose this correspondence)\nCalculate expected CF with calculateExpCFAll for a copy of q.qnet. We do this copy because we want to keep q.qnet as it is (without collapsed edges into one). The function will then save the expCF in q.qnet.expCF\ncalculateExpCFAll!(qnet) will\nidentify the type of quartet as type 1 (equivalent to a tree) or type 2 (minor CF different). Here the code will first clean up any hybrid node by removing nodes with only two edges before identifying the qnet (because identification depends on neighbor nodes to hybrid node); later, set qnet.which (1 or 2), node.prev (neighbor node to hybrid node), updates node.k (number of nodes in hybridization cycle, this can change after deleting the nodes with only two edges), node.typeHyb (1,2,3,4,5 depending on the number of nodes in the hybridization cycle and the origin/target of the minor hybrid edge; this attribute is never used).\neliminate hybridization: this will remove type 1 hybridizations first. If qnet.which=1, then the qnet is similar to a tree quartet, so it will calculate the internal length of the tree quartet: qnet.t1.\nupdate split for qnet.which=1, to determine which taxa are together. For example, for the quartet 12|34, the split is [1,1,2,2] or [2,2,1,1], that is, taxon 1 and 2 are on the same side of the split. This will update qnet.split\nupdate formula for qnet.which=1 to know the order of minorCF and majorCF in the vector qnet.expCF. That is, if the quartet is 1342 (order in qnet.quartet.taxon), then the expected CF should match the observed CF in 13|42, 14|32, 12|34 and the qnet is 12|34 (given by qnet.split), qnet.formula will be [2,2,1] minor, minor, major\ncalculateExpCF!(qnet) for qnet.which=1, it will do 1-2/3exp(-qnet.t1) if qnet.formula[i]==1, and 1/3exp(qnet.t1) if qnet.formula[i]==2. For qnet.which=2, we need to make sure that there is only one hybrid node, and compute the major, minor1,minor2 expected CF in the order 12|34, 13|24, 14|23 of the taxa in qnet.quartet.taxon\n\nThen we create a NLopt object with algorithm BOBYQA and k parameters (length of ht). We define upper and lower bounds and define the objective function that should only depend on x=(h,t,gz) and g (gradient, which we do not have, but still need to put as argument).\n\nThe objective function obj(x,g) calls\n\ncalculateExpCFAll!(d,x,net) needs to be run after extractQuartet(net,d) that will update q.qnet for all quartet.  Assumes that qnet.indexht is updated already: we only need to do this at the beginning of optBL! because the topology is fixed at this point)\nFirst it will update the edge lengths according to x\nIf the q.qnet.changed=true (that is, any of qnet branches changed value), we need to call calculateExpCFAll!(qnet) on a copy of q.qnet (again because we want to leave q.qnet with the edge correspondence to net)\nupdate!(net,x) simply saves the new x in net.ht\n\nFinally, we call NLopt.optimize, and we update the net.loglik and net.ht at the end. After optBL, we want to call afterOptBLAll (or afterOptBLAllMultipleAlleles) to check if there are h==0,1; t==0; hz==0,1.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.optTopLevel!-Tuple{HybridNetwork,Float64,Integer,DataCF,Integer,Float64,Float64,Float64,Float64,Bool,Bool,Array{Int64,1},IO,Bool}",
    "page": "Internals",
    "title": "PhyloNetworks.optTopLevel!",
    "category": "method",
    "text": "optTopLevel road map\n\nFunction that does most of the heavy-lifting of snaq. It optimizes the pseudolikelihood for a given starting topology, and returns the best network. Assumes that the starting topology is level-1 network, and has all the attributes correctly updated.\n\nInput parameters:\n\nStarting topology currT, input data DataCF d, maximum number of hybridizations hmax\nNumerical optimization parameters: liktolAbs, Nfail, ftolRel, ftolAbs, xtolRel, xtolAbs\nPrint parameters: verbose, logfile, writelog\nParameters to tune the search in space of networks: closeN=true only propose move origin/target to neighbor edges (coded, but not tested with closeN=false), Nmov0 vector with maximum number of trials allowed per type of move (add, mvorigin, mvtarget, chdir, delete, nni), by default computed inside with coupon’s collector formulas\n\nThe optimization procedure keeps track of\n\nmovescount: count of proposed moves,\nmovesgamma: count of proposed moves to fix a gamma zero situation (see below for definition of this situation),\nmovesfail: count of failed moves by violation of level-1 network (inCycle attribute) or worse pseudolikelihood than current,\nfailures: number of failed proposals that had a worse pseudolikelihood\n\nOptimization procedure:\n\nWhile the difference between current loglik and proposed loglik is greater than liktolAbs, or failures<Nfail, or stillmoves=true:\n\nNmov is updated based on newT. The type of move proposed will depend on newT (which is the same as currT at this point). For example, if currT is a tree, we cannot propose move origin/target.\nmove = whichMove selects randomly a type of move, depending on Nmov,movesfail,hmax,newT with weights 1/5 by default for all, and 0 for delete. These weights are adjusted depending on newT.numHybrids and hmax. If newT.numHybrids is far from hmax, we give higher probability to adding a new hybrid (we want to reach the hmax sooner, maybe not the best strategy, easy to change).  Later, we adjust the weights by movesfail (first, give weight of 0 if movesfail[i]>Nmov[i], that is, if we reached the maximum possible number of moves allowed for a certain type) and then increase the probability of the other moves.  So, unless one move has w=0, nothing changes. This could be improved by using the outlier quartets to guide the proposal of moves.\nwhichMove will choose a move randomly from the weights, it will return none if no more moves allowed, in which case, the optimization ends\nflag=proposedTop!(move, newT) will modify newT based on move. The function proposedTop will return flag=true if the move was successful (the move succeeded by inCycle, containRoot, available edge to make the move (more details in proposedTop)). If flag=false, then newT is cleaned, except for the case of multiple alleles. The function proposedTop keeps count of movescount (successful move), movesfail (unsuccessful move),\nOptions:\nrandom=true: moves major/minor hybrid edge with prob h,1-h, respectively\nN=10: number of trials for NNI edge.\nif(flag) Optimize branch lengths with optBL\nIf newT.loglik is better than currT.loglik by liktolAbs, jump to newT (accepted=true) and fix gamma=0, t=0 problems (more info on afterOptBL)\nIf(accepted)   failures=0, movesfail=zeros, movescount for successful move +1\n\nend while\n\nAfter choosing the best network newT, we do one last more thorough optimization of branch lengths with optBL, we change non identifiable branch lengths to -1 and return newT\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.optTopRun1!-Tuple{HybridNetwork,Any,Integer,DataCF,Integer,Float64,Float64,Float64,Float64,Bool,Bool,Array{Int64,1},Integer,IO,Bool,Float64}",
    "page": "Internals",
    "title": "PhyloNetworks.optTopRun1!",
    "category": "method",
    "text": "optTopRun1!(net, liktolAbs, Nfail, d::DataCF, hmax, etc.)\n\nThe function will run 1 run by modifying the starting topology and calling optTopLevel. See optTopRuns! for a roadmap.\n\nprobST (default in snaq is 0.3) is the probability of starting one run at the same input tree. So, with probability 1-probST, we will change the topology by a NNI move on a tree edge without neighbor hybrid. If the starting topology is a network, then with probability 1-probST it will also modify one randomly chosen hybrid edge: with prob 0.5, the function will move origin, with prob 0.5 will do move target.\n\nIf there are multiple alleles (d.repSpecies not empty), then the function has to check that the starting topology does not violate the multiple alleles condition.\n\nAfter modifying the starting topology with NNI and/or move origin/target, optTopLevel is called.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.optTopRuns!-Tuple{HybridNetwork,Float64,Integer,DataCF,Integer,Float64,Float64,Float64,Float64,Bool,Bool,Array{Int64,1},Integer,AbstractString,AbstractString,Integer,Float64}",
    "page": "Internals",
    "title": "PhyloNetworks.optTopRuns!",
    "category": "method",
    "text": "Road map for various functions behind snaq!\n\nsnaq!\noptTopRuns!\noptTopRun1!\noptTopLevel!\noptBL!\n\nAll return their optimized network.\n\nsnaq! calls optTopRuns! once, after a deep copy of the starting network. If the data contain multiple alleles from a given species, snaq! first expands the leaf for that species into 2 separate leaves, and merges them back into a single leaf after calling optTopRuns!.\noptTopRuns! calls optTopRun1! several (nrun) times. assumes level-1 network with >0 branch lengths. assumes same tips in network as in data: i.e. 2 separate tips per species                                          that has multiple alleles. each call to optTopRun1! gets the same starting network.\noptTopRun1! calls optTopLevel! once, after deep copying + changing the starting network slightly.\noptTopLevel! calls optBL! various times and proposes new network with various moves.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.pairwiseTaxonDistanceGrad-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.pairwiseTaxonDistanceGrad",
    "category": "method",
    "text": "pairwiseTaxonDistanceGrad(net; checkEdgeNumber=true, nodeAges=[])\n\n3-dim array: gradient of pairwise distances between all nodes. (internal and leaves); gradient with respect to edge lengths if nodeAges is empty; with respect to node ages otherwise. Assume correct net.nodes_changed (preorder).   This gradient depends on the network\'s topology and γ\'s only, not on branch lengths or node ages (distances are linear in either).\n\nWARNING: edge numbers need to range between 1 and #edges.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.parseEdgeData!-Tuple{IO,PhyloNetworks.Edge,PhyloNetworks.Node,Array{Int64,1}}",
    "page": "Internals",
    "title": "PhyloNetworks.parseEdgeData!",
    "category": "method",
    "text": "parseEdgeData!(s::IO, edge, node, numberOfLeftParentheses::Array{Int,1})\n\nHelper function for readSubtree!, fixes a bug from using setGamma Modifies e according to the specified edge length and gamma values in the tree topology. Advances the stream s past any existing edge data. Edges in a topology may optionally be followed by \":edgeLen:bootstrap:gamma\" where edgeLen, bootstrap, and gamma are decimal values.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.parseHybridNode!-Tuple{PhyloNetworks.Node,PhyloNetworks.Node,String,HybridNetwork,Array{String,1}}",
    "page": "Internals",
    "title": "PhyloNetworks.parseHybridNode!",
    "category": "method",
    "text": "parseHybridNode!(node, parentNode, hybridName, net, hybrids)\n\nHelper function for readSubtree!. Create the parent edge for node. Return this edge, and the hybrid node retained (node or its clone in the newick string). Insert new edge and appropriate node into net and hybrids accordingly. Handles any type of given hybrid node. Called after a # has been found in a tree topology.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.parseRemainingSubtree!-Tuple{IO,Array{Int64,1},HybridNetwork,Array{String,1}}",
    "page": "Internals",
    "title": "PhyloNetworks.parseRemainingSubtree!",
    "category": "method",
    "text": "parseRemainingSubtree!(s::IO, numLeft, net, hybrids)\n\nCreate internal node. Helper for readSubtree!, which creates the parent edge of the node created by parseRemainingSubtree!: readSubtree! calls parseRemainingSubtree!, and vice versa. Called once a ( has been read in a tree topology and reads until the corresponding ) has been found. This function performs the recursive step for readSubtree!. Advances s past the subtree, adds discovered nodes and edges to net, and hybrids.\n\nDoes not read the node name and the edge information of the subtree root: this is done by readSubtree!\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.parseTreeNode!-Tuple{PhyloNetworks.Node,PhyloNetworks.Node,HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.parseTreeNode!",
    "category": "method",
    "text": "parseTreeNode!(node, parentNode, net)\n\nHelper function for readSubtree!. Insert the input tree node and associated edge (created here) into net.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.parsimonyBottomUpFitch!-Union{Tuple{T}, Tuple{Node,Dict{Int64,Set{T}},Array{Int64,1}}} where T",
    "page": "Internals",
    "title": "PhyloNetworks.parsimonyBottomUpFitch!",
    "category": "method",
    "text": "parsimonyBottomUpFitch!(node, states, score)\n\nBottom-up phase (from tips to root) of the Fitch algorithm: assign sets of character states to internal nodes based on character states at tips. Polytomies okay. Assumes a tree (no reticulation) and correct isChild1 attribute.\n\noutput: dictionary with state sets and most parsimonious score\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.parsimonyBottomUpGF!-Tuple{PhyloNetworks.Node,PhyloNetworks.Node,Integer,AbstractArray,AbstractArray,AbstractArray,AbstractArray}",
    "page": "Internals",
    "title": "PhyloNetworks.parsimonyBottomUpGF!",
    "category": "method",
    "text": "`parsimonyBottomUpGF!(node, blobroot, nchar, w, scores,\n    costmatrix1, costmatrix2)`\n\nCompute the MP scores (one for each assignment of the blob root state) given the descendants of a blob, conditional on the states at predefined parents of hybrids in the blobs (one parent per hybrid) as described in\n\nLeo Van Iersel, Mark Jones, Celine Scornavacca (2017). Improved Maximum Parsimony Models for Phylogenetic Networks, Systematic Biology, (https://doi.org/10.1093/sysbio/syx094).\n\nAssumes a set of state guesses, ie correct initialization of w for predefined hybrid parents, and correct fromBadDiamondI field for the children edges of these predefined parents. fromBadDiamondI is true for edges that are cut.\n\nThe field isExtBadTriangle is used to know which nodes are at the root of a blob. The field isChild1 is used (and assumed correct). Field inCycle is assumed to store the # of detached parents (with guessed states)\n\nnchar: number of characters considered at internal lineages. For softwired parsimony, this is # states + 1, because characters at internal nodes are ∅, {1}, {2}, etc. For parental parsimony, this is 2^#states -1, because characters are all sets on {1,2,...} except for the empty set ∅.\ncostmatrix1[i,j] and costmatrix2[k][i,j]: 2d array and vector of 2d arrays containing the cost of going to character j starting from character i when the end node has a single parent, or the cost of a child node having character j when its parents have characters k and i. These cost matrices are pre-computed depending on the parsimony criterion (softwired, hardwired, parental etc.)\n\nused by parsimonyGF.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.parsimonyBottomUpSoftwired!-Tuple{PhyloNetworks.Node,PhyloNetworks.Node,Integer,AbstractArray,AbstractArray}",
    "page": "Internals",
    "title": "PhyloNetworks.parsimonyBottomUpSoftwired!",
    "category": "method",
    "text": "parsimonyBottomUpSoftwired!(node, blobroot, states, w, scores)\n\nComputing the MP scores (one for each assignment of the root state) of a swicthing as described in Algorithm 1 in the following paper:\n\nFischer, M., van Iersel, L., Kelk, S., Scornavacca, C. (2015). On computing the Maximum Parsimony score of a phylogenetic network. SIAM J. Discrete Math., 29(1):559-585.\n\nAssumes a switching (ie correct fromBadDiamondI field) and correct isChild1 field. The field isExtBadTriangle is used to know which nodes are at the root of a blob.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.parsimonyDiscreteFitch-Union{Tuple{T}, Tuple{HybridNetwork,Dict{String,T}}} where T",
    "page": "Internals",
    "title": "PhyloNetworks.parsimonyDiscreteFitch",
    "category": "method",
    "text": "parsimonyDiscreteFitch(net, tipdata)\n\nCalculate the most parsimonious (MP) score of a network given a discrete character at the tips. The softwired parsimony concept is used: where the number of state transitions is minimized over all trees displayed in the network. Tip data can be given in a data frame, in which case the taxon names are to appear in column 1 or in a column named \"taxon\" or \"species\", and trait values are to appear in column 2 or in a column named \"trait\". Alternatively, tip data can be given as a dictionary taxon => trait.\n\nalso return the union of all optimized character states at each internal node as obtained by Fitch algorithm, where the union is taken over displayed trees with the MP score.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.parsimonySummaryFitch-Union{Tuple{T}, Tuple{HybridNetwork,Dict{Int64,Set{T}}}} where T",
    "page": "Internals",
    "title": "PhyloNetworks.parsimonySummaryFitch",
    "category": "method",
    "text": "parsimonySummaryFitch(tree, nodestates)\n\nsummarize character states at nodes, assuming a tree\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.parsimonyTopDownFitch!-Union{Tuple{T}, Tuple{Node,Dict{Int64,Set{T}}}} where T",
    "page": "Internals",
    "title": "PhyloNetworks.parsimonyTopDownFitch!",
    "category": "method",
    "text": "parsimonyTopDownFitch!(node, states)\n\nTop-down phase (root to tips) of the Fitch algorithm: constrains character states at internal nodes based on the state of the root. Assumes a tree: no reticulation.\n\noutput: dictionary with state sets\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.proposedTop!-Tuple{Integer,HybridNetwork,Bool,Integer,Integer,Array{Int64,1},Array{Int64,1},Bool}",
    "page": "Internals",
    "title": "PhyloNetworks.proposedTop!",
    "category": "method",
    "text": "proposedTop!(move,newT,random,count,N,movescount,movesfail,multall) road map\n\nFunction to change the current network newT by a given move, and checks that the move was successful (correct attributes). If not successful, newT is changed back to its original state, except for the case of multiple alleles.\n\nNote that the update of attributes by each move is not done in all the network, but only in the local edges that were changed by the move. This is efficient (and makes a move easy to undo), but makes the code of each move function very clunky.\n\nArguments:\n\nmove chosen from whichMove as described in optTopLevel\nnewT is the topology that will be modified inside with the move\nrandom=true: chooses minor hybrid edge with prob 1-h, and major edge with prob h, if false, always chooses minor hybrid edge\ncount: simply which likelihood step we are in in the optimization at optTopLevel\nmovescount and movesfail: vector of counts of number of moves proposed\nmultall=true if multiple alleles case: we need to check if the move did not violate the multiple alleles condition (sister alleles together and no gene flow into the alleles). This is inefficient because we are proposing moves that we can reject later, instead of being smart about the moves we propose: for example, move origin/target could rule out some neighbors that move gene flow into the alleles, the same for add hybridization; nni move can check if it is trying to separate the alleles)\n\nMoves:\n\naddHybridizationUpdate(newT,N):\n\nwill choose a partition first (to avoid choosing edges that will create a non level-1 network) will choose two edges from this partition randomly, will not allow two edges in a cherry (non-identifiable), or sister edges that are not identifiable (the blacklist was a way to keep track of \"bad edges\" were we should not waste time trying to put hybridizations, it has never been used nor tested). Also choose gamma from U(0,0.5). The \"Update\" in the function name means that it creates the new hybrid, and also updates all the attributes of newT\n\nnode = chooseHybrid(newT) choose a hybrid randomly for the next moves:\nmoveOriginUpdateRepeat!(newT,node,random)\n\nwill choose randomly the minor/major hybrid edge to move (if random=true); will get the list of all neighbor edges where to move the origin, will move the origin and update all the attributes and check if the move was successful (not conflicting attributes); if not, will undo the move, and try with a different neighbor until it runs out of neighbors. Return true if the move was successful.\n\nmoveTargetUpdateRepeat!(newT,node,random)\n\nsame as move origin but moving the target\n\nchangeDirectionUpdate!(newT,node,random)\n\nchooses minor/major hybrid edge at random (if `random=true), and changes the direction, and updates all the attributes. Checks if the move was successful (returns true), or undoes the change and returns false.\n\ndeleteHybridizationUpdate!(newT,node)\n\nremoves the hybrid node, updates the attributes, no need to check any attributes, always successful move\n\nNNIRepeat!(newT,N)\n\nchoose an edge for nni that does not have a neighbor hybrid. It will try to find such an edge N times, and if it fails, it will return false (unsuccessful move). N=10 by default. If N=1, it rarely finds such an edge if the network is small or complex. The function cannot choose an external edge. it will update locally the attributes.\n\n** Important: ** All the moves undo what they did if the move was not successful, so at the end you either have a newT with a new move and with all good attributes, or the same newT that started. This is important to avoid having to do deepcopy of the network before doing the move. Also, after each move, when we update the attributes, we do not update the attributes of the whole network, we only update the attributes of the edges that were affected by the move. This saves time, but makes the code quite clunky. Only the case of multiple alleles the moves does not undo what it did, because it finds out that it failed after the function is over, so just need to treat this case special.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.readCSVtoArray-Tuple{DataFrames.DataFrame}",
    "page": "Internals",
    "title": "PhyloNetworks.readCSVtoArray",
    "category": "method",
    "text": "readCSVtoArray(dat::DataFrame)\nreadCSVtoArray(filename::String)\n\nRead a CSV table containing both species names and data, create two separate arrays: one for the species names, a second for the data, in a format that parsimonyGF needs.\n\nWarning:\n\nit will try to find a column \'taxon\' or \'species\' for the taxon names. If none found, it will assume the taxon names are in column 1.\nwill use all other columns as characters\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.readInputData-Tuple{AbstractString,AbstractString,Symbol,Integer,Bool,AbstractString,Bool,Bool}",
    "page": "Internals",
    "title": "PhyloNetworks.readInputData",
    "category": "method",
    "text": "readInputData(trees, quartetfile, whichQuartets, numQuartets, writetable, tablename, writeQfile, writesummary)\nreadInputData(trees, whichQuartets, numQuartets, taxonlist,   writetable, tablename, writeQfile, writesummary)\n\nRead gene trees and calculate the observed quartet concordance factors (CF), that is, the proportion of genes (and the number of genes) that display each quartet for a given list of four-taxon sets.\n\nInput:\n\ntrees: name of a file containing a list of input gene trees, or vector of trees (HybridNetwork objects)\n\nOptional arguments (defaults):\n\nquartetfile: name of a file containing a list of quartets, or more precisely, a list of four-taxon sets\nwhichQuartets (:all): which quartets to sample. :all for all of them, :rand for a random sample.\nnumQuartets: number of quartets in the sample. default: total number of quartets if whichQuartets=:all and 10% of total if whichQuartets=:rand\ntaxonlist (all in the input gene trees): If taxonlist is used, whichQuartets will consist of all sets of 4 taxa in the taxonlist. \nwritetable (true): write the table of observed CF?\ntablename (\"tableCF.txt\"): if writetable is true, the table of observed CFs is write to file tablename\nwriteQfile (false): write intermediate file with sampled quartets?\nwritesummary (true): write a summary file? if so, the summary will go in file \"summaryTreesQuartets.txt\".\n\nSee also: readTrees2CF, which is basically a re-naming of readInputData, and readTableCF to read a table of quartet CFs directly.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.readSubtree!-Tuple{IO,PhyloNetworks.Node,Array{Int64,1},HybridNetwork,Array{String,1}}",
    "page": "Internals",
    "title": "PhyloNetworks.readSubtree!",
    "category": "method",
    "text": "readSubtree!(s::IO, parentNode, numLeft, net, hybrids)\n\nRecursive helper method for readTopology: read a subtree from an extended Newick topology. input s: IOStream/IOBuffer.\n\nReads additional info formatted as: :length:bootstrap:gamma. Allows for name of internal nodes without # after closing parenthesis: (1,2)A. Warning if hybrid edge without γ, or if γ (ignored) without hybrid edge\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.recursionPostOrder-Tuple{Array{PhyloNetworks.Node,1},Function,Function,Function,Any}",
    "page": "Internals",
    "title": "PhyloNetworks.recursionPostOrder",
    "category": "method",
    "text": "recursionPostOrder(nodes, init_function, tip_function, node_function,\n                   parameters)\nupdatePostOrder(index, nodes, updated_matrix, tip_function, node_function,\n                parameters)\n\nGeneric tool to apply a post-order (or topological ordering) algorithm. Used by descendenceMatrix.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.recursionPreOrder!",
    "page": "Internals",
    "title": "PhyloNetworks.recursionPreOrder!",
    "category": "function",
    "text": "recursionPreOrder(nodes, init_function, root_function, tree_node_function,\n                  hybrid_node_function, parameters)\nrecursionPreOrder!(nodes, AbstractArray, root_function, tree_node_function,\n                   hybrid_node_function, parameters)\nupdatePreOrder(index, nodes, updated_matrix, root_function, tree_node_function,\n               hybrid_node_function, parameters)\n\nGeneric tool to apply a pre-order (or topological ordering) algorithm. Used by sharedPathMatrix and by pairwiseTaxonDistanceMatrix.\n\n\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.recursionPreOrder-Tuple{Array{PhyloNetworks.Node,1},Function,Function,Function,Function,Any}",
    "page": "Internals",
    "title": "PhyloNetworks.recursionPreOrder",
    "category": "method",
    "text": "recursionPreOrder(nodes, init_function, root_function, tree_node_function,\n                  hybrid_node_function, parameters)\nrecursionPreOrder!(nodes, AbstractArray, root_function, tree_node_function,\n                   hybrid_node_function, parameters)\nupdatePreOrder(index, nodes, updated_matrix, root_function, tree_node_function,\n               hybrid_node_function, parameters)\n\nGeneric tool to apply a pre-order (or topological ordering) algorithm. Used by sharedPathMatrix and by pairwiseTaxonDistanceMatrix.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.removeHybrid!-Tuple{PhyloNetworks.Network,PhyloNetworks.Node}",
    "page": "Internals",
    "title": "PhyloNetworks.removeHybrid!",
    "category": "method",
    "text": "removeHybrid!(net::Network, n::Node)\n\nDelete a hybrid node n from net.hybrid, and update net.numHybrid. The actual node n is not deleted. It is kept in the full list net.node.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.resetEdgeNumbers!-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.resetEdgeNumbers!",
    "category": "method",
    "text": "resetEdgeNumbers!(net::HybridNetwork; checkPreorder=true, ape=true)\n\nCheck that edge numbers of net are consecutive numbers from 1 to the total number of edges. If not, reset the edge numbers to be so.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.resetNodeNumbers!-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.resetNodeNumbers!",
    "category": "method",
    "text": "resetNodeNumbers!(net::HybridNetwork; checkPreorder=true, ape=true)\n\nChange internal node numbers of net to consecutive numbers from 1 to the total number of nodes.\n\nkeyword arguments:\n\nape: if true, the new numbers satisfy the conditions assumed by the ape R package: leaves are 1 to n, the root is n+1, and internal nodes are higher consecutive integers. If false, nodes are numbered in post-order, with leaves from 1 to n (and the root last).\ncheckPreorder: if false, the isChild1 edge field and the net.nodes_changed network field are supposed to be correct (to get nodes in preorder)\n\nExamples\n\njulia> net = readTopology(\"(A,(B,(C,D)));\");\njulia> PhyloNetworks.resetNodeNumbers!(net)\njulia> printNodes(net)\nNode    In Cycle        isHybrid        hasHybEdge      Node label      isLeaf  Edges numbers\n1       -1              false           false           A               true    1\n2       -1              false           false           B               true    2\n3       -1              false           false           C               true    3\n4       -1              false           false           D               true    4\n7       -1              false           false                           false   3       4       5\n6       -1              false           false                           false   2       5       6\n5       -1              false           false                           false   1       6\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.sameTaxa-Tuple{Quartet,HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.sameTaxa",
    "category": "method",
    "text": "sameTaxa(Quartet, HybridNetwork)\n\nReturn true if all taxa in the quartet are represented in the network, false if one or more taxa in the quartet does not appear in the network.\n\nwarning: the name can cause confusion. A more appropriate name might be \"in\", or \"taxain\", or \"taxonsubset\", or etc.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.sampleBootstrapTrees-Tuple{Array{Array{HybridNetwork,1},1}}",
    "page": "Internals",
    "title": "PhyloNetworks.sampleBootstrapTrees",
    "category": "method",
    "text": "sampleBootstrapTrees(vector of tree lists; seed=0::Integer, generesampling=false, row=0)\nsampleBootstrapTrees!(tree list, vector of tree lists; seed=0::Integer, generesampling=false, row=0)\n\nSample bootstrap gene trees, 1 tree per gene. Set the seed with keyword argument seed, which is 0 by default. When seed=0, the actual seed is set using the clock. Assumes a vector of vectors of networks (see readBootstrapTrees), each one of length 1 or more (error if one vector is empty, tested in bootsnaq).\n\nsite resampling: always, from sampling one bootstrap tree from each given list. This tree is sampled at random unless row>0 (see below).\ngene resampling: if generesampling=true (default is false), genes (i.e. lists) are sampled with replacement.\nrow=i: samples the ith bootstrap tree for each gene. row is turned back to 0 if gene resampling is true.\n\noutput: one vector of trees. the modifying function (!) modifies the input tree list and returns it.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.sampleCFfromCI",
    "page": "Internals",
    "title": "PhyloNetworks.sampleCFfromCI",
    "category": "function",
    "text": "sampleCFfromCI(data frame, seed=0)\nsampleCFfromCI!(data frame, seed=0)\n\nRead a data frame containing CFs and their credibility intervals, and sample new obsCF uniformly within the CIs. These CFs are then rescaled to sum up to 1 for each 4-taxon sets. Return a data frame with taxon labels in first 4 columns, sampled obs CFs in columns 5-7 and credibility intervals in columns 8-13.\n\nThe non-modifying function creates a new data frame (with re-ordered columns) and returns it. If seed=-1, the new df is a deep copy of the input df, with no call to the random number generator. Otherwise, seed is passed to the modifying function.\nThe modifying function overwrites the input data frame with the sampled CFs and returns it. If seed=0, the random generator is seeded from the clock. Otherwise the random generator is seeded using seed.\n\nWarning: the modifying version does not check the data frame: assumes correct columns.\n\noptional argument: delim=\',\' by default: how columns are delimited.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.setBLGammaParsimony!-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.setBLGammaParsimony!",
    "category": "method",
    "text": "setBLGammaParsimony!(net::HybridNetwork)\n\nMaximum parsimony function does not provide estimates for branch lengths, or gamma. But since the maxParsimonyNet function is using snaq move functions, branch lengths and gamma values are set randomly (to initialize optimization). We need to remove these random values before returning the maximum parsimony network.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.setBranchLength!-Tuple{PhyloNetworks.Edge,Number}",
    "page": "Internals",
    "title": "PhyloNetworks.setBranchLength!",
    "category": "method",
    "text": "setBranchLength!(Edge,new length)\n\nsets the length of an Edge object. The new length needs to be non-negative, or -1.0 to be interpreted as missing. Example: if net is a HybridNetwork object, do printEdges(net) to see the list of all edges with their lengths. The length of the 3rd edge can be changed to 1.2 with setBranchLength!(net.edge[3],1.2). It can also be set to missing with setBranchLength!(net.edge[3],-1.0)\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.setGammaBLfromGammaz!-Tuple{PhyloNetworks.Node,HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.setGammaBLfromGammaz!",
    "category": "method",
    "text": "setGammaBLfromGammaz!(node, network)\n\nUpdate the γ values of the two sister hybrid edges in a bad diamond I, given the gammaz values of their parent nodes, and update the branch lengths t1 and t2 of their parent edges (those across from the hybrid nodes), in such a way that t1=t2 and that these branch lengths and γ values are consistent with the gammaz values in the network.\n\nSimilar to the first section of undoGammaz!, but does not update anything else than γ and t\'s. Unlike undoGammaz!, no error if non-hybrid node or not at bad diamond I.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.setGammas!-Tuple{HybridNetwork,Array{T,1} where T}",
    "page": "Internals",
    "title": "PhyloNetworks.setGammas!",
    "category": "method",
    "text": "setGammas!(net, γ vector)\n\nSet inheritance γ\'s of hybrid edges, using input vector for major edges. Assume pre-order calculated already, with up-to-date field nodes_changed. See getGammas.\n\nVery different from setGamma!, which focuses on a single hybrid event, updates the field isMajor according to the new γ, and is not used here.\n\nMay assume a tree-child network.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.setNonIdBL!-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.setNonIdBL!",
    "category": "method",
    "text": "setNonIdBL!(net)\n\nSet non-identifiable edge branch lengths to -1.0 (i.e. missing) for a level-1 network net, except for edges in\n\na good triangle: the edge below the hybrid is constrained to 0.\na bad diamond II: the edge below the hybrid is constrained to 0\na bad diamond I: the edges across from the hybrid node have non identifiable lengths but are kept, because the two γ*(1-exp(-t)) values are identifiable.\n\nwill break if inCycle attributes are not initialized (at -1) or giving a correct node number.\n\nsee Node for the meaning of boolean attributes isBadTriangle (which corresponds to a \"good\" triangle above), isBadDiamondI and isBadDiamondII.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.showQ-Tuple{IO,TraitSubstitutionModel}",
    "page": "Internals",
    "title": "PhyloNetworks.showQ",
    "category": "method",
    "text": "showQ(IO, model)\n\nPrint the Q matrix to the screen, with trait states as labels on rows and columns. adapted from prettyprint function by mcreel, found 2017/10 at https://discourse.julialang.org/t/display-of-arrays-with-row-and-column-names/1961/6\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.sortUnionTaxa!-Tuple{Any}",
    "page": "Internals",
    "title": "PhyloNetworks.sortUnionTaxa!",
    "category": "method",
    "text": "sortUnionTaxa!(taxa)\n\nTake a vector of strings taxa, sort it numerically if elements can be parsed as an integer, alphabetically otherwise.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.symmetricNet",
    "page": "Internals",
    "title": "PhyloNetworks.symmetricNet",
    "category": "function",
    "text": "symmetricNet(n, h, gamma)\n\nCreate a string with a symmetric net with 2^n tips, numbered from 1 to 2^n The total height of the network is set to 1. Hybrids are added from level h to h-1 symmetrically.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.symmetricNet-Tuple{Int64,Int64,Int64,Real,Real}",
    "page": "Internals",
    "title": "PhyloNetworks.symmetricNet",
    "category": "method",
    "text": "symmetricNet(n, i, j, gamma)\n\nCreate a string with a symmetric net with 2^n tips, numbered from 1 to 2^n All the branch length are set equal to 1. One hybrid branch, going from level i to level j is added, with weigth gamma. The tree can be created with function readTopology.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.symmetricTree",
    "page": "Internals",
    "title": "PhyloNetworks.symmetricTree",
    "category": "function",
    "text": "symmetricTree(n, i=1)\n\nCreate a string with a symmetric tree with 2^n tips, numbered from i to i+2^n-1. All the branch length are set equal to 1. The tree can be created with function readTopology.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.synchronizePartnersData!-Tuple{PhyloNetworks.Edge,PhyloNetworks.Node}",
    "page": "Internals",
    "title": "PhyloNetworks.synchronizePartnersData!",
    "category": "method",
    "text": "synchronizePartnersData!(e::Edge, n::Node)\n\nSynchronize γ and isMajor for edges e and its partner, both hybrid edges with the same child n:\n\nif one γ is missing and the other is not: set the missing γ to 1 - the other\nγ\'s should sum up to 1.0\nupdate isMajor to match the γ information: the major edge is the one with γ > 0.5.\n\nWarnings: does not check that e is a hybrid edge, nor that n is the child of e.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.taxadiff-Tuple{Array{Quartet,1},HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.taxadiff",
    "category": "method",
    "text": "taxadiff(Vector{Quartet}, network; multiplealleles=true)\ntaxadiff(DataCF, network; multiplealleles=true)\n\nReturn 2 vectors:\n\ntaxa in at least 1 of the quartets but not in the network, and\ntaxa in the network but in none of the quartets.\n\nWhen multiplealleles is true, the taxon names that end with \"__2\" are ignored in the quartets: they are not expected to appear in the networks that users give as input, or get as output.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.ticr_optimalpha-Tuple{DataCF}",
    "page": "Internals",
    "title": "PhyloNetworks.ticr_optimalpha",
    "category": "method",
    "text": "ticr_optimalpha(D::DataCF)\n\nFind the concentration parameter α by maximizing the pseudo-log-likelihood of observed quartet concordance factors. The model assumes a Dirichlet distribution with mean equal to the expected concordance factors calculated from a phylogenetic network (under ILS and reticulation). These expected CFs are assumed to be already calculated, and stored in D.\n\nWhen calculating the pseudo-log-likelihood, this function will check the observed concordance factors for any values equal to zero: they cause a problem because the Dirichlet density is 0 at 0 (for concentrations > 1). Those 0.0 observed CF values are re-set to the minimum of:\n\nthe minimum of all expected concordance factors, and\nthe minimum of all nonzero observed concordance factors.\n\noutput:\n\nmaximized pseudo-loglikelihood\nvalue of α where the pseudo-loglikelihood is maximized\nreturn code of the optimization\n\nThe optimization uses NLOpt, with the :LN_BOBYQA method. Optional arguments can tune the optimization differently: NLoptMethod, xtol_rel (1e-6 by default), starting α value x_start (1.0 by default).\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.traitlabels2indices-Tuple{AbstractArray{T,1} where T,TraitSubstitutionModel}",
    "page": "Internals",
    "title": "PhyloNetworks.traitlabels2indices",
    "category": "method",
    "text": "traitlabels2indices(data, model::TraitSubstitutionModel)\n\nCheck that the character states in data are compatible with (i.e. subset of) the trait labels in model. All columns are used. data can be a DataFrame or a Matrix (multiple traits), or a Vector (one trait).\n\nReturn a vector of vectors (one per species) with integer entries, where each state (label) is replaced by its index in model.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.traverseContainRoot!-Tuple{PhyloNetworks.Node,PhyloNetworks.Edge,Array{PhyloNetworks.Edge,1},Array{Bool,1}}",
    "page": "Internals",
    "title": "PhyloNetworks.traverseContainRoot!",
    "category": "method",
    "text": "updateContainRoot!(HybridNetwork, Node)\ntraverseContainRoot!(Node, Edge, edges_changed::Array{Edge,1}, rightDir::Vector{Bool})\n\nThe input node to updateContainRoot! must be a hybrid node (can come from searchHybridNode). updateContainRoot! starts at the input node and calls traverseContainRoot!, which traverses the network recursively. By default, containRoot attributes of edges are true. Changes containRoot to false for all the visited edges: those below the input node, but not beyond any other hybrid node.\n\nupdateContainRoot! Returns a flag and an array of edges whose containRoot has been changed from true to false. flag is false if the set of edges to place the root is empty\n\nIn traverseContainRoot!, rightDir turns false if hybridizations have incompatible directions (vector of length 1, to be modified).\n\nWarning:\n\ndoes not update containRoot of minor hybrid edges.\nassumes correct isMajor attributes: to stop the recursion at minor hybrid edges.\nassumes correct hybrid attributes of both nodes & edges: to check if various hybridizations have compatible directions. For each hybrid node that is encountered, checks if it was reached via a hybrid edge (ok) or tree edge (not ok).\n\nrightDir: vector of length 1 boolean, to be mutable and modified by the function\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.undoGammaz!-Tuple{PhyloNetworks.Node,HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.undoGammaz!",
    "category": "method",
    "text": "undoGammaz!(node, network)\n\nUndo updateGammaz! for the 2 cases: bad diamond I,II. node should be a hybrid node. Set length to edges that were not identifiable and change edges\' gammaz attribute to -1.0. Recalculate branch lengths in terms of gammaz.   warning: needs to know incycle attributes\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.updateBL!-Tuple{HybridNetwork,DataCF}",
    "page": "Internals",
    "title": "PhyloNetworks.updateBL!",
    "category": "method",
    "text": "updateBL!(net::HybridNetwork, d::DataCF)\n\nUpdate internal branch lengths of net based on the average quartet concordance factor (CF) across all quartets that exactly correspond to a given branch: new branch length = -log(3/2(1-mean(CF observed in d))). net is assumed to be a tree, such that the above equation holds.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.updateContainRoot!",
    "page": "Internals",
    "title": "PhyloNetworks.updateContainRoot!",
    "category": "function",
    "text": "updateContainRoot!(HybridNetwork, Node)\ntraverseContainRoot!(Node, Edge, edges_changed::Array{Edge,1}, rightDir::Vector{Bool})\n\nThe input node to updateContainRoot! must be a hybrid node (can come from searchHybridNode). updateContainRoot! starts at the input node and calls traverseContainRoot!, which traverses the network recursively. By default, containRoot attributes of edges are true. Changes containRoot to false for all the visited edges: those below the input node, but not beyond any other hybrid node.\n\nupdateContainRoot! Returns a flag and an array of edges whose containRoot has been changed from true to false. flag is false if the set of edges to place the root is empty\n\nIn traverseContainRoot!, rightDir turns false if hybridizations have incompatible directions (vector of length 1, to be modified).\n\nWarning:\n\ndoes not update containRoot of minor hybrid edges.\nassumes correct isMajor attributes: to stop the recursion at minor hybrid edges.\nassumes correct hybrid attributes of both nodes & edges: to check if various hybridizations have compatible directions. For each hybrid node that is encountered, checks if it was reached via a hybrid edge (ok) or tree edge (not ok).\n\nrightDir: vector of length 1 boolean, to be mutable and modified by the function\n\n\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.updatePostOrder!",
    "page": "Internals",
    "title": "PhyloNetworks.updatePostOrder!",
    "category": "function",
    "text": "recursionPostOrder(nodes, init_function, tip_function, node_function,\n                   parameters)\nupdatePostOrder(index, nodes, updated_matrix, tip_function, node_function,\n                parameters)\n\nGeneric tool to apply a post-order (or topological ordering) algorithm. Used by descendenceMatrix.\n\n\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.updatePreOrder!",
    "page": "Internals",
    "title": "PhyloNetworks.updatePreOrder!",
    "category": "function",
    "text": "recursionPreOrder(nodes, init_function, root_function, tree_node_function,\n                  hybrid_node_function, parameters)\nrecursionPreOrder!(nodes, AbstractArray, root_function, tree_node_function,\n                   hybrid_node_function, parameters)\nupdatePreOrder(index, nodes, updated_matrix, root_function, tree_node_function,\n               hybrid_node_function, parameters)\n\nGeneric tool to apply a pre-order (or topological ordering) algorithm. Used by sharedPathMatrix and by pairwiseTaxonDistanceMatrix.\n\n\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.writeTopologyLevel1-Tuple{HybridNetwork}",
    "page": "Internals",
    "title": "PhyloNetworks.writeTopologyLevel1",
    "category": "method",
    "text": "writeTopologyLevel1(net::HybridNetwork)\n\nWrite the extended Newick parenthetical format of a level-1 network object with many optional arguments (see below). Makes a deep copy of net: does not modify net.\n\ndi=true: write in format for Dendroscope (default false)\nnames=false: write the leaf nodes numbers instead of taxon names (default true)\noutgroup (string): name of outgroup to root the tree/network. if \"none\" is given, the root is placed wherever possible.\nprintID=true, only print branch lengths for identifiable egdes according to the snaq estimation procedure (default false) (true inside of snaq!.)\nround: rounds branch lengths and heritabilities γ (default: true)\ndigits: digits after the decimal place for rounding (defult: 3)\nstring: if true (default), returns a string, otherwise returns an IOBuffer object.\nmultall: (default false). set to true when there are multiple alleles per population.\n\nThe topology may be written using a root different than net.root, if net.root is incompatible with one of more hybrid node. Missing hybrid names are written as \"#Hi\" where \"i\" is the hybrid node number if possible.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#StatsBase.fit-Tuple{Type{PhyloNetworks.StatisticalSubstitutionModel},HybridNetwork,TraitSubstitutionModel,AbstractArray{T,1} where T}",
    "page": "Internals",
    "title": "StatsBase.fit",
    "category": "method",
    "text": "fit(StatisticalSubstitutionModel, net, model, traits; kwargs...)\nfit!(StatisticalSubstitutionModel; kwargs...)\n\nInternal function called by fitDiscrete: with same key word arguments kwargs. But dangerous: traits should be a vector of vectors as for fitDiscrete but here traits need to contain the indices of trait values corresponding to the indices in model.label, and species should appear in traits in the order corresponding to the node numbers in net. See traitlabels2indices to convert trait labels to trait indices.\n\nWarning: does not perform checks. fitDiscrete calls this function after doing checks, preordering nodes in the network, making sure nodes have consecutive numbers, species are matched between data and network etc.\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#PhyloNetworks.fAbs",
    "page": "Internals",
    "title": "PhyloNetworks.fAbs",
    "category": "constant",
    "text": "default values for tolerance parameters, used in the optimization of branch lengths (fAbs, fRel, xAbs, xRel) and in the acceptance of topologies (likAbs, numFails).\n\nif changes are made here, make the same in the docstring for snaq! below\n\nversion fAbs fRel xAbs xRel numFails likAbs multiplier\nv0.5.1 1e-6 1e-6 1e-3 1e-2 75 1e-6 \nv0.3.0 1e-6 1e-5 1e-4 1e-3 100 0.01 \nv0.0.1 1e-6 1e-5 1e-4 1e-3 100  10000\nolder 1e-10 1e-12 1e-10 1e-10   \n\nv0.5.1: based on Nan Ji\'s work. same xAbs and xRel as in phylonet (as of 2015). earlier: multiplier was used; later: likAbs = multiplier*fAbs) \"older\": values from GLM.jl, Prof Bates\n\ndefault values used on a single topology, to optimize branch lengths and gammas, at the very end of snaq!, and by topologyMaxQPseudolik! since v0.5.1.\n\nversion fAbsBL fRelBL xAbsBL xRelBL\nv0.0.1 1e-10 1e-12 1e-10 1e-10\n\n\n\n\n\n"
},

{
    "location": "lib/internals/#functions-1",
    "page": "Internals",
    "title": "functions",
    "category": "section",
    "text": "Modules = [PhyloNetworks]\nPublic = false\nOrder   = [:function, :constant]DocTestSetup = nothing"
},

]}
