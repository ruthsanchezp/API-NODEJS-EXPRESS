// const Usuario = require('../models/model');
// const moment = require('moment');

// let users = [];

// exports.createUser = async (req, res) => {
//     const { nombre, email, rol } = req.body;
//     const newUser = new Usuario(users.length + 1, nombre, email, rol, moment())

//     users.push(newUser);

//     res.json({
//         msg: "Usuario creado con éxito.",
//         data: newUser
//     });
// };

// exports.getUsers = async (req, res) => {
//     const { rol, fecha_inicio, fecha_fin } = req.query; 

//     if (rol) {
//         const usersFiltered = users.filter(user => user.rol === rol);
//         if (usersFiltered.length === 0) {
//             return res.status(404).json({ msg: 'No se encontraron usuarios' });
//         }

//         return res.json({
//             msg: "Usuarios",
//             data: usersFiltered
//         })
//     } else if (fecha_inicio && fecha_fin) {
//         const startDate = moment(fecha_inicio);
//         const endDate = moment(fecha_fin);

//         const usersFiltered = users.filter(user => user.fechaCreacion.isBetween(startDate, endDate) === true);
//         if (usersFiltered.length === 0) {
//             return res.status(404).json({ msg: 'No se encontraron usuarios' });
//         }

//         return res.json({
//             msg: 'Usuarios',
//             data: usersFiltered
//         })
//     }
//     else {
//         return res.json({
//             msg: 'Usuarios',
//             data: users
//         })
//     }
// }

// exports.getUserById = async (req, res) => {
//     const userId = parseInt(req.params.id);
//     const user = users.find(user => user.id === userId)

//     if (!user) {
//         return res.status(404).json({ msg: "Usuario no encontrado." });
//     }

//     return res.json({
//         msg: 'Usuario obtenido con éxito.',
//         data: user
//     })
// }

// exports.updateUserById = async (req, res) => {
//     const userId = parseInt(req.params.id);
//     const userIndex = users.findIndex(user => user.id === userId); // [usuario1, usuario2]

//     if (userIndex === -1) {
//         return res.status(404).json({ msg: "Usuario no encontrado." });
//     }

//     users[userIndex] = { ...users[userIndex], ...req.body } //spread

//     return res.json({
//         msg: 'Usuario actualizado con éxito.',
//         data: users[userIndex]
//     })
// }

// exports.deleteUserById = async (req, res) => {
//     const userId = parseInt(req.params.id);
//     const userIndex = users.findIndex(user => user.id === userId); // 1 o 2 o 0

//     if (userIndex === -1) {
//         return res.status(404).json({ msg: "Usuario no encontrado." });
//     }

//     users.splice(userIndex, 1);

//     return res.json({ msg: "Usuario eliminado con éxito." });
// }


// controllers/reservationsController.js
const Reservation = require('../models/model');
const moment = require('moment');

let reservations = [];

exports.createReservation = async (req, res) => {
    const { hotelName, checkInDate, checkOutDate, roomType, guestName, numberOfGuests, status } = req.body;
    const newReservation = new Reservation(reservations.length + 1, hotelName, checkInDate, checkOutDate, roomType, guestName, numberOfGuests, status, moment());
    reservations.push(newReservation);
    res.json({
        msg: "Reservation created successfully.",
        data: newReservation
    });
};

exports.getAllReservations = async (req, res) => {
    let { tipo_habitacion, estado, num_huespedes } = req.query;
    let filteredReservations = reservations;

    if (tipo_habitacion) {
        filteredReservations = filteredReservations.filter(reservation => reservation.roomType === tipo_habitacion);
    }
    if (estado) {
        filteredReservations = filteredReservations.filter(reservation => reservation.status === estado);
    }
    if (num_huespedes) {
        num_huespedes = parseInt(num_huespedes);
        filteredReservations = filteredReservations.filter(reservation => reservation.numberOfGuests >= num_huespedes);
    }

    res.json({
        msg: "All reservations retrieved successfully.",
        data: filteredReservations
    });
};


exports.getReservationById = async (req, res) => {
    const reservationId = parseInt(req.params.id);
    const reservation = reservations.find(res => res.id === reservationId);
    if (!reservation) {
        return res.status(404).json({ msg: "Reservation not found." });
    }
    res.json({
        msg: "Reservation retrieved successfully.",
        data: reservation
    });
};

exports.updateReservationById = async (req, res) => {
    const reservationId = parseInt(req.params.id);
    const reservationIndex = reservations.findIndex(res => res.id === reservationId);
    if (reservationIndex === -1) {
        return res.status(404).json({ msg: "Reservation not found." });
    }

    // Update reservation details. Assuming body may contain any reservation-related fields.
    const updatedFields = req.body;
    reservations[reservationIndex] = { ...reservations[reservationIndex], ...updatedFields, lastUpdated: moment() };
    res.json({
        msg: "Reservation updated successfully.",
        data: reservations[reservationIndex]
    });
};

exports.deleteReservationById = async (req, res) => {
    const reservationId = parseInt(req.params.id);
    const reservationIndex = reservations.findIndex(res => res.id === reservationId);
    if (reservationIndex === -1) {
        return res.status(404).json({ msg: "Reservation not found." });
    }

    reservations.splice(reservationIndex, 1);
    res.json({ msg: "Reservation deleted successfully." });
};
exports.getReservationsByDateRange = async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query;
    const startDate = moment(fecha_inicio);
    const endDate = moment(fecha_fin);

    const filteredReservations = reservations.filter(reservation =>
        moment(reservation.checkInDate).isSameOrAfter(startDate) &&
        moment(reservation.checkOutDate).isSameOrBefore(endDate)
    );

    res.json({
        msg: "Reservations retrieved successfully for the given date range.",
        data: filteredReservations
    });
};
// exports.getReservationsByRoomType = async (req, res) => {
//     const { tipo_habitacion } = req.query;
//     let filteredReservations = reservations;

//     if (tipo_habitacion) {
//         filteredReservations = filteredReservations.filter(reservation => reservation.roomType === tipo_habitacion);
//     }

//     res.json({
//         msg: "Reservations retrieved successfully by room type.",
//         data: filteredReservations
//     });
// };
// exports.getReservationsByStatus = async (req, res) => {
//     const { estado } = req.query;
//     let filteredReservations = reservations;

//     if (estado) {
//         filteredReservations = filteredReservations.filter(reservation => reservation.status === estado);
//     }

//     res.json({
//         msg: "Reservations retrieved successfully by status.",
//         data: filteredReservations
//     });
// };
// exports.getReservationsByGuestCount = async (req, res) => {
//     const { num_huespedes } = req.query;
//     let filteredReservations = reservations;

//     if (num_huespedes) {
//         filteredReservations = filteredReservations.filter(reservation => reservation.numberOfGuests >= num_huespedes);
//     }

//     res.json({
//         msg: "Reservations retrieved successfully by guest count.",
//         data: filteredReservations
//     });
// };

