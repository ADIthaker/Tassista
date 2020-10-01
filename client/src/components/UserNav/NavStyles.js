import {makeStyles} from '@material-ui/core/styles';
import {useTheme}  from '@material-ui/core/styles';
//const theme = useTheme();
const useStyles = makeStyles(theme=>({
    root : {
        flexGrow : 1,
    },
    appbar :{
        backgroundColor : 'white',
       // boxShadow: 'none',
        zIndex:'100',
    },
    toolbar: {
        display: 'flex', 
        justifyContent: 'space-between', 
        flexDirection: 'row',
        width:'90%',
    },
    login : {
        padding : '0.4rem 1.4rem',
        ...theme.typography.button,
    },
    homelink : {
        textDecoration : 'none',
        color : 'black',
    },
    logo: {
        ...theme.typography.h5,
    },
    profile: {
        height:"24px",
        width: "24px",
        marginRight:"2px",
    }, 
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

export default useStyles;