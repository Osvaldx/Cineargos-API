import dotenv from "dotenv";

dotenv.config();

export default {
    port: process.env.PORT,
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    secret_key: process.env.SECRET_KEY
}