// Set up SVG size
var svgWidth = 1250;
var svgHeight = 950;

// Establish margins
var margins = {
  top: 20,
  right: 20,
  bottom: 80,
  left: 80
};
// Establish chart dimensions based on SVG dimensions less margins
var chartWidth = svgWidth - margins.left - margins.right;
var chartHeight = svgHeight - margins.top - margins.bottom;

// Establish SVG wrapper
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)  ;

// Add chart group tag to house all elements
var chartGroup = svg.append("g")
.attr("transform", `translate(${margins.left}, ${margins.top})`)
.classed("chart", true); 

// Pull in Data
var stateData = [
    {"id":"1","state":"Alabama","abbr":"AL","poverty":"19.3","povertyMoe":"0.5","age":"38.6","ageMoe":"0.2","income":"42830","incomeMoe":"598","healthcare":"13.9","healthcareLow":"12.7","healthcareHigh":"15.1","obesity":"33.5","obesityLow":"32.1","obesityHigh":"35","smokes":"21.1","smokesLow":"19.8","smokesHigh":"22.5"},
    {"id":"2","state":"Alaska","abbr":"AK","poverty":"11.2","povertyMoe":"0.9","age":"33.3","ageMoe":"0.3","income":"71583","incomeMoe":"1784","healthcare":"15","healthcareLow":"13.3","healthcareHigh":"16.6","obesity":"29.7","obesityLow":"27.8","obesityHigh":"31.6","smokes":"19.9","smokesLow":"18.2","smokesHigh":"21.6"},
    {"id":"4","state":"Arizona","abbr":"AZ","poverty":"18.2","povertyMoe":"0.4","age":"36.9","ageMoe":"0.1","income":"50068","incomeMoe":"483","healthcare":"14.4","healthcareLow":"13.3","healthcareHigh":"15.6","obesity":"28.9","obesityLow":"27.7","obesityHigh":"30.2","smokes":"16.5","smokesLow":"15.4","smokesHigh":"17.6"},
    {"id":"5","state":"Arkansas","abbr":"AR","poverty":"18.9","povertyMoe":"0.5","age":"37.8","ageMoe":"0.2","income":"41262","incomeMoe":"653","healthcare":"16.3","healthcareLow":"14.4","healthcareHigh":"18.2","obesity":"35.9","obesityLow":"33.8","obesityHigh":"38","smokes":"24.7","smokesLow":"22.7","smokesHigh":"26.7"},
    {"id":"6","state":"California","abbr":"CA","poverty":"16.4","povertyMoe":"0.2","age":"36","ageMoe":"0.1","income":"61933","incomeMoe":"238","healthcare":"14.8","healthcareLow":"13.8","healthcareHigh":"15.8","obesity":"24.7","obesityLow":"23.5","obesityHigh":"25.9","smokes":"12.9","smokesLow":"11.9","smokesHigh":"13.8"},
    {"id":"8","state":"Colorado","abbr":"CO","poverty":"12","povertyMoe":"0.4","age":"36.3","ageMoe":"0.1","income":"61303","incomeMoe":"487","healthcare":"12.8","healthcareLow":"11.9","healthcareHigh":"13.6","obesity":"21.3","obesityLow":"20.4","obesityHigh":"22.2","smokes":"15.7","smokesLow":"14.8","smokesHigh":"16.6"},
    {"id":"9","state":"Connecticut","abbr":"CT","poverty":"10.8","povertyMoe":"0.5","age":"40.5","ageMoe":"0.2","income":"70048","incomeMoe":"828","healthcare":"8.7","healthcareLow":"7.6","healthcareHigh":"9.7","obesity":"26.3","obesityLow":"24.8","obesityHigh":"27.7","smokes":"15.4","smokesLow":"14.2","smokesHigh":"16.7"},
    {"id":"10","state":"Delaware","abbr":"DE","poverty":"12.5","povertyMoe":"0.9","age":"39.6","ageMoe":"0.3","income":"59716","incomeMoe":"1674","healthcare":"8.7","healthcareLow":"7.4","healthcareHigh":"9.9","obesity":"30.7","obesityLow":"28.6","obesityHigh":"32.7","smokes":"19.9","smokesLow":"17.9","smokesHigh":"21.8"},
    {"id":"11","state":"Washington D.C.","abbr":"DC","poverty":"17.7","povertyMoe":"1.2","age":"33.8","ageMoe":"0.2","income":"71648","incomeMoe":"1996","healthcare":"8.3","healthcareLow":"6.3","healthcareHigh":"10.3","obesity":"21.7","obesityLow":"19.5","obesityHigh":"23.9","smokes":"16.4","smokesLow":"14.2","smokesHigh":"18.6"},
    {"id":"12","state":"Florida","abbr":"FL","poverty":"16.5","povertyMoe":"0.3","age":"41.6","ageMoe":"0.1","income":"47463","incomeMoe":"329","healthcare":"17.6","healthcareLow":"16.4","healthcareHigh":"18.8","obesity":"26.2","obesityLow":"25","obesityHigh":"27.5","smokes":"17.7","smokesLow":"16.5","smokesHigh":"18.8"},
    {"id":"13","state":"Georgia","abbr":"GA","poverty":"18.3","povertyMoe":"0.4","age":"36.1","ageMoe":"0.1","income":"49321","incomeMoe":"543","healthcare":"20.9","healthcareLow":"19.3","healthcareHigh":"22.5","obesity":"30.5","obesityLow":"28.9","obesityHigh":"32.1","smokes":"17.4","smokesLow":"15.9","smokesHigh":"18.8"},
    {"id":"15","state":"Hawaii","abbr":"HI","poverty":"11.4","povertyMoe":"0.8","age":"38.1","ageMoe":"0.2","income":"69592","incomeMoe":"1456","healthcare":"8.1","healthcareLow":"7.1","healthcareHigh":"9","obesity":"22.1","obesityLow":"20.7","obesityHigh":"23.5","smokes":"14.1","smokesLow":"13","smokesHigh":"15.3"},
    {"id":"16","state":"Idaho","abbr":"ID","poverty":"14.8","povertyMoe":"0.7","age":"35.9","ageMoe":"0.2","income":"47861","incomeMoe":"1275","healthcare":"16.5","healthcareLow":"15","healthcareHigh":"18.1","obesity":"28.9","obesityLow":"27.1","obesityHigh":"30.8","smokes":"15.9","smokesLow":"14.4","smokesHigh":"17.4"},
    {"id":"17","state":"Illinois","abbr":"IL","poverty":"14.4","povertyMoe":"0.3","age":"37.5","ageMoe":"0.2","income":"57444","incomeMoe":"429","healthcare":"11.9","healthcareLow":"10.5","healthcareHigh":"13.3","obesity":"29.3","obesityLow":"27.6","obesityHigh":"31.1","smokes":"16.5","smokesLow":"15.1","smokesHigh":"18"},
    {"id":"18","state":"Indiana","abbr":"IN","poverty":"15.2","povertyMoe":"0.4","age":"37.4","ageMoe":"0.2","income":"49446","incomeMoe":"487","healthcare":"14.8","healthcareLow":"13.8","healthcareHigh":"15.8","obesity":"32.7","obesityLow":"31.5","obesityHigh":"33.9","smokes":"22.9","smokesLow":"21.8","smokesHigh":"24.1"},
    {"id":"19","state":"Iowa","abbr":"IA","poverty":"12.2","povertyMoe":"0.5","age":"38.2","ageMoe":"0.1","income":"53712","incomeMoe":"761","healthcare":"7.7","healthcareLow":"6.8","healthcareHigh":"8.6","obesity":"30.9","obesityLow":"29.6","obesityHigh":"32.3","smokes":"18.5","smokesLow":"17.3","smokesHigh":"19.7"},
    {"id":"20","state":"Kansas","abbr":"KS","poverty":"13.6","povertyMoe":"0.5","age":"36.2","ageMoe":"0.1","income":"52504","incomeMoe":"706","healthcare":"14.5","healthcareLow":"13.7","healthcareHigh":"15.3","obesity":"31.3","obesityLow":"30.3","obesityHigh":"32.2","smokes":"18.1","smokesLow":"17.2","smokesHigh":"18.9"},
    {"id":"21","state":"Kentucky","abbr":"KY","poverty":"19.1","povertyMoe":"0.5","age":"38.5","ageMoe":"0.2","income":"42958","incomeMoe":"697","healthcare":"10","healthcareLow":"8.8","healthcareHigh":"11.1","obesity":"31.6","obesityLow":"30.2","obesityHigh":"33.1","smokes":"26.2","smokesLow":"24.7","smokesHigh":"27.7"},
    {"id":"22","state":"Louisiana","abbr":"LA","poverty":"19.8","povertyMoe":"0.5","age":"36.1","ageMoe":"0.1","income":"44555","incomeMoe":"738","healthcare":"18.7","healthcareLow":"17.4","healthcareHigh":"20","obesity":"34.9","obesityLow":"33.4","obesityHigh":"36.4","smokes":"24","smokesLow":"22.6","smokesHigh":"25.4"},
    {"id":"23","state":"Maine","abbr":"ME","poverty":"14.1","povertyMoe":"0.7","age":"44.1","ageMoe":"0.2","income":"49462","incomeMoe":"1112","healthcare":"11","healthcareLow":"10","healthcareHigh":"12","obesity":"28.2","obesityLow":"26.9","obesityHigh":"29.5","smokes":"19.3","smokesLow":"18.1","smokesHigh":"20.5"},
    {"id":"24","state":"Maryland","abbr":"MD","poverty":"10.1","povertyMoe":"0.4","age":"38.3","ageMoe":"0.1","income":"73971","incomeMoe":"867","healthcare":"9.2","healthcareLow":"8","healthcareHigh":"10.4","obesity":"29.6","obesityLow":"28.1","obesityHigh":"31.1","smokes":"14.6","smokesLow":"13.4","smokesHigh":"15.9"},
    {"id":"25","state":"Massachusetts","abbr":"MA","poverty":"11.6","povertyMoe":"0.3","age":"39.4","ageMoe":"0.2","income":"69160","incomeMoe":"957","healthcare":"4.6","healthcareLow":"4","healthcareHigh":"5.2","obesity":"23.3","obesityLow":"22.3","obesityHigh":"24.4","smokes":"14.7","smokesLow":"13.7","smokesHigh":"15.7"},
    {"id":"26","state":"Michigan","abbr":"MI","poverty":"16.2","povertyMoe":"0.3","age":"39.6","ageMoe":"0.1","income":"49847","incomeMoe":"385","healthcare":"10.3","healthcareLow":"9.3","healthcareHigh":"11.2","obesity":"30.7","obesityLow":"29.4","obesityHigh":"32","smokes":"21.2","smokesLow":"20","smokesHigh":"22.5"},
    {"id":"27","state":"Minnesota","abbr":"MN","poverty":"11.5","povertyMoe":"0.4","age":"37.8","ageMoe":"0.1","income":"61481","incomeMoe":"471","healthcare":"7.3","healthcareLow":"6.7","healthcareHigh":"7.9","obesity":"27.6","obesityLow":"26.8","obesityHigh":"28.5","smokes":"16.3","smokesLow":"15.6","smokesHigh":"17"},
    {"id":"28","state":"Mississippi","abbr":"MS","poverty":"21.5","povertyMoe":"0.6","age":"36.7","ageMoe":"0.2","income":"39680","incomeMoe":"773","healthcare":"18.8","healthcareLow":"17","healthcareHigh":"20.7","obesity":"35.5","obesityLow":"33.4","obesityHigh":"37.6","smokes":"23","smokesLow":"21","smokesHigh":"24.9"},
    {"id":"29","state":"Missouri","abbr":"MO","poverty":"15.5","povertyMoe":"0.4","age":"38.5","ageMoe":"0.1","income":"48363","incomeMoe":"567","healthcare":"12.9","healthcareLow":"11.6","healthcareHigh":"14.3","obesity":"30.2","obesityLow":"28.6","obesityHigh":"31.9","smokes":"20.6","smokesLow":"19.2","smokesHigh":"22.1"},
    {"id":"30","state":"Montana","abbr":"MT","poverty":"15.4","povertyMoe":"0.8","age":"39.6","ageMoe":"0.3","income":"46328","incomeMoe":"1217","healthcare":"12.9","healthcareLow":"11.6","healthcareHigh":"14.1","obesity":"26.4","obesityLow":"24.9","obesityHigh":"27.9","smokes":"19.9","smokesLow":"18.5","smokesHigh":"21.4"},
    {"id":"31","state":"Nebraska","abbr":"NE","poverty":"12.4","povertyMoe":"0.5","age":"36.2","ageMoe":"0.2","income":"52686","incomeMoe":"688","healthcare":"12.4","healthcareLow":"11.5","healthcareHigh":"13.2","obesity":"30.2","obesityLow":"29.2","obesityHigh":"31.2","smokes":"17.3","smokesLow":"16.5","smokesHigh":"18.2"},
    {"id":"32","state":"Nevada","abbr":"NV","poverty":"15.2","povertyMoe":"0.7","age":"37.4","ageMoe":"0.2","income":"51450","incomeMoe":"683","healthcare":"17.1","healthcareLow":"15","healthcareHigh":"19.3","obesity":"27.7","obesityLow":"25.3","obesityHigh":"30.1","smokes":"17","smokesLow":"15","smokesHigh":"19"},
    {"id":"33","state":"New Hampshire","abbr":"NH","poverty":"9.2","povertyMoe":"0.6","age":"42.5","ageMoe":"0.3","income":"66532","incomeMoe":"1297","healthcare":"11.4","healthcareLow":"10.1","healthcareHigh":"12.7","obesity":"27.4","obesityLow":"25.8","obesityHigh":"29.1","smokes":"17.5","smokesLow":"16","smokesHigh":"19"},
    {"id":"34","state":"New Jersey","abbr":"NJ","poverty":"11.1","povertyMoe":"0.3","age":"39.4","ageMoe":"0.2","income":"71919","incomeMoe":"438","healthcare":"12.5","healthcareLow":"11.5","healthcareHigh":"13.4","obesity":"26.9","obesityLow":"25.7","obesityHigh":"28.1","smokes":"15.1","smokesLow":"14.1","smokesHigh":"16.1"},
    {"id":"35","state":"New Mexico","abbr":"NM","poverty":"21.3","povertyMoe":"0.9","age":"37.2","ageMoe":"0.2","income":"44803","incomeMoe":"849","healthcare":"15.4","healthcareLow":"14.1","healthcareHigh":"16.8","obesity":"28.4","obesityLow":"26.9","obesityHigh":"30","smokes":"19.2","smokesLow":"17.7","smokesHigh":"20.6"},
    {"id":"36","state":"New York","abbr":"NY","poverty":"15.9","povertyMoe":"0.3","age":"38.2","ageMoe":"0.1","income":"58878","incomeMoe":"393","healthcare":"12.3","healthcareLow":"11.1","healthcareHigh":"13.4","obesity":"27","obesityLow":"25.6","obesityHigh":"28.4","smokes":"14.4","smokesLow":"13.3","smokesHigh":"15.5"},
    {"id":"37","state":"North Carolina","abbr":"NC","poverty":"17.2","povertyMoe":"0.3","age":"38.3","ageMoe":"0.1","income":"46556","incomeMoe":"381","healthcare":"16.1","healthcareLow":"15.1","healthcareHigh":"17.2","obesity":"29.7","obesityLow":"28.4","obesityHigh":"31","smokes":"19.1","smokesLow":"17.9","smokesHigh":"20.3"},
    {"id":"38","state":"North Dakota","abbr":"ND","poverty":"11.5","povertyMoe":"0.9","age":"35.1","ageMoe":"0.2","income":"59029","incomeMoe":"1681","healthcare":"8.8","healthcareLow":"7.6","healthcareHigh":"10","obesity":"32.2","obesityLow":"30.5","obesityHigh":"33.9","smokes":"19.9","smokesLow":"18.4","smokesHigh":"21.5"},
    {"id":"39","state":"Ohio","abbr":"OH","poverty":"15.8","povertyMoe":"0.3","age":"39.4","ageMoe":"0.1","income":"49308","incomeMoe":"363","healthcare":"10.2","healthcareLow":"9.2","healthcareHigh":"11.3","obesity":"32.6","obesityLow":"31.2","obesityHigh":"34.1","smokes":"21","smokesLow":"19.7","smokesHigh":"22.3"},
    {"id":"40","state":"Oklahoma","abbr":"OK","poverty":"16.6","povertyMoe":"0.4","age":"36.2","ageMoe":"0.2","income":"47529","incomeMoe":"454","healthcare":"13.9","healthcareLow":"12.9","healthcareHigh":"15","obesity":"33","obesityLow":"31.6","obesityHigh":"34.3","smokes":"21.1","smokesLow":"19.9","smokesHigh":"22.3"},
    {"id":"41","state":"Oregon","abbr":"OR","poverty":"16.6","povertyMoe":"0.5","age":"39.3","ageMoe":"0.2","income":"51075","incomeMoe":"490","healthcare":"11","healthcareLow":"9.7","healthcareHigh":"12.4","obesity":"27.9","obesityLow":"26.2","obesityHigh":"29.6","smokes":"17","smokesLow":"15.5","smokesHigh":"18.4"},
    {"id":"42","state":"Pennsylvania","abbr":"PA","poverty":"13.6","povertyMoe":"0.3","age":"40.7","ageMoe":"0.1","income":"53234","incomeMoe":"420","healthcare":"10.1","healthcareLow":"9.2","healthcareHigh":"11.1","obesity":"30.2","obesityLow":"28.9","obesityHigh":"31.4","smokes":"19.9","smokesLow":"18.8","smokesHigh":"21.1"},
    {"id":"44","state":"Rhode Island","abbr":"RI","poverty":"14.3","povertyMoe":"0.9","age":"39.8","ageMoe":"0.3","income":"54891","incomeMoe":"1488","healthcare":"8","healthcareLow":"6.8","healthcareHigh":"9.2","obesity":"27","obesityLow":"25.4","obesityHigh":"28.6","smokes":"16.3","smokesLow":"14.8","smokesHigh":"17.7"},
    {"id":"45","state":"South Carolina","abbr":"SC","poverty":"18","povertyMoe":"0.5","age":"38.8","ageMoe":"0.1","income":"45238","incomeMoe":"507","healthcare":"17.1","healthcareLow":"16","healthcareHigh":"18.2","obesity":"32.1","obesityLow":"30.9","obesityHigh":"33.3","smokes":"21.5","smokesLow":"20.4","smokesHigh":"22.7"},
    {"id":"46","state":"South Dakota","abbr":"SD","poverty":"14.2","povertyMoe":"0.7","age":"36.6","ageMoe":"0.3","income":"50979","incomeMoe":"1027","healthcare":"9.9","healthcareLow":"8.4","healthcareHigh":"11.4","obesity":"29.8","obesityLow":"27.9","obesityHigh":"31.8","smokes":"18.6","smokesLow":"16.9","smokesHigh":"20.2"},
    {"id":"47","state":"Tennessee","abbr":"TN","poverty":"18.3","povertyMoe":"0.4","age":"38.6","ageMoe":"0.1","income":"44361","incomeMoe":"561","healthcare":"14.2","healthcareLow":"12.6","healthcareHigh":"15.9","obesity":"31.2","obesityLow":"29.3","obesityHigh":"33.1","smokes":"24.2","smokesLow":"22.3","smokesHigh":"26.1"},
    {"id":"48","state":"Texas","abbr":"TX","poverty":"17.2","povertyMoe":"0.2","age":"34.3","ageMoe":"0.1","income":"53035","incomeMoe":"377","healthcare":"24.9","healthcareLow":"23.7","healthcareHigh":"26.1","obesity":"31.9","obesityLow":"30.6","obesityHigh":"33.3","smokes":"14.5","smokesLow":"13.6","smokesHigh":"15.5"},
    {"id":"49","state":"Utah","abbr":"UT","poverty":"11.7","povertyMoe":"0.6","age":"30.5","ageMoe":"0.1","income":"60922","incomeMoe":"658","healthcare":"13.9","healthcareLow":"13.2","healthcareHigh":"14.6","obesity":"25.7","obesityLow":"24.9","obesityHigh":"26.6","smokes":"9.7","smokesLow":"9","smokesHigh":"10.3"},
    {"id":"50","state":"Vermont","abbr":"VT","poverty":"12.2","povertyMoe":"0.8","age":"42.8","ageMoe":"0.3","income":"54166","incomeMoe":"1724","healthcare":"6.7","healthcareLow":"5.9","healthcareHigh":"7.5","obesity":"24.8","obesityLow":"23.5","obesityHigh":"26.1","smokes":"16.4","smokesLow":"15.2","smokesHigh":"17.6"},
    {"id":"51","state":"Virginia","abbr":"VA","poverty":"11.8","povertyMoe":"0.3","age":"37.7","ageMoe":"0.1","income":"64902","incomeMoe":"624","healthcare":"13.1","healthcareLow":"12","healthcareHigh":"14.1","obesity":"28.5","obesityLow":"27.2","obesityHigh":"29.7","smokes":"19.5","smokesLow":"18.4","smokesHigh":"20.7"},
    {"id":"53","state":"Washington","abbr":"WA","poverty":"13.2","povertyMoe":"0.4","age":"37.5","ageMoe":"0.1","income":"61366","incomeMoe":"485","healthcare":"10.7","healthcareLow":"9.7","healthcareHigh":"11.8","obesity":"27.3","obesityLow":"26","obesityHigh":"28.5","smokes":"15.3","smokesLow":"14.3","smokesHigh":"16.4"},
    {"id":"54","state":"West Virginia","abbr":"WV","poverty":"18.3","povertyMoe":"0.7","age":"41.9","ageMoe":"0.2","income":"41059","incomeMoe":"651","healthcare":"10.1","healthcareLow":"9.1","healthcareHigh":"11.2","obesity":"35.7","obesityLow":"34.2","obesityHigh":"37.2","smokes":"26.7","smokesLow":"25.2","smokesHigh":"28.1"},
    {"id":"55","state":"Wisconsin","abbr":"WI","poverty":"13.2","povertyMoe":"0.4","age":"39.2","ageMoe":"0.2","income":"52622","incomeMoe":"433","healthcare":"8.5","healthcareLow":"7.4","healthcareHigh":"9.7","obesity":"31.2","obesityLow":"29.6","obesityHigh":"32.8","smokes":"17.4","smokesLow":"16","smokesHigh":"18.7"},
    {"id":"56","state":"Wyoming","abbr":"WY","poverty":"11.2","povertyMoe":"0.9","age":"36.6","ageMoe":"0.4","income":"57055","incomeMoe":"1983","healthcare":"15.1","healthcareLow":"13.3","healthcareHigh":"16.9","obesity":"29.5","obesityLow":"27.4","obesityHigh":"31.5","smokes":"19.5","smokesLow":"17.6","smokesHigh":"21.4"}]

 // Parse data fields that contain numeric values
 stateData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.povertyMoe = +data.povertyMoe;
    data.age = +data.age;
    data.ageMoe = +data.ageMoe;
    data.income = +data.income;
    data.incomeMoe = +data.incomeMoe;
    data.healthcare = +data.healthcare;
    data.healthcareLow = +data.healthcareLow;
    data.healthcareHigh = +data.healthcareHigh;
    data.obesity = +data.obesity;
    data.obesityLow = +data.obesityLow;
    data.obesityHigh = +data.obesityHigh;
    data.smokes = +data.smokes;
    data.smokesLow = +data.smokesLow;
    data.smokesHigh = +data.smokesHigh;
  });
// ==============================

// Establish initial axes

var selectedAxisX = "age"
var selectedAxisY = "smokes"

function createChart(stateData, xAxis, yAxis) {
// Scale data to fit along x axis
var xLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, data => data.age)-1, d3.max(stateData, data => data[xAxis])+1])
    .range([0, chartWidth]);

// Scale data to fit along y axis
var yLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, data => data.smokes)-1,d3.max(stateData, data => data[yAxis])+1])
    .range([chartHeight, 0]);

// Establish axis variables
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Draw x axis
chartGroup.append("g")
.attr("transform", `translate(0, ${chartHeight})`)
.call(bottomAxis);

// Draw y axis
chartGroup.append("g")
.call(leftAxis);


// Create circle elements
var dataPoints = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .classed("stateCircle", true)
    .attr("cx", data => xLinearScale(data[xAxis]))
    .attr("cy", data => yLinearScale(data[yAxis]))
    .attr("r", "15")

// Creates circle state abbreviation labels
var dataLabels = chartGroup.selectAll(".stateText")
    .data(stateData)
    .enter()
    .append("text")
    .attr("x", data => xLinearScale(data[xAxis]))
    .attr("y", data => yLinearScale(data[yAxis]))
    .classed("stateText", true)
    .attr("dy", ".4em")
    .text(data => data.abbr)
 
 // Create x axis label
var xLabel = chartGroup.append("text")
 .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margins.top + 20})`)
 .attr("class", "aText")
 .text("Median Age");

// Create y axis labels
var yLabel = chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margins.left + 40)
.attr("x", 0 - (chartHeight / 2))
.attr("class", "aText")
.text("Smokers (as a Percentage of Population)");

// Establish tooltips
var toolTip = d3.tip()
.attr("class", "d3-tip")
.offset([-20, 0])
.html(data => `${data.state}<br>
Median Age: ${data.age}<br>
Smokers: ${data.smokes}%`);

// Link Tooltips
dataPoints.call(toolTip);


// Create event listeners
dataPoints.on("click", function(data) {
  toolTip.show(data, this);
})
  .on("mouseout", function(data, index) {
    toolTip.hide(data);
  });
};

createChart(stateData, selectedAxisX, selectedAxisY)