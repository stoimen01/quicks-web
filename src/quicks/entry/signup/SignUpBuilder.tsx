import SignUpUI from "./SignUpUI";
import * as React from "react";
import SignUpCore from "./SignUpCore";
import SignUpHandler from "./SignUpHandler";
import {Sink} from "../../../mvi";
import {EntryEvent} from "../EntryEvent";

class SignUpBuilder {

    public static build(sink: Sink<EntryEvent>) {
        let signUpCore = new SignUpCore();
        let signUpHandler = new SignUpHandler(
            signUpCore.effectsOut,
            signUpCore.eventsIn,
            sink
        );
        return (
            <SignUpUI sink={signUpCore.eventsIn} source={signUpCore.statesOut}> </SignUpUI>
        );
    }

}

export default SignUpBuilder;