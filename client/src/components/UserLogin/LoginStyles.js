import React from 'react';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme=>({
    main:{
        height:'700px',
        padding: theme.spacing(3, 2),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0",
    },
    root: {
        margin:'10px 0',
    },
    formMsg:{
        ...theme.typography.formMsg,
    },
    formGrid: {
        boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.07), 0 3px 30px 0 rgba(0, 0, 0, 0.07)',
        borderRadius :'12px',
        padding: '2rem 3rem',
        marginTop: '3rem',
    },
    form:{
        backgroundColor:'white',
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
        backgroundColor:"white",
    },
    gButton :{
        padding : '13px 15px',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 3px 5px 0 rgba(0, 0, 0, 0.07)', 
        borderRadius :'12px',  
    },
    gImg:{
        marginRight : '1.5rem',
    },
    submitButton : {
        padding:'10px 10px', 
        margin :'1em 0',
        width:'100%',  
    },
    formTitle:{
        ...theme.typography.h4
    }
    
}));

export default useStyles;