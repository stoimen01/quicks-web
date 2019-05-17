import {assertNever, Core, CoreResult, Shell} from "../mvi";
import {Entry, QuicksState} from "./QuicksState";
import {openConnection, QuicksEffect} from "./QuicksEffect";
import {QuicksEvent} from "./QuicksEvent";
import entryBuilderOf from "./entry/Entry";
import QuicksUI from "./QuicksUI";
import React from "react";
import {QuicksClient2} from "./common/remote/QuicksClient2";
import indoorBuilderOf from "./indoor/Indoor";

const initState: Entry = {
    kind: "entry"
};

const initResult = {
    state: initState,
    effects: []
};

const quicksCore = (lastResult: CoreResult<QuicksState, QuicksEffect>, event: QuicksEvent) => {
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

class QuicksShell extends Shell<QuicksState, QuicksEvent, QuicksEffect> {

    constructor(
        quicksClient: QuicksClient2,
        initResult: CoreResult<QuicksState, QuicksEffect>,
        core: Core<QuicksState, QuicksEvent, QuicksEffect>
    ) {
        super(initResult, core);
        let sub = quicksClient.events.subscribe(e => {
            switch (e.kind) {
                case "signed-up":
                    this.events.accept(e);
                    break;
                case "signed-in":
                    this.events.accept(e);
                    break;
            }
        });
        this.sub.add(sub);
    }

    protected onEffect(effect: QuicksEffect): void {
    }
}

const quicksBuilderOf = (quicksClient: QuicksClient2) => () => {
    let shell = new QuicksShell(quicksClient, initResult, quicksCore);
    return (
        <QuicksUI
            states={shell.states}
            events={shell.events}
            buildEntry={entryBuilderOf(quicksClient)}
            buildIndoor={indoorBuilderOf()}
        />
    );
};


export default quicksBuilderOf;