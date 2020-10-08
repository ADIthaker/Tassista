import React,{useCallback, useContext, useRef, useState} from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import {Button, Typography, Box, Grid, IconButton, Paper, TextField} from '@material-ui/core';
import { formatRelative } from "date-fns";
import useStyles from './UserMapStyles';
import mapStyles from './MapStyles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {userContext} from '../../contexts/userContext';

import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Search from './Search/Search';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

const libraries = ['places'];
const mapContainerStyle = {
    width: "100%",
    height: "100vh",
};
const center = {
    lat: 19.076090,
    lng: 72.87742
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}

const EditUserMap = () =>{
    const classes = useStyles();
    const history = useHistory();
    const context = useContext(userContext);
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [selectedDate, setSelectedDate] = useState(context.ride.timeOfArrival);
    const [pickup, setPickup] = useState({lng:context.ride.pickupLocation.location.coordinates[0],
        lat:context.ride.pickupLocation.location.coordinates[1],address:context.ride.pickupAddress});
    const [drop, setDrop] = useState({lng:context.ride.dropLocation.location.coordinates[0],
        lat:context.ride.dropLocation.location.coordinates[1],address:context.ride.dropAddress});
    const [markers, setMarkers] = useState([]);
    const mapRef = useRef();
    const mapLoad = useCallback((map)=>{mapRef.current=map},[]);
    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(17);
      }, []);
    // const onMapClick = useCallback((e) => {
    //     setMarkers((current) => [
    //       ...current,
    //       {
    //         lat: e.latLng.lat(),
    //         lng: e.latLng.lng(),
    //       },
    //     ]);
    //   }, []);
    console.log(pickup, drop);
    if (loadError) return "Error loading maps!";
    if (!isLoaded) return "loading maps";
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    console.log(selectedDate);
    const editRequest = async () => {
        const token = localStorage.getItem('token');
        let options = {
            credentials:"include",
            withCredentials:true,
        };
        if(token){
            options = {
            credentials:"include",
            withCredentials:true,
            headers:{
                'Authorization': "Bearer "+token,
            }
        };
        };
        console.log(drop.address);
        let dropData = `${drop.lng},${drop.lat}`;
        let pickData = `${pickup.lng},${pickup.lat}`;
        //console.log(pickData,dropData);
        let dropAddress = drop.address;
        let pickupAddress = pickup.address;
        let timeOfArrival = selectedDate;
        let stops = null; //later
        const data = {
            reqId: context.ride._id,
            dropLocation: dropData,
            pickupLocation: pickData,
            pickupAddress: pickupAddress,
            dropAddress: dropAddress,
            stops: stops,
            timeOfArrival: timeOfArrival,
        };
        console.log(data);
        const url = 'http://localhost:4000/request/edit';
        try{
            let resp = await axios.post(url,data,options);
            console.log(resp);
            context.setRide(resp.data);
            history.push('/');
        } catch (err){
            console.log(err);
        }
    }
    return (
        <Grid container>
            <Grid item md={3}>
            <Box style={{margin:"0 1rem"}}>
                <Grid container className={classes.form} spacing={4}>
                    <Grid item md={12} >
                        <Typography variant="h6" style={{textAlign: 'center'}}>Edit your Ride🚖</Typography>
                        <hr />
                    </Grid>
                    <Grid item md={12} >
                        <Typography className={classes.title}>
                            Pickup Location: {pickup.address? pickup.address: context.ride.pickupAddress}
                        </Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Typography className={classes.title}>
                            Drop Location: {drop.address? drop.address: context.ride.dropAddress}
                        </Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Typography className={classes.title}  >
                            Stops: 
                        </Typography>
                    </Grid>
                    <Grid item md={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Select when"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="At what time"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <Button onClick={editRequest} className={classes.rideButton}>Let's Go</Button>
                </Box>
            </Grid>
            <Grid item md={9}>
                <div>
                <Search panTo={panTo} setPickup={setPickup} setDrop={setDrop} />
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle} 
                    zoom={13} 
                    center={center}
                    options={options}
                    onLoad={mapLoad}>
                    {/* onClick={onMapClick} */}
                        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
                </GoogleMap>
                </div>  
            </Grid>
        </Grid>

   );
}

export default EditUserMap;
