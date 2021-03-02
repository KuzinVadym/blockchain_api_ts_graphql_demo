import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(_theme => ({
    root: {
        flex: '0.45',
        flexDirection: 'column',
        padding: '0 2% 0 2%'
    },
    table: {
        cursor: 'default'
    }
}));

export default useStyles;