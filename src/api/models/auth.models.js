import connection from "../database/db.js";

const autenticationDB = async(email, password) => {
    let sql = "SELECT * FROM users WHERE (email=?)"

    return await connection.query(sql, [email,password]);
}

export default {
    autenticationDB
}