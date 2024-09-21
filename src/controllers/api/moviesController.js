const { INTEGER } = require("sequelize");
let db = require("../../database/models");


moviesController = {

    list: (req, res) => {
        console.log("Movies controller findAll ...");

        db.Pelicula.findAll()
            .then(movies => {
                let meta = {
                    status: 200,
                    total: movies.length,
                    url: "api/movies"
                };

                let data = movies.map((movie, index) => ({
                    [index]: {
                        id: movie.id,
                        title: movie.title,
                        rating: movie.rating,
                        awards: movie.awards,
                        releaseDate: movie.release_date,
                        length: movie.lenght,
                        genreId: movie.genre_id
                    }
                }));
                //console.log(peliculas);
                res.json({ meta, data });
            });
    },

    /** Get details about an specific movie */
    detail: (req, res) => {
        console.log("Movies controller details ...");

        db.Pelicula.findByPk(req.params.id)
            .then(movie => {

                let meta = {
                    status: 200,
                    total: 1,
                    url: "api/movie/:id"
                };

                let data = {
                    id: movie.id,
                    title: movie.title,
                    rating: movie.rating,
                    awards: movie.awards,
                    releaseDate: movie.release_date,
                    length: movie.lenght,
                    genreId: movie.genre_id
                };

                res.json({ meta, data });

            });
    },
    /**Creates a new entity movie */
    create: (req, res) => {
        console.log("Entering to movies creation operation with params:");
        console.log("Title:" + req.body.title);
        console.log("Rating:" + parseFloat(req.body.rating));
        console.log("Awards:" + parseInt(req.body.awards));

        console.log("Release date:" + req.body.releaseDate);
        console.log("Length:" + parseInt(req.body.length));
        console.log("Genre:" + parseInt(req.body.genre));


        db.Pelicula.create({
            title: req.body.title,
            rating: parseFloat(req.body.rating),
            awards: parseInt(req.body.awards),
            release_date: req.body.releaseDate,
            length: parseInt(req.body.length),
            genre_id: parseInt(req.body.genre)

        }).then(movie => {

            console.log("This is the value for movie: " + movie);
            /** If confirmation of movie registration is true */
            if (movie) {

                respuesta = {
                    meta: {
                        status: 200,
                        total: 1,
                        url: 'api/movies/create'
                    },

                    data: confirm
                }

            } else {/** Confirmation of movie registration is false*/

                console.log("New movie couldn't be registered. Movie value is: " + movie);

                respuesta = {
                    meta: {
                        status: 404,
                        total: 1,
                        url: 'api/movies/create'
                    },

                    data: movie
                }
            }
            /**Return the response either with if or else logic applied */
            res.json(respuesta);

        }).catch(error => {

            console.log("Exception thrown during movie creation process. " + error);
            respuesta = {
                meta: {
                    status: 404,
                    total: 0,
                    url: 'api/artistas/create'
                },

                data: null
            };

            /**Return a response if a catch is triggered */
            res.json(respuesta);

        })

    },
    /**Updates an exitent movie entity */
    update: (req, res) => {

        let movieId = req.params.id;
        console.log("Updating movie with id ...." + movieId + " and name = " + req.body.title);

        /**First get the entity with the specific referenced id*/

        console.log("Getting movie entity with movieId = " + movieId);
       
        db.Pelicula.findByPk(movieId)
            .then(movie => {
                let data = {
                    id: movie.id,
                    title: movie.title,
                    rating: movie.rating,
                    awards: movie.awards,
                    releaseDate: movie.release_date,
                    length: movie.lenght,
                    genreId: movie.genre_id
                };


                
                return data;

            }).then(movieFound => {

                movieFound != null ? console.log("movieFound!=null") : console.log("movieFound==null");
                //**  If there's an entity with the id sent, then proceed to update wathever values were submitted */
                
                if (movieFound != null) {
                    console.log("Updating movie entity with id = " + movieId);
                    console.log("Updating movie entity with genreId = " + req.body.genre);
                    
                    typeof req.body.genre !== "undefined" ? console.log("Genre is not undefined") : console.log("Genre is undefined");

                    db.Pelicula.update(
                        {
                            title:  typeof req.body.title !== "undefined" ? req.body.title : movieFound.title,
                            rating: typeof req.body.rating !== "undefined" ? parseFloat(req.body.rating) : movieFound.rating,
                            awards: typeof req.body.awards !== "undefined"  ? parseInt(req.body.awards) : movieFound.awards,
                            release_date: typeof req.body.releaseDate !== "undefined" ? req.body.releaseDate : movieFound.releaseDate,
                            length: typeof req.body.length !== "undefined" ? parseInt(req.body.length) : movieFound.length,
                            genre_id: typeof req.body.genre !== "undefined" ? parseInt(req.body.genre) : movieFound.genre
                        },
                        {
                            where: { id: movieId }
                        }
                    ).then(movie => {

                        let respuesta;

                        if (movie) {
                            respuesta = {
                                meta: {
                                    status: 200,
                                    total: 1,
                                    url: 'api/movies/update/:id'
                                },
                                data: movie
                            }
                        } else {
                            respuesta = {
                                meta: {
                                    status: 204,
                                    total: 1,
                                    url: 'api/movies/update/:id'
                                },
                                data: movie
                            }
                        }

                        res.json(respuesta);

                    }).catch(error => {

                        console.log("Exception thrown during movie creation process. " + error);
                        respuesta = {
                            meta: {
                                status: 404,
                                total: 0,
                                url: 'api/artistas/create'
                            },

                            data: error
                        };

                        /**Return a response if a catch is triggered */
                        res.json(respuesta);

                    })
                } else {
                    console.log("No movie entity found with movieId = " + movieId);


                    respuesta = {
                        meta: {
                            status: 204,
                            total: 0,
                            url: 'api/movies/update/:id'
                        },
                        data: null
                    }
                    res.json(respuesta);

                };
            }
            );



    }


}

module.exports = moviesController;