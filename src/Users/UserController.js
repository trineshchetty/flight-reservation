


module.exports = function UserController (UserService)
{
    
    async function registerUser (request, response)
    {
        try
        {
            const result = await UserService.registerUser(request.body)
            response.json(result)
        }
        catch(error)
        {
            response.json({error: error})
        }
    }


    async function getAllUsers (request, response)
    {
        try
        {
            const result =  await UserService.getAllUsers()
            response.json(result)
        }
        catch(error)
        {
            response.json({error: error})
        }
    }


    async function logInUser (request, response)
    {
        try
        {
            const result =  await UserService.signIn(request.body)
            response.json(result)
        }
        catch(error)
        {
            response.json(error)
        }
    }

    async function logoutUser (request, response)
    {
        try
        {
            const result =  await UserService.signOut(request.body)
            response.json(result)
        }
        catch(error)
        {
            response.json(error)
        }
    }


  





    return Object.freeze({
        registerUser: registerUser,
        getAllUsers: getAllUsers,
        logInUser,
        logoutUser
    })
}