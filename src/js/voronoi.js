var fs = require('fs');
var d3 = require('d3');
var jsdom = require('../../my_node_modules/node-jsdom/lib/jsdom.js');
var svg_to_png = require('svg-to-png');

console.log(process.cwd());
// fuck Node.js
eval(fs.readFileSync('../src/js/style.js', 'utf8'));
eval(fs.readFileSync('../src/js/colorbrewer.js', 'utf8'));

var swatches = [Blues, Greens, Greys, Oranges, Purples, Reds, BuGn, BuPu, GnBu, OrRd, PuBu, PuBuGn, PuRd, RdPu, YlGn, YlGnBu, YlOrBr, YlOrRd, BrBG, PiYG, PRGn, PuOr, RdBu, RdGy, RdYlBu, RdYlGn, Spectral,Paired, Set3 ];



var swatch =  swatches[Math.floor(Math.random() * (swatches.length))]; 
console.log(swatch);

var linkStrokeColor = swatch[Math.floor(Math.random() * (swatch.length))];
var linkStrokeOpacity = "0.5";
var polygonFillColor = swatch[Math.floor(Math.random() * (swatch.length))];
var polygonStrokeColor = swatch[Math.floor(Math.random() * (swatch.length))];
var polygonStrokeWidth = Math.floor(Math.random() * (6) + 1) + "px";
var sitesFillColor, sitesStrokeColor  = swatch[Math.floor(Math.random() * (swatch.length))];
var sitesFillOpacity, sitesStrokeOpacity = "1.0";

if ( Math.floor(Math.random() * (2)) == 0  ) {
  linkStrokeOpacity = "0.0";
  sitesFillOpacity, sitesStrokeOpacity = "0.0";
  console.log("not showing links");
}


var document = jsdom.jsdom();



var height = 1024;
var width = 1024;

var svg = d3.select(document.body).append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('height', height)
    .attr('width', width);

var style = getStyle(linkStrokeColor, linkStrokeOpacity, polygonFillColor, polygonStrokeColor, polygonStrokeWidth, sitesFillColor, sitesStrokeColor, sitesFillOpacity, sitesStrokeOpacity);



svg.append('style').text(style);
var cellNo = Math.floor(Math.random() * 1000 ) +  10;

    console.log(cellNo);
var sites = d3.range(cellNo)
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





svg_to_png.convert("/tmp/foo1.svg", "/tmp/") // async, returns promise 
    .then( function(){
	    console.log("done?");
	});




