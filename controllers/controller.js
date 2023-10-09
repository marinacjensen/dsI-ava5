const {
    sequelize,
    Sequelize
} = require('../config/database');
const bcrypt = require('bcrypt');

const livros = require('../models/livros')(sequelize, Sequelize);
const usuarios = require('../models/usuarios')(sequelize, Sequelize);
const emprestimo = require('../models/emprestimo');
const Op = Sequelize.Op;

exports.index = (req, res) => {
    res.render('index');
};

exports.registerForm = (req, res) => {
    res.render('registerForm');
};

exports.addUser = async (req, res) => {
    const {
        nome,
        email,
        senha
    } = req.body;
    const senha_hashed = await bcrypt.hash(senha, 10)
    await usuarios.create({
        nome,
        email,
        senha: senha_hashed
    });
    req.flash('success', 'Usuário cadastrado com sucesso!');
    res.redirect('/');
}

exports.authUser = async (req, res) => {
    const {
        id,
        nome,
        senha: senha_hashed
    } = await usuarios.findOne({
        where: {
            email: req.body.email
        }
    });
    const auth = await bcrypt.compare(req.body.senha, senha_hashed);
    if (!auth) {
        req.flash('errors', 'Usuário ou senha incorretos');
        return res.redirect('/');
    }else{
    req.session.regenerate(() => {
        req.session.user = {
            id,
            nome
        };
        if(nome === "admin"){
            return res.redirect('/livrosAdmin');
        } else{
            return res.redirect('/user');
        }
    });
};
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        return res.redirect('/');
    });
};

exports.showUser = async (req, res) =>{
    const results = await emprestimo.findAll({
        where: {
            usuario: req.session.user.id
        }
    })
    res.render('user');
}

exports.booksUser = async (req, res) => {
    const results = await livros.findAll({
        order: [
            ['id', 'DESC']
        ]
    });
    res.render('filtro', {
        results
    });
};

exports.booksYear = async (req, res) => {
    const results = await livros.findAll({
        order: [
            ['ano', 'DESC']
        ]
    });
    res.render('filtro', {
        results
    });
};

exports.busca =
    async (req, res) => {
        const results = await livros.findAll({
            where: {
                titulo: {
                    [Op.substring]: req.query.busca
                }
            }
        });
        res.render('filtro', {
            results
        });
    };

exports.aluga = async (req, res) => {
    const emprestimo = {
        usuario: req.session.user.id,
        livro: req.params.id,
    };

    const qtde = (await livros.findOne({
            where: {
                id: emprestimo.livro
            }
        }))
        .quantidade;

    if (qtde == 0) {
        req.flash('errors', 'Não há exemplares desse livro');
        res.redirect('/user')
    } else if (
        await emprestimo.findOne({
            where: {
                usuario: emprestimo.usuario,
                livro: emprestimo.livro
            },
        })
    ) {
        req.flash('errors', 'Você já alugou esse livro.');
        res.redirect('/user')
    } else
        emprestimo
        .create(emprestimo)
        .then((dados) => {
            livros.update({
                quantidade: qtde - 1
            }, {
                where: {
                    id: emprestimo.livro
                }
            });
            req.flash("dataRegister", "Dados registrados" + dados);
            res.redirect("/");
        })
};

exports.showBooks = async (req, res) => {
    const results = await livros.findAll({
        order: [
            ['id', 'ASC']
        ]
    });
    res.render('books', {
        results
    });
};

exports.registerBooks = (req, res) => {
    res.render('registerBooks');
};

exports.addBooks = async (req, res) => {
    const {
        autor,
        titulo,
        ano,
        quantidade
    } = req.body;
    const user = null;
    await livros.create({
        autor,
        titulo,
        ano,
        quantidade,
        user
    });
    res.redirect('/livrosAdmin');
}

exports.deleta = async (req, res) => {
    const id = req.params.id;
    await livros.destroy({
        where: {
            id
        }
    });
    res.redirect('/livrosAdmin');
};

exports.edita = async (req, res) => {
    const id = req.params.id;
    const livro = await livros.findByPk(id);
    res.render('editBooks', {
        id,
        livro
    });
};

exports.atualiza = async (req, res) => {
    const id = req.params.id;
    const {
        autor,
        titulo,
        ano,
        quantidade
    } = req.body;
    await livros.update({
        autor,
        titulo,
        ano,
        quantidade
    }, {
        where: {
            id
        }
    });
    res.redirect('/livrosAdmin');
};