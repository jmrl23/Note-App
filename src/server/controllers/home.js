const router = require('express').Router()

router

  .get('/', (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/user/login')
    }
    res.render('app')
  })

module.exports = router