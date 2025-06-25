import { useMemo, useEffect } from "react";
import star from "./assets/43.png";
import { gsap } from "gsap";

const Stars = () => {
	// useMemo memorizes the result of a function
	// without useMemo, a new random set would be generated on every render, causing flickering or unstability
	const randomizedStars = useMemo(() => {
		// creates a new array with 15 undefined elements which gives us something to map over
		// we map over each of the 15 itmes to generate a random style object for each image
		return Array.from({ length: 50 }).map(() => ({
			// top: Math.floor(Math.random() * 90) + "%",
			bottom: Math.floor(Math.random() * 90) + "%",
			left: Math.floor(Math.random() * 90) + "%",
			right: Math.floor(Math.random() * 90) + "%",
			width: Math.floor(Math.random() * 40) + 30,
		}));
	}, []);

	useEffect(() => {
		gsap.to(".stars", {
			rotation: 360,
			duration: 15,
			repeat: -1,
			ease: "linear",
			timeScale: 0.1,
		});
	}, []);
	return (
		<div>
			{randomizedStars.map((style, index) => (
				<img
					className="stars"
					key={index}
					src={star}
					alt="star"
					style={{
						position: "absolute",
						top: style.top,
						bottom: style.bottom,
						left: style.left,
						width: style.width,
						right: style.right,
						opacity: 0.8,
						pointerEvents: "none",
						padding: "20px",
					}}
				/>
			))}
		</div>
	);
};

export default Stars;
