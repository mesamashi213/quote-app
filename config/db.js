require("dotenv").config();
const { Sequelize } = require("sequelize");

// SQLite configuration example
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // SQLite file path
});

// Import models and pass sequelize instance and DataTypes
const Quote = require("../models/quote")(sequelize, Sequelize.DataTypes);

// Sync models (creates tables in the database)
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // `force: false` ensures tables aren't dropped on restart
    console.log("Database and tables have been created or synchronized");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
};

syncDatabase();

module.exports = { sequelize, Sequelize, Quote };
