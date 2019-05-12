import {createStyles, Theme, withStyles} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React from "react";

const styles = (theme: Theme) => createStyles({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    }
});

function ThingUI(props: any) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    Rover
                </Typography>
                <Typography>
                    Secret: "123-543asd-1gfhh-45432"
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    View
                </Button>
            </CardActions>
        </Card>
    )
}

export default withStyles(styles)(ThingUI);