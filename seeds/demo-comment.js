const { Comment } = require('../models');

const commentdata = [
  {
    body: 'This is designed to make sure my comments are properly posting',
    user_id: 1,
    post_id: 1,
  },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;
