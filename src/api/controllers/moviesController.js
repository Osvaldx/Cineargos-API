import moviesDB from "../models/movies.models.js";

export const getAllMovies = async(req, res) => {
    try {
        const [rows] = await moviesDB.getAllMoviesDB();

        if(rows.length < 1) {
            return res.status(404).json({
                message: "[!] NO HAY PELICULAS DISPONIBLES"
            });
        }

        return res.status(200).json({
            message: "[+] PELICULAS DISPONIBLES",
            payload: rows
        });

    } catch (error) {
        console.log(`[!] MOVIES: ${error}`)
        return res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        });
    }
}