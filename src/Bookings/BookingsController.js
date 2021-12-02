


module.exports = function BookingsController (BookingsService)
{

    const getAllBookings = async function getAllBookings (request, response)
    {
        try
        {
            const result = await BookingsService.getAllBookings()
            response.json(result)
        }
        catch(error)
        {
            response.json(error)
        }
    }

    const getBookingsByUser = async function (request, response)
    {
        try
        {
            const result = await BookingsService.getBookingsByUser(request.params.username)
            response.json(result)
        }
        catch(error)
        {
            response.json(error)
        }
    }

    const createBooking = async function createBooking(request, response)
    {
        try
        {
            const result = await BookingsService.bookFlight(request.body)
            response.json(result)
        }
        catch(error)
        {
            response.json(error)
        }
    }


    const cancelBooking = async function cancelBooking(request, response)
    {
        try
        {
            const result = await BookingsService.cancelBooking(request.body)
            response.json(result)
        }
        catch(error)
        {
            response.json(error)
        }
    }

    return {
        getAllBookings,
        getBookingsByUser,
        createBooking,
        cancelBooking
    }
}