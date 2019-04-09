import * as React from 'react';
import {assertNever, Sink, Source} from "../../mvi";
import {Subscription} from "rxjs";
import {EntryEvent} from "./EntryEvent";
import {EntryState} from "./EntryState";
import SignUpBuilder from "./signup/SignUpBuilder";
import SignInBuilder from "./signin/SignInBuilder";
import './EntryUI.css'

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
        let mainElement;
        switch (this.state.kind) {
            case "sign-in":
                mainElement = SignInBuilder.build(this.props.sink);
                break;
            case "sign-up":
                mainElement = SignUpBuilder.build(this.props.sink);
                break;
            default: assertNever(this.state);
        }

        return (
            <div className="entry-field">
                <div className="entry-box">
                    <div className="entry-title"> Quicks </div>
                    {mainElement}
                </div>
            </div>
        )
    }
}

export default EntryUI;