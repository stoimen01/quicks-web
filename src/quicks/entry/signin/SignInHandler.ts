import {assertNever, Sink, Source} from "../../../mvi";
import {SignInEffect} from "./SignInEffects";
import {SignInEvent} from "./SignInEvent";
import {EntryEvent} from "../EntryEvent";

class SignInHandler {

    constructor(
        private source: Source<SignInEffect>,
        private signInSink: Sink<SignInEvent>,
        private entrySink: Sink<EntryEvent>
    ) {
        source.subscribe(effect => {
            switch (effect.kind) {
                case "sign-in":
                    entrySink.accept({
                        kind: "on-sign-in-success"
                    });
                    break;
                case "sign-up":
                    entrySink.accept({
                        kind: "on-sign-up"
                    });
                    break;
                default: return assertNever(effect);
            }
        })
    }

}

export default SignInHandler;