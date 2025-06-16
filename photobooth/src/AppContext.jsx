import { createContext, useContext, useState } from "react";

const PhotoboothContext = createContext();

const PhotoContext = ({ children }) => {
	const [colour, setColour] = useState("ffffff");
	const [text, setText] = useState("");

	const value = {
		colour,
		setColour,
		text,
		setText,
	};

	return (
		<PhotoboothContext.Provider value={value}>
			{children}
		</PhotoboothContext.Provider>
	);
};
const usePhotobooth = () => useContext(PhotoboothContext);

export { PhotoboothContext, usePhotobooth };
export default PhotoContext;
