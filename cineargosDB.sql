CREATE TABLE Cineargos.users (
    id_user INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30),
    email VARCHAR(40) NOT NULL,
    phone TEXT,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT "user",
    PRIMARY KEY(id_user),
    UNIQUE (email)
);

CREATE TABLE Cineargos.movies (
    id_movie INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    releaseYear INT NOT NULL,
    director VARCHAR(50) NOT NULL,
    image VARCHAR(500) NOT NULL,
    isAvailable BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY(id_movie)
);


CREATE TABLE Cineargos.rooms (
    id_room INT NOT NULL AUTO_INCREMENT,
    roomNumber INT NOT NULL,
    total_seats INT NOT NULL,
    PRIMARY KEY(id_room)
);

CREATE TABLE Cineargos.seats (
    id_seat INT NOT NULL AUTO_INCREMENT,
    id_room INT NOT NULL,
    seatNumber INT NOT NULL,
    isAvailable BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY(id_seat),
    FOREIGN KEY(id_room) REFERENCES Cineargos.rooms(id_room)
);

CREATE TABLE Cineargos.functions (
    id_function INT NOT NULL AUTO_INCREMENT,
    id_movie INT NOT NULL,
    id_room INT NOT NULL,
    functionDate DATE NOT NULL,
    functionTime TIME NOT NULL,
    PRIMARY KEY(id_function),
    FOREIGN KEY(id_movie) REFERENCES Cineargos.movies(id_movie),
    FOREIGN KEY(id_room) REFERENCES Cineargos.rooms(id_room)
);

CREATE TABLE Cineargos.bookings (
    id_booking INT NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_function INT NOT NULL,
    bookingDate DATE NOT NULL,
    PRIMARY KEY(id_booking),
    FOREIGN KEY(id_user) REFERENCES Cineargos.users(id_user),
    FOREIGN KEY(id_function) REFERENCES Cineargos.functions(id_function)
);

CREATE TABLE Cineargos.bookings_seats (
    id_booking_seat INT NOT NULL AUTO_INCREMENT,
    id_booking INT NOT NULL,
    id_seat INT NOT NULL,
    PRIMARY KEY(id_booking_seat),
    FOREIGN KEY(id_booking) REFERENCES Cineargos.bookings(id_booking),
    FOREIGN KEY(id_seat) REFERENCES Cineargos.seats(id_seat)
);

CREATE TABLE Cineargos.tickets (
    id_ticket INT NOT NULL AUTO_INCREMENT,
    id_booking INT NOT NULL,
    ticketPrice DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY(id_ticket),
    FOREIGN KEY(id_booking) REFERENCES Cineargos.bookings(id_booking)
);