require("dotenv").config()
try
{
    const mysql = require("mysql")


    const mySqlHost = process.env.MY_SQL_HOST || "localhost"
    const mySqlPort = process.env.MY_SQL_PORT || 3306
    const mySqlUser = process.env.MY_SQL_USER || "trinesh"
    const mySqlPassword = process.env.MY_SQL_PASS || "password"
    const mySqlDb = process.env.MY_SQL_DB || "flight_reservations"

    const connection  = mysql.createConnection({
        host: mySqlHost,
        port: mySqlPort,
        user: mySqlUser,
        password: mySqlPassword,
        database: mySqlDb,
    
    })

    connection.connect()
    module.exports = connection
}
catch(error)
{
    console.log(error)
}
    
