const moment = require("moment")

module.exports = function Repository (database)
{
    const getAllUsers = function getAllUsers ()
    {
        return new Promise(function (resolve, reject)
        {
            try
            {
                database.query("SELECT * FROM users", function (err, result)
                {
                    if (err)
                    {
                        reject(err)
                    }
                    else
                    {
                        resolve(result)
                    }
                })
            }

            catch(error)
            {
                reject(error)
            }
        })
    }

    const getUserByUsername = function getUserByUsername (username)
    {
        return new Promise(function (resolve, reject)
        {
            const dbQuery = `SELECT * FROM users WHERE username = '${username}'`
            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }

    


    const registerUser = function registerUser (user)
    {
        return new Promise(function (resolve, reject)
        {
            const dbQuery = `INSERT INTO users (username, password, logged_in) VALUES ('${user.username}', '${user.password}', true)`
            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }


    const isUserLoggedIn = function isUserLoggedIn (username)
    {
        return new Promise(function (resolve, reject)
        {
            const dbQuery = `SELECT * from users WHERE username = '${username}' AND logged_in = '1'`;
            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }

    const loginUser = function loginUser (username)
    {
        return new Promise(function (resolve, reject)
        {
            const dbQuery = `UPDATE users SET logged_in = '1' WHERE username = '${username}'`;
            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }

    const logoutUser = function logoutUser (username)
    {
        return new Promise(function (resolve, reject)
        {
            const dbQuery = `UPDATE users SET logged_in = '0' WHERE username = '${username}'`;
            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }



    const getAllFlights = function getAllFlights ()
    {
        return new Promise(function (resolve, reject)
        {
            const dbQuery = "SELECT * FROM flights LIMIT 20";
            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }

    const getFlightByFlightId = function getFlightByFlightId (flight_id)
    {
        return new Promise(function (resolve, reject)
        {
            const dbQuery = `SELECT * FROM flights WHERE id = '${flight_id}'`;

            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }

    const reduceAvailableFlightSpace = function reduceAvailableFlightSpace (flight_id)
    {
        return new Promise(function (resolve, reject)
        {
            const dbQuery = `UPDATE flights SET available_space = available_space - 1 WHERE id = '${flight_id}' AND available_space > 0`;

            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }

    const incrementAvailableSpaceOnFlight = function incrementAvailableSpaceOnFlight (flight_id)
    {
        return new Promise(function (resolve, reject)
        {
            const dbQuery = `UPDATE flights SET available_space = available_space + 1 WHERE id = '${flight_id}' AND available_space < 40`;

            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }


    const createFlight = function createFlight (flight)
    {
        return new Promise(function (resolve, reject)
        {
            const available_space = 40
            const dbQuery = `INSERT INTO flights (destination, price, departure_time, duration, arrival_time, available_space) 
                            VALUES ('${flight.destination}','${flight.price}', '${flight.departure_time}', '${flight.duration}', '${flight.arrival_time}', '${available_space}' )`;

            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }


    const getAllBookings = function getAllBookings ()
    {
        return new Promise(function (resolve, reject)
        {
            const dbQuery = "SELECT * from bookings"

            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }


    const getBookingsByUser = function getBookingsByUser (username)
    {
        return new Promise(async function (resolve, reject)
        {
            const dbQuery = `SELECT username, bookings.id, bookings.flight_id, logged_in, destination, price, departure_time, duration, arrival_time, booked, cancelled, date_of_booking, date_of_cancellation
            FROM ((bookings
            INNER JOIN users ON bookings.user_id = users.id)
            INNER JOIN flights ON bookings.flight_id = flights.id) WHERE username = '${username}' AND cancelled = '0';`

            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }



    const createBooking = function createBooking (booking)
    {
        return new Promise(function (resolve, reject)
        {
            const booking_date = moment(moment.now()).format("YYYY-MM-DDTHH:mm")
            const dbQuery = `INSERT INTO bookings (user_id, flight_id, booked, cancelled, date_of_booking, date_of_cancellation)
                            VALUES ('${booking.user_id}', '${booking.flight_id}', '1', '0', '${booking_date}', null)`

            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }


    const cancelFlightBooking = function cancelFlightBooking (booking)
    {
        return new Promise(function (resolve, reject)
        {
            const cancelled_date = moment(moment.now()).format("YYYY-MM-DDTHH:mm")
            const dbQuery = `UPDATE bookings SET cancelled = '1', date_of_cancellation = '${cancelled_date}' WHERE id = ${booking.booking_id}`;

            database.query(dbQuery, function (err, result)
            {
                if (err)
                {
                    reject(err)
                }
                else
                {
                    resolve(result)
                }
            })
        })
    }



    return {
        getAllUsers,
        getUserByUsername,
        registerUser,
        isUserLoggedIn,
        loginUser,
        logoutUser,
        getAllFlights,
        createFlight,
        getFlightByFlightId,
        reduceAvailableFlightSpace,
        incrementAvailableSpaceOnFlight,
        getAllBookings,
        getBookingsByUser,
        createBooking,
        cancelFlightBooking
    }
}