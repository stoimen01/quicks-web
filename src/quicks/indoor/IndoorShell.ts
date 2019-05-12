import {Core, Shell} from "../../mvi";
import {IndoorEvent} from "./IndoorEvent";
import {IndoorState} from "./IndoorState";
import {IndoorEffect} from "./IndoorEffect";

export class IndoorShell extends Shell<IndoorState, IndoorEvent, IndoorEffect> {

    constructor(
        indoorCore: Core<IndoorState, IndoorEvent, IndoorEffect>,
        private token: string
    ) {
        super(indoorCore)
    }

    onEffect(effect: IndoorEffect): any {
        console.log("HANDLING INDOOR EFFECT BABY");
        console.log(effect)
    }

}