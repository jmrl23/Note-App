const router = require('express').Router()

router

  .get('/login', (req, res, next) => {
    if (req.session.userId) {
      return next()
    }
    res.render('login')
  })

  .post('/login', async (req, res, next) => {

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

    try {
      const { model } = await require('../../db')
      const { user } = model

      const document = await user.findOne({ 'auth.username': username.toLowerCase() })
      const crypto = require('crypto-js')

      if (
        !document || 
        document.auth.password !== crypto.SHA256(password + document.auth.salt).toString()
      ) {
        return res.json({ error: `invalid username or password` })
      }

      req.session.userId = document._id

      return res.json({ error: null, document })

    } catch (error) {
      res.status(500).json({ error: error.message, document: null })
    }
  })

module.exports = router
