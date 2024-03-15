const { databaseConfig } = require("./src/config/database/database.config");

module.exports = {
  type: 'postgres',
  host: databaseConfig().database.host,
  port: databaseConfig().database.port,
  username: databaseConfig().database.username,
  password: databaseConfig().database.password,
  database: databaseConfig().database.database,
  synchronize: databaseConfig().database.synchronize,
  seed: databaseConfig().database.seeds,
  entities: [__dirname + '/src/core/**/*.entity{.ts,.js}'],
}