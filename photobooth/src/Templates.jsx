import styled from "styled-components";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useContext } from "react";
import "./styles.css";
import { useNavigate } from "react-router";
import { PhotoboothContext } from "./AppContext";

const Templates = () => {
	const { colour, setColour, text, setText } = useContext(PhotoboothContext);
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate("/camera");
		console.log(colour);
		console.log(text);
	};
	const handleChange = (e) => {
		setText(e.target.value);
	};

	return (
		<MainContainer>
			<p>Build your photo template</p>
			<div>
				<section className="custom-layout example">
					<HexColorPicker
						color={colour}
						onChange={setColour}
						placeholder="Type a color"
					/>
				</section>
				<HexColorInput color={colour} onChange={setColour} prefixed />
				<TemplateContainer colour={colour}>
					<div className="container">
						<ImageContainer></ImageContainer>
						<ImageContainer></ImageContainer>
						<ImageContainer></ImageContainer>
						<div>
							<Input placeholder="add text here" onChange={handleChange} />
						</div>
					</div>
				</TemplateContainer>
			</div>
			<button onClick={handleNavigate}> save & continue</button>
		</MainContainer>
	);
};

export default Templates;

const MainContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: 10px;
`;

const TemplateContainer = styled.div`
	width: 300px;
	height: 690px;
	margin: 10px 0;
	padding: 10px;
	background-color: ${(props) => props.colour};
	border-radius: 3px;

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 13px;
	}
`;

const ImageContainer = styled.div`
	background-color: #d6d6d6;
	height: 180px;
	margin: 5px 13px;
	border-radius: 3px;
`;

const Input = styled.input`
	width: auto;
	border-radius: 4px;
	height: 45px;
	border: none;
	margin: 5px 13px;
	background-color: transparent;
	text-align: center;
	width: 91%;
	color: white;
	font-size: 25px;
`;
