module.exports = function UserService (repo)
{

    async function getAllUsers ()
    {

        const users = await repo.getAllUsers()
        return users
    }

    function registerUser (user)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                const getUser = await repo.getUserByUsername(user.username)

                if (getUser.length)
                {
                    reject({message: "User already exists. Please log in"})
                }
                else
                {
                    const userResponse = await repo.registerUser(user)
                    resolve({message: "User Successfully Registered", data: userResponse})
                }
               
            }
            catch(error)
            {
               reject(error)
            }
        })
    }

    function signIn (user)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                const loginUser = await repo.getUserByUsername(user.username)


                if (loginUser.length > 0)
                {
                    if (loginUser[0].password.trim() != user.password.trim())
                    {
                        reject({message: "Password is incorrect"})
                    }
                    else
                    {
                        const userLoginResponse = await repo.loginUser(user.username)
                        resolve({message: "User Logged in",  data: loginUser, response: userLoginResponse})
                    }
                }
                else
                {
                    reject({message: "User not found. Please register or check login credentials and try again."})
                }
               
            }
            catch(error)
            {
               reject(error)
            }
        })
    }

    function signOut (user)
    {
        return new Promise(async function (resolve, reject)
        {
            try
            {
                const userLoggedOutResponse = await repo.logoutUser(user.username)
                resolve({message: "User Logged Out", data: userLoggedOutResponse})
            }
            catch(error)
            {
               reject(error)
            }
        })
    }

    return {
        getAllUsers,
        registerUser,
        signIn,
        signOut
    }
}