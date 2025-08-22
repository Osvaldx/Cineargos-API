import connection from "../database/db.js";

const getAllMoviesDB = () => {
    let sql = "SELECT * FROM movies;";
    return connection.query(sql);
}

const getMovieIDDB = (id) => {
    let sql = "SELECT * FROM movies WHERE (id_movie = ?)";
    return connection.query(sql, [id]);
}

const addMovieDB = (title, genre, releaseYear, director, image, isAvailable) => {
    let sql = "INSERT INTO movies (title, genre, releaseYear, director, image, isAvailable) VALUES (?,?,?,?,?,?);"
    return connection.query(sql, [title,genre,releaseYear,director,image,isAvailable]);
}

const modifiedMovieDB = (id, title, genre, releaseYear, director, image, isAvailable) => {
    let sql = "UPDATE movies SET title = ?, genre = ?, releaseYear = ?, director = ?, image = ?, isAvailable = ? WHERE (id_movie = ?);";
    return connection.query(sql, [title,genre,releaseYear,director,image,isAvailable,id]);
}

const deleteMovieDB = (id) => {
    let sql = "DELETE FROM movies WHERE (id_movie = ?);";
    return connection.query(sql, [id]);
}

export default {
    getAllMoviesDB,
    getMovieIDDB,
    addMovieDB,
    modifiedMovieDB,
    deleteMovieDB
}