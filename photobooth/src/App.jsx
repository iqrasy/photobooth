import { Route, Routes, BrowserRouter } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Home from "./Home";
import Templates from "./Templates";
import Camera from "./Camera";

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/templates" element={<Templates />} />
				<Route path="/camera" element={<Camera />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
