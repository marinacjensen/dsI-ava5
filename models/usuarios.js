module.exports = (sequelize, DataTypes) => {

    var usuarios = sequelize.define('usuarios', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        senha:
        {
            type: DataTypes.STRING,
        }


    },
        { timestamps: false }


    )
    return usuarios
}