# Mundo de Disney BackEnd LOCAL

Este proyecto es la solución del challenge de participación en ALKEMY. En esta oportunidad las tecnologias utilizadas son: NodeJs, Express, Sequelize y Nodemailer

Esta API esta diseñada para:

- Personaje: Agregar, editar, eliminar, ver detalles de un personaje en especifico, filtrar por: nombre, peso, edad y participación en una pelicula o serie, ver listado de todos los personajes.

- Pelicula o serie: Agregar, editar, eliminar, ver detalles de una pelicula o serie, filtrar por genero y titulo de la pelicula, ordenar de forma ascendente o descendiente

- Genero: Agregar, editar, eliminar, ver detalles de un genero.

La base de esta api es: localhost:3001 y puedes usarla con los siguientes endpoints:

### user

| CRUD | RESPONSE    | ROUTE                        | SEND | INFO                  |
| ---- | ----------- | ---------------------------- | ---- | --------------------- |
| POST | create user | localhost:3001/auth/register | body | email, password, name |
| GET  | get token   | localhost:3001/auth/login    | body | email, password       |

(tambien llega un correo con el token)

### Es de aclarar que para todas las peticiones se debe enviar el token por body

### characters

| CRUD   | RESPONSE                             | ROUTE                                 | SEND   | INFO                                                              |
| ------ | ------------------------------------ | ------------------------------------- | ------ | ----------------------------------------------------------------- |
| GET    | get all characters                   | localhost:3001/characters             |        |                                                                   |
| GET    | get character                        | localhost:3001/characters/:id         | params | id                                                                |
| GET    | filter character by age              | localhost:3001/characters             | query  | age                                                               |
| GET    | filter character by name             | localhost:3001/characters             | query  | name                                                              |
| GET    | filter character by width            | localhost:3001/characters             | query  | width                                                             |
| GET    | filter character by width, name, age | localhost:3001/characters             | query  | width, name,age (all possible combinations)                       |
| GET    | filter character by movie            | localhost:3001/characters             | query  | movie (id movie)                                                  |
| POST   | add character                        | localhost:3001/characters             | body   | name, age, width, history, image, movies:[title]                  |
| PUT    | update character                     | localhost:3001/characters             | body   | idCharacter\*, params to change: name, age, width, history, image |
| PUT    | delete character movie               | localhost:3001/characters/movieDelete | body   | idCharacter*, idMovie*                                            |
| PUT    | add movie to character               | localhost:3001/characters/movieAdd    | body   | idCharacter*, title* (movie)                                      |
| DELETE | delete character                     | localhost:3001/characters             | body   | idCharacter                                                       |

### movies

| CRUD   | RESPONSE                     | ROUTE                                 | SEND   | INFO                                                                          |
| ------ | ---------------------------- | ------------------------------------- | ------ | ----------------------------------------------------------------------------- |
| GET    | get all movies               | localhost:3001/movies                 |        |                                                                               |
| GET    | get movie                    | localhost:3001/movies/:id             | params | id                                                                            |
| GET    | filter movie by title        | localhost:3001/movies                 | query  | title                                                                         |
| GET    | filter movie by genre        | localhost:3001/movies                 | query  | genre (id genre)                                                              |
| GET    | order movie by creation date | localhost:3001/movies                 | query  | order (ASC or DESC)                                                           |
| POST   | add movie                    | localhost:3001/movies                 | body   | title, image, creationDate, qualification: "1" to "5",genres: [{image, name}] |
| PUT    | update movie                 | localhost:3001/movies                 | body   | id\*, params to change: title, image, creationDate, qualification: "1" to "5" |
| PUT    | delete genre movie           | localhost:3001/characters/genreDelete | body   | idGenre*, idMovie*                                                            |
| PUT    | add genre to movie           | localhost:3001/characters/genreAdd    | body   | idMovie*, name* (genre)                                                       |
| DELETE | delete movie                 | localhost:3001/movies                 | body   | id                                                                            |

### genres

| CRUD   | RESPONSE       | ROUTE                     | SEND   | INFO                                |
| ------ | -------------- | ------------------------- | ------ | ----------------------------------- |
| GET    | get all genres | localhost:3001/genres     |        |                                     |
| GET    | get genre      | localhost:3001/genres/:id | params | id                                  |
| POST   | add genre      | localhost:3001/genres     | body   | image, name                         |
| PUT    | update genre   | localhost:3001/genres     | body   | id\*, params to change: image, name |
| DELETE | delete genre   | localhost:3001/genres     | body   | name                                |
