import * as React from 'react';
import {assertNever, Sink, Source} from "../../mvi";
import {Subscription} from "rxjs";
import {EntryEvent} from "./EntryEvent";
import {EntryState} from "./EntryState";
import SignUpBuilder from "./signup/SignUpBuilder";
import SignInBuilder from "./signin/SignInBuilder";

export interface EntryProps {
    sink: Sink<EntryEvent>
    source: Source<EntryState>
}

class EntryUI extends React.Component<EntryProps, EntryState> {

    private subscription: Subscription;

    constructor(props: EntryProps) {
        super(props);
        this.subscription = this.props.source
            .subscribe(state => {
                console.log(state);
                if (this.state == null) {
                    this.state = state
                } else {
                    this.setState(state);
                }

            })
    }

    componentWillUnmount(): void {
        this.subscription.unsubscribe()
    }

    render() {
        if (this.state == null) return null;
        switch (this.state.kind) {
            case "sign-in":
                return SignInBuilder.build(this.props.sink);
            case "sign-up":
                return SignUpBuilder.build(this.props.sink);
            default: return assertNever(this.state);
        }
    }
}

export default EntryUI;