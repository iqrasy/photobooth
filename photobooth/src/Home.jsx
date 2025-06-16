import Camera from "./Camera";
import styled from "styled-components";
import { useNavigate } from "react-router";

const Home = () => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate("/templates");
	};

	return (
		<MainContainer>
			<h1>Photobooth</h1>
			<p>Welcome to photobooth</p>
			<button onClick={handleNavigate}>start taking pictures</button>
			{/* <Camera /> */}
		</MainContainer>
	);
};

export default Home;

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
