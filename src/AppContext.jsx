import { createContext, useState } from "react";

const PhotoboothContext = createContext();

const PhotoContext = ({ children }) => {
	const [colour, setColour] = useState("0b0a0a");
	const [text, setText] = useState("");
	const [photoList, setPhotoList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [retakePictures, setRetakePictures] = useState(false);
	const [hasTakenPhotos, setHasTakenPhotos] = useState(false);

	const value = {
		colour,
		setColour,
		text,
		setText,
		photoList,
		setPhotoList,
		isLoading,
		setIsLoading,
		retakePictures,
		setRetakePictures,
		hasTakenPhotos,
		setHasTakenPhotos,
	};

	return (
		<PhotoboothContext.Provider value={value}>
			{children}
		</PhotoboothContext.Provider>
	);
};

export { PhotoboothContext };
export default PhotoContext;
