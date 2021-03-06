const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
let sequelize;
console.log(config);
if (config.use_env_variable) {
  console.log('Going in IF');
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  console.log('Going in ELSE');
  console.log('PORT: ', process.env.PORT);
  config.host = process.env.MYSQL_HOST || config.host;
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
