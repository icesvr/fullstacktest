import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#FFFFFF"
  },
  title: {
    flexGrow: 1,
  },
}));

const HeaderComponent = () => {
  const classes = useStyles();


  const Logout = () =>{
    return(
      <a onClick={()=> {localStorage.removeItem("token"); window.location.reload();}}>Logout</a>
    )
         
  }

  return (
    <div className={classes.root}>
    
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
              <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderComponent;