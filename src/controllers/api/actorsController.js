let db = require("../../database/models");


actorsController = {

    list: (req, res) => {
        console.log("Actor controller findAll ...");

        db.Actor.findAll()
            .then(actors => {
                let meta = {
                    status: 200,
                    total: actors.length,
                    url: "api/actors"
                };

                let data = actors.map((actor, index) => ({
                    [index]: {
                        id: actor.id,
                        firstName: actor.first_name,
                        lastName: actor.last_name,
                        rating: actor.rating,
                        favoriteMovieId: actor.favorite_movie_id                        
                    }
                }));
                
                res.json({ meta, data });
            });
    },

    /** Get details about an specific actor */
    detail: (req, res) => {
        console.log("Actors controller details ...");

        db.Actor.findByPk(req.params.id)
            .then(actor => {

                let meta = {
                    status: 200,
                    total: 1,
                    url: "api/actor/:id"
                };

                let data = {
                    id: actor.id,
                    firstName: actor.first_name,
                    lastName: actor.last_name,
                    rating: actor.rating,
                    favoriteMovieId: actor.favorite_movie_id
                };

                res.json({ meta, data });
               
            });
    }
}

module.exports = actorsController;