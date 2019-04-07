import {Subject} from "rxjs";
import {assertNever, ReduceResult, Sink, SinkSubject, Source} from "../../../mvi";
import {flatMap, map, scan} from "rxjs/operators";
import {SignUpEvent} from "./SignUpEvent";
import {SignUpState} from "./SignUpState";
import {SignUpEffect} from "./SignUpEffect";
import {SignInState} from "../signin/SignInState";
import {SignInEffect} from "../signin/SignInEffects";

class SignUpCore {

    public readonly eventsIn: Sink<SignUpEvent>;

    public readonly statesOut: Source<SignUpState>;
    public readonly effectsOut: Source<SignUpEffect>;

    private readonly initState = {
        isLoading: false,
        username: "",
        password: "",
        email: ""
    };

    private readonly reducer = (lastResult: ReduceResult<SignUpState, SignUpEffect>, event: SignUpEvent) => {
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
                    effects: []
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

    constructor() {

        let eventsIn = new Subject<SignUpEvent>();

        let initResult = {
            state: this.initState,
            effects: []
        };

        let resultOut = eventsIn.pipe(
            scan<SignUpEvent, ReduceResult<SignUpState, SignUpEffect>>(this.reducer , initResult)
        );

        this.statesOut = resultOut.pipe(
            map(result => result.state)
        );

        this.effectsOut = resultOut.pipe(
            flatMap(result => result.effects)
        );

        this.eventsIn = new SinkSubject(eventsIn);
    }
}

export default SignUpCore;
