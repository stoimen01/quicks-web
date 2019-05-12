import {assertNever, Core, CoreResult} from "../../../mvi";
import {SignInEvent} from "./SignInEvent";
import {SignInEffect} from "./SignInEffects";
import {SignInState} from "./SignInState";

let initState = {
    isLoading: false,
    email: "",
    password: ""
};

let reducer = (lastResult: CoreResult<SignInState, SignInEffect>, event: SignInEvent) => {
    let result: CoreResult<SignInState, SignInEffect>;
    let { state: lastState } = lastResult;
    switch (event.kind) {

        case "sign-in-clicked":
            result = {
                state: { ...lastState, isLoading: true },
                effects: [{
                    kind: "sign-in",
                    email: lastResult.state.email,
                    password: lastResult.state.password
                }]
            };
            return result;

        case "sign-up-clicked":
            result = {
                state: lastResult.state,
                effects: [{
                    kind: "sign-up"
                }]
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

        case "sign-in-failed":
            result = {
                state: { ...lastState, isLoading: false },
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
