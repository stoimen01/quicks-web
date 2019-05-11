import SignUpUI from "./SignUpUI";
import * as React from "react";
import SignUpCore from "./SignUpCore";
import SignUpHandler from "./SignUpHandler";
import {Sink} from "../../../mvi";
import {EntryEvent} from "../EntryEvent";
import {QuicksEvent} from "../../Quicks";

class SignUpBuilder {

    constructor(
        private entrySink: Sink<EntryEvent>,
        private quicksSink: Sink<QuicksEvent>
    ) {}

    public build() {
        let signUpCore = new SignUpCore();
        let signUpHandler = new SignUpHandler(
            signUpCore.effectsOut,
            signUpCore.eventsIn,
            this.entrySink,
            this.quicksSink
        );
        return (
            <SignUpUI sink={signUpCore.eventsIn} source={signUpCore.statesOut}> </SignUpUI>
        );
    }

}

export default SignUpBuilder;