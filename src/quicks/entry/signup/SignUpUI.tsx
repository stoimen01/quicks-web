import * as React from 'react';
import {MviComponent, MviProps} from "../../../mvi";
import {SignUpEvent} from "./SignUpEvent";
import {SignUpState} from "./SignUpState";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const styles = (theme: Theme) => createStyles({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

export interface SignInProps extends
    MviProps<SignUpState, SignUpEvent>,
    WithStyles<typeof styles> {
}

class SignUpUI extends MviComponent<SignInProps, SignUpState> {

    constructor(props: SignInProps) {
        super(props);
    }

    onSignInClick = () => this.props.events.accept({kind: "sign-in-clicked"});

    onSignUpClick = () => this.props.events.accept({kind: "sign-up-clicked"});

    onNameChange = (event: any) => this.props.events.accept({
        kind: "name-changed",
        username: event.target.value
    });

    onEmailChange = (event: any) => this.props.events.accept({
        kind: "email-changed",
        email: event.target.value
    });

    onPasswordChange = (event: any) => this.props.events.accept({
        kind: "password-changed",
        password: event.target.value
    });

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" name="username" autoComplete="username" onChange={this.onNameChange} autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" name="email" autoComplete="email" onChange={this.onEmailChange} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.onPasswordChange} />
                </FormControl>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={ this.onSignUpClick }>
                    >
                    Sign up
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={ this.onSignInClick }>
                    >
                    Sign in
                </Button>
            </div>
        );
    }

}

export default withStyles(styles)(SignUpUI);