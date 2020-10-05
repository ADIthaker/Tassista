import React,{useCallback, useRef, useState} from 'react';
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

import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Search from './Search/Search';

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

const UserMap = () =>{
    const classes = useStyles();
    const history = useHistory();
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [pickup, setPickup] = useState({});
    const [drop, setDrop] = useState({});
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
    const sendRequest = async () => {
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
        let dropData = `${drop.lng},${drop.lat}`;
        let pickData = `${pickup.lng},${pickup.lat}`;
        let dropAddress = drop.address;
        let pickupAddress = pickup.address;
        let stops = null; //later
        const data = {
            dropLocation: dropData,
            pickupLocation: pickData,
            pickupAddress: pickupAddress,
            dropAddress: dropAddress,
            stops: stops,
        };
        const url = 'http://localhost:4000/request/new';
        try{
            let resp = await axios.post(url,data,options);
            console.log(resp);
            history.push('/');
        } catch (err){
            console.log(err);
        }
    }
    return (
        <Grid container>
            <Grid item md={4}>
            <Box style={{margin:"0 1.2rem"}}>
                <Grid container className={classes.form}>
                    <Grid item md={12} >
                        <Typography variant="h6" style={{textAlign: 'center'}}>Book a Ride🚖</Typography>
                        <hr />
                    </Grid>
                    <Grid item md={12}>
                        <p>Pickup Location: {pickup.address? pickup.address: null}</p>
                    </Grid>
                    <Grid item md={12}>
                        <p>Drop Location: {drop.address? drop.address: null}</p>
                    </Grid>
                    <Grid item md={12}  >
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
                    <Grid item md={12}>
                        <Button >Clear input</Button>
                    </Grid>
                </Grid>
                <Button onClick={sendRequest}>Let's Ride</Button>
                </Box>
            </Grid>
            <Grid item md={8}>
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

export default UserMap;
