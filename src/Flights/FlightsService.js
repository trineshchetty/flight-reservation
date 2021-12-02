

module.exports = function Flights (repo)
{

    const getFlights = function getFlights ()
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                const getFlights = await repo.getAllFlights();
                return resolve(getFlights);
            }
            catch(error)
            {
                return reject(error)
            }
        })
    }


    const createNewFlight = function createNewFlight (flight)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                const createFlightResponse = await repo.createFlight(flight);
                return resolve({message: "New Flight Created", data:createFlightResponse});
            }
            catch(error)
            {
                return reject(error)
            }
        })
    }

    return {
        getFlights: getFlights,
        createNewFlight
    }
}