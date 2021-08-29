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
import { useEffect, useReducer, useRef, useState } from "react";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Switch } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import { SignalCellularNullOutlined } from "@material-ui/icons";

const initEditState = { name: false, email: false, address: false };

async function getUserDeatils({ queryKey }) {
  const [_key, userid] = queryKey;
  if (!userid) {
    return new Error("No user selecetd");
  }

  return await axios.get("http://localhost:5000/user/GetById", {
    params: {
      id: userid,
    },
  });
}

function toggleReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_EDIT":
      return action.payload;
    default:
      break;
  }
}

function saveChangeReducer(satte, action) {
  switch (action.type) {
    case "SHOW_SAVE_CHANGES":
      return action.payload;
    default:
      break;
  }
}

export default function AccountDetail(props) {
  const [name, setName] = useState();
  const userid = props.userid;
  const { isLoading, isError, data } = useQuery(
    ["userdetails", userid],
    getUserDeatils,
    {
      enabled: true,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  console.log("name=", name);

  const [editState, dispatch] = useReducer(toggleReducer, initEditState);
  const initialVal = useRef();

  useEffect(() => {
    dispatch({ payload: initEditState, type: "TOGGLE_EDIT" });
  }, [props.userid]);

  function clickHandler(item) {
    let merge = { ...initEditState, ...item };
    dispatch({ payload: merge, type: "TOGGLE_EDIT" });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  if (!props.userid) {
    return <p>Select a user</p>;
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "50vh",
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

  if (data && data.data) {
    initialVal.current = {
      name: data.data.name,
      email: data.data.email,
      address: data.data.address + " ," + data.data.city,
    };
  }

  return (
    <Card variant="outlined" style={{ borderRadius: 0 }}>
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
            {editState.name ? (
              <>
                <ListItemText
                  primary="Name"
                  // secondary={<TextField fullWidth value={name} onChange={{handleNameChange}}/>}
                  secondary={<TextField fullWidth value={name} onChange={{handleNameChange}}/>}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    clickHandler({ name: false });
                  }}
                >
                  <DoneIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText primary="Name" secondary={data.data.name} />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    clickHandler({ name: true });
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </ListItem>
          <ListItem>
            {editState.email ? (
              <>
                <ListItemText
                  primary="Email"
                  secondary={
                    <TextField fullWidth defaultValue={data.data.email} />
                  }
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    clickHandler({ email: false });
                  }}
                >
                  <DoneIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText primary="Email" secondary={data.data.email} />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    clickHandler({ email: true });
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </ListItem>
          <Divider light />
          <ListItem>
            {editState.address ? (
              <>
                <ListItemText
                  primary="Address"
                  secondary={
                    <TextField
                      fullWidth
                      defaultValue={data.data.address + " ," + data.data.city}
                    />
                  }
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    clickHandler({ address: false });
                  }}
                >
                  <DoneIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText
                  primary="Address"
                  secondary={data.data.address + " ," + data.data.city}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    clickHandler({ address: true });
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </>
            )}
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
