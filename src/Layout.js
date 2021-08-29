import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Account from "./Account";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import NotFound from "./NotFound";
import LocalMallIcon from '@material-ui/icons/LocalMall';
import WavesIcon from '@material-ui/icons/Waves';
import TrainIcon from '@material-ui/icons/Train';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import FlightIcon from '@material-ui/icons/Flight';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.primary.main
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0),
    border:`10px solid #fff`,
    marginTop:'64px'
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeComponent, setActiveComponent] = React.useState("Account");


  const handleDrawerClose = () => {
    // setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar} elevation={1}>
        <Toolbar>
        <FlightTakeoffIcon/>
          {/* <Typography variant="h6" noWrap>
          
            APP
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <WavesIcon/>
            HELLO
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={() => {
              setActiveComponent("Account");
            }}
          >
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setActiveComponent("Product");
            }}
          >
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItem>
        </List>
      </Drawer>
        <Container disableGutters={true} className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
          <Box my={0}>
            {LoadComponent(activeComponent)}
          </Box>
        </Container>
      {/* </main> */}
    </div>
  );

  function LoadComponent(component) {
    switch (component) {
      case "Account":
        return <Account />;
      default:
        return <NotFound />;
    }
  }
}
