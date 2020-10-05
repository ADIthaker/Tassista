import React from 'react';
import useStyles from '../UserMapStyles';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {IconButton, Paper, TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Search = ({panTo, setPickup, setDrop}) => {
    const classes = useStyles();
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          location: { lat: () => 19.076090, lng: () => 72.877426 },
          radius: 100 * 1000,
        },
    });
    const handleDropSelect  = async (val) => {
        let address;
        if(val!=='' && val!==null ){
            address = val.description;
        } else {
            panTo({ lat: 19.076090, lng: 72.87742 }); 
            return 0;
        }
        clearSuggestions();
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          setDrop({lat:lat,lng:lng,address: results[0].formatted_address});
          panTo({ lat, lng });
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      const handlePickupSelect = async (val) => {
        let address;
        if(val!==''&& val!==null){
            address = val.description;
        } else {
            panTo({ lat: 19.076090, lng: 72.87742 }); 
            return 0;
        }
        clearSuggestions();
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          setPickup({lat:lat,lng:lng,address: results[0].formatted_address});
          panTo({ lat, lng });
        } catch (error) {
          console.log("Error: ", error);
        }
      };
    return (
        <div>
            <Autocomplete
                    onChange = {(e,newVal)=>handlePickupSelect(newVal)}
                    options={data}
                    freeSolo
                    getOptionLabel={(data)=>data.description}
                    renderInput={
                        (params)=>
                            <Paper className={classes.root}>
                                <TextField
                                    className={classes.input}
                                    placeholder="Add pickup location"
                                    {...params}
                                    value={value}
                                    onChange={(e)=>setValue(e.target.value)}
                                    />
                                <IconButton onClick={()=>handlePickupSelect()}>
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                    } />
                <Autocomplete
                    onChange = {(e,newVal)=>handleDropSelect(newVal)}
                    options={data}
                    freeSolo
                    getOptionLabel={(data)=>data.description}
                    renderInput={
                        (params)=>
                            <Paper className={classes.root2}>
                                <TextField
                                    className={classes.input}
                                    placeholder="Add drop location"
                                    {...params}
                                    value={value}
                                    onChange={(e)=>setValue(e.target.value)}
                                    />
                                <IconButton onClick={()=>handleDropSelect()}>
                                    <SearchIcon />
                                </IconButton>
                            </Paper>
                    } />
                </div>
    )
}
export default Search;