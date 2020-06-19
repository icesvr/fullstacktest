import {HttpHeadersConfig} from './../util/utils';

export const Auth = async (user) => {
  
    try{
        
        const config = HttpHeadersConfig('POST',undefined, user);
        const loginVerify = await fetch('http://localhost:3001/user/login', config);

        if(loginVerify.ok){
            return loginVerify;
        }else{
            console.log("No Auth");
        }
        
    }catch(err){
        console.log("error: ",err);
    }
    
    

    
}
