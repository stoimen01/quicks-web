import {EntryState, SignIn} from "./EntryState";
import {EntryEvent} from "./EntryEvent";
import {assertNever, Core, ReduceResult} from "../../mvi";
import EntryEffect from "./EntryEffect";

let initState: SignIn = {
    kind: "sign-in"
};

let reducer = (lastResult: ReduceResult<EntryState, EntryEffect>, event: EntryEvent) => {
    let result: ReduceResult<EntryState, EntryEffect>;
    switch (event.kind) {

        case "on-sign-in":
            result = {
                state: {kind: "sign-in"},
                effects: []
            };
            return result;

        case "on-sign-up":
            result = {
                state: {kind: "sign-up"},
                effects: []
            };
            return result;

        case "on-sign-in-success":
            result = {
                state: lastResult.state,
                effects: []
            };
            return result;

        case "on-sign-up-success":
            result = {
                state: lastResult.state,
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