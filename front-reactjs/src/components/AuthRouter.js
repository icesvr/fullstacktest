import React from 'react';
import {BrowserRouter, Switch,Route} from 'react-router-dom';
import MainComponent from './MainComponent';
import SearchLayout from './SearchLayout';
import PrivateRoute from './Protected';


const AuthRouter = () => {
   
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainComponent} />
                
                <PrivateRoute exact path="/search">
                    <SearchLayout />
                </PrivateRoute> 
                

            </Switch>
        </BrowserRouter>
    )
}

export default AuthRouter;