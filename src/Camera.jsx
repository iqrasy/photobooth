import { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { PhotoboothContext } from "./AppContext";
import { useNavigate } from "react-router";
import arrow from "./assets/right-arrow.png";
import Tooltip from "@mui/material/Tooltip";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { theme } from "./Theme";
import ImagesContainer from "./ImagesContainer";

gsap.registerPlugin(ScrollTrigger);

const Camera = () => {
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [countdown, setCountdown] = useState(5);
	const [isCountingDown, setIsCountingDown] = useState(false);
	const [stream, setStream] = useState(null);
	const {
		photoList,
		setPhotoList,
		retakePictures,
		setRetakePictures,
		hasTakenPhotos,
		setHasTakenPhotos,
	} = useContext(PhotoboothContext);
	const videoRef = useRef();

	const handleCameraPermission = async () => {
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: { ideal: "user" },
				},
				audio: false,
			});
			setStream(mediaStream);

			if (videoRef.current) {
				videoRef.current.srcObject = mediaStream;
				videoRef.current.play();
			}

			setIsCameraOpen(true);
		} catch (err) {
			console.error("Camera access denied or error:", err);
		}
	};

	const takePhoto = async () => {
		const photos = [];
		if (!videoRef.current) {
			return null;
		}

		for (let i = 0; i < 3; i++) {
			setIsCountingDown(true);
			for (let i = 5; i >= 1; i--) {
				setCountdown(i);
				await new Promise((res) => setTimeout(res, 1000));
			}
			setIsCountingDown(false);
			setCountdown(null);

			const canvas = document.createElement("canvas");
			canvas.width = videoRef.current.videoWidth;
			canvas.height = videoRef.current.videoHeight;

			const context = canvas.getContext("2d");
			context.translate(canvas.width, 0);
			context.scale(-1, 1);
			context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

			const imageData = canvas.toDataURL("image/png");

			photos.push(imageData);
			setPhotoList((prevPhotos) => {
				const updatedImage = [...prevPhotos, imageData];
				localStorage.setItem("photo-series", JSON.stringify(photos));

				return updatedImage;
			});
		}
		setHasTakenPhotos(true);
		setRetakePictures(true);
	};

	const navigate = useNavigate();
	const handleNextStep = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			if (videoRef.current) {
				videoRef.current.srcObject = null;
			}
		}
		setIsCameraOpen(false);
		navigate("/templates");
	};

	const handleRetake = () => {
		localStorage.removeItem("photo-series");
		setPhotoList([]);
		setHasTakenPhotos(false);
		setRetakePictures(true);
	};

	return (
		<>
			<Tooltip
				title="back to homepage"
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
				<ArrowImage src={arrow} onClick={() => navigate("/")} />
			</Tooltip>
			<MainContainer>
				{!isCameraOpen &&
					!hasTakenPhotos &&
					photoList.length === 0 &&
					!retakePictures && (
						<div className="container">
							<Button onClick={handleCameraPermission}>
								Allow permission to access camera?
							</Button>
						</div>
					)}
				{countdown && isCountingDown && (
					<CountDownButton>{countdown}</CountDownButton>
				)}
				<Container>
					<CameraContainer>
						<Video
							className="camera"
							ref={videoRef}
							autoPlay
							id="camera"
							iscameraopen={CSSMathValue.toString(isCameraOpen)}
						/>
						{photoList.length > 0 && <ImagesContainer />}
					</CameraContainer>
					<ButtonContainer>
						{isCameraOpen && <Buttons onClick={takePhoto}>start</Buttons>}
						{isCameraOpen && retakePictures && photoList.length >= 3 && (
							<Buttons onClick={handleRetake}>retake</Buttons>
						)}
						{photoList.length >= 3 && (
							<Buttons onClick={handleNextStep}>next</Buttons>
						)}
					</ButtonContainer>
				</Container>
			</MainContainer>
		</>
	);
};

export default Camera;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	height: 100vh;
	width: 100vw;
	font-family: "ppneuebit-bold";

	.container {
		pointer-events: auto;
	}
`;

const Button = styled.button`
	background-color: #e987aa;
	color: #ecece1;
	border: solid #ecece1 5px;
	padding: 10px;
	width: 100%;
	align-content: center;
	height: 55px;
	font-size: 25px;
	cursor: pointer;
	font-family: "ppneuebit-bold";
	transition: all 0.6s ease;

	&:hover {
		border-radius: 10px;
		background-color: #e987aa;
		transition: all 0.3s ease-in-out;
	}

	@media (max-width: ${theme.breakpoints.sm}) {
		font-size: 17px;
	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media (max-width: ${theme.breakpoints.sm}) {
		flex-direction: column;
	}
`;

const CameraContainer = styled.div`
	display: flex;

	@media (max-width: ${theme.breakpoints.sm}) {
		flex-direction: column;
	}
`;

const Video = styled.video.attrs(() => ({
	autoPlay: true,
	muted: true,
	playsInline: true,
}))`
	border-radius: 10px;
	width: 100%;
	max-width: 500px;
	height: auto;
	transform: scaleX(-1);
	display: ${({ iscameraopen }) => (iscameraopen ? "block" : "none")};

	@media (max-width: ${theme.breakpoints.sm}) {
		max-width: 300px;
	}
`;

const CountDownButton = styled.button`
	background-color: transparent;
	outline: none;
	color: #ecece1;
	padding: 10px;
	border: none;
	font-size: 40px;
	font-family: "ppneuebit-bold";
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
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
