window.onload = init;

var progressBar;

function init(){
  progressBar = document.querySelector('.progress div');
  window.addEventListener('scroll', function(){
    var max = document.body.scrollHeight - window.innerHeight;
    var percent = (window.pageYOffset/max)*100;
    progressBar.style.width = percent + '%';
  });
}

var welCome = document.querySelector('html');

function greeting(){
  var myName = prompt('Welcome our platform!, how your name?');
   alert('Welcome again', myName);
}
 welCome.onclick = greeting();

var welcdoc = document.querySelector('h1');

function random(number) {
  return Math.floor(Math.random()*number);
}

function bgChange(e) {
  var rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
  e.target.style.backgroundColor = rndCol;
  console.log(e);
}

welcdoc.addEventListener('click',bgChange);

var   w = 500,
      h = 500,
      circleWidth = 25;

var palette = {
      "lightgray": "#E5E8E8",
      "gray": "#708284",
      "mediumgray": "#536870",
      "blue": "#3B757F"
  }

var colors = d3.scale.category10();

var nodes = [
      { name: "Skills"},
      { name: "HTML5", target: [0], value: 40 },
      { name: "CSS3", target: [0, 1], value: 50 },
      { name: "JavaScript", target: [0, 1, 2], value: 40 },
      { name: "PHP", target: [0,1,2,3], value: 40 },
      { name: "Git", target: [0,1,2,3,4,], value: 40 },
      { name: "d3", target: [0,1,2,7,8], value: 40 },
      { name: "Angular", target: [0,1,2,7,8], value: 40 },
      { name: "mySql", target: [0,], value: 40 },
];

// Array for linked nodes
var links = [];

// Link nodes together and push them in the links array
for (var i = 0; i < nodes.length; i++){
      if (nodes[i].target !== undefined) {
            for ( var x = 0; x < nodes[i].target.length; x++ )
              links.push({
                  source: nodes[i],
                  target: nodes[nodes[i].target[x]]
              });
      };
};

// use d3.js for creating a div in the body of the
// document, that will contain the graph
var myChart = d3.select('body')
      .append("div")
        .classed("svg-container", true)

      .append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 450 800")
        .classed("svg-content-responsive", true);

// Settings for the force repulsion
var force = d3.layout.force()
      .nodes(nodes)
      .links([])
      .gravity(0.1)
      .charge(-1000)
      .size([w,h]);

      // Draw links first
      var link = myChart.selectAll('line')
            .data(links).enter().append('line')
            .attr('stroke', palette.lightgray)
            .attr('strokewidth', '1');

      // Draw nodes on top of links
      var node =  myChart.selectAll('circle')
            .data(nodes).enter()
            .append('g')
            .call(force.drag);


     node.append('circle')
            .attr('cx', function(d){return d.x; })
            .attr('cy', function(d){return d.y; })
            .attr('r', function(d,i){
                  console.log(d.value);
                  if ( i > 0 ) {
                        return circleWidth + d.value;
                  } else {
                        return circleWidth + 35;
                  }
            })
            .attr('fill', function(d,i){
                  if ( i > 0 ) {
                        return colors(i);
                  } else {
                        return '#fff';
                  }
            })
            .attr('strokewidth', function(d,i){
                  if ( i > 0 ) {
                        return '0';
                  } else {
                        return '2';
                  }
            })
            .attr('stroke', function(d,i){
                  if ( i > 0 ) {
                        return '';
                  } else {
                        return 'black';
                  }
            });

      // User interaction when we click and move a node
      force.on('tick', function(e){
            node.attr('transform', function(d, i){
              return 'translate(' + d.x + ','+ d.y + ')'
            });

          link
              .attr('x1', function(d){ return d.source.x; })
              .attr('y1', function(d){ return d.source.y; })
              .attr('x2', function(d){ return d.target.x; })
              .attr('y2', function(d){ return d.target.y; })
      });

      // Add text to the nodes
      node.append('text')
            .text(function(d){ return d.name; })
            .attr('font-family', 'Raleway', 'Helvetica Neue, Helvetica')
            .attr('fill', function(d, i){
              console.log(d.value);
                  if ( i > 0 && d.value < 10 ) {
                        return palette.mediumgray;
                  } else if ( i > 0 && d.value >10 ) {
                        return palette.lightgray;
                  } else {
                        return palette.blue;
                  }
            })
            .attr('text-anchor', function(d, i) {
                  return 'middle';
            })
            .attr('font-size', function(d, i){
                  if (i > 0) {
                        return '.8em';
                  } else {
                        return '.9em';
                  }
            });

// Display the graph and start reacting to events
force.start();
