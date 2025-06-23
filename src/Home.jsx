import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);

const Home = () => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate("/camera");
	};

	useEffect(() => {
		const tl = gsap.timeline({
			id: "text-scramble",
			defaults: { ease: "none" },
		});

		gsap.set("#scramble-text-original", {
			opacity: 1,
		});

		tl.to("#scramble-text-1", {
			scrambleText: {
				text: "FOTOAUTOMAT",
				chars: "upperCase",
				speed: 0.4,
			},
			duration: 1.5,
		}).add();
	}, []);

	return (
		<MainContainer>
			<InnerContainer>
				<Header id="scramble-text-original">
					<p id="text-scramble__text" aria-hidden="true">
						<span id="scramble-text-1"></span>
					</p>
				</Header>
				<Button onClick={handleNavigate} className="start">
					start taking pictures
				</Button>
			</InnerContainer>
		</MainContainer>
	);
};

export default Home;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	color: #e987aa;
	height: 100vh;
	width: 100vw;
	min-height: 100vh;
	overflow-y: hidden;
`;

const InnerContainer = styled.div`
	gap: 10px;
	font-family: "PPMondwest-regular";
`;

const Header = styled.h1`
	font-family: "PPMondwest-regular";
	text-align: center;
	font-size: 55px;
	background-color: #1b1c19;
	width: 500px;

	.highlight {
		font-style: italic;
	}
`;

const Button = styled.button`
	background-color: #ecece1;
	color: #1b1c19;
	font-family: "ppneuebit-bold";
	width: 100%;
	align-content: center;
	height: 55px;
	font-size: 21px;
	cursor: pointer;
	transition: all 0.6s ease;

	&:hover {
		border-radius: 10px;
	}
`;
