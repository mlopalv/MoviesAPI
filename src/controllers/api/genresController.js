let db = require("../../database/models");


genresController = {
    
    list: (req, res) => {
        console.log("Genres controller findAll ...");

        db.Genero.findAll()
            .then(genres => {
                let meta = {
                    status: 200,
                    total: genres.length,
                    url: "api/genres"
                };

                let data = genres.map((genre, index) => ({
                    [index]: {
                        id: genre.id,
                        name: genre.name,
                        ranking: genre.ranking,
                        active: genre.active,
                        created_at: genre.created_at,
                        updated_at: genre.updated_at
                    }
                }));
                //console.log(peliculas);
                res.json({ meta, data});
            });
    },
    
    detail: (req, res) => {
        console.log("Genres controller details ...");

        db.Genero.findByPk(req.params.id)
            .then(genre => {

                let meta = {
                    status: 200,
                    total: 1,
                    url: "api/genres"
                };

                let data = {
                        id: genre.id,
                        name: genre.name,
                        ranking: genre.ranking,
                        active: genre.active,
                        created_at: genre.created_at,
                        updated_at: genre.updated_at
                    };
                
                //console.log(peliculas);
                res.json({ meta, data});
                //console.log(peliculas);
                //res.render("genresDetail", { genre });
            });
    }
}

module.exports = genresController;