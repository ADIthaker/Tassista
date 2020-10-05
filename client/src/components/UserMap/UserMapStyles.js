import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    form: {
        marginTop:'1rem',
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
}));

export default useStyles;