import {assertNever, Core, ReduceResult} from "../../../mvi";
import {SignUpEvent} from "./SignUpEvent";
import {SignUpState} from "./SignUpState";
import {SignUpEffect} from "./SignUpEffect";

let initState = {
    isLoading: false,
    username: "",
    password: "",
    email: ""
};

let reducer = (lastResult: ReduceResult<SignUpState, SignUpEffect>, event: SignUpEvent) => {
    let result: ReduceResult<SignUpState, SignUpEffect>;
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

        case "on-email-change":
            result = {
                state: lastResult.state,
                effects: []
            };
            return result;

        case "on-sign-up-ok":
            result = {
                state: lastResult.state,
                effects: []
            };
            return result;

        case "on-sign-up-error":
            result = {
                state: lastResult.state,
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
