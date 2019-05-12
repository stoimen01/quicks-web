import {withStyles, WithStyles} from "@material-ui/core";
import {indoorStyles} from "./IndoorStyles";
import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {DeviceHub} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
const classNames = require('classnames');

interface State {
    open: boolean
}

class IndoorDrawer extends Component<WithStyles<typeof indoorStyles>, State> {

    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    constructor(props: WithStyles<typeof indoorStyles>) {
        super(props)
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Things
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),}}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <DeviceHub />
                            </ListItemIcon>
                            <ListItemText primary="Things" />
                        </ListItem>
                    </List>
                </Drawer>
            </React.Fragment>
        )
    }
}

export default withStyles(indoorStyles)(IndoorDrawer);