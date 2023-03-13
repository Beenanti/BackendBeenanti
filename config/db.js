require('dotenv').config()

const sequelize = new Sequelize(process.env.NAMA_DB, process.env.USERNAME, process.env.PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql' 
  });


try {
await sequelize.authenticate();
console.log('Connection has been established successfully.');
} catch (error) {
console.error('Unable to connect to the database:', error);
}
