const { Post } = require('../models');

const postdata = [
  {
    title: 'A Fake Post',
    body: 'This is designed to make sure my routes and posts are properly executing',
    user_id: 1,
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
