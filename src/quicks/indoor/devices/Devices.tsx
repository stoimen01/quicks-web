import React from 'react';
import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme: Theme) => createStyles({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

function Devices(props: any) {
    const { classes } = props;
    return (
        <div>
            <Fab color="primary" aria-label="Add" className={classes.fab}>
                <AddIcon />
            </Fab>
        </div>
    );
}

export default withStyles(styles)(Devices);