const { Sequelize } = require("sequelize");

const seq = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: true,
    port: process.env.DATABASE_PORT
});

try {
    seq.authenticate();
    seq.sync({
        force: true
        // alter: true
    })
} catch (error) {
    console.log(`connection Failed with database/n${error}`)
}

const db = {}
db.Sequelize = Sequelize;
db.seq = seq;

module.exports = {
    seq
}