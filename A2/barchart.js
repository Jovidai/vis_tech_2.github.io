// set the dimensions and margins of the graph
var margin = {top: 40, right: 40, bottom: 230, left:150},
width = 1000,
height = 600;

// append the svg object to the body of the page
var barChartSvg = d3.select("#barchart")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("gapminder.csv")
.then(function(data) {

   // ??? let filtered_data = data.filter(function(d) {
        //return d.country === "United States";
   // });
// all of your code goes indside here!


// X axis
var x = d3.scaleBand()
.range([ 0, 1010 ])
.domain(data.map(function(d) { return d.year; }))
.padding(0.5);
barChartSvg.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.selectAll("text")
.attr("transform", "translate(-10,0)rotate(-45)")
.style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
.domain([0, 100])
.range([ height, 0]);
barChartSvg.append("g")
.call(d3.axisLeft(y));

var tooltip=d3.select("#tooltip2")

// Bars
barChartSvg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.year); })
  .attr("width", x.bandwidth())
  .attr("fill", "#1ABC9C")
  // if no bar at the beginning :
  .attr("height", function(d) { return height - y(0); }) 
  .attr("y", function(d) { return y(0);})
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseout", mouseout)
  .transition()
  .duration(800)
  .attr("y", function(d) { return y(d.lifeExp); })
  .attr("height", function(d) { return height - y(d.lifeExp); })
  .delay(function(d,i){console.log(i) ; return(i*100)})

function mousemove(event, d) {
d3.select(this)
.attr("fill","#6C3483")
.attr("stroke-width", "1px")
.attr("fill-opacity", "1");
tooltip.style("display", "block")
.style("top", event.pageY + "px")
.style("left", event.pageX + "px")
.html(
   "Year: <b>" +
   d.year+
   "</b></br>Life Expectations: <b>" +
   d.lifeExp+
   "</b>"
)
   
}

function mouseover() {
  d3.select(this)
    .attr("fill","#6C3483")
    .attr("stroke-width", "1px")
    .attr("fill-opacity", "1");
  tooltip.style("opacity", 1)
       
}

function mouseout() {
  d3.select(this)
    .attr("fill", "#1ABC9C")
    .attr("stroke-width", ".3")
    .attr("fill-opacity", "1");
  tooltip.style("display", "none");
}

});


