import React from 'react';
import ReactDOM from 'react-dom';
import Quicks from './quicks/Quicks';
import {CssBaseline} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {EntryBuilder} from "./quicks/entry/EntryBuilder";
import {QuicksCore} from "./quicks/QuicksCore";
import {QuicksClientImpl} from "./quicks/common/remote/QuicksClientImpl";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

function buildQuicks() {

    let client2 = new QuicksClientImpl({
        signUpUrl: "/signup",
        signInUrl: "/signin"
    });

    let core = new QuicksCore();

    client2.events.subscribe(e => {
        switch (e.kind) {
            case "signed-up":
                core.events.accept(e);
                break;
            case "signed-in":
                core.events.accept(e);
                break;
        }
    });

    let entryBuilder = new EntryBuilder(client2);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Quicks states={core.states} events={core.events} entryBuilder={entryBuilder}/>
        </MuiThemeProvider>
    );
}

ReactDOM.render(buildQuicks(), document.getElementById('root'));