import {EntryEvent} from "./EntryEvent";
import {assertNever, Core, CoreResult} from "../../mvi";

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

let reducer = (lastResult: CoreResult<EntryState, EntryEffect>, event: EntryEvent) => {
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

class EntryCore extends Core<EntryState, EntryEvent, EntryEffect> {
    constructor() {
        super(initState, [], reducer)
    }
}

export default EntryCore;