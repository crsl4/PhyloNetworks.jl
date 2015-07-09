#John Spaw
#Contains function that will convert a .dot file into a .svg image

using  GraphViz
#Converts a .dot file
function dotExport(file;filename="graphimage"::String)
  dot = open(file,"r") do io Graph(io) end
  GraphViz.layout!(dot,engine="dot")
  open("visualization/$filename.svg","w") do f
    GraphViz.writemime(f, MIME"image/svg+xml"(),dot)
  end #do
  print("File saved")
end