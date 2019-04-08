import * as React from "react";
import {Sink} from "../../../mvi";
import {EntryEvent} from "../EntryEvent";
import SignInCore from "./SignInCore";
import SignInHandler from "./SignInHandler";
import SignInUI from "./SignInUI";

class SignInBuilder {

    public static build(sink: Sink<EntryEvent>) {
        let signUpCore = new SignInCore();
        let signUpHandler = new SignInHandler(
            signUpCore.effectsOut,
            signUpCore.eventsIn,
            sink
        );
        return (
            <SignInUI sink={signUpCore.eventsIn} source={signUpCore.statesOut}> </SignInUI>
        );
    }

}

export default SignInBuilder;