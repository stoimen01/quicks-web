import {assertNever, Core, CoreResult} from "../../../mvi";
import {SignUpEvent} from "./SignUpEvent";
import {SignUpState} from "./SignUpState";
import {SignUpEffect} from "./SignUpEffect";

let initState = {
    isLoading: false,
    username: "",
    email: "",
    password: ""
};

let reducer = (lastResult: CoreResult<SignUpState, SignUpEffect>, event: SignUpEvent) => {
    let result: CoreResult<SignUpState, SignUpEffect>;
    let { state: lastState } = lastResult;
    switch (event.kind) {

        case "sign-in-clicked":
            result = {
                state: lastState,
                effects: [{
                    kind: "sign-in"
                }]
            };
            return result;

        case "sign-up-clicked":
            result = {
                state: { ...lastState, isLoading: true },
                effects: [{
                    kind: "sign-up",
                    username: lastState.username,
                    email: lastState.email,
                    password: lastState.password
                }]
            };
            return result;

        case "name-changed":
            result = {
                state: { ...lastState, username: event.username },
                effects: []
            };
            return result;

        case "email-changed":
            result = {
                state: { ...lastState, email: event.email },
                effects: []
            };
            return result;

        case "password-changed":
            result = {
                state: { ...lastState, password: event.password },
                effects: []
            };
            return result;

        case "sign-up-failed":
            result = {
                state: { ...lastState, isLoading: false },
                effects: []
            };
            return result;

        default: return assertNever(event);
    }
};

class SignUpCore extends Core<SignUpState, SignUpEvent, SignUpEffect>{
    constructor() {
        super(initState, [], reducer)
    }
}

export default SignUpCore;
