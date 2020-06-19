export const HttpHeadersConfig = (method,token, data) =>{
    let headerValue = (token !== undefined) ? 
        {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        } : {
            'content-type': 'application/json',
        }
    
    const headerConfig = {
        method,
        headers: new Headers(headerValue),
        body : JSON.stringify({
            "email" : data.email,
            "password" : data.password
        }),
        mode: 'cors',
        cache: 'default'
    }
 
    return headerConfig;
}