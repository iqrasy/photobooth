import { useContext } from "react";
import { PhotoboothContext } from "./AppContext";
import styled from "styled-components";
import { theme } from "./Theme";

const DownloadPage = ({ handleNavigate }) => {
	const { downloadComplete } = useContext(PhotoboothContext);

	return (
		<DownloadContainer>
			<div>
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
			</div>
			{downloadComplete && (
				<ButtonContainer>
					<Buttons onClick={handleNavigate}>take more pictures</Buttons>
				</ButtonContainer>
			)}
		</DownloadContainer>
	);
};

export default DownloadPage;

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
	text-align: center;

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
