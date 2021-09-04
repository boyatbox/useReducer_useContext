import { Button, Grid, Paper } from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CustomizedDialogs from './CustomDialog'
const useStyles = makeStyles((theme) => ({
  nativeSelect: {
    //   marginTop: theme.spacing(2),
    //   marginLeft: theme.spacing(2),
    backgroundColor: "#e8eaf6",
    color: "#424242",
    // borderRadius:'1rem'
    // paddingLeft: "20px",
    // "&.Mui-focused": { backgroundColor: "red" },
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 0,
  },
  papermain: {
    padding: theme.spacing(2),
    borderRadius: 0,
    // backgroundColor:'#eceff1'
  },
}));
function Product() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Grid container>
      <Grid item xs={0} sm={4}>
        <Paper className={classes.paper}>
        <Button disableElevation color={checked?"primary":"secondary"} onClick={handleChange} variant="contained">TOGGLE</Button>
        <CustomizedDialogs/>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Grow in={checked}>
          <Paper className={classes.papermain}>
            <LineItemSelect txtPrimary="Role" txtSecondary="" editable />
            <CircularProgress size ={20} color="secondary" variant="indeterminate" disableShrink/>
          </Paper>
        </Grow>
      </Grid>
    </Grid>
  );
}

function LineItemSelect(props) {
  const classes = useStyles();
  const [state, setState] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <NativeSelect
      value={state.age}
      onChange={handleChange}
      name="age"
      className={classes.nativeSelect}
      disableElevation
      // inputProps={{ 'aria-label': 'age' }}
    >
      <option value="">None</option>
      <option value={10}>Ten</option>
      <option value={20}>Twenty</option>
      <option value={30}>Thirty</option>
    </NativeSelect>
  );
}

export default Product;
