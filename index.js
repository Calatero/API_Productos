const express = require("express");
const routerApi = require('./routes/rutas');
const app = express();
const port = 3000;

app.use(express.json());

routerApi(app);

app.listen(port, () => {
  console.log('My server is working on: ' + port);
});

// app.get("/", (req, res) => {
//   res.send('Hola mundo');
// });

// app.get("/nuevaruta", (req, res) => {
//   res.send('Hola mundo desde nueva ruta');
// });

// app.get("/categories/:categoryId/products/:productId", (req, res) => {
//   const { categoryId, productId } = req.params;
//   res.json({
//     categoryId,
//     productId
//   })
// });

//http://localhost:3000/users?username=Leo&lastname=Pozos
// app.get("/users", (req, res) => {
//   const { username, lastname } = req.query;
//   if (username && lastname) {
//     res.json({
//       username,
//       lastname
//     });
//   } else {
//     res.send("No hay parametros query");
//   }
// })
