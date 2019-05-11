import {assertNever, Sink, Source} from "../../../mvi";
import {SignInEffect} from "./SignInEffects";
import {SignInEvent} from "./SignInEvent";
import {EntryEvent} from "../EntryEvent";
import {QuicksEvent} from "../../Quicks";

class SignInHandler {

    constructor(
        private source: Source<SignInEffect>,
        private signInSink: Sink<SignInEvent>,
        private entrySink: Sink<EntryEvent>,
        private quicksSink: Sink<QuicksEvent>
    ) {
        source.subscribe(effect => {
            switch (effect.kind) {
                case "sign-in":
                    quicksSink.accept({
                        kind: "signed-in"
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