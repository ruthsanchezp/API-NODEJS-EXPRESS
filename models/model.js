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

