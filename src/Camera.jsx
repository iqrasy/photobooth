import { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { PhotoboothContext } from "./AppContext";
import { useNavigate } from "react-router";
import arrow from "./assets/right-arrow.png";
import Tooltip from "@mui/material/Tooltip";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Camera = () => {
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [countdown, setCountdown] = useState(5);
	const [isCountingDown, setIsCountingDown] = useState(false);
	const [hasTakenPhotos, setHasTakenPhotos] = useState(false);
	const [stream, setStream] = useState(null);
	const { photoList, setPhotoList } = useContext(PhotoboothContext);
	const videoRef = useRef();

	const handleCameraPermission = async () => {
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: true,
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

	// const handleCloseCamera = () => {
	// 	if (stream) {
	// 		stream.getTracks().forEach((track) => track.stop());
	// 		if (videoRef.current) {
	// 			videoRef.current.srcObject = null;
	// 			setIsCameraOpen(false);
	// 		}
	// 		setIsCameraOpen(false);
	// 	}

	// 	setIsCameraOpen(false);
	// };

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
				{!isCameraOpen && !hasTakenPhotos && (
					<div>
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
							ref={videoRef}
							autoPlay
							id="camera"
							iscameraopen={CSSMathValue.toString(isCameraOpen)}
						/>
						<ButtonContainer>
							{isCameraOpen && <Buttons onClick={takePhoto}>start</Buttons>}
							{photoList.length > 0 && (
								<Buttons onClick={handleNextStep}>next</Buttons>
							)}
						</ButtonContainer>
					</CameraContainer>
					{photoList.length > 0 && (
						<>
							<CapturedImagesContainer>
								{photoList.map((photo, index) => (
									<CapturedImages
										key={index}
										src={photo}
										alt={`Captured ${index + 1}`}
									/>
								))}
							</CapturedImagesContainer>
						</>
					)}
				</Container>
			</MainContainer>
		</>
	);
};

export default Camera;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	font-family: "ppneuebit-bold";
`;

const Button = styled.button`
	background-color: #ecece1;
	color: #1b1c19;
	border: solid #1b1c19 1px;
	padding: 10px;
	width: 100%;
	align-content: center;
	height: 55px;
	font-size: 20px;
	cursor: pointer;
	font-family: "ppneuebit-bold";
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
`;

const CameraContainer = styled.div``;

const Video = styled.video`
	border-radius: 10px;
	width: 100%;
	max-width: 500px;
	height: auto;
	transform: scaleX(-1);
	display: ${({ iscameraopen }) => (iscameraopen ? "block" : "none")};
`;

const CountDownButton = styled.button`
	background-color: transparent;
	outline: none;
	color: #e987aa;
	padding: 10px;
	border: none;
	font-size: 20px;
`;

const CloseButton = styled.button`
	background-color: #ecece1;
	color: #1b1c19;
	border: solid #1b1c19 1px;
	padding: 10px;
	margin: 10px 0;
	width: 50px;
	float: left;
`;

const CapturedImagesContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: auto;
	pointer-events: none;
`;

const CapturedImages = styled.img`
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
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Buttons = styled.button`
	background-color: #ecece1;
	color: #1b1c19;
	border: solid #1b1c19 1px;
	font-size: 20px;
	padding: 10px 20px;
	margin: 10px 5px;
	font-family: "ppneuebit-bold";
	cursor: pointer;
`;

const ArrowImage = styled.img`
	transform: rotate(180deg);
	height: 70px;
	margin: 40px;
	cursor: pointer;
`;
