import {assertNever, Core, CoreResult, Shell, Sink} from "../../../mvi";
import {SignInEvent} from "./SignInEvent";
import {SignInEffect} from "./SignInEffects";
import {SignInState} from "./SignInState";
import {EntryEvent} from "../EntryEvent";
import {QuicksClient2} from "../../common/remote/QuicksClient2";
import SignInUI from "./SignInUI";
import * as React from "react";

const initResult = {
    state: {
        isLoading: false,
        email: "",
        password: ""
    },
    effects: []
};

const signInCore = (lastResult: CoreResult<SignInState, SignInEffect>, event: SignInEvent) => {
    let result: CoreResult<SignInState, SignInEffect>;
    let { state: lastState } = lastResult;
    switch (event.kind) {

        case "sign-in-clicked":
            result = {
                state: { ...lastState, isLoading: true },
                effects: [{
                    kind: "sign-in",
                    email: lastResult.state.email,
                    password: lastResult.state.password
                }]
            };
            return result;

        case "sign-up-clicked":
            result = {
                state: lastResult.state,
                effects: [{
                    kind: "sign-up"
                }]
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

        case "sign-in-failed":
            result = {
                state: { ...lastState, isLoading: false },
                effects: []
            };
            return result;

        default: return assertNever(event);
    }
};

class SignInShell extends Shell<SignInState, SignInEvent, SignInEffect> {

    constructor(
        private entrySink: Sink<EntryEvent>,
        private quicksClient2: QuicksClient2,
        initResult: CoreResult<SignInState, SignInEffect>,
        core: Core<SignInState, SignInEvent, SignInEffect>
    ) {
        super(initResult, core);
        let sub = quicksClient2.events.subscribe(e => {
            if (e.kind === "sign-in-failed") {
                this.events.accept(e);
            }
        });
        this.sub.add(sub);
    }

    onEffect(e: SignInEffect): void {
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
    }
}

let signInBuilderOf = (entrySink: Sink<EntryEvent>, quicksClient2: QuicksClient2) => {
    return () => {
        let signInShell = new SignInShell(entrySink, quicksClient2, initResult, signInCore);
        return <SignInUI events={signInShell.events} states={signInShell.states}> </SignInUI>
    }
};

export default signInBuilderOf;
