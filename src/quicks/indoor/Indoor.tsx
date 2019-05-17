import {Core, CoreResult, Shell} from "../../mvi";
import {IndoorEvent} from "./IndoorEvent";
import {IndoorState} from "./IndoorState";
import {IndoorEffect} from "./IndoorEffect";
import IndoorUI from "./IndoorUI";
import React from "react";

const initState: IndoorState = {
    kind: 'connecting'
};

const initResult = {
    state: initState,
    effects: []
};

const indoorCore = (lastResult: CoreResult<IndoorState, IndoorEffect>, event: IndoorEvent) => {
    return lastResult;
};

class IndoorShell extends Shell<IndoorState, IndoorEvent, IndoorEffect> {

    constructor(
        private token: string,
        initResult: CoreResult<IndoorState, IndoorEffect>,
        indoorCore: Core<IndoorState, IndoorEvent, IndoorEffect>,
    ) {
        super(initResult, indoorCore)
    }

    onEffect(effect: IndoorEffect): any {
        console.log("HANDLING INDOOR EFFECT BABY");
        console.log(effect)
    }

}

const indoorBuilderOf = () => {
    return (token: string) => {
        const shell = new IndoorShell(token, initResult, indoorCore);
        return (
            <IndoorUI events={shell.events} states={shell.states}/>
        );
    }
};

export default indoorBuilderOf;