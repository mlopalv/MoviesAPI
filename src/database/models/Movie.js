module.exports = (sequelize, dataTypes) => {
    let alias = "Pelicula";
    
    let cols= {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }, 
        title: {
            type: dataTypes.STRING,
            allowNull: false           
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1),
            allowNull: false            
        },
        awards: {
            type: dataTypes.INTEGER.UNSIGNED.ZEROFILL,
            allowNull: false             
        },
        release_date: {
            type: dataTypes.DATE,
            allowNull: false            
        },
        length: {
            type: dataTypes.INTEGER.UNSIGNED   
            
        },
        genre_id: {
            type: dataTypes.INTEGER.UNSIGNED,          
            allowNull: false
        }
    };

    let config = {
        tableName: "movies",
        timestamps: true,
        underscored: true
    };

    const Pelicula = sequelize.define(alias, cols, config);

    Pelicula.associate = function(modelos){
        Pelicula.belongsTo(modelos.Genero,{
            as: "genero",
            foreignKey: "genre_id"
        });

        Pelicula.belongsToMany(modelos.Actor, {
            as: "actores",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: true
        });
    }

    return Pelicula;
}