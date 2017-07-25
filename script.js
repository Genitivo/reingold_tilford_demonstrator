var tree_height = document.getElementById("tree_height").value;

var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = tree_height - margin.top - margin.bottom;

var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);


var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // create the editor

var container = document.getElementById("jsoneditor");
var options = {
  modes: ['text', 'tree']
};
var editor = new JSONEditor(container, options);

// set json
var json = {
 "name": "flare",
 "children": [
  {
   "name": "analytics",
   "children": [
    {
     "name": "cluster",
     "children": [
      {"name": "AgglomerativeCluster"},
      {"name": "CommunityStructure"},
      {"name": "HierarchicalCluster"},
      {"name": "MergeEdge"}
     ]
    },
    {
     "name": "graph",
     "children": [
      {"name": "BetweennessCentrality"},
      {"name": "LinkDistance"},
      {"name": "MaxFlowMinCut"},
      {"name": "ShortestPaths"},
      {"name": "SpanningTree"}
     ]
    },
    {
     "name": "optimization",
     "children": [
      {"name": "AspectRatioBanker"}
     ]
    }
   ]
  },
  {
   "name": "animate",
   "children": [
    {"name": "Easing"},
    {"name": "FunctionSequence"},
    {
     "name": "interpolate",
     "children": [
      {"name": "ArrayInterpolator"},
      {"name": "ColorInterpolator"},
      {"name": "DateInterpolator"},
      {"name": "Interpolator"},
      {"name": "MatrixInterpolator"},
      {"name": "NumberInterpolator"},
      {"name": "ObjectInterpolator"},
      {"name": "PointInterpolator"},
      {"name": "RectangleInterpolator"}
     ]
    },
    {"name": "ISchedulable"},
    {"name": "Parallel"},
    {"name": "Pause"},
    {"name": "Scheduler"},
    {"name": "Sequence"},
    {"name": "Transition"},
    {"name": "Transitioner"},
    {"name": "TransitionEvent"},
    {"name": "Tween"}
   ]
  },
  {
   "name": "data",
   "children": [
    {
     "name": "converters",
     "children": [
      {"name": "Converters"},
      {"name": "DelimitedTextConverter"},
      {"name": "GraphMLConverter"},
      {"name": "IDataConverter"},
      {"name": "JSONConverter"}
     ]
    },
    {"name": "DataField"},
    {"name": "DataSchema"},
    {"name": "DataSet"},
    {"name": "DataSource"},
    {"name": "DataTable"},
    {"name": "DataUtil"}
   ]
  },
  {
   "name": "display",
   "children": [
    {"name": "DirtySprite"},
    {"name": "LineSprite"},
    {"name": "RectSprite"},
    {"name": "TextSprite"}
   ]
  },
  {
   "name": "flex",
   "children": [
    {"name": "FlareVis"}
   ]
  },
  {
   "name": "physics",
   "children": [
    {"name": "DragForce"},
    {"name": "GravityForce"},
    {"name": "IForce"},
    {"name": "NBodyForce"},
    {"name": "Particle"},
    {"name": "Simulation"},
    {"name": "Spring"},
    {"name": "SpringForce"}
   ]
  },
  {
   "name": "query",
   "children": [
    {"name": "AggregateExpression"},
    {"name": "And"},
    {"name": "Arithmetic"},
    {"name": "Average"},
    {"name": "BinaryExpression"},
    {"name": "Comparison"},
    {"name": "CompositeExpression"},
    {"name": "Count"},
    {"name": "DateUtil"},
    {"name": "Distinct"},
    {"name": "Expression"},
    {"name": "ExpressionIterator"},
    {"name": "Fn"},
    {"name": "If"},
    {"name": "IsA"},
    {"name": "Literal"},
    {"name": "Match"},
    {"name": "Maximum"},
    {
     "name": "methods",
     "children": [
      {"name": "add"},
      {"name": "and"},
      {"name": "average"},
      {"name": "count"},
      {"name": "distinct"},
      {"name": "div"},
      {"name": "eq"},
      {"name": "fn"},
      {"name": "gt"},
      {"name": "gte"},
      {"name": "iff"},
      {"name": "isa"},
      {"name": "lt"},
      {"name": "lte"},
      {"name": "max"},
      {"name": "min"},
      {"name": "mod"},
      {"name": "mul"},
      {"name": "neq"},
      {"name": "not"},
      {"name": "or"},
      {"name": "orderby"},
      {"name": "range"},
      {"name": "select"},
      {"name": "stddev"},
      {"name": "sub"},
      {"name": "sum"},
      {"name": "update"},
      {"name": "variance"},
      {"name": "where"},
      {"name": "xor"},
      {"name": "_"}
     ]
    },
    {"name": "Minimum"},
    {"name": "Not"},
    {"name": "Or"},
    {"name": "Query"},
    {"name": "Range"},
    {"name": "StringUtil"},
    {"name": "Sum"},
    {"name": "Variable"},
    {"name": "Variance"},
    {"name": "Xor"}
   ]
  },
  {
   "name": "scale",
   "children": [
    {"name": "IScaleMap"},
    {"name": "LinearScale"},
    {"name": "LogScale"},
    {"name": "OrdinalScale"},
    {"name": "QuantileScale"},
    {"name": "QuantitativeScale"},
    {"name": "RootScale"},
    {"name": "Scale"},
    {"name": "ScaleType"},
    {"name": "TimeScale"}
   ]
  },
  {
   "name": "util",
   "children": [
    {"name": "Arrays"},
    {"name": "Colors"},
    {"name": "Dates"},
    {"name": "Displays"},
    {"name": "Filter"},
    {"name": "Geometry"},
    {
     "name": "heap",
     "children": [
      {"name": "FibonacciHeap"},
      {"name": "HeapNode"}
     ]
    },
    {"name": "IEvaluable"},
    {"name": "IPredicate"},
    {"name": "IValueProxy"},
    {
     "name": "math",
     "children": [
      {"name": "DenseMatrix"},
      {"name": "IMatrix"},
      {"name": "SparseMatrix"}
     ]
    },
    {"name": "Maths"},
    {"name": "Orientation"},
    {
     "name": "palette",
     "children": [
      {"name": "ColorPalette"},
      {"name": "Palette"},
      {"name": "ShapePalette"},
      {"name": "SizePalette"}
     ]
    },
    {"name": "Property"},
    {"name": "Shapes"},
    {"name": "Sort"},
    {"name": "Stats"},
    {"name": "Strings"}
   ]
  },
  {
   "name": "vis",
   "children": [
    {
     "name": "axis",
     "children": [
      {"name": "Axes"},
      {"name": "Axis"},
      {"name": "AxisGridLine"},
      {"name": "AxisLabel"},
      {"name": "CartesianAxes"}
     ]
    },
    {
     "name": "controls",
     "children": [
      {"name": "AnchorControl"},
      {"name": "ClickControl"},
      {"name": "Control"},
      {"name": "ControlList"},
      {"name": "DragControl"},
      {"name": "ExpandControl"},
      {"name": "HoverControl"},
      {"name": "IControl"},
      {"name": "PanZoomControl"},
      {"name": "SelectionControl"},
      {"name": "TooltipControl"}
     ]
    },
    {
     "name": "data",
     "children": [
      {"name": "Data"},
      {"name": "DataList"},
      {"name": "DataSprite"},
      {"name": "EdgeSprite"},
      {"name": "NodeSprite"},
      {
       "name": "render",
       "children": [
        {"name": "ArrowType"},
        {"name": "EdgeRenderer"},
        {"name": "IRenderer"},
        {"name": "ShapeRenderer"}
       ]
      },
      {"name": "ScaleBinding"},
      {"name": "Tree"},
      {"name": "TreeBuilder"}
     ]
    },
    {
     "name": "events",
     "children": [
      {"name": "DataEvent"},
      {"name": "SelectionEvent"},
      {"name": "TooltipEvent"},
      {"name": "VisualizationEvent"}
     ]
    },
    {
     "name": "legend",
     "children": [
      {"name": "Legend"},
      {"name": "LegendItem"},
      {"name": "LegendRange"}
     ]
    },
    {
     "name": "operator",
     "children": [
      {
       "name": "distortion",
       "children": [
        {"name": "BifocalDistortion"},
        {"name": "Distortion"},
        {"name": "FisheyeDistortion"}
       ]
      },
      {
       "name": "encoder",
       "children": [
        {"name": "ColorEncoder"},
        {"name": "Encoder"},
        {"name": "PropertyEncoder"},
        {"name": "ShapeEncoder"},
        {"name": "SizeEncoder"}
       ]
      },
      {
       "name": "filter",
       "children": [
        {"name": "FisheyeTreeFilter"},
        {"name": "GraphDistanceFilter"},
        {"name": "VisibilityFilter"}
       ]
      },
      {"name": "IOperator"},
      {
       "name": "label",
       "children": [
        {"name": "Labeler"},
        {"name": "RadialLabeler"},
        {"name": "StackedAreaLabeler"}
       ]
      },
      {
       "name": "layout",
       "children": [
        {"name": "AxisLayout"},
        {"name": "BundledEdgeRouter"},
        {"name": "CircleLayout"},
        {"name": "CirclePackingLayout"},
        {"name": "DendrogramLayout"},
        {"name": "ForceDirectedLayout"},
        {"name": "IcicleTreeLayout"},
        {"name": "IndentedTreeLayout"},
        {"name": "Layout"},
        {"name": "NodeLinkTreeLayout"},
        {"name": "PieLayout"},
        {"name": "RadialTreeLayout"},
        {"name": "RandomLayout"},
        {"name": "StackedAreaLayout"},
        {"name": "TreeMapLayout"}
       ]
      },
      {"name": "Operator"},
      {"name": "OperatorList"},
      {"name": "OperatorSequence"},
      {"name": "OperatorSwitch"},
      {"name": "SortOperator"}
     ]
    },
    {"name": "Visualization"}
   ]
  }
 ]
}
;
editor.set(json);

// var json = editor.get();
function updateTree(new_json){
  root = new_json;
  root.x0 = height / 2;
  root.y0 = 0;

  root.children.forEach(collapse);
  update(root);
}

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

updateTree(json);

d3.select(self.frameElement).style("height", "800px");

function update(source) {
  tree_height = document.getElementById("tree_height").value;

  height = tree_height - margin.top - margin.bottom;

  tree = d3.layout.tree()
      .size([height, width]);

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
      links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
      .on("click", click);

  nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
      .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
      .attr("dy", ".35em")
      .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
      .text(function(d) { return d.name; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
      .attr("r", 4.5)
      .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
      .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {

  // var url = "#popup1";
  // $(location).attr('href', url);
  // window.location = url;

  popup = d3.select("popup1")

  console.log(popup);

  popup.append("h2").text(d.vale);
  popup.append("p").text(
                "The " + d.vale + " division (wearing " + d.vale + " uniforms) had " + d.vale + " casualties during the show's original run.")
  popup.append("p")

  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }

  update(d);

}

function updateJson(){
  var json = editor.get();
  updateTree(json);
}
