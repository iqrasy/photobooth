import { Route, Routes, BrowserRouter } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Home from "./Home";
import Templates from "./Templates";
import Camera from "./Camera";
import { StyleSheetManager } from "styled-components";
import { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";

const App = () => {
	const [isAppLoading, setIsAppLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsAppLoading(false);
		}, 5000);

		return () => clearTimeout(timeout);
	}, []);
	return (
		<BrowserRouter>
			<StyleSheetManager shouldForwardProp={(prop) => prop}>
				<GlobalStyle />
				{isAppLoading ? (
					<LoadingPage />
				) : (
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/camera" element={<Camera />} />
						<Route path="/templates" element={<Templates />} />
					</Routes>
				)}
			</StyleSheetManager>
		</BrowserRouter>
	);
};

export default App;
