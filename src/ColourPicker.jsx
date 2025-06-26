import { useRef, useContext } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { PhotoboothContext } from "./AppContext";
import { useDebouncedCallback } from "use-debounce";
import "./styles.css";
import styled from "styled-components";

const ColourPicker = () => {
	const colourPickerRef = useRef(null);
	const { showColourPicker, colour, setColour } = useContext(PhotoboothContext);

	const debouncedSetColour = useDebouncedCallback((color) => {
		setColour(color);
	}, 50);

	return (
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
	);
};

export default ColourPicker;

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
