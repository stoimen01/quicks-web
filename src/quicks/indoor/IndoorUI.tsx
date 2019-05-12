import React from 'react';
import {WithStyles, withStyles} from '@material-ui/core/styles';
import {indoorStyles} from "./IndoorStyles";
import Devices from "./things/ThingsUI";
import {assertNever, MviComponent, MviProps} from "../../mvi";
import {IndoorState} from "./IndoorState";
import {IndoorEvent} from "./IndoorEvent";
import IndoorDrawer from "./IndoorDrawer";
import {Typography} from "@material-ui/core";

export interface IndoorProps extends
    MviProps<IndoorState, IndoorEvent>,
    WithStyles<typeof indoorStyles> {
}

class IndoorUI extends MviComponent<IndoorProps, IndoorState> {

    constructor(props: any) {
        super(props)
    }

    render() {
        const { classes } = this.props;
        let connectLabel;
        switch (this.state.kind) {
            case "connected":
                connectLabel = "CONNECTED";
                break;
            case "connecting":
                connectLabel = "CONNECTING";
                break;
            default:
                assertNever(this.state)
        }

        return (
            <div className={classes.root}>
                <IndoorDrawer/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Typography>
                        {connectLabel}
                    </Typography>
                    <Devices/>
                </main>
            </div>
        );
    }

}

export default withStyles(indoorStyles)(IndoorUI);