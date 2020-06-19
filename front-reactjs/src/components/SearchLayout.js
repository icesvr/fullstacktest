import React, {useState} from 'react';
import HeaderComponent from './HeaderComponent';
import { makeStyles } from "@material-ui/core/styles";
import {Box } from '@material-ui/core/';
import SearchComponent from './SearchComponent';
 
import "react-datepicker/dist/react-datepicker.css";


const useStyles = makeStyles(theme => ({
 
    grid: {
      height: "100vh",
     
    },
    boxMain: {
        height: "90%",
      
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },

  }));

const SearchLayout = ( props ) => {
    const classes = useStyles();
   


    return (
        
        <div  height="100%">
            
            
            <Box className={classes.grid}>
            <HeaderComponent />
                <Box display="flex" justifyContent="center" alignItems="center" m={1} p={1}  className={classes.boxMain}>
                    <SearchComponent />
                </Box>
            </Box>
           

        </div>
        
    )
}


export default SearchLayout;