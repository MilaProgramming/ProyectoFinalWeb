CREATE DATABASE tareasdb
CREATE TABLE   tarea(
id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) UNIQUE,
    descripcion VARCHAR(255));