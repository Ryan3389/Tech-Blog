const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const posts = await Post.bulkCreate(postData.map(post => ({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id,
    })));

    console.log('Users seeded successfully:', users);
    console.log('Posts seeded successfully:', posts);

    process.exit(0);
};

seedDatabase();