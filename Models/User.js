const { DataTypes } = require('sequelize');
const db = require("./db");

const Users = db.define("Users", {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Users.findUserByUserName = async function (userName) {
    return Users.findOne({
        where:{
            userName,
        }
    })
};

Users.finUserdById = async function (id) {
    return Users.findByPk(id);  
};

module.exports = Users;
