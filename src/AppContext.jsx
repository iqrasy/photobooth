import { createContext, useContext, useState } from "react";

const PhotoboothContext = createContext();

const PhotoContext = ({ children }) => {
	const [colour, setColour] = useState("0b0a0a");
	const [text, setText] = useState("");
	const [photoList, setPhotoList] = useState([]);

	const value = {
		colour,
		setColour,
		text,
		setText,
		photoList,
		setPhotoList,
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
