import usersDB from "../models/users.models.js";

export const getAllUsers = async(req, res) => {
    try {
        const [rows] = usersDB.getAllUsersDB();

        if(rows.length === 0) {
            return res.status(404).json({
                message: "[!] NO USERS AVAILABLE"
            });
        }

        return res.status(200).json({
            message: "[+] USERS AVAILABLE",
            payload: rows
        });
    } catch (error) {
        console.log(`[!] USERS: ${error}`)
        return res.status(500).json({
            message: "[!] INTERNAL SERVER ERROR"
        });
    }
}

export const getUser = async(req, res) => {
    try {
        const { id } = req.params;

        const [rows] = usersDB.getUserDB(id);

        if(rows.length === 0) {
            return res.status(404).json({
                message: "[!] USER NOT FOUND"
            });
        }

        return res.status(200).json({
            message: "[+] USER FOUND",
            payload: rows
        })
    } catch (error) {
        console.log(`[!] USERS: ${error}`)
        return res.status(500).json({
            message: "[!] INTERNAL SERVER ERROR"
        });
    }
}

export const addUser = async(req, res) => {
    try {
        const { firstName, email, password, role } = req.body;

        const [rows] = usersDB.addUserDB(firstName, email, password, role);

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: "[!] USER CANNOT BE ADDED"
            });
        }

        return res.status(200).json({
            message: "[+] USER BE ADDED"
        })
    } catch (error) {
        console.log(`[!] USERS: ${error}`)
        return res.status(500).json({
            message: "[!] INTERNAL SERVER ERROR"
        });
    }
}

export const updateUser = async(req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, password, role } = req.body;

        const [rows] = usersDB.updateUserDB(id, firstName, lastName ,email, phone, password, role);

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: "[!] USER NOT UPDATED OR NOT EXITS"
            })
        }

        return res.status(200).json({
            message: "[+] UPDATED USER"
        })
    } catch (error) {
        console.log(`[!] USERS: ${error}`)
        return res.status(500).json({
            message: "[!] INTERNAL SERVER ERROR"
        });
    }
}

export const deletUser = async(req, res) => {
    try {
        const { id } = req.params;

        const [rows] = usersDB.deleteUserDB(id);

        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: "[!] USER NOT DELETED OR NOT EXITS"
            })
        }

        return res.status(200).json({
            message: "[+] DELETED USER"
        })

    } catch (error) {
        console.log(`[!] USERS: ${error}`)
        return res.status(500).json({
            message: "[!] INTERNAL SERVER ERROR"
        });
    }
}