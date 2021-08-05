import React, { useEffect, useRef } from "react";
import * as d3 from 'd3'
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/graph-content.js";
import { useSelector } from "react-redux";

const useStyles = makeStyles(styles);
export default function GraphContent(props) {
	const classes = useStyles();

	const audio_data = useSelector(state => state.audio.selectedAudio)

	useEffect(() => {
		if (!audio_data) return;
		// consts
		const canvasHeight = 600
		const canvasWidth = "100%"
		const contentHeight = 300 // as max, half of canvas height
		const numth = 60 // able to control the bar width
		const barRadius = 0

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

		svgCanvas.selectAll('rect')
			.data(cus_frequencies).enter()
			.append('rect')
			.attr('width', barWidth)
			.attr('height', (datapoint) => datapoint * 2)
			.attr('fill', 'orange')
			.attr('rx', barRadius)
			.attr('ry', barRadius)
			.attr('x', (datapoint, iteration) => iteration * barWidth)
			.attr('y', (datapoint) => (canvasHeight / 2) - datapoint)
	}, [audio_data])

	return (
		<div className={classes.graphContent}>
			<div className={classes.audioGraph} id="graph_content"></div>
		</div>
	);
}