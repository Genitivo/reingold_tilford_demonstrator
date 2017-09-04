var tree_height = document.getElementById("tree_height").value

var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = $(document).width()- 100 - margin.right - margin.left,
    height = tree_height - margin.top - margin.bottom

var i = 0,
    duration = 750,
    root

var tree = d3.layout.tree()
    .size([height, width])

    // Define the zoom function for the zoomable tree

function zoom() {
    svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x] })

var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

var svg_container = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "svg")
    .call(zoomListener);

var svgGroup = svg_container.append("g");

var svg = svgGroup.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

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
              "name": 56
            },
            {
              "name": 64
            }
          ]
        },
        {
          "name": 5,
          "children": [
            {
              "name": 33
            },
            {
              "name": 44
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
              "children": [
                {
                  "name": 100
                },
                {
                  "name": 102,
                  "children": [
                    {
                      "name": 85
                    },
                    {
                      "name": 12
                    }]
                  }
              ]
            },
            {
              "name": 90
            }
          ]
        },
        {
          "name": 10,
          "children": [
            {
              "name": 85
            },
            {
              "name": 12
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

  nodes.forEach(function(d) {
    console.log(`${d.name}`)
    d.x = d.x + Math.floor((Math.random() * 10) + 1)
    d.y = d.depth * Math.floor((Math.random() * 100) + 1)})

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i) })

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")" })

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


function startDemonstrator(){
  var startButton = document.getElementById("startButton");
  startButton.style.backgroundColor = "grey"
  startButton.setAttribute("disabled","disabled");

  var nextButton = document.getElementById("nextButton");
  nextButton.style.backgroundColor = "green"
  nextButton.removeAttribute("disabled");

  nextSlide()
}

let orderedNodes = []
let nodeForTutorial = []

function nextSlide(){
  nodeForTutorial = []

  nodeFocus = false
  let nodes = tree.nodes(root).reverse()
  let currentParent = null
  let i = 0
  let subtree = false

  nodes.forEach(function(d,index){

    if(orderedNodes.indexOf(d)==-1){

      if(!currentParent)
        currentParent = d.parent

      // CASO NODO PADRE
      if(d.children && i==0 && !subtree){
        orderedNodes.push(d)
        nodeForTutorial.push(d)
        currentParent = d.parent
        subtree = true
      }

      // CASO SECONDO FIGLIO OPPURE PADRE CON SINGOLO FIGLIO
      if(d.children && (i==1 || i==2) && !subtree){
        if(d===currentParent){
          orderedNodes.push(d)
          nodeForTutorial.push(d)
          currentParent = d.parent
          subtree = true
          i = i+1
        }
      }else{
        // CASO NODO FOGLIA
        if( (i==1 || i==0) && !subtree){
          if(d.parent===currentParent && !d.children){
            orderedNodes.push(d)
            nodeForTutorial.push(d)
            currentParent = d.parent
            i = i+1

          }
        }
      }

    }
  })

  showTutorial(nodeForTutorial)
}

function renderedAnimation(){

  let nodeForRender = nodeForTutorial.length==1 ? orderedNodes : nodeForTutorial

  var links = tree.links(nodeForRender)

  var node = svg.selectAll("g.node")
      .data(nodeForRender, function(d) { return d.id || (d.id = ++i) })
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id })

  var tree_height = document.getElementById("tree_height").value

  let randomDelay =  Math.floor(Math.random() * 80)

  while(randomDelay>tree_height)
    randomDelay =  Math.floor(Math.random() * 80)

  nodeForRender.forEach(function(d) {
    d.y = d.depth * 180
    if(nodeForTutorial.length>1)
      d.x = d.x +randomDelay
  })

  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return `translate( ${d.y} , ${d.x}  )`})

  link.transition()
      .duration(duration)
      .attr("d", diagonal)

  nodeForTutorial.forEach(function(d) {
    if(nodeForTutorial.length==1)
      d.x = d.x0
    d.y0 = d.y
  })

  let nodes = tree.nodes(root).reverse()

  if(orderedNodes.length == nodes.length){
    var nextButton = document.getElementById("nextButton");
    nextButton.style.backgroundColor = "red"
    nextButton.text = "Done"
    nextButton.setAttribute("disabled","disabled");
  }
}

function showTutorial() {
  var node = svg.selectAll("g.node")
      .data(nodeForTutorial, function(d) { return d.id || (d.id = ++i) })

  node.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "red" : "red" })

  var nextButton = document.getElementById("nextButton");
  nextButton.style.backgroundColor = "GoldenRod"
  nextButton.setAttribute("disabled","disabled");

  nodeFocus = false
  var newContent = ""
  let father, child_sx, child_dx
  switch(nodeForTutorial.length){
    case 1: {
      father = nodeForTutorial[0]
      if(father.id===root.id)
        newContent += `<p> L'ascissa della radice <b> ${father.name} </b> viene posta alla metà della distanza dei suoi figli. </p>`
      else{
        newContent += `<p> Il nodo padre <b> ${father.name} </b> viene aggiunto ai sotto alberi riodinati. </p>`
        newContent += `<p> Le radici dei suoi sotto alberi figli, vengono posti ad una distanza minima di <b>2</b>. </p>`
      }
       break
    }
    case 2: {
      father = nodeForTutorial[1]
      child_sx = nodeForTutorial[0]

      if(father.children.length===2){
        child_dx = father.children[0]
        newContent += `<p> Il sotto albero da riordinare ha come radice il nodo <b>${father.name}</b> che ha 2 figli:</p><p><ul> `
        newContent += `<li><b> Figlio Sinistro:</b> ${child_sx.name} </li>`
        newContent += `<li><b> Figlio Destro:</b> ${child_dx.name} </li>`
        newContent += "</ul></p>"

        newContent += `<p> Il figlio sinistro, viene posto ad una profondità standard rispetto nodo al padre. </p>`
        newContent += `<p> Il figlio destro, verrà processato insieme ai suoi figli nella prossima iterazione. </p>`

        orderedNodes.splice(orderedNodes.length-1,1)
        break
      }else{
        newContent += `<p> Il sotto albero da riordinare è composto da <b>2</b> nodi:</p><p><ul> `
        newContent += `<li><b> Padre:</b> ${father.name} </li>`
        newContent += `<li><b> Figlio:</b> ${child_sx.name} </li>`
        newContent += "</ul></p>"

        newContent += `<p> Il nodo figlio <b>${child_sx.name}</b>, viene posto alla giusta profondità rispetto nodo al padre <b>${father.name}</b>. </p>`
        break
      }
    }
    case 3: {
      father = nodeForTutorial[2]
      child_sx = nodeForTutorial[0]
      child_dx = nodeForTutorial[1]

      newContent += `<p> Il sotto albero da riordinare è composto da <b>3</b> nodi:</p><p><ul> `
      newContent += `<li><b> Padre:</b> ${father.name} </li>`
      newContent += `<li><b> Figlio Sinistro:</b> ${child_sx.name} </li>`
      newContent += `<li><b> Figlio Destro:</b> ${child_dx.name} </li>`
      newContent += "</ul></p>"

      newContent += `<p> I figli vengono posti fra loro alla distanza minima possibile e ad una profondità standard rispetto al padre. </p>`
      break
    }
  }
  d3.select("#modal").style("display", "block").select("#content").html(newContent)

}

function nodeOut() {
  var nextButton = document.getElementById("nextButton");
  nextButton.style.backgroundColor = "green"
  nextButton.removeAttribute("disabled");

  var node = svg.selectAll("g.node")
      .data(nodeForTutorial, function(d) { return d.id || (d.id = ++i) })

  node.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "white" : "white" })
      .style("stroke", function(d) { return "green" })

  if (nodeFocus) {
    return
  }
  renderedAnimation()
}
