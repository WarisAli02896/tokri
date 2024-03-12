const { Sequelize } = require("sequelize");

const seq = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    logging: true,
    port: process.env.DATABASE_PORT
});

try{
    seq.authenticate();
    console.log(`Server connected to DB ${process.env.DATABASE_NAME} on port no ${process.env.DATABASE_PORT}`);
    seq.sync({
        force: false
    })
}catch(error){
    console.log(`connection Failed with database/n${error}`)
}

const db = {}
db.Sequelize = Sequelize;
db.seq = seq;

module.exports = {
    seq
}