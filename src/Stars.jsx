import { useMemo, useEffect } from "react";
import star from "./assets/43.png";
import { gsap } from "gsap";

const Stars = () => {
	const randomizedStars = useMemo(() => {
		return Array.from({ length: 50 }).map(() => ({
			bottom: Math.floor(Math.random() * 90) + "%",
			left: Math.floor(Math.random() * 90) + "%",
			right: Math.floor(Math.random() * 90) + "%",
			width: Math.floor(Math.random() * 40) + 30,
		}));
	}, []);

	useEffect(() => {
		const stars = gsap.utils.toArray(".stars");
		stars.forEach((el, i) => {
			gsap.to(el, {
				rotation: i % 2 === 0 ? 360 : -360,
				duration: 15,
				repeat: -1,
				ease: "linear",
				timeScale: 0.1,
				transformOrigin: "50% 50%",
			});
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
