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
    }
}

module.exports = moviesController;