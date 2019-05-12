import {assertNever, Core, CoreResult} from "../mvi";
import {Entry, QuicksState} from "./QuicksState";
import {openConnection, QuicksEffect} from "./QuicksEffect";
import {QuicksEvent} from "./QuicksEvent";

const initState: Entry = {
    kind: "entry"
};

const reducer = (lastResult: CoreResult<QuicksState, QuicksEffect>, event: QuicksEvent) => {
    let result: CoreResult<QuicksState, QuicksEffect>;
    switch (event.kind) {
        case "signed-in":
            result = {
                state: {
                    kind: "indoor",
                    token: event.token
                },
                effects: [openConnection()]
            };
            return result;
        case "signed-up":
            result = {
                state: {
                    kind: "indoor",
                    token: event.token
                },
                effects: [openConnection()]
            };
            return result;
        default:
            return assertNever(event)
    }
};

export class QuicksCore extends Core<QuicksState, QuicksEvent, QuicksEffect> {
    constructor() {
        super(initState, [], reducer)
    }
}