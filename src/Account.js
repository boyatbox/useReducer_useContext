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
import {useListItemStyle} from "./Styles";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import axios from "axios";
import { useState,useEffect } from "react";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountDetail from "./AccountDetail";
import { LeakAddTwoTone } from "@material-ui/icons";
import { findAllByDisplayValue } from "@testing-library/react";

let OneHourMinInMs=1000*60*60;

let count=0;
async function getUserList() {
  const { data } = await axios.get("http://localhost:5000/user/getall");
  // console.log("API_CALL: getUserList");
  return data;
}

export default function Account() {
  const classes = useListItemStyle();
  const [userid, setUserId] = useState();
  function displayUserDetails(id) {
    setUserId(id);
  }
  

  useEffect(() => {
    // console.log("Mount: Account");
    return () => {
      // console.log('Unmount: Account');
      count=0;
  }
  }, []);
  // console.log(`Render ${count}: Account`);
  count++;

  const { isLoading, isError, data } = useQuery("listuser", getUserList,{
    cacheTime:0,
    enabled:true,
    staleTime:Infinity,
    refetchOnWindowFocus:false,
    refetchOnMount:'always'
  });


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
  if (!data) {
    return "Data undefined";
  }

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <List
            dense
            component="nav"
            style={{ maxHeight: "100%", maxwidth: "100vw", overflow: "auto" }}
          >
            {data.map((p) => {
              return (
                <>
                  <ListItem
                    button
                    divider
                    onClick={(e) => displayUserDetails(p.id)}
                    className={userid===p.id?classes.listItemSelected:classes.listItem}
                  >
                    <ListItemText
                      primary={
                        <>
                          <Chip
                            size="small"
                            label={p.id}
                            className={classes.chipId}
                          />
                          {p.name}{" "}
                        </>
                      }
                    />
                  </ListItem>
                </>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={8}>
          <AccountDetail userid={userid} />
        </Grid>
      </Grid>
    </div>
  );
}
