import {assertNever, Sink, Source} from "../../../mvi";
import {EntryEvent} from "../EntryEvents";
import {SignUpEffect} from "./SignUpEffect";
import {SignUpEvent} from "./SignUpEvent";

class SignUpHandler {

    constructor(
        private source: Source<SignUpEffect>,
        private signInSink: Sink<SignUpEvent>,
        private entrySink: Sink<EntryEvent>
    ) {
        source.subscribe(effect => {
            switch (effect.kind) {
                case "sign-in":
                    entrySink.accept({
                        kind: "on-sign-in"
                    });
                    break;
                case "sign-up":
                    signInSink.accept({
                        kind: "on-sign-up-ok"
                    });
                    break;
                default: return assertNever(effect);
            }
        })
    }

}

export default SignUpHandler;