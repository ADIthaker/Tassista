import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    main: {
       margin: '10rem 0rem',
       border: '1px solid black',
    },
    container: {
        ...theme.mixins.toolbar,
        margin:'20px auto auto auto ',
        border: '1px solid black',
    }


}));

export default useStyles;