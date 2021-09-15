import React, { useEffect, useRef } from "react";
import * as d3 from 'd3'
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/graph-content.js";
import { useSelector } from "react-redux";
import Gradient from "javascript-color-gradient";

const useStyles = makeStyles(styles);
export default function GraphContent(props) {
	const classes = useStyles();

	const audio_data = useSelector(state => state.audio.selectedAudio)
	const { graph_type, bar_width, bar_space, circle_radius, circle_rotate, bar_shape } = useSelector(state => state.style)
	const { backgroundColor, graphColor } = useSelector(state => state.color)
	const { displayText, textFont, textColor, fontSize, textJustification, textVerticalAlign } = useSelector(state => state.text)

	useEffect(() => {
		if (!audio_data) return;
		// consts
		const canvasHeight = 4800
		const canvasWidth = 6000
		const paddingVirtical = 300
		const paddingHorizontal = 1000
		const contentHeight = canvasHeight / 2 - paddingVirtical // as max, half of canvas height: ;
		const numth = (canvasWidth - paddingHorizontal) / (graph_type === "bar" ? (bar_width + bar_space) : bar_width) //graph_type === "bar" ? bar_width : bar_width / 2 - 7 // able to control the bar width    min 74 max 2000      radial min 30
		const barRadius = bar_shape
		const innerRadius = circle_radius
		const outerRadius = Math.min(canvasWidth, canvasHeight) / 2;
		const textSize = fontSize * 4.2

		//---------------------------- data modify ----------------------------
		var cus_frequencies = [];

		const peaks = audio_data.data.data.filter(point => point >= 0);
		const ratio = Math.max(...peaks) / contentHeight
		const frequency_data = peaks.map(point => Math.round(point / ratio))

		if (frequency_data.length > 100) {
			var n = Number((frequency_data.length / numth).toFixed());
			var n2 = n
			var c = 0;
			while (c < frequency_data.length) {
				var sl = frequency_data.slice(c, n)
				var average = (sl.reduce((a, b) => a + b, 0) / sl.length).toFixed()
				cus_frequencies.push(average)
				c = n
				n = n + n2
			}
		} else {
			cus_frequencies = frequency_data
		}

		//---------------------------- data modify ----------------------------

		const graph_content = document.getElementById("graph_content")
		if (graph_content.children.length > 0) {
			graph_content.removeChild(graph_content.lastElementChild)
		}

		const svgCanvas = d3.select("#graph_content")
			.append('svg')
			.attr('xmlns', 'http://www.w3.org/2000/svg')
			.attr('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`)
			.attr('style', `background-color: ${backgroundColor}`)

		// const barWidth = svgCanvas.node().scrollWidth / cus_frequencies.length
		var m = contentHeight / Math.max(...cus_frequencies);
		m = m < 1 ? 1 : m

		// making gradient color
		const colorGradient = new Gradient();
		var gardientedColors = [];

		switch (graphColor.color.length) {
			case 2:
				colorGradient.setGradient(graphColor.color[0].color, graphColor.color[1].color);
				colorGradient.setMidpoint(3);
				break;
			case 3:
				colorGradient.setGradient(graphColor.color[0].color, graphColor.color[1].color, graphColor.color[2].color);
				colorGradient.setMidpoint(5);
				break;
			case 4:
				colorGradient.setGradient(graphColor.color[0].color, graphColor.color[1].color, graphColor.color[2].color, graphColor.color[3].color);
				colorGradient.setMidpoint(7);
				break;
			case 5:
				colorGradient.setGradient(graphColor.color[0].color, graphColor.color[1].color, graphColor.color[2].color, graphColor.color[3].color, graphColor.color[4].color);
				colorGradient.setMidpoint(9);
				break;
			default:
				break;
		}

		if (colorGradient.getArray().length > 0) {
			gardientedColors = colorGradient.getArray();
		} else {
			gardientedColors = [graphColor.color[0].color];
		}

		var divide_frequency = Math.max(...cus_frequencies) / gardientedColors.length;
		var divide_frequencies = [];
		for (let i = 0; i < gardientedColors.length; i++) {
			divide_frequencies.push(divide_frequency * (i + 1))
		}
		if (graph_type === "bar") {
			svgCanvas.selectAll('rect')
				.data(cus_frequencies).enter()
				.append('rect')
				.attr('width', bar_width)
				.attr('height', (datapoint) => datapoint * m * 2)
				.attr('fill', (datapoint) => {
					if (datapoint <= divide_frequencies[0]) {
						return gardientedColors[0]
					}
					for (let i = 0; i < divide_frequencies.length - 1; i++) {
						if (divide_frequencies[i] < datapoint && datapoint <= divide_frequencies[i + 1]) {
							return gardientedColors[i + 1]
						}
					}
				})
				.attr('rx', barRadius)
				.attr('ry', barRadius)
				.attr('x', (datapoint, iteration) => iteration * (bar_width + bar_space) + paddingHorizontal / 2)
				.attr('y', (datapoint) => (canvasHeight / 2) - datapoint * m)
		} else {
			// X scale
			const x = d3.scaleBand()
				.range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
				.align(0)                  // This does nothing ?
				.padding(bar_space / 600)
				.domain(cus_frequencies.map(d => d)); // The domain of the X axis is the list of states.

			// Y scale
			const y = d3.scaleRadial()
				.range([innerRadius, outerRadius])   // Domain will be define later.
				.domain([0, Math.max(...cus_frequencies)]); // Domain of Y is from 0 to the max seen in the data
			svgCanvas.append("g")
				.attr('transform', `translate(${canvasWidth / 2} ${canvasHeight / 2})`)
				.selectAll("path")
				.data(cus_frequencies)
				.join("path")
				.attr('fill', (d) => {
					if (d <= divide_frequencies[0]) {
						return gardientedColors[0]
					}
					for (let i = 0; i < divide_frequencies.length - 1; i++) {
						if (divide_frequencies[i] < d && d <= divide_frequencies[i + 1]) {
							return gardientedColors[i + 1]
						}
					}
				})
				.attr("d", d3.arc()     // imagine your doing a part of a donut plot
					.innerRadius(innerRadius)
					.outerRadius(d => y(d))
					.startAngle(d => x(d) + circle_rotate)
					.endAngle(d => x(d) + x.bandwidth() + circle_rotate)
					// .padAngle(bar_space)
				)
		}

		// adding text
		if (displayText.length > 0) {
			svgCanvas.append("g")
				.append("text")
				.text(displayText)
				.attr("font-family", textFont)
				.attr("font-size", textSize)
				.attr("fill", textColor)
				.attr("id", "audio_text")
				.attr("text-anchor", "middle")


			const audioText = document.querySelector("#audio_text");
			const audioTextWidth = audioText.getBoundingClientRect().width
			// getting position of text
			var x_text = 0;
			var y_text = 0;
			switch (textJustification) {
				case 0:
					x_text = audioTextWidth * 4.2 + 200
					break;
				case 1:
					x_text = canvasWidth / 2
					break;
				case 2:
					x_text = canvasWidth - audioTextWidth * 4.2 - 200
					break;
				default:
					break;
			}
			switch (textVerticalAlign) {
				case 0:
					y_text = textSize / 2 + 200;
					break;
				case 1:
					y_text = canvasHeight / 2 + textSize / 4.2
					break;
				case 2:
					y_text = canvasHeight - 200
					break;
				default:
					break;
			}

			audioText.setAttribute("x", x_text)
			audioText.setAttribute("y", y_text)
		}
	}, [
		audio_data,
		graphColor,
		graph_type,
		bar_width,
		bar_space,
		circle_radius,
		circle_rotate,
		bar_shape,
		backgroundColor,
		displayText,
		textFont,
		textColor,
		fontSize,
		textJustification,
		textVerticalAlign
	])

	return (
		<div className={classes.graphContent}>
			<div className={classes.audioGraph} id="graph_content"></div>
		</div>
	);
}