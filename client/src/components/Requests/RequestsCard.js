import React,{useEffect, useState, useContext, useRef, useCallback} from 'react';
import {Card ,CardContent ,Button ,Typography, CardActions} from '@material-ui/core';
import useStyles from './RequestsCardStyles';
import {useHistory} from 'react-router-dom';

const RequestCard = (props) => {
    const classes = useStyles();
    const history = useHistory();
    return(
    <Card className={classes.card}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
         {props.city}
        </Typography>
        <Typography variant="h6" component="h3">
            FROM {props.dropLocation} -- TO -- {props.pickupLocation}
        </Typography>
        <Typography  color="textSecondary">
          Date: {props.dateStamp}
        </Typography>
        <Typography  color="textSecondary">
          Time: {props.timeStamp}
        </Typography>
        <Typography variant="body2" component="p" className={classes.body2}>
          Luxury: {props.luxury}
        </Typography>
        <Typography variant="body2" component="p" >
          Payment: {props.paymentMethod}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
        size="medium" 
        onClick={()=>{history.push(`/request/accept/${props.id}`)}}
        >
          Accept
        </Button>
      </CardActions>
    </Card>
    )
}
export default RequestCard;