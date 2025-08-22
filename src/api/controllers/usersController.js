import usersDB from "../models/users.models.js";

export const getAllUsers = async(req, res) => {
    try {
        const [rows] = usersDB.getAllUsersDB();

        if(rows.lenght < 1) {
            return res.status(404).json({
                message: "[!] NO USERS AVAILABLE"
            })
        }

        return res.status(200).json({
            message: "[+] USERS AVAILABLE",
            payload: rows
        })
    } catch (error) {
        console.log(`[!] USERS: ${error}`)
        return res.status(500).json({
            message: "[!] INTERNAL SERVER ERROR"
        });
    }
}

export const getUser = async(req, res) => {
    // ...
}

export const addUser = async(req, res) => {
    // ...
}

export const updateUser = async(req, res) => {
    // ...
}

export const deletUser = async(req, res) => {
    // ...
}