const validateToken = async (req, res, next) => {
    const token = req.headers["authorization"];

    if(!token) {
        res.status(401).json({
            message: "You don´t have access or the token is expired"
        })
    } else {
        next();
    }
}

const validateAuthParameters = async (req, res, next) => {
    try {
        const regExCorreo = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
        const { email, password } = req.body;
    
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
    }
}

export default {
    validateToken,
    validateAuthParameters
}