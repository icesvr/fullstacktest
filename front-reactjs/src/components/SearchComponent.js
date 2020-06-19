import React,{useState, useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {FormControl,InputLabel, Box,  Select, MenuItem, Button, Paper} from '@material-ui/core/';
import {getBandera, getCategoria, getCodigoLocal, getRetail, sendFormData }  from './../services/utilServices';
import DatePicker, {registerLocale} from 'react-datepicker';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';



import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
registerLocale("es", es);


const useStyles = makeStyles(theme => ({
    
 
    grid: {
      height: "100vh"
    },
    boxMain: {
        height: "90%"
        
    },
    paperBox: {
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
      container : {maxWidth: 1200,
      margin: `${theme.spacing(2)}px auto`,
      padding: theme.spacing(4),
      backgroundColor: '#e0e0e0'
      
    },
    selectInput :{
        
        border: '1px solid #ced4da'
    },
    root : {
        color:"red"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }

  }));


const SearchComponent = () => {
    
    const classes = useStyles();

    const [selectedDateStart, setSelectedDateStart] = useState(null);
    const [selectedDateEnd, setSelectedDateEnd] = useState(null);
    const [selectedBandera, setSelectedBandera] = useState("");
    const [selectedCod, setSelectedCod] = useState("");
    const [selectedRetail, setSelectedRetail] = useState("");
    const [selectedCategoria, setSelectedCategoria] = useState("");
    const [bandera, setBandera] = useState([]);
    const [codLocal, setCodLocal] = useState([]);
    const [retail, setRetail] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [open, setOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState('');

  

    useEffect( () => {
        const bandera = getBandera();
        bandera.then( flag => {
            return flag.json();
        }).then( json => {
            
            setBandera(json)
        }).catch(err => console.log("err: ",err));
    
    },[]);

    

    useEffect( () => {
        const categoria = getCategoria();
        categoria.then( categoria => {
            return categoria.json();
        }).then( json => {
            setCategoria(json)
        }).catch(err => console.log("err: ",err));

    },[])

  
    const handleCodLocal = async(flag) => {
        
        getCodigoLocal(flag)
        .then( cod => {  
             return cod.json();
        })
        .then(json =>{
            setCodLocal(json);
           
            
        });
        
        getRetail(flag).then( res => {
            return res.json();
        }).then(json=>{
            setSelectedRetail(json);
            setRetail(json);
        })
        
    }

    const handleChange = (value, select) => {
        let valor = (select ==='bandera') ? setSelectedBandera(value) : 
                    (select === 'codlocal') ? setSelectedCod(value) : 
                    (select === 'categoria') ? setSelectedCategoria(value)  : 
                    (select === 'retail') ?setSelectedRetail(value)  :'doNothing';
    };

    const handleSelectedCod = (a)=>{
        setSelectedCod(a);
    }
    
 const handleDownload = (event) => {
    event.persist();
    const data = {
                 "fuente": {
                     "b2b": [
                         "ventaUnidades"
                     ]
                 },
                 "periodo": {
                     "week": {
                         "end": selectedDateEnd,
                         "start": selectedDateStart
                     }
                 },
                 "opts": {
                     "sumarPeriodo": false
                 },
                 "apertura": {
                     "bandera": [selectedBandera],
                     "categoria": [selectedCategoria],
                     "retail": [selectedRetail],
                     "cod_local": [selectedCod]
                },
                 "TipoDescarga": "csv"
    }



    sendFormData(data).then((response) => {
        setModalMsg('No existen registros con el filtro ingresado.');

        if(response.status === 200){
            response.blob().then(blob => {
                setModalMsg('Descargando archivo csv...');
                    handleOpen();
                    setTimeout(()=>{
                        handleClose();
                    },2000);
                
            	let url = window.URL.createObjectURL(blob);
            	let a = document.createElement('a');
            	a.href = url;
            	a.download = 'informe.csv';
                a.click();
                
            });
        }
        
        handleOpen();
        
    });

 }
 const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    

    return (
        <Paper className={ classes.container } spacing={1}>
            <Box className={classes.paperBox}>
                        <FormControl className={classes.formControl}>
                        
                        <DatePicker className="mt-4" color="primary" selected={selectedDateStart} onChange={(date) => setSelectedDateStart(date)} locale="es" className="mt-3"  dateFormat="dd'-'MMMM'-'yyyy"/>
                        
                        </FormControl>
                        
                        <FormControl className={classes.formControl}>
                       
                        <DatePicker  className="mt-4" selected={selectedDateEnd} onChange={(date) => setSelectedDateEnd(date)} locale="es" className="mt-3"  dateFormat="dd'-'MMMM'-'yyyy"/>
                            
                            
                        </FormControl>
                        <FormControl className={classes.formControl}>
                        
                        <InputLabel htmlFor="demo-customized-select-native" color="secondary">Bandera</InputLabel>
                            <Select labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"  color="secondary"value={selectedBandera} onChange={e => handleChange(e.target.value,'bandera')} >
                                {
                                    bandera.map( flag => {
                                        return <MenuItem key={`${flag.s_bandera}_` } onClick={ () =>  handleCodLocal(flag.s_bandera)} value={flag.s_bandera} >{flag.s_bandera}</MenuItem>
                                    })
                            }

                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-customized-select-native" color="secondary">Codigo</InputLabel>
                            <Select value={selectedCod} color="secondary"  onChange={e => handleChange(e.target.value,'codlocal')} >
                                {
                                    codLocal.map( cod => {
                                        return <MenuItem key={`${cod.s_cod_local}_` }value={cod.s_cod_local} onClick={()=> handleSelectedCod(cod.s_cod_local)} >{cod.s_cod_local}</MenuItem>
                                    })
                                }
                                </Select>
                        </FormControl>
                        <FormControl className={classes.formControl} >
                            <InputLabel  htmlFor="demo-customized-select-native" color="secondary">Retail</InputLabel>
                            <Select color="secondary"  value={selectedRetail} onChange={e => handleChange(e.target.value,'retail')} >
                            
                            {
                                    retail.map( retail=> {
                                        return <MenuItem key={ retail.s_cadena} value={retail.s_cadena}> {retail.s_cadena}</MenuItem>
                                    })
                            }
     
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="demo-customized-select-native" color="secondary">Categoria</InputLabel>
                            <Select color="secondary" value={selectedCategoria} onChange={e => handleChange(e.target.value,'categoria')} >
                            
                            {
                                    categoria.map( cat=> {
                                        return <MenuItem  key={cat.i_categoria } value={cat.i_categoria}> {cat.i_categoria}</MenuItem>
                                    })
                            }
     
                            </Select>
                        </FormControl>

                        <FormControl>
                            
                            <Button variant="contained" className="mt-4" color="secondary" onClick={handleDownload}>
                                Descargar
                            </Button>
                        
                            
                        </FormControl>
                        
                        
                    </Box>
                    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" className={classes.modal}
                    open={open}onClose={handleClose}closeAfterTransitionBackdropComponent={Backdrop}BackdropProps={{timeout: 500,}}>
                    <Fade in={open}>
                      <div className={classes.paper}>
                        
                        <p id="transition-modal-description">{modalMsg}</p>

                      </div>
                    </Fade>
                  </Modal>

        </Paper>
        
        

    )

}

export default SearchComponent;
