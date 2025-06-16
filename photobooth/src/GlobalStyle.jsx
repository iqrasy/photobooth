import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
 height: 100vh;
 max-width: 100vw;
 margin: 0;
font-family: "Inter", sans-serif;
}


`;

export default GlobalStyle;
