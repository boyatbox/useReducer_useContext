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

async function getUserList() {
  const {data}= await axios.get("http://localhost:5000/user/getall");
  return data;
}

async function getUserDeatils(userid) {
  return await axios.get("http://localhost:5000/user/GetById", {
    params: {
      id: userid,
    },
  });
}

export default function MatList() {

  const [userid, setUserId] = useState();
  function displayUserDetails(id) {
    setUserId(id);
  }

//   const { data: dataR, error: errorR, loading: landingR }= useQuery(
//     "getUserDeatils-" + userid,
//     getUserDeatils(userid)
//   );

  const { isLoading, isError, data } = useQuery("listuser", getUserList);

  if (isLoading) {
    return "loading..";
  }

  if (isError) {
    return "Error";
  }

  console.log("data=", data);

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <List component="nav" aria-label="secondary mailbox folders">
            {data.map((p) => {
              return (
                <>
                  <ListItem
                    button
                    divider
                    onClick={(e) => displayUserDetails(p.id)}
                  >
                    <ListItemText
                      primary={p.name}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            Id:
                          </Typography>
                          {p.id}
                        </>
                      }
                    />
                  </ListItem>
                </>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                Account
              </Typography>
              <Divider />
              <Typography
                variant="body2"
                component="span"
                style={{ marginRight: "0.3rem" }}
              >
                Name:
              </Typography>
              <Typography variant="caption" component="span">
                jgasdj akshdjkasdh
              </Typography>
              <Divider />
              <Typography
                variant="body2"
                component="span"
                style={{ marginRight: "0.3rem" }}
              >
                ID:
              </Typography>

              <Typography variant="caption" component="span">
                {"dataR.data.id"}
              </Typography>
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
        </Grid>
      </Grid>
    </div>
  );
}
