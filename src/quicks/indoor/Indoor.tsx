import {assertNever, Core, CoreResult, Shell, Source} from "../../mvi";
import {IndoorEvent} from "./IndoorEvent";
import {IndoorState} from "./IndoorState";
import {IndoorEffect} from "./IndoorEffect";
import IndoorUI from "./IndoorUI";
import React from "react";
import {WsAgent} from "../common/remote/ws/WsAgent";
import {WsAgentState} from "../common/remote/ws/WsAgentState";

const initState: IndoorState = {
    kind: 'connecting'
};

const initEffect: IndoorEffect = {
    kind: "connect"
};

const initResult = {
    state: initState,
    effects: [initEffect]
};

const indoorCore = (lastResult: CoreResult<IndoorState, IndoorEffect>, event: IndoorEvent) => {
    let result: CoreResult<IndoorState, IndoorEffect>;
    switch (event.kind) {

        case "sign-out-clicked":
            return lastResult;

        case "connected":
            result = {
                state: {
                    kind: "connected"
                },
                effects: []
            };
            return result;

        case "connecting":
            result = {
                state: {
                    kind: "connecting"
                },
                effects: []
            };
            return result;
    }
};

class IndoorShell extends Shell<IndoorState, IndoorEvent, IndoorEffect> {

    constructor(
        wsStates: Source<WsAgentState>,
        initResult: CoreResult<IndoorState, IndoorEffect>,
        indoorCore: Core<IndoorState, IndoorEvent, IndoorEffect>,
    ) {
        super(initResult, indoorCore);
        let sub = wsStates.subscribe(state => {
            switch (state.kind) {
                case "connected":
                    this.events.accept(state);
                    break;
                case "connecting":
                    this.events.accept(state);
                    break;
            }
        });
        this.subs.add(sub)
    }

    onEffect(effect: IndoorEffect): any {
    }

}

const indoorBuilderOf = (wsStates: Source<WsAgentState>) => {
    return () => {
        const shell = new IndoorShell(wsStates, initResult, indoorCore);
        return (
            <IndoorUI events={shell.events} states={shell.states}/>
        );
    }
};

export default indoorBuilderOf;