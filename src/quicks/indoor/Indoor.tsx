import {assertNever, Core, CoreResult, Shell} from "../../mvi";
import {IndoorEvent} from "./IndoorEvent";
import {IndoorState} from "./IndoorState";
import {IndoorEffect} from "./IndoorEffect";
import IndoorUI from "./IndoorUI";
import React from "react";
import {WsClient} from "../common/remote/ws/WsClient";

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

        case "failed":
        case "disconnected":
            result = {
                state: {
                    kind: "connecting"
                },
                effects: [{
                    kind: "connect",
                    after: 3
                }]
            };
            return result;
    }
};

class IndoorShell extends Shell<IndoorState, IndoorEvent, IndoorEffect> {

    constructor(
        private wsUrl: string,
        private wsClient: WsClient,
        initResult: CoreResult<IndoorState, IndoorEffect>,
        indoorCore: Core<IndoorState, IndoorEvent, IndoorEffect>,
    ) {
        super(initResult, indoorCore);
        let sub = wsClient.events.subscribe(ev => {
            switch (ev.kind) {
                case "connected":
                case "disconnected":
                case "failed":
                    this.events.accept(ev);
                    break;
                case "message-received":
                    console.log(ev.msg);
                    break;
            }
        });
        this.subs.add(sub)
    }

    onEffect(effect: IndoorEffect): any {
        switch (effect.kind) {
            case "connect":
                this.wsClient.commands.accept({
                    kind: "connect",
                    after: effect.after,
                    url: this.wsUrl
                });
                break;
            case "disconnect":
                this.wsClient.commands.accept(effect);
                break;
        }
    }

}

const indoorBuilderOf = (wsClient: WsClient) => {
    return (wsUrl: string) => {
        const shell = new IndoorShell(wsUrl, wsClient, initResult, indoorCore);
        return (
            <IndoorUI events={shell.events} states={shell.states}/>
        );
    }
};

export default indoorBuilderOf;