export default {
  attributes: {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  },

  options: {
    tableName: `artist`,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    underscored: true,
  },
};