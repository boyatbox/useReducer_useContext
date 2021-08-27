import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

async function getUserDeatils({ queryKey }) {
    console.log("queryKey=>", queryKey);
    const userid = queryKey[1];
    if (!userid) {
      return new Error("No user selecetd");
    }
    console.log("queryKey=>userid", userid);
    return await axios.get("http://localhost:5000/user/GetById", {
      params: {
        id: userid,
      },
    });
  }

export default function UserDetails(props) {
  const userid = props.userid;

  const { isLoading, isError, data } = useQuery(
    ["userdetails", userid],
    getUserDeatils
  );

  if (!props.userid) {
    return <p>Select a user</p>;
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="primary" gutterBottom variant="h6">
          Loading account
        </Typography>
        <CircularProgress size="1.5rem" />
      </div>
    );
  }

  if (isError) {
    return "Error";
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Account
        </Typography>
        <Divider variant="fullWidth" />
        <List component="nav" disablePadding dense aria-label="mailbox folders">
          <ListItem divider>
            <ListItemText primary={"ID: " + data.data.id} />
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Name" secondary={data.data.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={data.data.email} />
          </ListItem>
          <Divider light />
          <ListItem>
            <ListItemText
              primary="Address"
              secondary={data.data.address + " ," + data.data.city}
            />
          </ListItem>
          <Divider light />
        </List>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined" color="primary">
          Update
        </Button>
        <Button size="small" variant="outlined" color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
