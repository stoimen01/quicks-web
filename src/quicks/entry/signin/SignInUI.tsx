import * as React from 'react';
import {MviComponent, MviProps, Sink, Source} from "../../../mvi";
import {SignInEvent} from "./SignInEvent";
import {SignInState} from "./SignInState";
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
    MviProps<SignInState, SignInEvent>,
    WithStyles<typeof styles> {
}

class SignInUI extends MviComponent<SignInProps, SignInState> {

    constructor(props: SignInProps) {
        super(props);
    }

    onSignInClick = () => this.props.sink.accept({kind: "on-sign-in"});

    onSignUpClick = () => this.props.sink.accept({kind: "on-sign-up"});

    onEmailChange = (event: any) => this.props.sink.accept({
        kind: "on-name-change",
        username: event.target.value
    });

    onPasswordChange = (event: any) => this.props.sink.accept({
        kind: "on-password-change",
        password: event.target.value
    });

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" name="email" autoComplete="email" onChange={this.onEmailChange} autoFocus />
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
                    onClick={ this.onSignInClick }>
                >
                    Sign in
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={ this.onSignUpClick }>
                    >
                    Sign up
                </Button>
            </div>
        );
    }

}

export default withStyles(styles)(SignInUI);