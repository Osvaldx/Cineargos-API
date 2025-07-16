import mysql2 from "mysql2/promise";
import environments from "../config/environments.js";

const { database } = environments;
const connection = mysql2.createPool({
    host: database.host,
    port: database.port,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;