import { useEffect, useContext } from "react";
import { PhotoboothContext } from "./AppContext";
import { gsap } from "gsap/gsap-core";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/all";
import styled from "styled-components";
import { theme } from "./Theme";

gsap.registerPlugin(ScrambleTextPlugin, SplitText);

const LoadingPage = () => {
	const { isLoading, setIsLoading } = useContext(PhotoboothContext);

	useEffect(() => {
		const loadingTimeout = setTimeout(() => {
			const childSplit = new SplitText("h1", {
				type: "lines",
				mask: "lines",
				linesClass: "split-child",
			});

			gsap.from(childSplit.lines, {
				duration: 2,
				yPercent: 100,
				ease: "power4",
				stagger: 0.1,
			});

			const dots = gsap.utils.toArray(".dot");
			gsap.set(dots, { opacity: 0 });

			gsap.to(dots, {
				opacity: 1,
				stagger: {
					each: 0.3,
					repeat: -1,
					yoyo: true,
				},
				ease: "power1.inOut",
				duration: 0.5,
			});
		}, []);
		return () => clearTimeout(loadingTimeout);
	}, [setIsLoading]);

	return (
		<MainContainer>
			{isLoading && (
				<div className="text-heading">
					<Header className="loading-text">LOADING</Header>
					<SpanContainer className="dots">
						<Span className="dot">.</Span>
						<Span className="dot">.</Span>
						<Span className="dot">.</Span>
					</SpanContainer>
				</div>
			)}
		</MainContainer>
	);
};

export default LoadingPage;

const MainContainer = styled.div`
	height: 100vh;
	width: 100vw;
	background: #1b1c19;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const Header = styled.h1`
	color: #e987aa;
	font-family: "PPMondwest-regular";
	font-size: 60px;
	text-shadow: 0 0 5px #e987aa;

	@media (max-width: ${theme.breakpoints.sm}) {
		font-size: 40px;

		font-size: 50px;
	}
`;

const SpanContainer = styled.span`
	margin-left: 8px;
`;

const Span = styled.span`
	color: #e987aa;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	width: 25px;
	font-size: 70px;

	@media (max-width: ${theme.breakpoints.sm}) {
		font-size: 50px;
	}
`;
