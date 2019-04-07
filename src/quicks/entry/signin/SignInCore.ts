import {Subject} from "rxjs";
import {assertNever, ReduceResult, Sink, SinkSubject, Source} from "../../../mvi";
import {flatMap, map, scan} from "rxjs/operators";
import {SignInEvent} from "./SignInEvent";
import {SignInEffect} from "./SignInEffects";
import {SignInState} from "./SignInState";

class SignInCore {

    public readonly eventsIn: Sink<SignInEvent>;

    public readonly statesOut: Source<SignInState>;
    public readonly effectsOut: Source<SignInEffect>;

    private readonly initState = {
        isLoading: false,
        username: "",
        password: ""
    };

    private readonly reducer = (lastResult: ReduceResult<SignInState, SignInEffect>, event: SignInEvent) => {
        let result: ReduceResult<SignInState, SignInEffect>;
        switch (event.kind) {

            case "on-sign-in":
                result = {
                    state: lastResult.state,
                    effects: []
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

            case "on-sign-in-ok":
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

    constructor() {

        let eventsIn = new Subject<SignInEvent>();

        let initResult = {
            state: this.initState,
            effects: []
        };

        let resultOut = eventsIn.pipe(
            scan<SignInEvent, ReduceResult<SignInState, SignInEffect>>(this.reducer , initResult)
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

export default SignInCore;
