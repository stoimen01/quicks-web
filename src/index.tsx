import React from 'react';
import ReactDOM from 'react-dom';
import Quicks, {QuicksCore} from './quicks/Quicks';
import {CssBaseline} from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {EntryBuilder} from "./quicks/entry/EntryBuilder";

const theme = createMuiTheme({
    /*palette: {
        primary: purple,
        secondary: green,
    },*/
    typography: {
        useNextVariants: true,
    },
});

function MyApp() {
    let core = new QuicksCore();
    let entryBuilder = new EntryBuilder(core.eventsIn);
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Quicks source={core.statesOut} sink={core.eventsIn} entryBuilder={entryBuilder}/>
        </MuiThemeProvider>
    );
}

ReactDOM.render(MyApp(), document.getElementById('root'));