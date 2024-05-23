const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express(); // creamos la instancia del servidor express

// Middlewares
app.use(express.json());
app.use(cors());

// Iniciamos servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
});

// Conexión con MySQL
const connection = mysql.createConnection({
    host: "bjtpw22ymo5m7m6kknve-mysql.services.clever-cloud.com",
    user: "upe2nneijiyondwz",
    password: "jUwMinkzVNSyj6pUE1jj",
    port: 3306,
    database: "bjtpw22ymo5m7m6kknve"
});

connection.connect((err) => {
    if (err) {
        console.log(err.message || "No se puede conectar a la base de datos");
    } else {
        console.log("Conectado a la base de datos");
    }
});

app.get("/", (req, res) => {
    connection.query("SELECT * FROM usuarios", (error, results) => {
        if (error) res.status(500).json({ message: error.message || "No se puede obtener datos en este momento para la tabla usuarios" });
        else res.status(200).json(results);
    });
});

app.post("/", (req, res) => {
    const { nombre } = req.body;
    connection.query('INSERT INTO usuarios VALUES (DEFAULT, ?)', [nombre], (error, results) => {
        if (error) res.status(500).json({ message: error.message || "No se pudo insertar el dato en este momento" });
        else res.status(200).json(results);
    });
});

app.patch("/", (req, res) => {
    const { id, nombre } = req.body;
    connection.query('UPDATE usuarios SET nombre = ? WHERE id = ?', [nombre, id], (error, results) => {
        if (error) res.status(500).json({ message: error.message || "No se puede actualizar en este momento" });
        else res.json(results);
    });
});

app.delete("/", (req, res) => {
    const { id } = req.body;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
        if (error) res.status(500).json({ message: error.message || "No se puede borrar en este momento" });
        else res.json(results);
    });
});
