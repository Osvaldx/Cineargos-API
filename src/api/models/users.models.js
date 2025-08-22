import connection from "../database/db.js";

const getAllUsersDB = () => {
    const sql = "SELECT * FROM Users;";
    return connection.query(sql);
}

const getUserDB = (id) => {
    const sql = "SELECT * FROM Users WHERE (id_user = ?);";
    return connection.query(sql,[id]);
}

const addUserDB = (firstName, email, password, role) => {
    const sql = "INSERT INTO users (firstName, email, password, role) VALUES (?, ?, ?, ?);";
    return connection.query(sql, [firstName, email, password, role]);
}

const updateUserDB = (id,firstName, lastName, email, phone, password, role) => {
    const sql = "UPDATE users SET firstname = ?, lastName = ?, email = ?, phone = ?, password = ?, role = ? WHERE (id_user = ?);";
    return connection.query(sql, [firstName, lastName, email, phone, password, role, id]);
}

const deleteUserDB = (id) => {
    const sql = "DELETE FROM users WHERE (id_user = ?);";
    return connection.query(sql, [id]);
}