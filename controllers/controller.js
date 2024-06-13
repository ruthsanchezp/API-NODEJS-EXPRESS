const Reservation = require('../models/model');
const moment = require('moment'); //Se utiliza para una mejor manejo de las fechas

let reservations = []; // El arreglo que almacenará en memOmia la gestión de las reservas

//Componentes de swager: components -> schemas-> Nombre esquema -> type, required , properties (id, hotelName, checkinDate, checkOutDate,
 //roomType, guestName, numerOfGuest, status, creactionData ), example

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object 
 *       required:
 *         - hotelName
 *         - checkInDate
 *         - checkOutDate
 *         - roomType
 *         - guestName
 *         - numberOfGuests
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the reservation
 *         hotelName:
 *           type: string
 *           description: Name of the hotel
 *         checkInDate:
 *           type: string
 *           format: date
 *           description: Check-in date
 *         checkOutDate:
 *           type: string
 *           format: date
 *           description: Check-out date
 *         roomType:
 *           type: string
 *           description: Type of the room
 *         guestName:
 *           type: string
 *           description: Name of the guest
 *         numberOfGuests:
 *           type: integer
 *           description: Number of guests
 *         status:
 *           type: string
 *           description: Reservation status
 *         creationDate:
 *           type: string
 *           format: date
 *           description: Date the reservation was created
 *       example:
 *         id: 1
 *         hotelName: Hotel ABC
 *         checkInDate: 2024-06-07
 *         checkOutDate: 2024-06-10
 *         roomType: Suite
 *         guestName: John Doe
 *         numberOfGuests: 2
 *         status: confirmed
 *         creationDate: 2024-06-01
 */

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API for managing hotel reservations
 */

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Creates a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 */




// Haciendo un post en thunderbird creará un objeto con las constantes que se definen
exports.createReservation = async (req, res) => {
    const { hotelName, checkInDate, checkOutDate, roomType, guestName, numberOfGuests, status } = req.body;
    const newReservation = new Reservation(reservations.length + 1, hotelName, checkInDate, checkOutDate, roomType, guestName, numberOfGuests, status, moment());
    reservations.push(newReservation);
    res.json({
        msg: "Reserva creada",
        data: newReservation
    });
};


/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Retrieves a list of reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */


// Obtiene las reservas aplicando los filtros solicitados
exports.getAllReservations = async (req, res) => {
    let { hotel, tipo_habitacion, estado, num_huespedes, fecha_inicio, fecha_fin } = req.query;
    let filteredReservations = reservations;



    // Filtro por fechas si los parámetros están presentes
    if (fecha_inicio && fecha_fin) {
        const startDate = moment(fecha_inicio, 'YYYY-MM-DD').startOf('day');
        const endDate = moment(fecha_fin, 'YYYY-MM-DD').endOf('day');

        if (!startDate.isValid() || !endDate.isValid()) {
            return res.status(400).json({ msg: "Invalid date format. Please use YYYY-MM-DD." });
        }

        filteredReservations = filteredReservations.filter(reservation => {
            const checkInDate = moment(reservation.checkInDate, 'YYYY-MM-DD').startOf('day');
            const checkOutDate = moment(reservation.checkOutDate, 'YYYY-MM-DD').endOf('day');

            return checkInDate.isBetween(startDate, endDate, null, '[]') || 
                   checkOutDate.isBetween(startDate, endDate, null, '[]') || 
                   (checkInDate.isSameOrBefore(startDate) && checkOutDate.isSameOrAfter(endDate));
        });
    }





    if (hotel) {
        filteredReservations = filteredReservations.filter(reservation => reservation.hotelName === hotel);
    }
    if (tipo_habitacion) {
        filteredReservations = filteredReservations.filter(reservation => reservation.roomType === tipo_habitacion);
    }
    if (estado) {
        filteredReservations = filteredReservations.filter(reservation => reservation.status === estado);
    }
    if (num_huespedes) {
       // num_huespedes = parseInt(num_huespedes);

    //    Como gerente del hotel, quiero ver todas las reservas para GRUPOS DE MAS de 5 personas para el próximo mes, para poder planificar las necesidades adicionales de estos grupos grandes.

        filteredReservations = filteredReservations.filter(reservation => reservation.numberOfGuests >= num_huespedes);
    }

    res.json({
        msg: "All reservations retrieved successfully.",
        data: filteredReservations
    });
};



/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Retrieves a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the reservation
 *     responses:
 *       200:
 *         description: Reservation details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 */



//Obtiene las reservas buscando por id
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



/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Updates a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservation not found
 */



// Al buscar por id al hacer un put en thuderbird se puede actualizar el objeto 
exports.updateReservationById = async (req, res) => {
    const reservationId = parseInt(req.params.id);
    const reservationIndex = reservations.findIndex(res => res.id === reservationId);
    if (reservationIndex === -1) {
        return res.status(404).json({ msg: "Reservation not found." });
    }

    const updatedFields = req.body;
    reservations[reservationIndex] = { ...reservations[reservationIndex], ...updatedFields, lastUpdated: moment() };
    res.json({
        msg: "Reservation updated successfully.",
        data: reservations[reservationIndex]
    });
};




/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Deletes a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the reservation
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found
 */




exports.deleteReservationById = async (req, res) => {
    const reservationId = parseInt(req.params.id);
    const reservationIndex = reservations.findIndex(res => res.id === reservationId);
    if (reservationIndex === -1) {
        return res.status(404).json({ msg: "Reservation not found." });
    }

    reservations.splice(reservationIndex, 1);
    res.json({ msg: "Reservation deleted successfully." });
};




/**
 * @swagger
 * /api/reservas/date-range:
 *   get:
 *     summary: Retrieves reservations within a specific date range
 *     tags: [Reservations]
 *     parameters:
 *       - in: query
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date of the range
 *       - in: query
 *         name: fecha_fin
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date of the range
 *     responses:
 *       200:
 *         description: List of reservations within the date range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */



//Se puede obtener la reserva filtrando por fechas 
// Se puede obtener la reserva filtrando por fechas
exports.getReservationsByDateRange = (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query;

    // Parsear las fechas usando moment.js
    const startDate = moment(fecha_inicio, 'YYYY-MM-DD').startOf('day');
    const endDate = moment(fecha_fin, 'YYYY-MM-DD').endOf('day');

    // Verificar si las fechas se han parseado correctamente
    if (!startDate.isValid() || !endDate.isValid()) {
        return res.status(400).json({ msg: "Invalid date format. Please use YYYY-MM-DD." });
    }

    console.log(`Start Date: ${startDate.format('YYYY-MM-DD HH:mm:ss')}`);
    console.log(`End Date: ${endDate.format('YYYY-MM-DD HH:mm:ss')}`);

    const filteredReservations = reservations.filter(reservation => {
        const checkInDate = moment(reservation.checkInDate, 'YYYY-MM-DD').startOf('day');
        const checkOutDate = moment(reservation.checkOutDate, 'YYYY-MM-DD').endOf('day');

        console.log(`Checking Reservation: ${reservation.hotelName}`);
        console.log(`Check-In Date: ${checkInDate.format('YYYY-MM-DD HH:mm:ss')}`);
        console.log(`Check-Out Date: ${checkOutDate.format('YYYY-MM-DD HH:mm:ss')}`);

        // Verificar si la reserva está dentro del rango de fechas
        const isWithinRange = checkInDate.isBetween(startDate, endDate, null, '[]') || 
                              checkOutDate.isBetween(startDate, endDate, null, '[]') || 
                              (checkInDate.isSameOrBefore(startDate) && checkOutDate.isSameOrAfter(endDate));

        console.log(`Is Within Range: ${isWithinRange}`);
        return isWithinRange;
    });

    if (filteredReservations.length === 0) {
        return res.status(404).json({ msg: "Reservation not found." });
    }

    res.json({
        msg: "Reservations retrieved successfully for the given date range.",
        data: filteredReservations
    });
};
