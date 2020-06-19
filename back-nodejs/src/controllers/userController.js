const jwt = require('jsonwebtoken');
const User = require('./../models/User');

const mainService = require('./../services/mainService');
const {json2csvAsync} = require('json-2-csv');

var fs = require('fs');


const registerUser = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        const newUser = new User({email, password});
        await newUser.save();

        return res.status(200).send({code:"200", message:"Registrado con exito"})
        

    }catch(err){
        console.log("error: ",err);
    }
    
    

}

const userLogin = async (req, res) => {  
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user) return res.status(400).send({status:400, message: "No existe usuario", response: null});
    
        if(user.password !== password) return res.status(200).send({status:200, message: "Contraseña incorrecta", response: null});
        
        const token = jwt.sign({user}, process.env.JWT_KEY);
        
        return res.status(200).send({token});
    }catch(err){
        console.log("err: ",err);
    }
   
    
}


const getBanderaControl = async (req,res) => {

    let paramCodLocal = req.body;

     try{
        
         const bandera = await mainService.getBandera(paramCodLocal);

         if(!bandera) return res.status(400).send({status:400, message: "No existen banderas", response:null});
 
         return res.status(200).send(bandera);
 
     }catch(err){
         res.send({error:err});
     }
      
 }
 const getRetailControl = async (req,res) => {
    let {flag} = req.body;
     try{
         const retail = await mainService.getRetail(flag);
         if(!retail) return res.status(400).send({status:400, message: "No existen banderas", response:null});
         
         return res.status(200).send(retail);
 
     }catch(err){
         res.send({error:err});
     }
      
 }

const getCodigoLocalControl = async (req,res) => {

    let {flag} = req.body;
    try{
        
        const bandera = await mainService.getCodigoLocales(flag);
        
        if(!bandera) return res.status(400).send({status:400, message: "No existen banderas", response:null});
        res.send(bandera);

    }catch(err){
        res.send({error:err});
    }
     
}
const getCategoriaControl = async (req,res) => {
    
    try{
        
        const categoria = await mainService.getCategoria();
        if(!categoria) return res.status(400).send({status:400, message: "No existen categoria", response:null});

        return res.status(200).send(categoria);

    }catch(err){
        res.send({error:err});
    }
     
}

const getMovimientoControl = async (req,res) => {
    const data = req.body;
    const { end, start } = data.periodo.week;
    const { bandera, categoria, retail, cod_local} = data.apertura;
    
    try{
        const movimiento = await mainService.getMovement(end, start, bandera, categoria, retail, cod_local);
        if(movimiento.length > 0){
            
            const options = {
                delimiter : {
                    wrap  : '"', 
                    field : ' | ', 
                    eol   : '\n' 
                },
                prependHeader    : true,
                sortHeader       : false,
                excelBOM         : true,
                trimHeaderValues : true,
                trimFieldValues  : true,
                
            };
            
    
            const csvData = await json2csvAsync(movimiento, options);

            res.setHeader('Content-disposition', 'attachment; filename=data.csv');
            res.setHeader('Content-Type', 'text/csv');
            return res.status(200).send(csvData);
            
        }else{
            return res.status(204).send({code:"204", "message":"No existen datos"})
        }

        
   }catch(err){
        console.log({error:err});
    }
}






module.exports = {userLogin, registerUser, getBanderaControl, getCategoriaControl, getCodigoLocalControl,getRetailControl, getMovimientoControl }