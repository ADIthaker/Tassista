import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    root : {
        flexGrow : 1,
        fontSize : '1.4rem', 
        
    },
    appbar :{
        backgroundColor : '#c9a6ff',
        
    },
    login : {
        padding : '0.4rem 1.4rem',
    },
    navbar : {
        backgroundColor : 'red',

    },
    homelink : {
        textDecoration : 'none',
        color : 'white',
    }
}));

export default useStyles;