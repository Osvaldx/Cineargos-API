import moviesDB from "../models/movies.models.js";

export const getAllMovies = async(req, res) => {
    try {
        const [rows] = await moviesDB.getAllMoviesDB();

        if(rows.length < 1) {
            return res.status(404).json({
                message: "[!] NO MOVIES AVAILABLE"
            });
        }

        return res.status(200).json({
            message: "[+] MOVIES AVAILABLE",
            payload: rows
        });

    } catch (error) {
        console.log(`[!] MOVIES: ${error}`)
        return res.status(500).json({
            message: "[!] INTERNAL SERVER ERROR"
        });
    }
}

export const getMovieID = async(req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await moviesDB.getMovieIDDB(id);

        if(rows.length < 1) {
            return res.status(404).json({
                message: "[!] THE MOVIE WAS NOT FOUND WITH THAT ID"
            });
        }

        return res.status(200).json({
            message: "[+] MOVIE FOUND!",
            payload: rows
        });

    } catch (error) {
        console.log(`[!] MOVIES: ${error}`)
        return res.status(500).json({
            message: "[!] INTERNAL SERVER ERROR"
        });
    }
}

export const addMovie = async(req, res) => {
    try {
        const { title, genre, releaseYear, director, image, isAvailable } = req.body;

        const [rows] = await moviesDB.addMovieDB(title, genre, releaseYear, director, image, isAvailable);

        if(rows.affectedRows === 0) {
            return res.status(400).json({
                message: "[!] COULD NOT ADD THE MOVIE"
            });
        }

        return res.status(200).json({
            message: "[+] MOVIE SUCCESSFULLY ADDED!"
        });

    } catch (error) {
        console.log(`[!] MOVIES: ${error}`)
        return res.status(500).json({
            message: "[!] INTERNAL SERVER ERROR"
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
                message: "[!] COULD NOT UPDATE THE MOVIE"
            });
        }

        return res.status(200).json({
            message: "[+] MOVIE UPDATED WITH SUCCESS!"
        });
    } catch (error) {
        console.log(`[!] MOVIES: ${error}`)
        return res.status(500).json({
            message: "[!] INTERNAL SERVER ERROR"
        });
    }
}

export const deleteMovie = async(req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await moviesDB.deleteMovieDB(id);

        if(rows.affectedRows === 0) {
            return res.status(400).json({
                message: `[!] MOVIE NOT FOUND OR DOES NOT EXITS`
            })
        }

        return res.status(200).json({
            message: "[+] MOVIE DELETED"
        })
    } catch (error) {
        console.log(`[!] MOVIES: ${error}`)
        return res.status(500).json({
            message: "[!] INTERNAL SERVER ERROR"
        });
    }
}