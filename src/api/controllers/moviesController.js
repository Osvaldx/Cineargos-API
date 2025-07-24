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

export const getMovieID = async(req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await moviesDB.getMovieIDDB(id);

        if(rows.length < 1) {
            return res.status(404).json({
                message: "[!] NO SE ENCONTRO LA PELICULA CON ESE ID"
            });
        }

        return res.status(200).json({
            message: "[+] PELICULA ENCONTRADA!",
            payload: rows
        });

    } catch (error) {
        console.log(`[!] MOVIES: ${error}`)
        return res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        });
    }
}

export const addMovie = async(req, res) => {
    try {
        const { title, genre, releaseYear, director, image, isAvailable } = req.body;

        const [rows] = await moviesDB.addMovieDB(title, genre, releaseYear, director, image, isAvailable);

        if(rows.affectedRows === 0) {
            return res.status(400).json({
                message: "[!] NO SE PUDO AGREGAR LA PELICULA"
            });
        }

        return res.status(200).json({
            message: "[+] PELICULA AGREGADA CON EXITO!"
        });

    } catch (error) {
        console.log(`[!] MOVIES: ${error}`)
        return res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        });
    }
}

export const updateMovie = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, genre, releaseYear, director, image, isAvailable } = req.body;

        const [rows] = await moviesDB.modifiedMovieDB(id, title, genre, releaseYear, director, image, isAvailable);

        if(rows.affectedRows === 0) {
            return res.status(400).json({
                message: "[!] NO SE PUDO ACTUALIZAR LA PELICULA"
            });
        }

        return res.status(200).json({
            message: "[+] PELICULA ACTUALIZADA CON EXITO!"
        });
    } catch (error) {
        console.log(`[!] MOVIES: ${error}`)
        return res.status(500).json({
            message: "[!] ERROR INTERNO DEL SERVIDOR"
        });
    }
}