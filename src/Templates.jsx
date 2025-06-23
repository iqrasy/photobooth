import styled from "styled-components";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useState, useContext, useRef } from "react";
import "./styles.css";
import { PhotoboothContext } from "./AppContext";
import html2canvas from "html2canvas";
import { gsap } from "gsap";

import { Draggable } from "gsap/Draggable";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(
	Draggable,
	ScrambleTextPlugin,
	ScrollTrigger,
	ScrollToPlugin,
	SplitText
);

const Templates = () => {
	const [showColourPicker, setShowColourPicker] = useState(true);
	const [download, setDownload] = useState(false);
	// const [disabled, setDisabled] = useState(false);
	const { colour, setColour, setText } = useContext(PhotoboothContext);
	const images = JSON.parse(localStorage.getItem("photo-series") || "[]");
	const templateRef = useRef();

	const handleSave = () => {
		setShowColourPicker(false);
		setDownload(true);

		// if (!colour) setDisabled(true);
	};

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleDownload = async () => {
		if (!templateRef.current) return;

		const canvas = await html2canvas(templateRef.current, {
			useCORS: true,
			scale: 3,
		});

		const imgData = canvas.toDataURL("image/png");

		const link = document.createElement("a");
		link.href = imgData;
		link.download = "photobooth-printout.png";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<>
			{!showColourPicker ? (
				<Header>DOWNLOAD YOUR TEMPLATE</Header>
			) : (
				<Header>BUILD YOUR TEMPLATE</Header>
			)}

			<MainContainer>
				<ColourPickerContainer>
					{showColourPicker && (
						<>
							<section className="custom-layout example">
								<HexColorPicker
									color={colour}
									onChange={setColour}
									placeholder="Type a color"
								/>
							</section>
							<HexColorInput
								id={colour}
								name={colour}
								color={colour}
								onChange={setColour}
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
					<Buttons onClick={handleDownload}>Download Printout</Buttons>
				) : (
					<Buttons onClick={handleSave}> save & continue</Buttons>
				)}
			</ButtonContainer>
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
	gap: 50px;
`;

const Header = styled.h1`
	font-family: "PPMondwest-regular";
	color: #e987aa;
	text-align: center;
	margin: 50px;
	font-size: 50px;
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
	height: 720px;
	margin: 10px 0;
	padding: 5px 10px;
	background-color: ${(props) => props.colourpicked || "#0b0a0a"};
	border-radius: 3px;
	transition: all 0.5s ease-in-out;

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 5px;
	}

	&:hover {
		transform: ${(props) => (props.saved ? "rotate(-7deg)" : null)};
	}
`;

const ImageContainer = styled.div`
	background-color: #d6d6d6;
	height: 200px;
	margin: 5px 0px;
	border-radius: 3px;
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
	color: white;
	font-size: 25px;
	font-family: "ppneuebit-bold";

	&::placeholder {
		color: white;
	}
`;

const Buttons = styled.button`
	background-color: #ecece1;
	color: #1b1c19;
	border: solid #1b1c19 1px;
	font-size: 20px;
	padding: 10px;
	margin: 10px 0;
	font-family: "ppneuebit-bold";
	/* cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")}; */
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 20px;
`;
