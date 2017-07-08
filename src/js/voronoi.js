var fs = require('fs');
var d3 = require('d3');
var jsdom = require('node-jsdom');


var document = jsdom.jsdom();



var height = 600;
var width = 600;

var svg = d3.select(document.body).append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('height', height)
    .attr('width', width);

var style = fs.readFileSync('style.css', 'utf8');


svg.append('style').text(style);

var sites = d3.range(100)
    .map(function(d) { return [Math.random() * width, Math.random() * height]; });

var voronoi = d3.voronoi()
    .extent([[-1, -1], [width + 1, height + 1]]);

var polygon = svg.append("g")
    .attr("class", "polygons")
  .selectAll("path")
  .data(voronoi.polygons(sites))
  .enter().append("path")
    .call(redrawPolygon);

var link = svg.append("g")
    .attr("class", "links")
  .selectAll("line")
  .data(voronoi.links(sites))
  .enter().append("line")
    .call(redrawLink);

var site = svg.append("g")
    .attr("class", "sites")
  .selectAll("circle")
  .data(sites)
  .enter().append("circle")
    .attr("r", 2.5)
    .call(redrawSite);

function moved() {
  sites[0] = d3.mouse(this);
  redraw();
}

function redraw() {
    var diagram = voronoi(sites);
    polygon = polygon.data(diagram.polygons()).call(redrawPolygon);
    link = link.data(diagram.links()), link.exit().remove();
    link = link.enter().append("line").merge(link).call(redrawLink);
    site = site.data(sites).call(redrawSite);
}

function redrawPolygon(polygon) {
    polygon
	.attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; });
}

function redrawLink(link) {
    link
	.attr("x1", function(d) { return d.source[0]; })
	.attr("y1", function(d) { return d.source[1]; })
	.attr("x2", function(d) { return d.target[0]; })
	.attr("y2", function(d) { return d.target[1]; });
}

function redrawSite(site) {
    site
	.attr("cx", function(d) { return d[0]; })
	.attr("cy", function(d) { return d[1]; });
}







fs.writeFile("/tmp/foo1.svg", svg.node().outerHTML, function(err) {
	if(err) {
	    return console.log(err);
	}
	
	console.log("The file was saved!");
    }); 



var svg_to_png = require('svg-to-png');
 
svg_to_png.convert("/tmp/foo1.svg", "/tmp/") // async, returns promise 
    .then( function(){
	    console.log("done?");
	});





