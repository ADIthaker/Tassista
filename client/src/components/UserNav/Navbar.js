import React , {Fragment, useContext, useEffect, useState} from 'react';
import useStyles from './NavStyles';
import {AppBar, Button, Toolbar,Typography, Box, Menu, MenuItem} from '@material-ui/core';
import {NavLink, Link, useHistory} from 'react-router-dom';
import {userContext} from '../../contexts/userContext';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Navbar = (props) => {
  const context = useContext(userContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const history = useHistory();
  const logoutHandler = async () => {
    setAnchorEl(null);
      const resp = await fetch('http://localhost:4000/logout',{
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    }});
    const respJson = await resp.json();
    localStorage.clear();
    context.setAppAuth(null);
    context.setAuth(false);
    history.push('/');
    }
    console.log(context, context.isAuth);
    return (
      <div style={{ width: '100%' }}>
       <AppBar position = "fixed" className = {classes.appbar}>
         <Toolbar className={classes.toolbar}>
           <Box ml={5}>
          <Typography  className={classes.logo} > 
            <NavLink to='/' className = {classes.homelink} >
               TassistaUser
            </NavLink>
           </Typography>
           </Box>
           <Box pl={4} > 
           <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Account
          </Button>
              <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem component={NavLink} to='/profile' onClick={()=>setAnchorEl(null)} >
                    My profile
                  </MenuItem> 
                  <MenuItem onClick={logoutHandler}  >
                    Logout
                  </MenuItem> 
                  </Menu>
          </Box>
         </Toolbar>
       </AppBar>
       </div>         
    );
  
      
}

export default Navbar;