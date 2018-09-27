import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css?family=Poiret+One');
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    * {
        box-sizing: border-box;
    }

    body {
        padding: 0;
        margin: 0;
        font-family: 'Roboto', sans-serif;
        font-size: 1rem;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: Poiret One,cursive;
        margin: 0;
        padding: 0;
    }

    .container {
        max-width: 1140px;
        margin: 0 auto;
    }
`

export const theme = {
    primary: '#6e27c5'
}
