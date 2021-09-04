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
import NativeSelect from "@material-ui/core/NativeSelect";
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

export default function AccountDetail(props) {
  // console.log("Rendering AccountDetail");
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

  useEffect(() => {
    console.log("AccountDetail mounted");
  }, []);

  useEffect(() => {
    console.log("AccountDetail rendered");
  });

  useEffect(() => {
    return () => {
      console.log("AccountDetail unmounted");
    };
  }, []);

  const initialVal = useRef();

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
          <LineItem txtPrimary="Account" txtSecondary={data.data.id} />
          <LineItem txtPrimary="Name" txtSecondary={data.data.name} editable />
          <LineItem
            txtPrimary="Email"
            txtSecondary={data.data.email}
            editable
          />
          <LineItem
            txtPrimary="Address"
            txtSecondary={data.data.address + " ," + data.data.city}
            editable
          />
          {/* <LineItemSelect
            txtPrimary="Role"
            txtSecondary={data.data.address + " ," + data.data.city}
            editable
          /> */}
        </List>
      </CardContent>
      <CardActions>
        <Button
          disableElevation
          size="small"
          variant="contained"
          color="primary"
        >
          Update
        </Button>
        <Button
          disableElevation
          size="small"
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

function LineItem({ txtPrimary, txtSecondary, editable }) {
  const [toggleEdit, setToggleEdit] = useState(false);
  // console.log('Rendering LineItem. toggleEdit=',toggleEdit);

  useEffect(() => {
    console.log("LineItem mounted");
  }, []);

  useEffect(() => {
    console.log("LineItem rendered");
  });

  useEffect(() => {
    return () => {
      console.log("LineItem unmounted");
    };
  }, []);

  if (!editable) {
    return (
      <>
        <ListItem divider>
          <ListItemText primary={txtPrimary} secondary={txtSecondary} />
        </ListItem>
      </>
    );
  }

  if (editable && !toggleEdit) {
    // console.log('editable && !toggleEdit',toggleEdit);
    return (
      <>
        <ListItem divider>
          <ListItemText primary={txtPrimary} secondary={txtSecondary} />
          <IconButton
            aria-label="delete"
            onClick={() => {
              setToggleEdit(true);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </ListItem>
      </>
    );
  }

  if (editable && toggleEdit) {
    // console.log('editable && toggleEdit',toggleEdit);
    return (
      <>
        <ListItem divider>
          <ListItemText
            primary={txtPrimary}
            secondary={<TextField fullWidth value={txtSecondary} />}
          />
          <IconButton
            aria-label="delete"
            onClick={() => {
              setToggleEdit(false);
            }}
          >
            <DoneIcon fontSize="small" />
          </IconButton>
        </ListItem>
      </>
    );
  }
}
