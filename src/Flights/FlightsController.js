


module.exports = function FlightsController (FlightsService)
{
    async function getAllFlights (request, response)
    {
        try
        {
            const result = await FlightsService.getFlights()
            response.json(result)
        }
        catch(error)
        {
            response.json(error)
        }
    }


    async function createNewFlight (request, response)
    {
        try
        {
            const result = await FlightsService.createNewFlight(request.body)
            response.json(result)
        }
        catch(error)
        {
            response.json(error)
        }
    }


    return {
        getAllFlights,
        createNewFlight
    }

}