module.exports = (sequelize, dataTypes) => {
    
    let alias = "PeliculaActor";
        
        let cols= {
            id: {
                type: dataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            }, 
            movie_id: {
                type: dataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }, 
            actor_id: {
                type: dataTypes.INTEGER.UNSIGNED,
                allowNull: false
            }
        };
    
        let config = {
            tableName: "actor_movie",
            timestamps: false
        };
    
        const PeliculaActor = sequelize.define(alias, cols, config);
    
        PeliculaActor.associate = function(modelos){
            PeliculaActor.belongsTo(modelos.Pelicula, {
                foreignKey: "pelicula_id"
            });
            
            PeliculaActor.belongsTo(modelos.Actor, {
                foreignKey: "actor_id"
            });
        }            
        return PeliculaActor;
    }
    