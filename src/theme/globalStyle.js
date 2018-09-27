import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from './theme'

const Style = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css?family=Poiret+One');
    @import url('https://fonts.googleapis.com/css?family=Roboto');

    * {
        box-sizing: border-box;
    }

    body {
        padding: 0;
        margin: 0;
        font-family: ${props => props.theme.normalFont};
        font-size: 1rem;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: ${props => props.theme.titleFont};
        margin: 0;
        padding: 0;
    }

    .container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }

      @media (min-width: 768px) {
        .container {
          width: 750px;
        }
    }

      @media (min-width: 992px) {
        .container {
          width: 970px;
        }
    }

      @media (min-width: 1200px) {
        .container {
          width: 1170px;
        }
    }

    .ant-list-item-meta-title {
        color: #000 !important;
        margin-bottom: 4px;
        font-size: 14px;
        line-height: 22px;
        font-weight: 700;
    }
`

const GlobalStyle = () => {
    return (
        <ThemeProvider theme={theme}>
            <Style />
        </ThemeProvider>
    )
}

export default GlobalStyle
