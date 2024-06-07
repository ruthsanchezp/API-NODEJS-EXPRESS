
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
