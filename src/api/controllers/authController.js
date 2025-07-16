import Auth from "../models/auth.models.js";
import JWT from "jsonwebtoken";
import environments from "../config/environments.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let [rows] = await Auth.autenticationDB(email, password);

        if(rows.length === 0) {
            return res.status(401).json({
                message: "[!] Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, rows[0].password);

        if(!isMatch) {
            return res.status(401).json({
                message: "[!] Invalid credentials"
            });
        }
        
        const tokenJWT = JWT.sign({id_user: rows[0].id_user, email}, environments.secret_key, {expiresIn: "15m"});

        res.status(200).json({
            token: tokenJWT
        });

    } catch(error) {
        console.log(`[!] ERROR: ${error}`)
        res.status(500).json({
            message: `[!] ERROR INTERNO DEL SERVIDOR`
        })
    }
}

export default {
    login
}