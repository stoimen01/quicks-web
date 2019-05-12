import React from 'react';
import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Grid} from "@material-ui/core";
import ThingUI from "./thing/ThingUI";

const styles = (theme: Theme) => createStyles({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    fab: {
        margin: theme.spacing.unit,
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

const things = [1, 2];

function ThingsUI(props: any) {
    const { classes } = props;
    return (
        <div>
            <div className={classes.layout}>
                {/* End hero unit */}
                <Grid container spacing={16}>
                    {things.map(card => (
                        <Grid item key={card} sm={6} md={4} lg={3}>
                            <ThingUI/>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Fab color="primary" aria-label="Add" className={classes.fab}>
                <AddIcon />
            </Fab>
        </div>
    );
}

export default withStyles(styles)(ThingsUI);