import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    img:{
        zIndex: '100',
    },
    main:{
        ...theme.mixins.toolbar,
    }


}));

export default useStyles;