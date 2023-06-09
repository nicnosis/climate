// CO2 Chart
function ghgco2 () {

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 738 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    /*
     * value accessor - returns the value to encode for a given data object.
     * scale - maps value to a visual display encoding, such as a pixel position.
     * map function - maps from data value to display value
     * axis - sets up axis
     */

    // setup x
    var xValue = function (d) {
            return d.YEAR;
        }, // data -> value
        xScale = d3.scale.linear().range([0, width]), // value -> display
        xMap = function (d) {
            return xScale(xValue(d));
        }, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    xAxis.tickFormat(d3.format("04d")); // Remove commas from years


    // setup y
    var yValue = function (d) {
            return d["PPM"];
        }, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function (d) {
            return yScale(yValue(d));
        }, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    yAxis.tickFormat(d3.format("03d"));

    // add the graph canvas to the correct ID div
    var svg = d3.select('#chart-ghg-co2').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;

    // add the tooltip area to the webpage
    /*var tooltip = d3.select("#ghg-ch4").append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);*/

    // load data
    d3.csv("data/ghg-co2.csv", function (error, data) {

        // change string (from CSV) into number format
        data.forEach(function (d) {
            d.YEAR = +d.YEAR;
            d["PPM"] = +d["PPM"];
            //    console.log(d);
        });

        // don't want dots overlapping axis, so add in buffer to data domain
        xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
        yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

        // x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
        ;

        // y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("CO2 (Parts per Million)");

        // draw dots
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function (d) { return '#9EE1E1'; });

        /* tooltip stuff
         .on("mouseover", function(d) {
         tooltip.transition()
         .duration(200)
         .style("opacity", .9);
         tooltip.html(xValue(d)
         + ", " + yValue(d) + ")")
         .style("left", (d3.event.pageX + 5) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
         })
         .on("mouseout", function(d) {
         tooltip.transition()
         .duration(500)
         .style("opacity", 0);
         });  */
    });
}

// Methane Chart
function ghgch4 () {

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 738 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    // setup x
    var xValue = function (d) {
            return d.YEAR;
        }, // data -> value
        xScale = d3.scale.linear().range([0, width]), // value -> display
        xMap = function (d) {
            return xScale(xValue(d));
        }, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    xAxis.tickFormat(d3.format("04d")); // Remove commas from years


    // setup y
    var yValue = function (d) {
            return d["PPB"];
        }, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function (d) {
            return yScale(yValue(d));
        }, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    yAxis.tickFormat(d3.format("04d"));

    // add the graph canvas to the correct ID div
    var svg = d3.select('#chart-ghg-ch4').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;

    // add the tooltip area to the webpage
    /*var tooltip = d3.select("#ghg-ch4").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);*/

    // load data
    d3.csv("data/ghg-ch4.csv", function (error, data) {

        // change string (from CSV) into number format
        data.forEach(function (d) {
            d.YEAR = +d.YEAR;
            d["PPB"] = +d["PPB"];
            //    console.log(d);
        });

        // don't want dots overlapping axis, so add in buffer to data domain
        xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
        yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

        // x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            ;

        // y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("CH4 (Parts per Billion)");

        // draw dots
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function (d) { return '#135267'; });

            /* tooltip stuff
            .on("mouseover", function(d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(xValue(d)
                    + ", " + yValue(d) + ")")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });  */
    });
}

function ghgnos () {

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 738 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    // setup x
    var xValue = function (d) {
            return d.YEAR;
        }, // data -> value
        xScale = d3.scale.linear().range([0, width]), // value -> display
        xMap = function (d) {
            return xScale(xValue(d));
        }, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    xAxis.tickFormat(d3.format("04d")); // Remove commas from years


    // setup y
    var yValue = function (d) {
            return d["PPB"];
        }, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function (d) {
            return yScale(yValue(d));
        }, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    yAxis.tickFormat(d3.format("03d"));

    // add the graph canvas to the correct ID div
    var svg = d3.select('#chart-ghg-nos').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;

    // add the tooltip area to the webpage
    /*var tooltip = d3.select("#ghg-ch4").append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);*/

    // load data
    d3.csv("data/ghg-nos.csv", function (error, data) {

        // change string (from CSV) into number format
        data.forEach(function (d) {
            d.YEAR = +d.YEAR;
            d["PPB"] = +d["PPB"];
            //    console.log(d);
        });

        // don't want dots overlapping axis, so add in buffer to data domain
        xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
        yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

        // x-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
        ;

        // y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Nitrous Oxide (Parts per Billion)");

        // draw dots
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", xMap)
            .attr("cy", yMap)
            .style("fill", function (d) { return '#40BCD2'; });

        /* tooltip stuff
         .on("mouseover", function(d) {
         tooltip.transition()
         .duration(200)
         .style("opacity", .9);
         tooltip.html(xValue(d)
         + ", " + yValue(d) + ")")
         .style("left", (d3.event.pageX + 5) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
         })
         .on("mouseout", function(d) {
         tooltip.transition()
         .duration(500)
         .style("opacity", 0);
         });  */
    });
}