import EntryCore from "./EntryCore";
import SignInBuilder from "./signin/SignInBuilder";
import SignUpBuilder from "./signup/SignUpBuilder";
import {QuicksEvent} from "../Quicks";
import {Sink} from "../../mvi";
import EntryUI from "./EntryUI";
import React from "react";

export class EntryBuilder {

    constructor(
        private quicksSink: Sink<QuicksEvent>
    ){}

    build() {
        let entryCore = new EntryCore();
        let signInBuilder = new SignInBuilder(entryCore.eventsIn, this.quicksSink);
        let signUpBuilder = new SignUpBuilder(entryCore.eventsIn, this.quicksSink);
        return (
            <EntryUI
                sink={entryCore.eventsIn}
                source={entryCore.statesOut}
                signInBuilder={signInBuilder}
                signUpBuilder={signUpBuilder}>
            </EntryUI>);
    }
}