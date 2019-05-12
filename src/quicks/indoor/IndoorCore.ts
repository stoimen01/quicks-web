import {Core, CoreResult} from "../../mvi";
import {IndoorState} from "./IndoorState";
import {IndoorEffect} from "./IndoorEffect";
import {IndoorEvent} from "./IndoorEvent";

const initState: IndoorState = {
    kind: 'connecting'
};

const reducer = (lastResult: CoreResult<IndoorState, IndoorEffect>, event: IndoorEvent) => {

    return lastResult;
};


export class IndoorCore extends Core<IndoorState, IndoorEvent, IndoorEffect>{
    constructor() {
        super(initState, [{kind:"track-connection"}], reducer)
    }
}