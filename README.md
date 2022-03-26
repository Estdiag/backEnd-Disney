# Mundo de Disney BackEnd LOCAL

Este proyecto es la solución del challenge de participación en ALKEMY. En esta oportunidad las tecnologias utilizadas son: NodeJs, Express, Sequelize y Nodemailer

Esta API esta diseñada para:

- Personaje: Agregar, editar, eliminar, ver detalles de un personaje en especifico, filtrar por: nombre, peso, edad y participación en una pelicula o serie, ver listado de todos los personajes.

- Pelicula o serie: Agregar, editar, eliminar, ver detalles de una pelicula o serie, filtrar por genero y titulo de la pelicula, ordenar de forma ascendente o descendiente

- Genero: Agregar, editar, eliminar, ver detalles de un genero.

La base de esta api es: https://disney-back.herokuapp.com y puedes usarla con los siguientes endpoints:

### user

| CRUD | RESPONSE    | ROUTE                                            | SEND | INFO                  |
| ---- | ----------- | ------------------------------------------------ | ---- | --------------------- |
| POST | create user | https://disney-back.herokuapp.com /auth/register | body | email, password, name |
| GET  | get token   | https://disney-back.herokuapp.com /auth/login    | body | email, password       |

(tambien llega un correo con el token)

### Es de aclarar que para todas las peticiones se debe enviar el token por body

### characters

| CRUD   | RESPONSE                             | ROUTE                                                     | SEND   | INFO                                                              |
| ------ | ------------------------------------ | --------------------------------------------------------- | ------ | ----------------------------------------------------------------- |
| GET    | get all characters                   | https://disney-back.herokuapp.com /characters             |        |                                                                   |
| GET    | get character                        | https://disney-back.herokuapp.com /characters/:id         | params | id                                                                |
| GET    | filter character by age              | https://disney-back.herokuapp.com /characters             | query  | age                                                               |
| GET    | filter character by name             | https://disney-back.herokuapp.com /characters             | query  | name                                                              |
| GET    | filter character by width            | https://disney-back.herokuapp.com /characters             | query  | width                                                             |
| GET    | filter character by width, name, age | https://disney-back.herokuapp.com /characters             | query  | width, name,age (all possible combinations)                       |
| GET    | filter character by movie            | https://disney-back.herokuapp.com /characters             | query  | movie (id movie)                                                  |
| POST   | add character                        | https://disney-back.herokuapp.com /characters             | body   | name, age, width, history, image, movies:[title]                  |
| PUT    | update character                     | https://disney-back.herokuapp.com /characters             | body   | idCharacter\*, params to change: name, age, width, history, image |
| PUT    | delete character movie               | https://disney-back.herokuapp.com /characters/movieDelete | body   | idCharacter*, idMovie*                                            |
| PUT    | add movie to character               | https://disney-back.herokuapp.com /characters/movieAdd    | body   | idCharacter*, title* (movie)                                      |
| DELETE | delete character                     | https://disney-back.herokuapp.com /characters             | body   | idCharacter                                                       |

### movies

| CRUD   | RESPONSE                     | ROUTE                                                 | SEND   | INFO                                                                          |
| ------ | ---------------------------- | ----------------------------------------------------- | ------ | ----------------------------------------------------------------------------- |
| GET    | get all movies               | https://disney-back.herokuapp.com /movies             |        |                                                                               |
| GET    | get movie                    | https://disney-back.herokuapp.com /movies/:id         | params | id                                                                            |
| GET    | filter movie by title        | https://disney-back.herokuapp.com /movies             | query  | title                                                                         |
| GET    | filter movie by genre        | https://disney-back.herokuapp.com /movies             | query  | genre (id genre)                                                              |
| GET    | order movie by creation date | https://disney-back.herokuapp.com /movies             | query  | order (ASC or DESC)                                                           |
| POST   | add movie                    | https://disney-back.herokuapp.com /movies             | body   | title, image, creationDate, qualification: "1" to "5",genres: [{image, name}] |
| PUT    | update movie                 | https://disney-back.herokuapp.com /movies             | body   | id\*, params to change: title, image, creationDate, qualification: "1" to "5" |
| PUT    | delete genre movie           | https://disney-back.herokuapp.com /movies/genreDelete | body   | idGenre*, idMovie*                                                            |
| PUT    | add genre to movie           | https://disney-back.herokuapp.com /movies/genreAdd    | body   | idMovie*, name* (genre)                                                       |
| DELETE | delete movie                 | https://disney-back.herokuapp.com /movies             | body   | id                                                                            |

### genres

| CRUD   | RESPONSE       | ROUTE                                         | SEND   | INFO                                |
| ------ | -------------- | --------------------------------------------- | ------ | ----------------------------------- |
| GET    | get all genres | https://disney-back.herokuapp.com /genres     |        |                                     |
| GET    | get genre      | https://disney-back.herokuapp.com /genres/:id | params | id                                  |
| POST   | add genre      | https://disney-back.herokuapp.com /genres     | body   | image, name                         |
| PUT    | update genre   | https://disney-back.herokuapp.com /genres     | body   | id\*, params to change: image, name |
| DELETE | delete genre   | https://disney-back.herokuapp.com /genres     | body   | name                                |
