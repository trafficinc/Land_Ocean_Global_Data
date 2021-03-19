import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const Chart = props => {

    function update(dataset) {
        d3.selectAll("svg").remove();

        const yAccessor = (d) => d.value;
        const dateParser = d3.timeParse("%Y");
        const xAccessor = (d) => dateParser(d.date);

        //  width: window.innerWidth * 0.9,
        //  width: 500,
        let currentWidth = parseInt(d3.select('#wrapper').style('width'), 10);
        //console.log(currentWidth);
        let dimensions = {
            width: currentWidth,
            height: 400,
            margin: {
                top: 15,
                right: 60,
                bottom: 40,
                left: 60
            }
        };
        dimensions.boundedWidth =
            dimensions.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.boundedHeight =
            dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

        const wrapper = d3
            .select("#wrapper")
            .append("svg")
            .attr("width", dimensions.width)
            .attr("height", dimensions.height);

        const bounds = wrapper
            .append("g")
            .style(
                "transform",
                `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
            );

        //-0.7, 1.10
        //29, 37
        const yScale = d3
            .scaleLinear()
            .domain([-0.7, 1.10])
            .range([dimensions.boundedHeight, 0]);

        const yScale2 = d3
            .scaleLinear()
            .domain([29, 37])
            .range([dimensions.boundedHeight, 0]);

        const freezingTemperaturePlacement = yScale(32);
        const freezingTemperatures = bounds
            .append("rect")
            .attr("x", 0)
            .attr("width", dimensions.boundedWidth)
            .attr("y", freezingTemperaturePlacement)
            .attr("height", dimensions.boundedHeight - freezingTemperaturePlacement)
            .attr("fill", "#fff");

        const xScale = d3
            .scaleTime()
            .domain(d3.extent(dataset, xAccessor))
            .range([0, dimensions.boundedWidth]);


        var lineGenerator = d3
            .line()
            .x((d) => xScale(xAccessor(d)))
            .y((d) => yScale(yAccessor(d)));

        var line = bounds
            .append("path")
            .attr("d", lineGenerator(dataset))
            .attr("fill", "none")
            .attr("stroke", "#d63024")
            .attr("stroke-width", 2);


        const yAxisGenerator = d3.axisLeft().scale(yScale);
        const rAxisGenerator = d3.axisRight().scale(yScale2);

        const yAxis = bounds.append("g").call(yAxisGenerator);

        const xAxisGenerator = d3.axisBottom().scale(xScale);

        const xAxis = bounds
            .append("g")
            .call(xAxisGenerator)
            .style("transform", `translateY(${dimensions.boundedHeight}px)`);

        bounds.append("g").call(rAxisGenerator)
            .style("transform", `translateX(${dimensions.width - 120}px)`);

        // Labels
        bounds.append("text")
            .attr("transform",
                "translate(" + (dimensions.width / 2.5) + " ," +
                (dimensions.height + dimensions.margin.top - 40) + ")")
            .style("text-anchor", "middle")
            .text("Date");

        bounds.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - dimensions.margin.left)
            .attr("x", 0 - (dimensions.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .html("&deg; C");

        bounds.append("text")
            .attr("transform", "rotate(-270)")
            .attr("y", - dimensions.width + 60)
            .attr("x", (dimensions.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .html("&deg; F");

    }

    const [data, setData] = useState(null);

    d3.selectAll(".fromDate,.toDate").on("change", function (d) {
        let fromSelect = document.getElementById('fromDate');
        let fromValue = fromSelect.options[fromSelect.selectedIndex].value;

        let toSelect = document.getElementById('toDate');
        let toValue = toSelect.options[toSelect.selectedIndex].value;

        let dataFilter = data.filter(function (d) {
            return parseInt(d.date) >= parseInt(fromValue) && parseInt(d.date) <= parseInt(toValue);
        })
        update(dataFilter);
    })

    const resetDates = () => {
        update(data);
    }

    useEffect(() => {
        if (!props.data) {
            return;
        }

        const data = props.data;
        const rawData = data.data;
        const dataset = Object.keys(rawData).map((item) => ({
            date: item,
            value: rawData[item]
        }));
        setData(dataset);

        update(dataset);

    }, [props]);


    return (
        <div id="wrapper" className="wrapper">


            <div className="top-menu">
                From:&nbsp;
            <select value={1880} id="fromDate" className="fromDate">
                    <option value="1880">1880</option>
                    <option value="1890">1890</option>
                    <option value="1900">1900</option>
                    <option value="1910">1910</option>
                    <option value="1920">1920</option>
                    <option value="1930">1930</option>
                    <option value="1940">1940</option>
                    <option value="1950">1950</option>
                    <option value="1960">1960</option>
                    <option value="1970">1970</option>
                    <option value="1980">1980</option>
                    <option value="1990">1990</option>
                    <option value="2000">2000</option>
                    <option value="2010">2010</option>
                    <option value="2020">2020</option>
                </select>
            &nbsp;&nbsp;
            To:&nbsp;
            <select value={2020} id="toDate" className="toDate">
                    <option value="1880">1880</option>
                    <option value="1890">1890</option>
                    <option value="1900">1900</option>
                    <option value="1910">1910</option>
                    <option value="1920">1920</option>
                    <option value="1930">1930</option>
                    <option value="1940">1940</option>
                    <option value="1950">1950</option>
                    <option value="1960">1960</option>
                    <option value="1970">1970</option>
                    <option value="1980">1980</option>
                    <option value="1990">1990</option>
                    <option value="2000">2000</option>
                    <option value="2010">2010</option>
                    <option value="2020">2020</option>
                </select>

            &nbsp;&nbsp;&nbsp;
            <input onClick={resetDates} className="btn btn-primary btn-sm" type="button" value="Reset Dates"></input>
            </div>



            <div id="tooltip" className="tooltip">
                <div className="tooltip-date">
                    <span id="date"></span>
                </div>
                <div className="tooltip-temperature">
                    <span id="temperature"></span>
                </div>
            </div>

        </div>
    );
};

export default Chart;
