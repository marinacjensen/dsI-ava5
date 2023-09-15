module.exports = (sequelize, DataTypes) => {

    var livros = sequelize.define('livros', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        autor: {
            type: DataTypes.STRING
        },
        titulo: {
            type: DataTypes.STRING
        },
        ano:
        {
            type: DataTypes.INTEGER,
        },
        id_cliente:
        {
            type: DataTypes.INTEGER,
        },
        quantidade:
        {
            type: DataTypes.INTEGER,
        }

    },
        { timestamps: false }


    )
    return livros
}