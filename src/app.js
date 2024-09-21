const express = require('express');
const path = require('path');

/* Importamos method-override para poder usar acciones PUT y DELETE desde los formularios HTML */
const methodOverride = require("method-override");

//const indexRouter = require('./routes/index');
//const moviesRoutes = require('./routes/moviesRoutes');
//const genresRoutes = require('./routes/genresRoutes');
const genresRoutesAPI = require('./routes/api/genresRoutes');
const moviesRoutesAPI = require('./routes/api/moviesRoutes');
const actorsRoutesAPI = require('./routes/api/actorsRoutes');
const app = express();
//const db = require("./database/models");

// view engine setup
//app.set('views', path.resolve(__dirname, './views'));
//app.set('view engine', 'ejs');

//app.use(express.static(path.resolve(__dirname, '../public')));

/*Seccion app.use*/
//Configuracion para procesamiento de envios POST
app.use(express.json());
//Uso de method-override dentro de esta aplicacion
app.use(methodOverride("_method"));
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));


//app.use('/', indexRouter);
//app.use(moviesRoutes);
//app.use(genresRoutes);
app.use(genresRoutesAPI);
app.use(moviesRoutesAPI);
app.use(actorsRoutesAPI);



app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
