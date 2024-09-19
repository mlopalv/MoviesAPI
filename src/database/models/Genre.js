module.exports = (sequelize, dataTypes) => {
    let alias = "Genero";
    
    let cols= {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }, 
        active: {
            type: dataTypes.INTEGER,
            allowNull: false           
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false            
        },
        ranking: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false             
        }
    };

    let config = {
        tableName: "genres",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true
    };

    const Genero = sequelize.define(alias, cols, config);

    Genero.associate = function(modelos) {
        Genero.hasMany(modelos.Pelicula, {
            as: "peliculas",
            foreignKey: "genre_id"
        });
    }
    return Genero;
}