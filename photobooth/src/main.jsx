import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import PhotoContext from "./AppContext.jsx";

createRoot(document.getElementById("root")).render(
	<PhotoContext>
		<App />
	</PhotoContext>
);
