import React, { Component } from 'react'
import AppRouter from './router/AppRouter';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './theme/globalStyle';

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <GlobalStyle />
                    <AppRouter />
                </div>
            </ThemeProvider>
        )
    }
}

export default App
