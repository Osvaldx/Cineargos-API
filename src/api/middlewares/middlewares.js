import JWT from "jsonwebtoken";
import environments from "../config/environments.js";

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        
        if(!token) {
            return res.status(401).json({
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

const isAdmin = async(req, res, next) => {
    if(req.user && req.user.role == "admin") {
        return next();
    }

    return res.status(403).json({
        message: "[!] Access Denied"
    })
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

const validateMovieID = async (req, res, next) => {
    try {
        const { id } = req.params;

        if(!id || isNaN(id) || Number(id) <= 0) {
            return res.status(400).json({
                message: "[!] Invalid movie ID"
            });
        }

        next();
    } catch (error) {
        console.log(`[!] ERROR: ${error}`);
        return res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        })
    }
}

const validateMovieParameters = async(req, res, next) => {
    try {
        const { title, genre, releaseYear, director, image, isAvailable } = req.body;
        const regExTitle = new RegExp("^[a-zA-Z0-9 ]+$");
        const regExGenreAndDirector = new RegExp("^[a-zA-Z ]+$");
        const regExYear = new RegExp("^(19|20)\\d{2}$");
        const regExImage = new RegExp("^(http|https)://.+\\.(jpg|jpeg|png|gif)$", "i");
    
        if(!title || !genre || !releaseYear || !director || !image || isAvailable === undefined) {
            return res.status(400).json({
                message: "[!] All fields are required"
            });
        }
    
        if(!regExTitle.test(title)) {
            return res.status(400).json({
                message: "[!] Invalid title format"
            });
        }
    
        if(!regExGenreAndDirector.test(genre)) {
            return res.status(400).json({
                message: "[!] Invalid genre format"
            });
        }
    
        if(!regExGenreAndDirector.test(director)) {
            return res.status(400).json({
                message: "[!] Invalid director format"
            });
        }
    
        if(!regExYear.test(releaseYear)) {
            return res.status(400).json({
                message: "[!] Invalid year format"
            });
        }
    
        if(!regExImage.test(image)) {
            return res.status(400).json({
                message: "[!] Invalid URL format"
            });
        }
    
        if(isAvailable === undefined) {
            return res.status(400).json({
                message: "[!] Invalid type Available format"
            });
        }

        next();
    } catch (error) {
        console.log(`[!] ERROR: ${error}`);
        return res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        })
    }
}

export default {
    validateToken,
    isAdmin,
    validateAuthParameters,
    validateMovieID,
    validateMovieParameters
}