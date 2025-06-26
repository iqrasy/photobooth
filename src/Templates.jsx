import styled from "styled-components";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useState, useContext, useRef, useEffect } from "react";
import "./styles.css";
import { PhotoboothContext } from "./AppContext";
import html2canvas from "html2canvas";
import { useDebouncedCallback } from "use-debounce";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/all";
import { theme } from "./Theme";
import { useNavigate } from "react-router";
import arrow from "./assets/right-arrow.png";
import Tooltip from "@mui/material/Tooltip";
import Stars from "./Stars";

gsap.registerPlugin(ScrambleTextPlugin, SplitText);
const mm = gsap.matchMedia();

const Templates = () => {
	const [showColourPicker, setShowColourPicker] = useState(true);
	const [download, setDownload] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [downloadComplete, setDownloadComplete] = useState(false);
	const {
		colour,
		setColour,
		setText,
		setPhotoList,
		setRetakePictures,
		setHasTakenPhotos,
	} = useContext(PhotoboothContext);
	const images = JSON.parse(localStorage.getItem("photo-series") || "[]");
	const templateRef = useRef();
	const colourPickerRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (showColourPicker) {
			gsap.set("#scramble-text-2", { opacity: 1 });

			gsap.to("#scramble-text-2", {
				scrambleText: {
					text: "build your template",
					chars: "upperCase",
					speed: 0.4,
				},
				duration: 1.5,
			});
		} else {
			gsap.set("#scramble-text-1", { opacity: 1 });

			gsap.to("#scramble-text-1", {
				scrambleText: {
					text: "download your picture",
					chars: "upperCase",
					speed: 0.4,
				},
				duration: 1.5,
			});
		}
	}, [showColourPicker]);

	useEffect(() => {
		if (isDownloading && !downloadComplete) {
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
		}
	}, [isDownloading, downloadComplete]);

	const handleSave = () => {
		mm.add(
			{
				isMobile: "(max-width: 576px)",
				isDesktop: "(min-width: 769px)",
			},
			(context) => {
				const { isMobile } = context.conditions;
				const { isDesktop } = context.conditions;

				gsap.to(colourPickerRef.current, {
					y: 500,
					opacity: 0,
					duration: 0.6,
					ease: "power2.out",
					onComplete: () => {
						setShowColourPicker(false);
						setDownload(true);

						gsap.fromTo(
							templateRef.current,
							{ y: 0, opacity: 0, duration: 0.6, ease: "power2.out" },
							{
								y: isMobile ? 0 : 200,
								x: isDesktop ? -30 : 0,
								opacity: 1,
								duration: 0.6,
								ease: "power2.out",
							}
						);
					},
				});
			}
		);
	};

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleDownload = async () => {
		if (!templateRef.current) return;
		setIsDownloading(true);

		const canvas = await html2canvas(templateRef.current, {
			useCORS: true,
			scale: 3,
		});
		setTimeout(() => {
			const imgData = canvas.toDataURL("image/png");

			const link = document.createElement("a");
			link.href = imgData;
			link.download = "photobooth-printout.png";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

			setRetakePictures(true);
			setDownloadComplete(true);
		}, 3000);
	};

	const debouncedSetColour = useDebouncedCallback((color) => {
		setColour(color);
	}, 50);

	const handleNavigate = () => {
		localStorage.removeItem("photo-series");
		setPhotoList([]);
		setHasTakenPhotos(false);
		setRetakePictures(false);
		navigate("/camera");
	};

	return (
		<>
			{!download && (
				<Tooltip
					title="back to camera"
					slotProps={{
						tooltip: {
							sx: {
								backgroundColor: "#ecece1",
								color: "#1b1c19",
								borderRadius: "5px",
								fontSize: "12px",
							},
						},
					}}
				>
					<ArrowImage src={arrow} onClick={handleNavigate} />
				</Tooltip>
			)}
			{isDownloading ? (
				<>
					<Stars />
					<DownloadContainer>
						<DownloadContainerHeader>
							{downloadComplete ? (
								<DownloadContainerHeader className="loading-text">
									your pictures are ready
								</DownloadContainerHeader>
							) : (
								<>
									<DownloadContainerHeader className="loading-text">
										constructing your pictures
									</DownloadContainerHeader>
									<SpanContainer className="dots">
										<Span className="dot">.</Span>
										<Span className="dot">.</Span>
										<Span className="dot">.</Span>
									</SpanContainer>
								</>
							)}
						</DownloadContainerHeader>
						{downloadComplete && (
							<ButtonContainer>
								<Buttons onClick={handleNavigate}>take more pictures</Buttons>
							</ButtonContainer>
						)}
					</DownloadContainer>
				</>
			) : (
				<>
					<Header id="scramble-text-original">
						<p id="text-scramble__text" aria-hidden="true">
							<span
								id="scramble-text-2"
								style={{ display: showColourPicker ? "inline" : "none" }}
							></span>
							<span
								id="scramble-text-1"
								style={{ display: !showColourPicker ? "inline" : "none" }}
							></span>
						</p>
					</Header>

					<MainContainer>
						<ColourPickerContainer ref={colourPickerRef}>
							{showColourPicker && (
								<>
									<section className="custom-layout example">
										<HexColorPicker
											color={colour}
											onChange={debouncedSetColour}
											placeholder="Type a color"
										/>
									</section>
									<HexColorInput
										id={colour}
										name={colour}
										color={colour}
										onChange={debouncedSetColour}
										prefixed
										className="input"
									/>
								</>
							)}
						</ColourPickerContainer>
						<TemplateContainer
							colourpicked={colour}
							ref={templateRef}
							saved={showColourPicker === false}
						>
							<div className="container">
								{images.map((img, idx) => (
									<ImageContainer key={idx}>
										<img
											src={img}
											alt={`Captured ${idx + 1}`}
											style={{ width: "100%", height: "100%" }}
										/>
									</ImageContainer>
								))}

								<div>
									<Input
										placeholder="add text here"
										onChange={handleChange}
										readOnly={showColourPicker === false && "readonly"}
									/>
								</div>
							</div>
						</TemplateContainer>
					</MainContainer>
					<ButtonContainer>
						{download ? (
							<>
								<Buttons onClick={handleDownload}>
									download your picture
								</Buttons>
								<Buttons onClick={handleNavigate}>start over</Buttons>
							</>
						) : (
							<Buttons onClick={handleSave}>save & continue</Buttons>
						)}
					</ButtonContainer>
				</>
			)}
		</>
	);
};

export default Templates;

const MainContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-direction: row;
	margin: 10px;
	gap: 20px;

	@media (max-width: ${theme.breakpoints.sm}) {
		flex-direction: column;
		align-items: center;
	}
`;

const Header = styled.h1`
	font-family: "PPMondwest-regular";
	color: #ecece1;
	text-align: center;
	margin-top: 50px;
	font-size: 50px;

	@media (max-width: ${theme.breakpoints.sm}) {
		font-size: 35px;
	}
`;

const ColourPickerContainer = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.input {
		cursor: text;
	}
`;

const TemplateContainer = styled.div`
	width: 300px;
	height: 750px;
	margin: 10px 0;
	padding: 5px 10px;
	background-color: ${(props) => props.colourpicked};
	border-radius: 3px;
	display: flex;
	justify-content: center;
	align-items: center;

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 5px;
	}

	@media (max-width: ${theme.breakpoints.sm}) {
		margin: 6px;
		width: auto;
		height: auto;
	}
`;

const ImageContainer = styled.div`
	background-color: #d6d6d6;
	height: 200px;
	margin: 5px 0px;
	border-radius: 3px;
	display: flex;
	align-items: center;
	justify-content: center;

	@media (max-width: ${theme.breakpoints.sm}) {
		margin: 6px auto;
		width: 200px;
		height: 240px;
	}
`;

const Input = styled.input`
	width: auto;
	height: 45px;
	border: none;
	outline: none;
	margin: 5px 13px;
	background-color: transparent;
	text-align: center;
	width: 91%;
	color: #ecece1;
	font-size: 25px;
	font-family: "ppneuebit-bold";

	&::placeholder {
		color: #ecece1;
	}
`;

const Buttons = styled.button`
	background-color: #e987aa;
	color: #ecece1;
	border: solid #ecece1 5px;
	font-size: 25px;
	padding: 10px 20px;
	margin: 10px 5px;
	font-family: "ppneuebit-bold";
	cursor: pointer;
	transition: all 0.6s ease;

	&:hover {
		border-radius: 10px;
		background-color: #e987aa;
		transition: all 0.3s ease-in-out;
	}

	@media (max-width: ${theme.breakpoints.sm}) {
		font-size: 19px;
	}
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: end;
	margin: 20px;
	height: 300px;
	gap: 20px;

	@media (max-width: ${theme.breakpoints.sm}) {
		height: 40px;
	}
`;

const ArrowImage = styled.img`
	transform: rotate(180deg);
	height: 60px;
	margin: 40px;
	cursor: pointer;

	@media (max-width: ${theme.breakpoints.sm}) {
		height: 30px;
	}
`;

const DownloadContainer = styled.div`
	width: 100%;
	height: 100vh;
	margin: 0;
	padding: 0;
	background-color: #1b1c19;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-family: "ppneuebit-bold";
`;

const DownloadContainerHeader = styled.p`
	color: #e987aa;
	font-family: "PPMondwest-regular";
	font-size: 50px;
	text-shadow: 0 0 5px #e987aa;

	@media (max-width: ${theme.breakpoints.sm}) {
		font-size: 40px;
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
	font-size: 100px;

	@media (max-width: ${theme.breakpoints.sm}) {
		font-size: 50px;
	}
`;
