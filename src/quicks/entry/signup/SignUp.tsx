import {assertNever, Core, CoreResult, Shell, Sink} from "../../../mvi";
import {SignUpEvent} from "./SignUpEvent";
import {SignUpState} from "./SignUpState";
import {SignUpEffect} from "./SignUpEffect";
import {EntryEvent} from "../EntryEvent";
import {QuicksClient2} from "../../common/remote/QuicksClient2";
import * as React from "react";
import SignUpUI from "./SignUpUI";

let initResult = {
    state: {
        isLoading: false,
        username: "",
        email: "",
        password: ""
    },
    effects: []
};

let signUpCore = (lastResult: CoreResult<SignUpState, SignUpEffect>, event: SignUpEvent) => {
    let result: CoreResult<SignUpState, SignUpEffect>;
    let { state: lastState } = lastResult;
    switch (event.kind) {

        case "sign-in-clicked":
            result = {
                state: lastState,
                effects: [{
                    kind: "sign-in"
                }]
            };
            return result;

        case "sign-up-clicked":
            result = {
                state: { ...lastState, isLoading: true },
                effects: [{
                    kind: "sign-up",
                    username: lastState.username,
                    email: lastState.email,
                    password: lastState.password
                }]
            };
            return result;

        case "name-changed":
            result = {
                state: { ...lastState, username: event.username },
                effects: []
            };
            return result;

        case "email-changed":
            result = {
                state: { ...lastState, email: event.email },
                effects: []
            };
            return result;

        case "password-changed":
            result = {
                state: { ...lastState, password: event.password },
                effects: []
            };
            return result;

        case "sign-up-failed":
            result = {
                state: { ...lastState, isLoading: false },
                effects: []
            };
            return result;

        default: return assertNever(event);
    }
};

class SignUpShell extends Shell <SignUpState, SignUpEvent, SignUpEffect> {

    constructor(
        private entrySink: Sink<EntryEvent>,
        private quicksClient2: QuicksClient2,
        initResult: CoreResult<SignUpState, SignUpEffect>,
        core: Core<SignUpState, SignUpEvent, SignUpEffect>
    ) {
        super(initResult, core);
        let sub = this.quicksClient2.events.subscribe(e => {
            if (e.kind === "sign-up-failed") {
                this.events.accept(e);
            }
        });
        this.sub.add(sub);
    }

    onEffect(e: SignUpEffect): void {
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
    }
}

let signUpBuilderOf = (entrySink: Sink<EntryEvent>, quicksClient2: QuicksClient2) => {
    return () => {
        let signUpShell = new SignUpShell(entrySink, quicksClient2, initResult, signUpCore);
        return <SignUpUI events={signUpShell.events} states={signUpShell.states}> </SignUpUI>
    }

};

export default signUpBuilderOf;
