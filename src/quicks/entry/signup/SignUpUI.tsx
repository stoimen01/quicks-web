import * as React from 'react';
import {Sink, Source} from "../../../mvi";
import './SignUpUI.css'
import {SignUpEvent} from "./SignUpEvent";
import {SignUpState} from "./SignUpState";
import {Subscription} from "rxjs";

export interface SignInProps {
    sink: Sink<SignUpEvent>
    source: Source<SignUpState>
}

class SignUpUI extends React.Component<SignInProps, SignUpState> {

    private subscription: Subscription;

    constructor(props: SignInProps) {
        super(props);
        this.subscription = props.source.subscribe(state => {
            this.setState(state);
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

    onEmailChange = (event: any) => this.props.sink.accept({
        kind: "on-email-change",
        email: event.target.value
    });

    render() {
        return (
            <div className="field-sign-in">
                <div className="form-sign-in">
                    <label>Username: </label>
                    <input type="text" onChange={this.onNameChange}/>
                    <label>Email: </label>
                    <input type="text" onClick={this.onPasswordChange}/>
                    <label>Password: </label>
                    <input type="password" onClick={this.onEmailChange}/>
                    <button onClick={ this.onSignInClick }> Sign In </button>
                    <button onClick={ this.onSignUpClick }> Sign Up </button>
                </div>
            </div>
        );
    }

}

export default SignUpUI;