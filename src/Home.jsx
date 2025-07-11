import { useEffect } from "react";
import styled from "styled-components";
import Stars from "./Stars";
import { useNavigate } from "react-router";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { theme } from "./Theme";
import { SplitText } from "gsap/all";

gsap.registerPlugin(ScrambleTextPlugin, SplitText);

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
				text: "FOTOAUTOMATICA",
				chars: "0123456789",
				speed: 0.4,
			},
			duration: 1.5,
		}).add();
	}, []);

	return (
		<MainContainer>
			<Stars />
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
	height: 100vh;
	width: 100vw;
	min-height: 100vh;
	overflow-y: hidden;
`;

const InnerContainer = styled.div`
	gap: 10px;
	/* font-family: "PPMondwest-regular"; */

	h1 > div {
		position: relative;
		margin: 0;
	}
	.split-parent {
		overflow: hidden;
	}
	.split-child {
		display: inline-block;
	}
`;

const Header = styled.h1`
	font-family: "Jerio-ExtrudeRight";
	text-align: center;
	font-size: 70px;
	color: #ecece1;
	width: 630px;
	letter-spacing: 9px;
	border: solid #ecece1 5px;
	padding: 10px;

	.highlight {
		font-style: italic;
	}

	@media (max-width: ${theme.breakpoints.sm}) {
		font-size: 30px;
		width: 360px;
	}
`;

const Button = styled.button`
	color: #ecece1;
	font-family: "Ginora-Sans";
	width: 100%;
	align-content: center;
	height: 55px;
	font-size: 20px;
	cursor: pointer;
	transition: all 0.6s ease;
	background-color: transparent;
	border: none;

	&:hover {
		color: #e987aa;
		background-color: #ecece1;
		transition: all 0.3s ease-in-out;
	}

	@media (max-width: ${theme.breakpoints.sm}) {
		font-size: 19px;
	}
`;
