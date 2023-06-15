const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//console.log( process.env )

// Crear el servidor de express
const app = express();

// Base d datos
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use(express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

app.get('*', ( req, res) => {
  res.sendFile( __dirname + '/public/index.html' );
})

// Escchar peticiones
app.listen( process.env.PORT , () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
