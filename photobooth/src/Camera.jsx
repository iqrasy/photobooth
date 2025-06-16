import { useRef, useState } from "react";
import styled from "styled-components";

const Camera = () => {
	const [isCameraOpen, setIsCameraOpen] = useState(false);
	const [stream, setStream] = useState(null);
	const [capturedPhoto, setCapturedPhoto] = useState(null);
	const videoRef = useRef();

	const handleCameraPermission = async () => {
		try {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: true,
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

	const handleCloseCamera = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			if (videoRef.current) {
				videoRef.current.srcObject = null;
			}
		}

		setIsCameraOpen(false);
	};

	const handleTakePhoto = async () => {
		if (!videoRef.current) {
			return;
		}

		const canvas = document.createElement("canvas");
		canvas.width = videoRef.current.videoWidth;
		canvas.height = videoRef.current.videoHeight;

		const context = canvas.getContext("2d");
		context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

		const imageData = canvas.toDataURL("image/png");
		setCapturedPhoto(imageData);
		localStorage.setItem("image taken", imageData);
		// const savedImage = localStorage.getItem("image taken");
	};

	return (
		<MainContainer>
			{!isCameraOpen && (
				<div>
					<button onClick={handleCameraPermission}>
						Allow permission to access camera?
					</button>
				</div>
			)}
			{isCameraOpen ? <button onClick={handleCloseCamera}>X</button> : null}

			<video
				ref={videoRef}
				autoPlay
				id="camera"
				style={{
					transform: "scaleX(-1)",
					display: isCameraOpen ? "block" : "none",
					width: "100%",
					maxWidth: "500px",
					height: "auto",
				}}
			/>
			{isCameraOpen && <button onClick={handleTakePhoto}>Take photo</button>}
			{capturedPhoto && (
				<img src={capturedPhoto} alt="Captured" style={{ maxWidth: "100%" }} />
			)}
		</MainContainer>
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
`;
