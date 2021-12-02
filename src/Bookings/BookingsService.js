module.exports = function Bookings (repo)
{

    const getAllBookings = function getAllBookings ()
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                const getBookings = await repo.getAllBookings()
                return resolve(getBookings)
            }
            catch(error)
            {
                return reject(error)
            }
        })
    }

    const getBookingsByUser = function getBookingsByUser (username)
    {
        return new Promise(function (resolve, reject)
        {
            try
            {
                const getBookingsForUser = repo.getBookingsByUser(username)
                return resolve(getBookingsForUser)
            }
            catch(error)
            {
                return reject(error)
            }
        })
    }

    const bookFlight = function bookFlight (booking)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                const flighAvailableSpace = await repo.getFlightByFlightId(booking.flight_id);

                if (flighAvailableSpace.length === 0)
                {
                    return reject({error: "Flight Does Not Exist"})
                }
                else
                {

                    if (flighAvailableSpace[0].available_space == 0)
                    {
                        reject({message: "flight capacity reached. Cannot book flight. Please check later"})
                    }
                    else
                    {
                        const currentBookings = await repo.getBookingsByUser(booking.username)

                        if (currentBookings.length > 0)
                        {
                            for (var i = 0; i<currentBookings.length; i++)
                            {
                                if (currentBookings[i].flight_id == booking.flight_id)
                                {
                                    reject({error: "Flight has already been booked."})
                                    break;
                                }
                                else
                                {
                                    const bookingResponse = await repo.createBooking(booking)
                                    if (Object.keys(bookingResponse).length > 0)
                                    {
                                        const decrementFlightSpace = await repo.reduceAvailableFlightSpace(booking.flight_id);
                                        return resolve({message: "Succesfully made booking", data: {
                                            decrementFlightSpace,
                                            bookingResponse
                                        }})
                                    }   
                                }
                            }
                        }

                        if (currentBookings.length === 0)
                        {
                            const bookingResponse = await repo.createBooking(booking)
                            if (Object.keys(bookingResponse).length > 0)
                            {
                                const decrementFlightSpace = await repo.reduceAvailableFlightSpace(booking.flight_id);
                                return resolve({message: "Succesfully made booking", data: {
                                    decrementFlightSpace,
                                    bookingResponse
                                }})
                            }   
                        }
                    }
                }
            }
            catch(error)
            {
                return reject(error)
            }
        })
    }

    const cancelBooking = function cancelBooking (booking)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                const cancelBookingResponse = await repo.cancelFlightBooking(booking)   
                if (Object.keys(cancelBookingResponse).length > 0)
                {
                    const incrementAvailableSpace = await repo.incrementAvailableSpaceOnFlight(booking.flight_id);
                    return resolve({message: "Succesfully cancelled booking", data: {
                        incrementAvailableSpace,
                        cancelBookingResponse
                    }})
                }      
            }
            catch(error)
            {
                return reject(error)
            }
        })
    }




    return {
        getAllBookings,
        getBookingsByUser,
        bookFlight,
        cancelBooking
    }
}