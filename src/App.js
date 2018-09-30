import React, { Component } from 'react'
import AppRouter from './router/AppRouter';
import GlobalStyle from './theme/globalStyle';

class App extends Component {
    render() {
        return (
            <div>
                <GlobalStyle>
                    <AppRouter />
                </GlobalStyle>
            </div>
        )
    }
}

export default App
