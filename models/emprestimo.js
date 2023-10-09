module.exports = (sequelize, DataTypes) => {
    var emprestimo = sequelize.define('emprestimo', {
            usuario: {
                    type: DataTypes.INTEGER
                },
            livro: {
                type: DataTypes.INTEGER
            }

        }
    )
    return emprestimo
}