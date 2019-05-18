import React from 'react';
import ReactDOM from 'react-dom';
import {CssBaseline} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {QuicksClientImpl} from "./quicks/common/remote/rest/QuicksClientImpl";
import quicksBuilderOf from "./quicks/Quicks";
import {WsClientImpl} from "./quicks/common/remote/ws/WsClientImpl";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

function buildQuicks() {

    let quicksClient = new QuicksClientImpl({
        signUpUrl: "/signup",
        signInUrl: "/signin"
    });

    let wsClient = new WsClientImpl();

    let quicksBuilder = quicksBuilderOf(quicksClient, wsClient);
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {quicksBuilder()}
        </MuiThemeProvider>
    );
}

ReactDOM.render(buildQuicks(), document.getElementById('root'));