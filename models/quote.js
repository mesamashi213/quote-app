module.exports = (sequelize, DataTypes) => {
  // Define the Quote model
  const Quote = sequelize.define("Quote", {
    recipientEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quoteId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      validate: {
        isIn: [["pending", "accepted", "denied"]],
      },
    },
  });

  return Quote;
};
