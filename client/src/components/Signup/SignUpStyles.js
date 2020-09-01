import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    main:{
        height:'700px',
        padding: theme.spacing(3, 2),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    root: {
        margin:'10px 0',
    },
    form: {
        boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.07), 0 3px 30px 0 rgba(0, 0, 0, 0.07)',
        borderRadius :'12px',
        padding: '2rem 3rem',
        marginTop: '3rem',
    },
    line:{
        color:'#ccc',
        alignItems: 'center',
        textAlign: 'center',
        '&::after': {
            flex: '1',
            content: '""',
            border:'0.5px solid #bbb',
            marginLeft:'0.5rem',
        },
        '&::before':{
            flex: '1',
            content: '""',
            border:'0.5px solid #bbb',
            marginRight:'0.5rem',
        }
    },
    inputFields : {
        padding:'3rem',
    },
    gButton :{
        padding : '13px 15px',
        border : '1px solid #eee',    
    },
    gImg:{
        marginRight : '1.5rem',
    },
    submitButton : {
        padding:'10px 10px',   
    }
    
}));

export default useStyles;