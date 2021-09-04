import { makeStyles } from "@material-ui/core/styles";
import teal from '@material-ui/core/colors/teal';

const useListItemStyle = makeStyles((theme) => ({
  root: {
  },
  listItemSelected: {
    borderLeft:`5px solid ${teal[600]}`,
    // fontWeight:'600',
  },
  listItem: {
    borderLeft:`5px solid transparent`
  },
  chipId: {
    // backgroundColor: teal[600],
    // color:teal[100],
    marginRight:'0.5rem'
  },
}));

export { useListItemStyle };
