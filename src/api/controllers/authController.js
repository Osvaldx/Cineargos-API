import Auth from "../models/auth.models.js";
import JWT from "jsonwebtoken";
import environments from "../config/environments.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let [rows] = await Auth.autenticationDB(email);

        if(rows.length === 0) {
            return res.status(401).json({
                message: "[!] Invalid credentials"
            });
        }
        
        const isMatch = await bcrypt.compare(password, rows[0].password);

        if(!isMatch) {
            return res.status(401).json({
                message: "[!] Invalid password"
            });
        }
        
        const tokenJWT = JWT.sign({id_user: rows[0].id_user, email, role: rows[0].role}, environments.secret_key, {expiresIn: "15m"});

        res.status(200).json({
            token: tokenJWT
        });

    } catch(error) {
        console.log(`[!] ERROR: ${error}`)
        res.status(500).json({
            message: `[!] ERROR INTERNO DEL SERVIDOR`
        });
    }
}

const register = async (req, res) => {
    try {
        const { firstName, email, password } = req.body;

        const saltRounds = 10;
        const passwordEncrypted = await bcrypt.hash(password, saltRounds);
        
        let rows;
        try {
            [rows] = await Auth.registerDB(firstName,email,passwordEncrypted);
        } catch(error) {
            return res.status(409).json({
                message: "[!] Ya existe una cuenta con ese email"
            })
        }

        if(rows.affectedRows > 0) {
            return res.status(200).json({
                message: "[+] Cuenta registrada con exito!"
            });
        } else {
            return res.status(500).json({
                message: "[!] No se pudo registrar la cuenta. Intente nuevamente."
            });
        }

    } catch(error) {
        console.log(`[!] ERROR: ${error}`)
        res.status(500).json({
            message: `[!] ERROR INTERNO DEL SERVIDOR`
        });
    }
}

export default {
    login,
    register
}