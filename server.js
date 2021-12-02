const cors = require("cors")


const express = require("express")
const app = express()
app.use(cors())


app.use(express.urlencoded({"extended": true}))
app.use(express.json({type: "application/json"}))


const controllers = require("./src/index")

const PORT = 3000

app.get("/", (request, reply) =>
{
    reply.send("Welcome to Flight Booking. This is an unrestricted route")
})


// User Routes
app.get("/api/v1/users/getall", controllers.UserController.getAllUsers)
app.post("/api/v1/users/register", controllers.UserController.registerUser)
app.post("/api/v1/users/login", controllers.UserController.logInUser)
app.post("/api/v1/users/logout", controllers.UserController.logoutUser)


// Flight Routes
app.get("/api/v1/flights/getall", controllers.FlightsController.getAllFlights)
app.post("/api/v1/flights/createflight", controllers.FlightsController.createNewFlight)


// Booking Routes
app.get("/api/v1/bookings/getall", controllers.BookingsController.getAllBookings)
app.get("/api/v1/bookings/userbookings/:username", controllers.BookingsController.getBookingsByUser)
app.post("/api/v1/bookings/userbookings/bookflight", controllers.BookingsController.createBooking)
app.post("/api/v1/bookings/userbookings/cancelbooking", controllers.BookingsController.cancelBooking)


app.listen(PORT, function () {
    console.log("Server Listening on Port 3000")
})