const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth')



router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const posts = postData.map(post => post.get({ plain: true }))
        res.render('home', { posts })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})


router.get('/dashboard', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login')
    } else {
        res.render('dashboard', {
            logged_in: true
        })
    }
})

router.get('/newPost', (req, res) => {
    res.render('newPost')
})

router.get('/comment', (req, res) => {
    res.render('comment')
})


router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard')
    } else {
        res.render('signup')
    }
})

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.user_id = newUser.id;
        req.session.logged_in = true;
        req.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
            } else {
                console.log('Session saved successfully');
                res.redirect('/dashboard');
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router