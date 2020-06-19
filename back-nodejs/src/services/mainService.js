const sequelize = require('./../db/dbSequelize');

sequelize.authenticate().then(()=> console.log("Sequelize iniciado")).catch(err => console.log("err",err));



const getBandera = async () => {

    try {
      const query = `SELECT s_bandera FROM store_master GROUP BY s_bandera`;
      const tables = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
    
      return tables;

    } catch (error) {
      console.log("error: ",error)
    }
  };
  
  
  
  const getRetail = async retail => {

    try {
      const query = `SELECT s_cadena from store_master WHERE s_bandera = '${retail}' group by s_cadena;`
      const tables = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});

      return tables;

    } catch (error) {
      console.log("error: ",err)
    }
    
    
  };
  
  const getCodigoLocales = async bandera => {
    
    try {
        const newQuert = `select s_cod_local from store_master where s_bandera = '${bandera}'`
        const tables = await sequelize.query(newQuert,{type: sequelize.QueryTypes.SELECT});

        return tables;
    } catch (error) {
        console.log("error: ",error)
    }
    
  };
  
  const getCategoria = async client => {
    try {
      
      const query = `SELECT *, COUNT(i_categoria) AS count FROM item_master GROUP BY i_categoria HAVING COUNT(i_categoria) > 1;`
      const tables = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
  
      return tables;
    } catch (error) {
      console.log("error: ",error)
    }
  };
  
  const getMovement = async (end, start, bandera, categoria, retail, cod_local) => {
    

    try{
      
      const query = `SELECT DISTINCT fecha, retail, s.s_bandera, m.cod_local, i.i_categoria, m.venta_unidades FROM movimiento m 
      INNER JOIN item_master i ON m.ean = i.i_ean inner join store_master s ON m.cod_local = s.s_cod_local WHERE s_bandera = '${bandera}' 
      AND cod_local = '${cod_local}' AND retail = '${retail}' AND i_categoria = '${categoria}' AND fecha BETWEEN '${start}' AND '${end}'`
  
      const tables = await sequelize.query(query,{type: sequelize.QueryTypes.SELECT});
                  
      return tables;

    }catch(err){
      console.log('error: ',err)
    }

    
  }

  module.exports = {getBandera, getRetail, getCodigoLocales, getCategoria, getMovement}
  