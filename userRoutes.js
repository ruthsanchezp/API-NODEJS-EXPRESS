//const express = require('express');
//const usuarioController = require('../controllers/controller');

//const router = express.Router();

//router.post("/usuario", usuarioController.createUser);
//router.get('/usuario', usuarioController.getUsers);
//router.get('/usuario/:id', usuarioController.getUserById);
//router.put('/usuario/:id', usuarioController.updateUserById);
//router.delete('/usuario/:id', usuarioController.deleteUserById);

//module.exports = router;


// http:localhost:3000/api/usuario

// routes/reservationRoutes.js
const express = require('express');
const reservationsController = require('../controllers/controller');

const router = express.Router();

router.post("/reservas", reservationsController.createReservation);
router.get('/reservas', reservationsController.getAllReservations);
router.get('/reservas/:id', reservationsController.getReservationById);
router.put('/reservas/:id', reservationsController.updateReservationById);
router.delete('/reservas/:id', reservationsController.deleteReservationById);
//router.get('/reservas/tipo_habitacion', reservationsController.getReservationsByRoomType);
//#router.get('/reservas/estado', reservationsController.getReservationsByStatus);
//#router.get('/reservas/num_huespedes', reservationsController.getReservationsByGuestCount);


module.exports = router;
