import React,{useState, useEffect} from 'react';
import LoginComponent from './LoginComponent';
import {Container} from '@material-ui/core';







const MainComponent = () => {
    const [auth, setAuth] = useState(true);
      
    useEffect(()=>{
        setAuth(true);
    })    

    const handleLogin = (value) => {
        
        setAuth(value);
    } 
    return (
        <Container maxWidth="sm" justifyContent="center" >

                <LoginComponent handleLogin={handleLogin}  />
                
        </Container>
        
    )  
}



export default MainComponent;