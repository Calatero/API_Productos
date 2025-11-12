const express = require("express");
const routerApi = require('./routes/rutas');
const setupSwagger = require('./swagger');
const bodyParse = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const { logErrors, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

app.use(cors());
app.use(bodyParse.json());

setupSwagger(app);
routerApi(app);

app.use(logErrors);
app.use(errorHandler);

mongoose.connect(mongoUri)
    .then(() => console.log('Conexion a MongoDB exitosa'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

app.listen(port, () => {
  console.log('My server is working on: ' + port);
});
