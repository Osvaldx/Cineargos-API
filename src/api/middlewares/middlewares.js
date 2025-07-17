import JWT from "jsonwebtoken";
import environments from "../config/environments.js";

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
    
        if(!token) {
            res.status(401).json({
                message: "You don´t have access or the token is expired"
            })
        }
        
        try {
            const decoded = JWT.verify(token, environments.secret_key);
            req.user = decoded;
            
        } catch(error) {
            return res.status(401).json({
                message: "Invalid token or expired"
            })
        }
    
        next();
    } catch(error) {
        console.log(`[!] ERROR: ${error}`);
        return res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        })
    }
}

const validateAuthParameters = async (req, res, next) => {
    try {
        const regExCorreo = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
        const regExName = new RegExp("^[a-zA-Z]+$");
        const { email, password } = req.body;
        const { firstName } = req.body || null;

        if(firstName != null) {
            if(!regExName.test(firstName)) {
                return res.status(401).json({
                    message: "[!] Invalid name"
                });
            }
        }
    
        if(!email || !password) {
            return res.status(401).json({
                message: "[!] Invalid credentials"
            });
        }

        if(!regExCorreo.test(email)) {
            return res.status(401).json({
                message: "[!] Invalid Email"
            });
        }

        next();
    } catch(error) {
        console.log(`[!] ERROR: ${error}`);
        return res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        })
    }
}

export default {
    validateToken,
    validateAuthParameters
}