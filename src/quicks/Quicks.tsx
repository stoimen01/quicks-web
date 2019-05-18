import {assertNever, Core, CoreResult, Shell} from "../mvi";
import {Entry, QuicksState} from "./QuicksState";
import {QuicksEvent} from "./QuicksEvent";
import entryBuilderOf from "./entry/Entry";
import QuicksUI from "./QuicksUI";
import React from "react";
import {QuicksClient} from "./common/remote/rest/QuicksClient";
import indoorBuilderOf from "./indoor/Indoor";
import {WsClient} from "./common/remote/ws/WsClient";

interface QuicksEffect {
}

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
        case "signed-up":
            result = {
                state: {
                    kind: "indoor",
                    token: event.token,
                    wsUrl: event.wsUrl
                },
                effects: []
            };
            return result;
        default:
            return assertNever(event)
    }
};

class QuicksShell extends Shell<QuicksState, QuicksEvent, QuicksEffect> {

    constructor(
        quicksClient: QuicksClient,
        initResult: CoreResult<QuicksState, QuicksEffect>,
        core: Core<QuicksState, QuicksEvent, QuicksEffect>
    ) {
        super(initResult, core);
        let sub = quicksClient.events.subscribe(e => {
            switch (e.kind) {
                case "signed-up":
                case "signed-in":
                    this.events.accept(e);
                    break;
            }
        });
        this.subs.add(sub);
    }

    protected onEffect(e: QuicksEffect): void {
    }

}

const quicksBuilderOf = (quicksClient: QuicksClient, wsClient: WsClient) => () => {
    let shell = new QuicksShell(quicksClient, initResult, quicksCore);
    return (
        <QuicksUI
            states={shell.states}
            events={shell.events}
            buildEntry={entryBuilderOf(quicksClient)}
            buildIndoor={indoorBuilderOf(wsClient)}
        />
    );
};


export default quicksBuilderOf;