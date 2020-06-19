import React, {useState} from 'react';
import {FormControl, InputLabel, Input, FormHelperText, Grid, Paper, Box, Avatar} from '@material-ui/core/';
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from './../services/userServices';
import {  useHistory } from "react-router-dom";


import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
 
    grid: {
      height: "100vh",
      
      
    },
    boxMain: {
        height: "100%",
        
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: "red",
        backgroundColor: "#e6e6e6"
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      size : {
          width: "80%",
          height : "55%"
      },
      msg : {
          color: "red"
      },
      avatar :{
          margin: "auto",
          width : 150,
          height: 150,
          marginTop:70,
          marginBottom:30,
            

      }

  }));

const LoginComponent = ({handleLogin}) => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
 
    const history = useHistory();
    

    const requestLogin = () => {
        
        const user = {
            email,
            password
        }
       const response = Auth(user);
       response.then( response => {
           if(response.ok){
               return response.json();
              
           }
       }).then( json => {
            localStorage.setItem("token", json.token);
            history.push("/search");
            
       }).catch( err => setMensaje('Contraseña o usuario incorrectos...'));
    }



    return (
    <div  height="100%"> 
        <Box className={classes.grid} > 
       

        
            <Box display="flex" justifyContent="center" alignItems="center" m={1} p={1}  className={classes.boxMain}>
            
            <Paper  elevation={3} className={classes.size}>
                <Grid>
                <Avatar  src="assets/heisenberg.png" className={classes.avatar} />
                </Grid>
                    <Grid container direction="column" justify="space-between" alignItems="center" mt={3}>
                        <Grid item xs={12} >
                            <FormControl >
                                <InputLabel color="secondary"  htmlFor="my-input" textAlign="center">Email address</InputLabel>
                                <Input color="secondary" id="my-input" aria-describedby="my-helper-text" textAlign="center" onChange={e => setEmail(e.target.value)}/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <InputLabel color="secondary" htmlFor="my-input">Password</InputLabel>
                                <Input color="secondary" id="my-input" aria-describedby="my-helper-text" type="password" onChange={e => setPassword(e.target.value)}/>
                            </FormControl> 
                        </Grid>
                        <FormHelperText id="my-helper-text" className={classes.msg}>{mensaje}</FormHelperText>
                        <Grid item xs={12}> 
                            <Button t={0.5} color="secondary" variant="contained" style={{marginTop : 30, marginBottom : 30}} onClick={requestLogin}>Enter</Button>
                        </Grid>
                    </Grid>
            </Paper> 
            </Box>
        </Box>
    </div>       
    )
}


export default LoginComponent;