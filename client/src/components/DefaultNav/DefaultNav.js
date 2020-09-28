import React , {Fragment, useContext, useEffect, useState} from 'react';
import useStyles from './DefaultNavStyles';
import {AppBar, Button, Toolbar,Typography, Box, Menu, MenuItem} from '@material-ui/core';
import {NavLink, Link, useHistory} from 'react-router-dom';
import {userContext} from '../../contexts/userContext';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Navbar = (props) => {
  const context = useContext(userContext);
  // const user  = context.getUser('token');
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const history = useHistory();
  // console.log(context, context.isAuth);
  
    return (
           <AppBar position = "relative" className = {classes.appbar}>
            <Toolbar className={classes.toolbar} >
              <Box ml={2} >
              <Typography  className={classes.logo} > 
                <NavLink to='/' className = {classes.homelink} >
                  TassistaDef
                </NavLink>
              </Typography>
              </Box>
              <Box mx={6}>
              <Button component={NavLink} to='/driver/register' mr={4} >
                  Drive us 
              </Button>
              
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                Account <ArrowDropDownIcon/>
              </Button>
              <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={NavLink} to='/login' onClick={()=>setAnchorEl(null)} >
                    Login
                  </MenuItem>
                  <MenuItem component={NavLink} to='/register' onClick={()=>setAnchorEl(null)} >
                    Signup
                  </MenuItem>
              </Menu> 
              </Box>
            </Toolbar>
          </AppBar> 
      
    );
  
}

export default Navbar;