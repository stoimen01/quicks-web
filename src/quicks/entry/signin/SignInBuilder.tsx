import * as React from "react";
import {Sink} from "../../../mvi";
import {EntryEvent} from "../EntryEvent";
import SignInCore from "./SignInCore";
import SignInHandler from "./SignInHandler";
import SignInUI from "./SignInUI";
import {QuicksEvent} from "../../Quicks";

class SignInBuilder {

    constructor(
        private entrySink: Sink<EntryEvent>,
        private quicksSink: Sink<QuicksEvent>
    ) {}

    public build() {
        let signUpCore = new SignInCore();
        let signUpHandler = new SignInHandler(
            signUpCore.effectsOut,
            signUpCore.eventsIn,
            this.entrySink,
            this.quicksSink
        );
        return (
            <SignInUI sink={signUpCore.eventsIn} source={signUpCore.statesOut}> </SignInUI>
        );
    }

}

export default SignInBuilder;