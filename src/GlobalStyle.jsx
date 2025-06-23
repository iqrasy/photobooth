import { createGlobalStyle } from "styled-components";
import cursor from "./assets/cursor.png";
import background from "./assets/background.gif";

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'ppneuebit-bold';
    src: url('/fonts/ppneuebit-bold.otf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'PPMondwest-regular';
    src: url('/fonts/PPMondwest-regular.otf') format('truetype');
  font-weight: normal;
  font-style: normal;
}



    
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
     cursor: url("${cursor}"), auto;
}

body {
 height: 100vh;
 max-width: 100vw;
 margin: 0;
 background-color: #450920;
	/* background-image: url(${background});
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat; */
 cursor: url("${cursor}"), auto;
}


`;

export default GlobalStyle;
