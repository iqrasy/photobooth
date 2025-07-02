import styled from "styled-components";
import React, { useState, useContext, useRef, useEffect } from "react";
import "./styles.css";
import { PhotoboothContext } from "./AppContext";
import html2canvas from "html2canvas";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/all";
import { theme } from "./Theme";
import arrow from "./assets/right-arrow.png";
import Tooltip from "@mui/material/Tooltip";
import DownloadPage from "./DownloadPage";
import ColourPicker from "./ColourPicker";
import { LazyLoadImage } from "react-lazy-load-image-component";

gsap.registerPlugin(ScrambleTextPlugin, SplitText);
const mm = gsap.matchMedia();

const Templates = () => {
	const [download, setDownload] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const {
		colour,
		setText,
		setPhotoList,
		setRetakePictures,
		setHasTakenPhotos,
		downloadComplete,
		setDownloadComplete,
		showColourPicker,
		setShowColourPicker,
		setColour,
	} = useContext(PhotoboothContext);
	const images = JSON.parse(localStorage.getItem("photo-series") || "[]");
	const templateRef = useRef();
	const colourPickerRef = useRef(null);

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

		try {
			const canvas = await html2canvas(templateRef.current, {
				useCORS: true,
				scale: 3,
			});

			canvas.toBlob((blob) => {
				if (!blob) return;
				setTimeout(() => {
					const url = URL.createObjectURL(blob);

					const a = document.createElement("a");
					a.href = url;
					a.download = "photobooth-printout.png";
					a.target = "_self";

					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);

					URL.revokeObjectURL(url);

					setRetakePictures(true);
					setDownloadComplete(true);
				}, 3000);
			}, "image/png");
		} catch (error) {
			console.error("Download failed:", error);
			setIsDownloading(false);
		}
	};

	const handleNavigate = () => {
		localStorage.removeItem("photo-series");
		setPhotoList([]);
		setColour([]);
		setText("");
		setHasTakenPhotos(false);
		setRetakePictures(true);
		window.location.href = "/camera";
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
				<DownloadPage handleNavigate={handleNavigate} />
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
						<ColourPicker />
						<TemplateContainer
							colourpicked={colour}
							ref={templateRef}
							saved={showColourPicker === false}
							className="container"
						>
							{images.map((img, idx) => (
								<React.Fragment key={idx}>
									<Image src={img} alt={`Captured ${idx + 1}`} />
								</React.Fragment>
							))}

							<div>
								<Input
									placeholder="add text here"
									onChange={handleChange}
									readOnly={showColourPicker === false && "readonly"}
								/>
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

const TemplateContainer = styled.div`
	width: 90vw;
	max-width: 320px;
	height: auto;
	max-height: 90vh;
	margin: 10px auto;
	padding: 5px 10px;
	border-radius: 3px;
	background-color: ${(props) => props.colourpicked};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow-y: auto;

	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media (max-width: ${theme.breakpoints.sm}) {
		width: 230px;
		height: 450px;
	}
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	margin-top: 8px;

	@media (max-width: ${theme.breakpoints.sm}) {
		height: 30%;
		width: 60%;
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
