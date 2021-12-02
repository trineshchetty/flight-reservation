
const database = require("../data/MySqlConnection")
const Repository = require("./Repository")(database)
const UserService = require("./Users/UserService")(Repository)
const FlightsService = require("./Flights/FlightsService")(Repository)
const BookingsService = require("./Bookings/BookingsService")(Repository)


const UserController = require("./Users/UserController")(UserService)
const FlightsController = require("./Flights/FlightsController")(FlightsService)
const BookingsController = require("./Bookings/BookingsController")(BookingsService)


module.exports = {
    UserController,
    FlightsController,
    BookingsController
}