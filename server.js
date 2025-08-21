import express from "express";
import cors from "express";
import environments from "./src/api/config/environments.js";
import morgan from "morgan";
import { AuthRouter, MoviesRouter } from "./src/api/routes/index.js";

const app = express();
const PORT = environments.port;

app.use(cors()); // Para permitir peticiones
app.use(express.json()); // Para recibir datos del body
app.use(morgan("dev"));

app.use("/api", AuthRouter);
app.use("/api", MoviesRouter);
// app.use("/api", UsersRouter);

app.listen(PORT, () => {
    console.log(`Server corriendo en: http://localhost:${PORT}/`);
})