import React, { useContext } from "react";
import { PhotoboothContext } from "./AppContext";
import styled from "styled-components";
import { theme } from "./Theme";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImagesContainer = () => {
	const { photoList } = useContext(PhotoboothContext);
	return (
		<CapturedImagesContainer>
			{photoList.map((photo, index) => (
				<CapturedImages key={index} src={photo} alt={`Captured ${index + 1}`} />
			))}
		</CapturedImagesContainer>
	);
};

export default ImagesContainer;

const CapturedImagesContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: auto;
	pointer-events: none;

	@media (max-width: ${theme.breakpoints.sm}) {
		flex-direction: row;
	}
`;

const CapturedImages = styled(LazyLoadImage)`
	width: 150px;
	border-radius: 5px;
	border: solid #1b1c19 1px;
	margin: 5px 20px;
	animation: myAnim 0.5s ease 0s 1 normal forwards;

	@keyframes myAnim {
		0% {
			transform: scale(0);
		}

		100% {
			transform: scale(1);
		}
	}

	@media (max-width: ${theme.breakpoints.sm}) {
		width: 90px;
		margin: 6px;
	}
`;
