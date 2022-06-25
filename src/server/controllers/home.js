/**
 * Home, default end-point
 * 
 * Redirect to login page if not logged in yet
 */

const router = require('express').Router()

router

  .get('/', (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/user/login?auth=' + process.env.AUTH)
    }
    res.render('app')
  })

module.exports = router