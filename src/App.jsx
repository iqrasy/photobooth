import { Route, Routes, BrowserRouter } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Home from "./Home";
import Templates from "./Templates";
import Camera from "./Camera";
import { StyleSheetManager } from "styled-components";

const App = () => {
	return (
		<BrowserRouter>
			<StyleSheetManager shouldForwardProp={(prop) => prop}>
				<GlobalStyle />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/camera" element={<Camera />} />
					<Route path="/templates" element={<Templates />} />
				</Routes>
			</StyleSheetManager>
		</BrowserRouter>
	);
};

export default App;
