export default {
  attributes: {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    isrc: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  },

  associations: () => {
    Artist.belongsTo(Track, { foreignKey: 'isrc', as:`artists` });
  },

  options: {
    tableName: `artist`,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    underscored: true,
    classMethods: {},
    instanceMethods: {},
    hooks: {},
  },
};