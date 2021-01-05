import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    main: {
        ...theme.mixins.toolbar,
       margin: '10px auto',
       padding:"0",
       border: '1px solid black',
    },
    overlay: {
        backgroundColor:"black",
        width: "100%",
        height: "250px",
    },
    profile: {
        width: "200px",
        height: "200px",
        left:"calc(50% - 100px)",
    },
    title:{
        ...theme.typography.h5,
        textAlign:'center',
    }


}));

export default useStyles;