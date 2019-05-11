import {assertNever, Sink, Source} from "../../../mvi";
import {EntryEvent} from "../EntryEvent";
import {SignUpEffect} from "./SignUpEffect";
import {SignUpEvent} from "./SignUpEvent";
import {QuicksEvent} from "../../Quicks";

class SignUpHandler {

    constructor(
        private signUpEffects: Source<SignUpEffect>,
        private signUpEvents: Sink<SignUpEvent>,
        private entryEvents: Sink<EntryEvent>,
        private quicksSink: Sink<QuicksEvent>
    ) {
        signUpEffects.subscribe(effect => {
            switch (effect.kind) {
                case "sign-up":
                    quicksSink.accept({
                        kind: "signed-up"
                    });
                    break;
                case "sign-in":
                    entryEvents.accept({
                        kind: "on-sign-in"
                    });
                    break;
                default: return assertNever(effect);
            }
        })
    }

}

export default SignUpHandler;