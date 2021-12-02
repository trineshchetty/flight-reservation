create table Users (
    id integer primary key  not null
    username varchar(255) not null
    password varchar(255) not null
    logged_in boolean not null
)


create table flight (
    id integer primary key not null
    destination varchar(255) not null
    price integer not null
    departure_time date not null
    duration time not null
    arival_time date not null
    available_space integer not null
)



create table bookings (
    id integer primary key  not null
    user_id foreign key Users.id
    flight_id foreign key flight.id
    booked boolean not null
    cancelled boolean not null
    date_of_booking date not null
    date_of_cancellation  date not null
)
