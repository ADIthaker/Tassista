import React , {Fragment, useContext, useEffect, useState} from 'react';
import useStyles from './DefaultNavStyles';
import clsx from 'clsx';
import {AppBar, Button, Toolbar,Typography, Box, Menu, MenuItem,
  useMediaQuery,
  List,ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,} from '@material-ui/core';
import {NavLink, Link, useHistory} from 'react-router-dom';
import {userContext} from '../../contexts/userContext';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AddIcon from '@material-ui/icons/Add';


const Navbar = (props) => {
  const context = useContext(userContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawer, setDrawerState] = useState(false);
  const isMdWidth = useMediaQuery(theme=>theme.breakpoints.up("md"));
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const history = useHistory();
  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState( open );
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key={"Home"} component={NavLink} to="/">
            <ListItemIcon> <HomeIcon /> </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button key={"Ride now"}>
            <ListItemIcon> <LocalTaxiIcon /> </ListItemIcon>
            <ListItemText primary={"Ride now"} />
          </ListItem>
          <ListItem button key={"Login"} component={NavLink} to="/login">
            <ListItemIcon><VpnKeyIcon/>  </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>
          <ListItem button key={"Sign up"} component={NavLink} to="/register">
            <ListItemIcon> <AddIcon/> </ListItemIcon> 
            <ListItemText primary={"Sign up"} />
          </ListItem>
   
      </List>
      <Divider />
      <List>
          <ListItem button key={"Join us"} component={NavLink} to="/driver/register">
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary={"Join us"} />
          </ListItem>
      </List>
    </div>
  );
  if(!isMdWidth){
    return(
      <AppBar position = "relative" className = {classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Box ml={1}>
       <Typography  className={classes.logo} > 
         <NavLink to='/' className = {classes.homelink} >
            TassistaDef
         </NavLink>
        </Typography>
        </Box>
        <Box pl={4} > 
        <Button onClick={toggleDrawer(true)}><MenuIcon/></Button>
        <SwipeableDrawer
          anchor="top"
          open={drawer}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list("top")}
        </SwipeableDrawer>
       </Box>
      </Toolbar>
    </AppBar>
    
    );
    
  }
  
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