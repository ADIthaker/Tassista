import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    form: {
      marginTop:'1rem',
    },
    title:{
      ...theme.typography.reqForm,
    },
    infoText:{
      color:'#5d5f61',
      fontSize: '1rem',
      fontWeight:'500',
    },
    root: {
        position: 'absolute',
        top: '80px',
        left:'50%',
        padding: '0 4px',
        display: 'flex',
        alignItems: 'center',
        height: 50,
        width: 450,
        zIndex: '20',
      },
      root2: {
        position: 'absolute',
        top: '140px',
        left:'50%',
        padding: '0 4px',
        display: 'flex',
        alignItems: 'center',
        height: 50,
        width: 450,
        zIndex: '20',
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      rideButton: {
        marginTop: '2rem',
        left:"25%",
        width:'50%',
      }
}));

export default useStyles;