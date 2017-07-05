var fs = require('fs');
var d3 = require('d3');
var jsdom = require('node-jsdom');
var cheerio = require("cheerio");

    var document = jsdom.jsdom();
    var body = d3.select(document);






var data = [3, 5, 8, 4, 7];

// create the outer svg
var svg = d3.select(document.body).append('svg')
    .attr('height', 100)
    .attr('width', 500);

// append circles for each data point sized relative to the value
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d, i) {
            return (i + 1) * 100 - 50;
        })
    .attr('cy', svg.attr('height') / 2)
    .attr('r', function (d) {
            return d * 5;
        });



var x  = cheerio.load('<html><body><h2 class = "title">Hello world</h2></body></html>');
console.log(svg.node().outerHTML);  

