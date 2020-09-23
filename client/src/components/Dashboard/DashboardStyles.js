import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    main: {
       ...theme.mixins.toolbar,
       margin: '10rem 0rem',
    }


}));

export default useStyles;