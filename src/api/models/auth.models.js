import connection from "../database/db.js";

const autenticationDB = async(email) => {
    let sql = "SELECT * FROM users WHERE (email=?)";

    return await connection.query(sql, [email]);
}

const registerDB = async (firstName, email, password) => {
    let sql = "INSERT INTO users (firstName, email, password) VALUES (?,?,?)";

    return await connection.query(sql, [firstName,email,password]);
}

export default {
    autenticationDB,
    registerDB
}