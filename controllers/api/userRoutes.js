const router = require('express').Router()
const { User } = require('../../models')

router.post('/user', async (req, res) => {
    try {
        const newUser = await User.create(req.body)

        req.session.save(() => {
            req.session.user_id = newUser.id
            req.session.logged_in = true

            res.redirect('/dashboard')
        })
    } catch (error) {
        console.error(error)
        res.status(400).json(error)
    }
})

module.exports = router