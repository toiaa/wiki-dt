const Sequelize = require('sequelize');


const db = new Sequelize('postgres://localhost:5432/wiki',{ // el puerto de aca es el de postgres
    logging: false,
    //dialect: 'postgres'
});

 module.exports = db;