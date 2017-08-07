var tree_height = document.getElementById("tree_height").value

var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = tree_height - margin.top - margin.bottom

var i = 0,
    duration = 750,
    root

var tree = d3.layout.tree()
    .size([height, width])


var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x] })

var svg_container = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
var svg = svg_container.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// create the editor
var container = document.getElementById("jsoneditor")
var options = {
  modes: ['text', 'tree']
}
var editor = new JSONEditor(container, options)

// set json
var json = {
  "name": 1,
  "children": [
    {
      "name": 3,
      "children": [
        {
          "name": 6,
          "children": [
            {
              "name": 56,
            },
            {
              "name": 64,
            }
          ]
        },
        {
          "name": 5,
          "children": [
            {
              "name": 33,
            },
            {
              "name": 44,
            }
          ]
        }
      ]
    },
    {
      "name": 7,
      "children": [
        {
          "name": 8,
          "children": [
            {
              "name": 76,
            },
            {
              "name": 90,
            }
          ]
        },
        {
          "name": 10,
          "children": [
            {
              "name": 85,
            },
            {
              "name": 12,
            }
          ]
        }
      ]
    }
  ]
}
editor.set(json)

// var json = editor.get()
function updateTree(new_json){
  root = new_json
  root.x0 = height / 2
  root.y0 = 0

  // root.children.forEach(collapse)
  update(root)
}

function collapse(d) {
  if (d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

updateTree(json)

d3.select(self.frameElement).style("height", "800px")

function update(source, profondita, nodo) {

  tree_height = document.getElementById("tree_height").value
  height = tree_height - margin.top - margin.bottom

  tree = d3.layout.tree()
      .size([height, width])

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes)

  nodes.forEach(function(d) { d.y = d.depth * Math.floor((Math.random() * 100) + 1)})

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i) })

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")" })
      .on("click", click)

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff" })

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10 })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start" })
      .text(function(d) { return d.name })
      .style("fill-opacity", 1e-6)

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")" })

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff" })

  nodeUpdate.select("text")
      .style("fill-opacity", 1)

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")" })
      .remove()

  nodeExit.select("circle")
      .attr("r", 1e-6)

  nodeExit.select("text")
      .style("fill-opacity", 1e-6)

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id })

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0}
        return diagonal({source: o, target: o})
      })

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal)

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal({source: o, target: o})
      })
      .remove()

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x
    d.y0 = d.y
  })
}


function showChildren(d){
  if (d.children) {
    d._children = d.children
    d.children = null
  } else {
    d.children = d._children
    d._children = null
  }

  update(d)

}

currentOpenNode = null
openNodes = []

function nodiApertiALivello(lvl){

  var n = 0
  var figli = []
  console.log(openNodes)

  for(index = 0; index < openNodes.length; ++index){
    var node = openNodes[index]

    figli = node.children != undefined ? node.children : node._children
    if(node.depth+1===lvl)
      n += figli.length
  }
  return n

}

function showChildren(d){
  if (d.children) {
    d._children = d.children
    d.children = null
  } else {
    d.children = d._children
    d._children = null
  }

  update(d)

}

function isOpen(d){

  for(index = 0; index < openNodes.length; ++index){
    console.log(openNodes[index].id,d.id)
    if(openNodes[index].id===d.id)
      return true
  }
  return false
}

// Toggle children on click.
function click(d) {

  if(isOpen(d)){
    showChildren(d)
  }
  else{
    nodeFocus = false

    var son_sons = d._children.length===1 ? "io" : "i"

    var newContent = "<p>" + " Il nodo <b>" +d.name+ "</b> ha <b>"+d._children.length+"</b> figl"+son_sons+ ".</p>"
    newContent += "<p><b> Figli:</b> </p><p><ul>"
    for (x in d._children) {
      newContent += "<li><b> Valore:</b> " + d._children[x].name + "</li>"
    }
    newContent += "</ul></p>"
    newContent += "<p> Il nodo <b>"+ d._children[0].name+"</b> andrà a prendere la posizione del nodo padre.</p>"

    if(d._children.length===2){
      newContent += "<p> La coordinata x del nodo <b>" +d.name+ "</b> sarà la media delle coordinate x dei suoi figli.</p>"
    }
    else {
      newContent += "<p> La coordinata x del nodo <b>" +d.name+ "</b> rimarrà invariata.</p>"
    }
    var nodo = Object.assign({},d)

    if(d._children.length>0){
      if(nodiApertiALivello(nodo.depth+1)>1)
        newContent += "<p> L'i-esimo nodo del contorno sinistro del sotto albero destro, sarà posto a distanza due dal'i-esimo nodo del contorno destro del sotto albero sinistro. La distanza fra i loro padri verrà raddoppiata.</p>"
      else
        newContent += "<p> Non essendoci nodi a livello <b>"+(nodo.depth+1)+"</b>, i figli di <b>" +d.name+ "</b> possono occupare tutto lo spazio.</p>"
    }

    d3.select("#modal").style("display", "block").select("#content").html(newContent)
    currentOpenNode = d
    openNodes.push(nodo)
  }
}

function nodeOut() {
  if (nodeFocus) {
    return
  }

  if(currentOpenNode){
    showChildren(currentOpenNode)
    currentOpenNode=null
  }

}

function updateJson(){
  var json = editor.get()
  let new_height = document.getElementById("tree_height").value
  svg_container.attr("height", new_height + margin.top + margin.bottom)

  var startButton = document.getElementById("startButton");
  startButton.style.backgroundColor = "green"
  startButton.removeAttribute("disabled");

  var nextButton = document.getElementById("nextButton");
  nextButton.style.backgroundColor = "grey"
  nextButton.setAttribute("disabled","disabled");

  updateTree(json)
}

var num_click

function startDemonstrator(){
  num_click = 0

  var startButton = document.getElementById("startButton");
  startButton.style.backgroundColor = "grey"
  startButton.setAttribute("disabled","disabled");

  var nextButton = document.getElementById("nextButton");
  nextButton.style.backgroundColor = "#3883fa"
  nextButton.removeAttribute("disabled");

  nextSlide()
}

function nextSlide(){
  let num_even = (num_click % 2==0) && num_click !=0  && num_click % 10!=0

  var nodes = tree.nodes(root).reverse().splice(num_even ? 0 : num_click, num_even ? num_click +1: 3),
      links = tree.links(nodes)

  nodes.forEach(function(d){return console.log(d.name) })

  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i) })
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id })

  nodes.forEach(function(d) { d.y = d.depth * 180 })

  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"})

  link.transition()
      .duration(duration)
      .attr("d", diagonal)

  nodes.forEach(function(d) {
    d.x0 = d.x
    d.y0 = d.y
  })

  if(num_even)
    num_click = num_click + 1
  else
    num_click = num_click + 3
}
