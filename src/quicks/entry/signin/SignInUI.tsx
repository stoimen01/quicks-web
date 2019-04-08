import * as React from 'react';
import {Sink, Source} from "../../../mvi";
import './SignInUI.css'
import {SignInEvent} from "./SignInEvent";
import {SignInState} from "./SignInState";
import {Subscription} from "rxjs";

export interface SignInProps {
    sink: Sink<SignInEvent>
    source: Source<SignInState>
}

class SignInUI extends React.Component<SignInProps, SignInState> {

    private subscription: Subscription;

    constructor(props: SignInProps) {
        super(props);
        this.subscription = props.source.subscribe(state => {
            if (this.state == null) {
                this.state = state
            } else {
                this.setState(state)
            }
        });
    }

    componentWillUnmount(): void {
        this.subscription.unsubscribe()
    }

    onSignInClick = () => this.props.sink.accept({kind: "on-sign-in"});

    onSignUpClick = () => this.props.sink.accept({kind: "on-sign-up"});

    onNameChange = (event: any) => this.props.sink.accept({
        kind: "on-name-change",
        username: event.target.value
    });

    onPasswordChange = (event: any) => this.props.sink.accept({
        kind: "on-password-change",
        password: event.target.value
    });

    render() {
        return (
            <div className="field-sign-in">
                <div className="form-sign-in">
                    <label>Username: </label>
                    <input type="text" onChange={this.onNameChange}/><label>Password: </label>
                    <input type="password" onClick={this.onPasswordChange}/>
                    <button onClick={ this.onSignInClick }> Sign In </button>
                    <button onClick={ this.onSignUpClick }> Sign Up </button>
                </div>
            </div>
        );
    }

}

export default SignInUI;