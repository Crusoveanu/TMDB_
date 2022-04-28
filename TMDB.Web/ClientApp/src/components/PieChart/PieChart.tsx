import React, { useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const PieChart = (props) => {
	let setPiePathColour = (props.vote >= 7) ? "34,139,34" :
		props.vote >= 5 && props.vote < 7 ? "255,255,0" : "255,0,0";

    return (
		<CircularProgressbar
			value={props.vote * 10}
			text={`${props.vote * 10}%`}
			styles={buildStyles({
				// Rotation of path and trail, in number of turns (0-1)
				rotation: 0.25,

				// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
				strokeLinecap: 'butt',

				// Text size
				textSize: '32px',

				// How long animation takes to go from one percentage to another, in seconds
				pathTransitionDuration: 0.5,

				// Colors
				pathColor: `rgba(${setPiePathColour}, ${(props.vote * 10) / 100})`,
				textColor: 'white',
				trailColor: 'gray',
				backgroundColor: '#3e98c7',
			})}
		/>
    )
}

export default PieChart;