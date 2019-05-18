import {EntryEvent} from "./EntryEvent";
import {assertNever, Core, CoreResult, Shell} from "../../mvi";
import {QuicksClient} from "../common/remote/rest/QuicksClient";
import EntryUI from "./EntryUI";
import signInBuilderOf from "./signin/SignIn";
import signUpBuilderOf from "./signup/SignUp";
import React from "react";

interface EntryEffect {
}

/* STATE */
export interface SignIn {
    kind: "sign-in"
}

export interface SignUp {
    kind: "sign-up"
}

export type EntryState = SignIn | SignUp

let initState: SignIn = {
    kind: "sign-in"
};

let initResult = {
    state: initState,
    effects: []
};

let entryCore = (lastResult: CoreResult<EntryState, EntryEffect>, event: EntryEvent) => {
    let result: CoreResult<EntryState, EntryEffect>;
    switch (event.kind) {

        case "sign-in-clicked":
            result = {
                state: {kind: "sign-in"},
                effects: []
            };
            return result;

        case "sign-up-clicked":
            result = {
                state: {kind: "sign-up"},
                effects: []
            };
            return result;

        default:
            return assertNever(event);
    }
};

class EntryShell extends Shell<EntryState, EntryEvent, EntryEffect> {

    constructor(
        initResult: CoreResult<EntryState, EntryEffect>,
        core: Core<EntryState, EntryEvent, EntryEffect>
    ) {
        super(initResult, core)
    }

    protected onEffect(effect: EntryEffect): void {
    }

}

const entryBuilderOf = (quicksClient: QuicksClient) => {
    return () => {
        let entryShell = new EntryShell(initResult, entryCore);
        return (
            <EntryUI
                events={entryShell.events}
                states={entryShell.states}
                buildSignIn={signInBuilderOf(entryShell.events, quicksClient)}
                buildSignUp={signUpBuilderOf(entryShell.events, quicksClient)}>
            </EntryUI>
        );
    }
};

export default entryBuilderOf;