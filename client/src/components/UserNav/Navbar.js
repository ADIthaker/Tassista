import React , {Fragment, useContext, useEffect, useState} from 'react';
import useStyles from './NavStyles';
import clsx from 'clsx';
import {AppBar, Button, Toolbar,Typography, Box, Menu, MenuItem, Avatar,
  useMediaQuery,
  List,ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,} from '@material-ui/core';
import {NavLink, Link, useHistory} from 'react-router-dom';
import {userContext} from '../../contexts/userContext';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

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
    let filesrc;
    if(context.user.picture && context.user.picture.startsWith('https'))
    {
        filesrc=context.user.picture;
    } else {
        filesrc = 'http://localhost:4000/'+context.user.picture;
    }
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
            <ListItem button key={"My Profile"} component={NavLink} to="/profile">
              <ListItemIcon> <Avatar className={classes.profile} src={filesrc} /> </ListItemIcon>
              <ListItemText primary={"My Profile"} />
            </ListItem>
     
        </List>
        <Divider />
        <List>
            <ListItem button key={"Logout"} onClick={logoutHandler}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary={"Logout"} />
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
              Tassista
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
         <Toolbar className={classes.toolbar}>
           <Box ml={5}>
          <Typography  className={classes.logo} > 
            <NavLink to='/' className = {classes.homelink} >
               Tassista
            </NavLink>
           </Typography>
           </Box>
           <Box pl={4} > 
           <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <Avatar className={classes.profile}src={filesrc}/>{context.user.username.split(" ")[0]} <ArrowDropDownIcon/>
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
          
    );
  
      
}

export default Navbar;