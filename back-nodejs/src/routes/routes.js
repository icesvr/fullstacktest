const express = require('express');
const jwt = require('jsonwebtoken');
const app = express.Router();
const {downloadCSV, userLogin, registerUser, getBanderaControl, getCategoriaControl, getCodigoLocalControl,getRetailControl,getqry, getMovimientoControl} = require('./../controllers/userController');

//const createCSV = require('./../utils/createcsv');




app.post('/user/login', (req,res)=>{
    
    const {email, password} = req.body;
    userLogin(req,res);


});

app.post('/user/register', (req,res) => {
    registerUser(req,res);     
});

app.post('/user/getbandera', (req,res)=>{ 
    getBanderaControl(req,res)
 });
 
 app.post('/user/getretail', (req,res)=>{
    getRetailControl(req,res)
 });

 app.post('/user/getcodigolocal', (req,res)=>{
    getCodigoLocalControl(req,res)
 });


app.post('/user/getcategoria', (req,res)=>{
    getCategoriaControl(req,res);
});

app.post('/user/getmovimiento',(req,res)=>{
    
    getMovimientoControl(req,res);
})

app.post('/generate', (req,res)=>{
    let data = req.body;
    downloadCSV(req,res,data);
});

app.get('/download', (req,res)=>{
    downloadCSV(req,res);
});


function verifyToken(req,res,next){

    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized')
    }
 
    const bearerToken = req.headers.authorization.split(" ")[1];

    if(bearerToken === 'null'){
        return res.status(401).send('null');
    }

    const payload = jwt.verify(bearerToken, process.env.JWT_KEY);
  
    next();
}



module.exports = app;
