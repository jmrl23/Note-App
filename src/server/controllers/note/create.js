const router = require('express').Router()

router

  .get('/create', (req, res, next) => {
    if (!req.session.userId) {
      return next()
    }
    res.render('create-note')
  })

module.exports = router
