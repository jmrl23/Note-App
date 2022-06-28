/**
 * Account controller, modify user informatio such as 
 * password.
 */

const router = require('express').Router()

router

  .get('/account', async (req, res, next) => {
    if (!req.session.userId) {
      return next()
    }
    try {
      const { model } = await require('../../db')
      const { user } = model
      const document = await user.findById(req.session.userId)
      const dateJoined = require('moment')(document.dateJoined).format('YYYY-MM-DD')
      res.render('account', {
        document,
        dateJoined
      })
    } catch (error) {
      res.status(500).end(error.message)
    }
  })

module.exports = router
