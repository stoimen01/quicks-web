import EntryCore from "./EntryCore";
import SignInBuilder from "./signin/SignInBuilder";
import SignUpBuilder from "./signup/SignUpBuilder";
import EntryUI from "./EntryUI";
import React from "react";
import {QuicksClient2} from "../common/remote/QuicksClient2";

export class EntryBuilder {

    constructor(
        private quicksClient: QuicksClient2
    ){}

    build() {
        let entryCore = new EntryCore();
        let signInBuilder = new SignInBuilder(entryCore.events, this.quicksClient);
        let signUpBuilder = new SignUpBuilder(entryCore.events, this.quicksClient);

        return (
            <EntryUI
                events={entryCore.events}
                states={entryCore.states}
                signInBuilder={signInBuilder}
                signUpBuilder={signUpBuilder}>
            </EntryUI>);
    }
}