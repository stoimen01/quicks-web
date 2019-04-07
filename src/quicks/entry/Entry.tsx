import * as React from 'react';
import {assertNever, Sink, SinkSubject, Source} from "../../mvi";
import SignInCore from "./signin/SignInCore";
import SignInUI from "./signin/SignInUI";
import SignInHandler from "./signin/SignInHandler";
import {Subject} from "rxjs";
import {EntryEvent} from "./EntryEvents";
import {EntryState} from "./EntryState";
import SignUpCore from "./signup/SignUpCore";
import SignUpHandler from "./signup/SignUpHandler";
import SignUpUI from "./signup/SignUpUI";

export interface EntryProps {
}

class Entry extends React.Component<EntryProps, EntryState> {

    private signInCore: SignInCore;
    private signUpCore: SignUpCore;

    constructor(props: EntryProps) {
        super(props);

        let eventsIn = new Subject<EntryEvent>();

        this.signInCore = new SignInCore();
        let signInHandler = new SignInHandler(
            this.signInCore.effectsOut,
            this.signInCore.eventsIn,
            new SinkSubject(eventsIn)
        );

        this.signUpCore = new SignUpCore();
        let signUpHandler = new SignUpHandler(
            this.signUpCore.effectsOut,
            this.signUpCore.eventsIn,
            new SinkSubject(eventsIn)
        );

        eventsIn.subscribe(event => {
            switch (event.kind) {
                case "on-sign-in":
                    this.setState({kind: "sign-in"});
                    break;
                case "on-sign-up":
                    this.setState({kind: "sign-up"});
                    break;
                default: return assertNever(event);
            }
        });

        this.state = {
            kind: "sign-in"
        }

    }

    render() {
        switch (this.state.kind) {
            case "sign-in":
                return <SignInUI sink={this.signInCore.eventsIn} source={this.signInCore.statesOut}> </SignInUI>;
            case "sign-up":
                return <SignUpUI sink={this.signUpCore.eventsIn} source={this.signUpCore.statesOut}> </SignUpUI>;
            default: return assertNever(this.state);
        }
    }
}

export default Entry;