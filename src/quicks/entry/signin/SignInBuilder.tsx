import * as React from "react";
import {Sink} from "../../../mvi";
import {EntryEvent} from "../EntryEvent";
import SignInCore from "./SignInCore";
import SignInUI from "./SignInUI";
import {QuicksClient2} from "../../common/remote/QuicksClient2";
import {mapTo} from "rxjs/operators";
import {instanceOf} from "prop-types";
import {SignInEvent} from "./SignInEvent";
import {QuicksClientEvent} from "../../common/remote/QuicksClientEvent";

class SignInBuilder {

    constructor(
        private entrySink: Sink<EntryEvent>,
        private quicksClient2: QuicksClient2
    ) {}

    public build() {

        let signInCore = new SignInCore();

        signInCore.effects.subscribe(e => {
            switch (e.kind) {
                case "sign-in":
                    this.quicksClient2.commands.accept(e);
                    break;
                case "sign-up":
                    this.entrySink.accept({
                        kind: "sign-up-clicked"
                    });
                    break;
            }
        });

        let filtered = this.quicksClient2.events.pipe(
            mapTo( (e: QuicksClientEvent) => {
                return e as SignInEvent
            })
        );




        this.quicksClient2.events.subscribe(e => {
            if (e.kind === "sign-in-failed") {
                signInCore.events.accept(e);
            }
        });

        return (
            <SignInUI events={signInCore.events} states={signInCore.states}> </SignInUI>
        );
    }

}

export default SignInBuilder;