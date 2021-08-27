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
import UserDetails from './UserDetails'


async function getUserList() {
  const { data } = await axios.get("http://localhost:5000/user/getall");
  return data;
}



export default function MatList() {
  const [userid, setUserId] = useState();
  function displayUserDetails(id) {
    setUserId(id);
  }

  const { isLoading, isError, data } = useQuery("listuser", getUserList);

  if (isLoading) {
    return "loading..";
  }

  if (isError) {
    return "Error";
  }

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <List dense component="nav" style={{maxHeight:'100vh',maxwidth:'100vw',overflow:'auto'}}>
            {data.map((p) => {
              return (
                <>
                  <ListItem
                    button
                    divider
                    onClick={(e) => displayUserDetails(p.id)}
                  >
                    <ListItemText
                      primary={<><Chip size="small" label= {p.id} style={{marginRight:'1rem'}}/>{p.name} </>}
                    />
                  </ListItem>
                </>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <UserDetails userid={userid} />
        </Grid>
      </Grid>
    </div>
  );
}
