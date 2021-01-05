import React,{useCallback, useContext, useRef, useState, useEffect} from 'react';
import {
    GoogleMap,
    useLoadScript,
    DirectionsService,
    DirectionsRenderer,
    DistanceMatrixService,
    Marker,
} from "@react-google-maps/api";
import {Button, Typography, Box, Grid, } from '@material-ui/core';
import useStyles from './DriverMapStyles';
import mapStyles from './MapStyles';
import {userContext} from '../../contexts/userContext';
import axios from 'axios';
import {useHistory, useParams} from 'react-router-dom';


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
    const context = useContext(userContext);
    const [pickup, setPickup] = useState({});
    const [drop, setDrop] = useState({});
    const [dirResponse, setDirResponse] = useState(null);
    const [distResponse, setDistResponse] = useState(null);
    const [distInfo,setDistInfo] = useState({});
    const {reqId} = useParams();
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = useState([]);
    const mapRef = useRef();
    const mountedRef = useRef(true);
    const mapLoad = useCallback((map)=>{mapRef.current=map},[]);
    console.log("rendered again");
    const directionsCallback =  (response) => {

        if (response !== null && dirResponse===null) {
          if (response.status === 'OK') {
            setDirResponse(response);
          } else {
            console.log('directions response: ', response);
          }
        }
      }
      const distanceCallback =  (response) => {
        if (response !== null && distResponse === null) {
          if (response.rows[0].elements[0].status === 'OK') {
            console.log('changong dist data');
            setDistResponse(response);
            setDistInfo({
              duration: response.rows[0].elements[0].duration.text,
              distance: response.rows[0].elements[0].distance.text,
            });
          } else {
            console.log('distance response: ', response);
          }
        }
      }
    const sendRequest = useCallback(async () => {
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
        const url = `http://localhost:4000/request/accept/${reqId}`;
        try{
            let resp = await axios.get(url,options);
            if (!mountedRef.current) return null;
            // console.log(resp.data);
            setMarkers([
                {lat:resp.data.dropLocation.location.coordinates[1],
                lng:resp.data.dropLocation.location.coordinates[0]},
                {lat:resp.data.pickupLocation.location.coordinates[1],
                lng:resp.data.pickupLocation.location.coordinates[0]}
            ]);
            setPickup({
                lat:resp.data.pickupLocation.location.coordinates[1],
                lng:resp.data.pickupLocation.location.coordinates[0]
            });
            setDrop({
                lat:resp.data.dropLocation.location.coordinates[1],
                lng:resp.data.dropLocation.location.coordinates[0]
            });
            //localStorage.setItem('ride',JSON.stringify({isRide:true,...resp.data}));
            context.setRide({isRide:true,...resp.data});
        } catch (err) {
            console.log(err);
        }
    });
    //console.log(markers);
    useEffect(()=>{
        sendRequest();
        return () => { 
            mountedRef.current = false
        }
    },[]);
    // const onMapClick = useCallback((e) => {
    //     setMarkers((current) => [
    //       ...current,
    //       {
    //         lat: e.latLng.lat(),
    //         lng: e.latLng.lng(),
    //       },
    //     ]);
    //   }, []);
    if (loadError) return "Error loading maps!";
    if (!isLoaded) return "loading maps"; 
    return (
        <Grid container>
            <Grid item md={3}>
            <Box style={{margin:"0 1rem"}}>
                <Grid container className={classes.form} spacing={4}>
                    <Grid item md={12} >
                        <Typography variant="h6" style={{textAlign: 'center'}}>Reach in Time</Typography>
                        <hr />
                    </Grid>
                    <Grid item md={12} >
                    <Typography className={classes.title}>
                        User Name 
                    </Typography>
                    <div className={classes.infoText}>
                    {context.ride && context.ride.userId.username}
                    </div>
                    </Grid>
                    <Grid item md={12}>
                        <Typography className={classes.title}>
                           Drop Address  
                        </Typography>
                        <div className={classes.infoText}>
                        {context.ride && context.ride.dropAddress}
                        </div>
                    </Grid>
                    <Grid item md={12}>
                        <Typography className={classes.title}>
                           Pickup Address  
                        </Typography>
                        <div className={classes.infoText}>
                        {context.ride && context.ride.pickupAddress}
                        </div>
                    </Grid>
                    <Grid item md={12}>
                        <Typography className={classes.title}>
                          Time       {/* Phone No: {context.ride && context.ride.userId.phoneNo}  */}
                        </Typography>
                        <div className={classes.infoText}>
                          {distInfo.duration}
                        </div>
                    </Grid>
                    <Grid item md={12}>
                        <Typography className={classes.title}>
                          Distance         
                        </Typography>
                        <div className={classes.infoText}>
                          {distInfo.distance}
                        </div>
                    </Grid>
                    <Grid item md={12}>
                        <Typography className={classes.title}  >
                  Stops 
                        </Typography>
                < div className = {
                  classes.infoText
                } >
                  None
                </div>
                    </Grid>
                    <Grid item md={12}>
                        
                    </Grid>
                </Grid>
                </Box>
            </Grid>
            <Grid item md={9}>
                <div>
                <GoogleMap 
                    mapContainerStyle={mapContainerStyle} 
                    zoom={13} 
                    center={center}
                    options={options}
                    onLoad={mapLoad}>          
              (pickup !== { } && drop !== { }) && (
                <DirectionsService
                  // required
                  options={{ 
                    destination: drop,
                    origin: pickup,
                    travelMode: 'DRIVING'
                  }}
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                  }}
                  // required
                  callback={directionsCallback}
                />
                )
                {dirResponse !== null && (
                <DirectionsRenderer
                  // required
                  options={{ 
                    directions: dirResponse
                  }}
                />
              )
            }
            (distResponse === null) && ( <
              DistanceMatrixService callback = {
                distanceCallback
              }
              options = {
                {
                  origins: [pickup],
                  destinations: [drop],
                  travelMode: 'DRIVING',
                }
              }
              onLoad = {
                directionsService => {
                  console.log('DirectionsService onLoad directionsService: ', directionsService)
                }
              }
              />
            )  
                    {/* onClick={onMapClick} */}
                        {markers.map((marker) => {
                            //console.log(marker);
                            return(<Marker
                                key={`${marker.lat}-${marker.lng}`}
                                position={{ lat: marker.lat, lng: marker.lng }}
                              />);                            
                        })}
                </GoogleMap>
                </div>  
            </Grid>
        </Grid>

   );
}
export default UserMap;
