import React, { useEffect, useRef } from "react";
import * as d3 from 'd3'
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/graph-content.js";
import { useSelector } from "react-redux";

const useStyles = makeStyles(styles);
export default function GraphContent(props) {
	const classes = useStyles();

	const audio_data = useSelector(state => state.audio.selectedAudio)
	const selectedColors = useSelector(state => state.color.selectedColor)
	const graphType = useSelector(state => state.style.graph_type)
	const bar_width = useSelector(state => state.style.bar_width)
	const bar_space = useSelector(state => state.style.bar_space)
	const circle_radius = useSelector(state => state.style.circle_radius)
	const circle_rotate = useSelector(state => state.style.circle_rotate)
	const bar_shape = useSelector(state => state.style.bar_shape)

	useEffect(() => {
		if (!audio_data) return;
		// consts
		const canvasHeight = 600
		const canvasWidth = window.innerWidth * 9 / 12 - 45
		const contentHeight = 300 // as max, half of canvas height
		const numth = graphType === "bar" ? bar_width : bar_width / 2 - 7 // able to control the bar width    min 74 max 2000      radial min 30
		const barRadius = bar_shape
		const innerRadius = circle_radius
		const outerRadius = Math.min(canvasWidth, canvasHeight) / 2;

		//---------------------------- data modify ----------------------------
		var cus_frequencies = [];

		const peaks = audio_data.data.data.filter(point => point >= 0);
		const ratio = Math.max(...peaks) / contentHeight
		const frequency_data = peaks.map(point => Math.round(point / ratio))

		if (frequency_data.length > 100) {
			var n = Number((frequency_data.length / numth).toFixed());
			for (let i = 0; i < frequency_data.length; i++) {
				if (i % n === 0) {
					cus_frequencies.push(frequency_data[i])
				}
			}
			if (cus_frequencies.length !== frequency_data.length) {
				cus_frequencies.push(frequency_data[0])
				cus_frequencies.push(frequency_data[frequency_data.length - 1])
			}
		}

		for (let i = 0; i < cus_frequencies.length; i++) {
			if (cus_frequencies[i] == 0) cus_frequencies[i] = 0.25
		}
		//---------------------------- data modify ----------------------------

		const graph_content = document.getElementById("graph_content")
		if (graph_content.children.length > 0) {
			graph_content.removeChild(graph_content.lastElementChild)
		}

		const svgCanvas = d3.select("#graph_content")
			.append('svg')
			.attr('height', canvasHeight)
			.attr('width', canvasWidth)

		const barWidth = svgCanvas.node().scrollWidth / cus_frequencies.length

		var divide_frequency = Math.max(...cus_frequencies) / selectedColors.color.length;
		var divide_frequencies = [];
		for (let i = 0; i < selectedColors.color.length; i++) {
			divide_frequencies.push(divide_frequency * (i + 1))
		}
		if (graphType === "bar") {
			svgCanvas.selectAll('rect')
				.data(cus_frequencies).enter()
				.append('rect')
				.attr('width', barWidth)
				.attr('height', (datapoint) => datapoint * 2)
				.attr('fill', (datapoint) => {
					if (datapoint <= divide_frequencies[0]) {
						return selectedColors.color[0].color
					}
					for (let i = 0; i < divide_frequencies.length - 1; i++) {
						if (divide_frequencies[i] < datapoint && datapoint <= divide_frequencies[i + 1]) {
							return selectedColors.color[i + 1].color
						}
					}
				})
				.attr('rx', barRadius)
				.attr('ry', barRadius)
				.attr('x', (datapoint, iteration) => iteration * barWidth)
				.attr('y', (datapoint) => (canvasHeight / 2) - datapoint)
		} else {
			// X scale
			const x = d3.scaleBand()
				.range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
				.align(0)                  // This does nothing ?
				.domain(cus_frequencies.map(d => d)); // The domain of the X axis is the list of states.

			// Y scale
			const y = d3.scaleRadial()
				.range([innerRadius, outerRadius])   // Domain will be define later.
				.domain([0, 500]); // Domain of Y is from 0 to the max seen in the data
			svgCanvas.append("g")
				.style('transform', `translateX(${canvasWidth / 2}px) translateY(${canvasHeight / 2}px)`)
				.selectAll("path")
				.data(cus_frequencies)
				.join("path")
				.attr('fill', (d) => {
					if (d <= divide_frequencies[0]) {
						return selectedColors.color[0].color
					}
					for (let i = 0; i < divide_frequencies.length - 1; i++) {
						if (divide_frequencies[i] < d && d <= divide_frequencies[i + 1]) {
							return selectedColors.color[i + 1].color
						}
					}
				})
				.attr("d", d3.arc()     // imagine your doing a part of a donut plot
					.innerRadius(innerRadius)
					.outerRadius(d => y(d))
					.startAngle(d => x(d) + circle_rotate)
					.endAngle(d => x(d) + x.bandwidth() + circle_rotate)
					.padAngle(bar_space)
				)
		}
	}, [audio_data, selectedColors, graphType, bar_width, bar_space, circle_radius, circle_rotate, bar_shape])

	return (
		<div className={classes.graphContent}>
			<div className={classes.audioGraph} id="graph_content"></div>
		</div>
	);
}