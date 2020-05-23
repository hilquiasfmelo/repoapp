module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'repoapp',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
