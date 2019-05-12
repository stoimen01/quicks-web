import SignUpUI from "./SignUpUI";
import * as React from "react";
import SignUpCore from "./SignUpCore";
import {Sink} from "../../../mvi";
import {EntryEvent} from "../EntryEvent";
import {QuicksClient2} from "../../common/remote/QuicksClient2";

class SignUpBuilder {

    constructor(
        private entrySink: Sink<EntryEvent>,
        private quicksClient2: QuicksClient2
    ) {}

    public build() {

        let signUpCore = new SignUpCore();

        signUpCore.effects.subscribe(e => {
            switch (e.kind) {
                case "sign-in":
                    this.entrySink.accept({
                        kind: "sign-in-clicked"
                    });
                    break;
                case "sign-up":
                    this.quicksClient2.commands.accept(e);
                    break;
            }
        });

        this.quicksClient2.events.subscribe(e => {
            if (e.kind === "sign-up-failed") {
                signUpCore.events.accept(e);
            }
        });

        return (
            <SignUpUI events={signUpCore.events} states={signUpCore.states}> </SignUpUI>
        );
    }

}

export default SignUpBuilder;