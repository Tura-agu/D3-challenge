//start with defining svg dimensions
var svgWidth = 960;
var svgHeight = 500;
//set the margin
var margin = {
  top: 20, right: 40, bottom: 80, left: 100
};
//calculate chart Dimension by adjusting the margin
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

/********************************************/
// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv")
  .then(function (ACSdata) {
    ACSdata.forEach(function (data) {
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.age = +data.age;
      data.smokes = +data.smokes;
      data.abbr = data.abbr;
      data.income = +data.income;
    });
  
 /********************************************/
    //Create scales for X and Y scale 
    var xScale = d3.scaleLinear()
      .domain([8.5, d3.max(ACSdata, d => d.poverty)])
      .range([0, width]);

    var yScale = d3.scaleLinear()
      .domain([3.5, d3.max(ACSdata, d => d.healthcare)])
      .range([height, 0]);

 /********************************************/
    //Create axis X and Y 
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    chartGroup.append("g")
      .call(yAxis);

 /********************************************/
    var circlesGroup = chartGroup.selectAll("circle")
      .data(ACSdata)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.healthcare))
      .attr("r", 15)
      .attr("fill", "pink")
      .attr("opacity", ".6")
      .attr("stroke-width", "1")
      .attr("stroke", "black");

    chartGroup.select("g")
      .selectAll("circle")
      .data(ACSdata)
      .enter()
      .append("text")
      .text(d => d.abbr)
      .attr("x", d => xScale(d.poverty))
      .attr("y", d => yScale(d.healthcare))
      .attr("dy", -395)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "black");

    console.log(ACSdata);


 /********************************************/
//creates the titles

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 50)
      .attr("x", 0 - 250)
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
      .attr("class", "axisText")
      .text("In Poverty (%)");

  });




