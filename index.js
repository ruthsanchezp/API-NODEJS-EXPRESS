//require('dotenv').config(); // permite obtener variables definidas en el archivo .env
//const express = require('express');
//const userRoutes = require('./routes/userRoutes');

//const app = express();
//const port = process.env.PORT || 3000;

//app.use(express.json()); // middleware para procesar peticiones tipo JSON
//app.use(express.urlencoded({ extended: true }));

//app.post('/usuario', UsuarioController.userRegister)
// 
//app.use('/api', userRoutes)

//app.listen(port, () => {
  //  console.log('Servidor iniciado en el puerto ' + port);
//})

// http:localhost:3000/api/usuario

// server.js
require('dotenv').config();
const express = require('express');
const reservationRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', reservationRoutes);

app.listen(port, () => {
    console.log('Server running on port ' + port);
});


