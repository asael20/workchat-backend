const { MYSQL_OPTIONS } =  require('./options');

const knex = require("knex")(MYSQL_OPTIONS);

module.exports = knex;
