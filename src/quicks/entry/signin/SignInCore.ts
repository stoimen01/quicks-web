import {assertNever, Core, ReduceResult} from "../../../mvi";
import {SignInEvent} from "./SignInEvent";
import {SignInEffect} from "./SignInEffects";
import {SignInState} from "./SignInState";

let initState = {
    isLoading: false,
    username: "",
    password: ""
};

let reducer = (lastResult: ReduceResult<SignInState, SignInEffect>, event: SignInEvent) => {
    let result: ReduceResult<SignInState, SignInEffect>;
    switch (event.kind) {

        case "on-sign-in":
            result = {
                state: lastResult.state,
                effects: [{
                    kind: "sign-in"
                }]
            };
            return result;

        case "on-sign-up":
            result = {
                state: lastResult.state,
                effects: [{
                    kind: "sign-up"
                }]
            };
            return result;

        case "on-name-change":
            result = {
                state: lastResult.state,
                effects: []
            };
            return result;

        case "on-password-change":
            result = {
                state: lastResult.state,
                effects: []
            };
            return result;

        case "on-sign-in-error":
            result = {
                state: lastResult.state,
                effects: []
            };
            return result;

        default: return assertNever(event);
    }
};

class SignInCore extends Core<SignInState, SignInEvent, SignInEffect>{
    constructor() {
        super(initState, [], reducer);
    }
}

export default SignInCore;
