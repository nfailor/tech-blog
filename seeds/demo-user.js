const { User } = require('../models');
const bcrypt = require('bcrypt');

const userdata = [
    {
        id: 1,
        username: 'testUser',
        email: 'testUser@gmail.com',
        password: '1234'
    }
];

userdata.forEach(async user => {
    user.password = await bcrypt.hash(user.password, 10)
})

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser