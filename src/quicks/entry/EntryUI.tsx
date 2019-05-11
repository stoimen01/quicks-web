import * as React from 'react';
import {assertNever, MviComponent, MviProps} from "../../mvi";
import {EntryEvent} from "./EntryEvent";
import SignUpBuilder from "./signup/SignUpBuilder";
import SignInBuilder from "./signin/SignInBuilder";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {EntryState} from "./EntryCore";

const styles = (theme: Theme) => createStyles({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    }
});

export interface EntryProps extends
    MviProps<EntryState, EntryEvent>,
    WithStyles<typeof styles> {
    signInBuilder: SignInBuilder
    signUpBuilder: SignUpBuilder
}

class EntryUI extends MviComponent<EntryProps, EntryState> {

    constructor(props: EntryProps) {
        super(props);
    }

    render() {
        let mainElement;
        let title;
        switch (this.state.kind) {
            case "sign-in":
                mainElement = this.props.signInBuilder.build();
                title = "Sign in";
                break;
            case "sign-up":
                mainElement = this.props.signUpBuilder.build();
                title = "Sign up";
                break;
            default: assertNever(this.state);
        }

        let {classes} = this.props;

        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">{title}</Typography>
                    { mainElement }
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles)(EntryUI);