export default {
  attributes: {
    isrc: {
      type: Sequelize.STRING(100),
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    image: {
      type: Sequelize.STRING(1000),
      allowNull: true,
    },
  },

  associations: () => {
    Track.hasMany(Artist, { foreignKey: 'isrc', as:`artists` });
  },

  options: {
    tableName: `track`,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    underscored: true,
    classMethods: {},
    instanceMethods: {},
    hooks: {},
  },
};