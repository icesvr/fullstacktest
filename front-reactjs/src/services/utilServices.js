

const token = localStorage.getItem("token");
const headerConfig = {
    method :'POST',
    headers: new Headers({
        'content-type': 'application/json',
        'Autorization' : `Bearer ${token}`
    }),
    mode: 'cors',
    cache: 'default'
}

const host = "http://localhost:3001";


const getBandera = async (codLocal) => {
    
    const data = {
        codLocal
    }


   const bandera = await fetch(`${host}/user/getbandera`, {
       ...headerConfig,
       body:JSON.stringify(data)
   })

   return bandera;

}

const getCategoria = async () => {
    

    const categoria = await fetch(`${host}/user/getcategoria`, headerConfig);

    return categoria;
}

const getCodigoLocal = async (bandera) => {
  
    let data = {
        flag:bandera
    }

    const codLocal = await fetch(`${host}/user/getcodigolocal`, {
        ...headerConfig,
        body:JSON.stringify(data)
    
    });
    return codLocal;
}

const getRetail = async (bandera) => {
    let data = {
        flag:bandera
    }
    
    const retail = await fetch(`${host}/user/getretail`, {
        ...headerConfig,
        body:JSON.stringify(data)
    });

    return retail;
}

const sendFormData = async(data) => {

    const dataFilter = await fetch(`${host}/user/getmovimiento`,{
        ...headerConfig,
        body:JSON.stringify(data)
    })

    return dataFilter;
}

module.exports = {getBandera, getCategoria, getCodigoLocal, getRetail, sendFormData}
