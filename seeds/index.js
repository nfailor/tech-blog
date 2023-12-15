const sequelize = require('../config/connection');
const seedUser = require('./demo-user');
const seedPost = require('./demo-post');
const seedComment = require('./demo-comment');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPost();

  await seedComment();

  process.exit(0);
};

seedAll();
