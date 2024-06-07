//class Usuario {
  //  constructor(id, nombre, email, rol, fechaCreacion) {
    //    this.id = id;
      //  this.nombre = nombre;
       // this.email = email;
        //this.rol = rol;
        //this.fechaCreacion = fechaCreacion;
   // }
//}

//module.exports = Usuario;

// models/reservationModel.js
class Reservation {
    constructor(id, hotelName, checkInDate, checkOutDate, roomType, guestName, numberOfGuests, status, creationDate) {
        this.id = id;
        this.hotelName = hotelName;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.roomType = roomType;
        this.guestName = guestName;
        this.numberOfGuests = numberOfGuests;
        this.status = status;
        this.creationDate = creationDate || new Date(); // Asegura que la fecha de creación se establece si no se proporciona
    }
}

module.exports = Reservation;

