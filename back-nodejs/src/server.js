require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');

require('./db/mongodb')
const app = express();
app.set('port', process.env.PORT || 3001);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/',routes)


app.listen(app.get('port'), ()=> {
    console.log("Servidor iniciado");
})