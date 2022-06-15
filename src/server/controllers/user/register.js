const router = require('express').Router()

router

  .get('/register', (req, res, next) => {
    if (req.session.userId) {
      return next();
    }
    res.render('register')
  })

  .post('/register', async (req, res, next) => {
    
    if (req.session.userId) {
      return res.json({ error: 'already logged-in', document: null })
    }

    let { username, password } = req.body

    if (
      typeof username !== 'string' ||
      typeof password !== 'string' ||
      username.trim().length < 1 ||
      password.length < 1
    ) {
      return res.json({ error: 'empty field', document: null })
    }

    username = username.trim()

    if (!username.match(/^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/g)) {
      return res.json({ error: 'invalid username', document: null })
    }

    if (password.length < 8) {
      return res.json({ error: 'password length must be at least 8 characters', document: null })
    }

    try {
      const { model } = await require('../../db')
      const { user } = model

      const existing = await user.findOne({ 'auth.username': username.toLowerCase() })

      if (existing) {
        return res.json({ error: `${username} is already taken` })
      }

      const document = await user({
        username,
        auth: {
          username: username.toLowerCase(),
          password
        }
      }).save()

      req.session.userId = document._id

      return res.json({ error: null, document })

    } catch (error) {
      res.status(500).json({ error: error.message, document: null })
    }
  })

module.exports = router
