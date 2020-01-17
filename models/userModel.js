const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db-dev.sqlite',
    operatorsAliases: Sequelize.Op,
    logging: console.log
});

const User = sequelize.define('auths', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    pw: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'auths'
});

User.sync({ force: true });

export const createUser = async (data) => {
    return await User.create(data);
};

export const findUser = async (id) => {
    return await User.findOne({
        where: {id}
    });
};