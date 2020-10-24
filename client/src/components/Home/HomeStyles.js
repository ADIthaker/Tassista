import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    img:{
        width:'100%',
        height:'auto',
        marginTop:'-10rem',
        [theme.breakpoints.down('sm')]:{
            width:'100%',
            height:'auto',
            marginTop:'-10px',
        }
    },
    cards:{
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.07), 0 3px 5px 0 rgba(0, 0, 0, 0.07)', 
        borderRadius :'12px',
        backgroundColor:'white',
    },
    gridDiv:{
        position:'absolute',
        top:'75%',
        left:'50%',
        transform:'translateX(-50%)',
        width:'90%',
        paddingTop:'3rem',
        paddingBottom:'3rem',
        margin:'auto',
        [theme.breakpoints.down('sm')]:{
            top:'70%',
        }   
    },
    imgBtn:{
        position:'absolute',
        left:'50%',
        width:'200px',
        bottom:'55px',
        transform:'translateX(-50%)',
        fontSize:'1.1rem',
        color:'white',
        '&:hover':{
            backgroundColor:'white',
            color:'black',
        },
        [theme.breakpoints.down('sm')]:{
            fontSize:'0.8rem',
            width:'90px',
            height:'auto',
            bottom:'20px',
            marginTop:'-10px',
        }
    },
    card: {
        padding:'2rem',
    },
    main:{
        ...theme.mixins.toolbar,
    },
    container: {
        position: 'relative',
        color: 'white',
    },
    text: {
        position:'absolute',
        top:'100px',
        width:'35%',
        left: '65px',
        fontSize:'3.5rem',
        fontFamily: 'Playfair Display, serif',
        fontWeight: 500,
        color:'white',
        [theme.breakpoints.between('sm','md')]:{
            top:'60px',
            left: '40px',
            fontSize:'2.5rem',
        },
        [theme.breakpoints.down('sm')]:{
            top:'25px',
            left: '15px',
            width:'70%',
            fontSize:'1.3rem',
        }
    },


}));

export default useStyles;