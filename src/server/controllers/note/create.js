const router = require('express').Router()

router

  .get('/create', (req, res, next) => {
    if (!req.session.userId) {
      return next()
    }
    res.render('create-note')
  })

  .post('/create', async (req, res, next) => {
    if (!req.session.userId) {
      return next()
    }
    const { title, content } = req.body
    if (!title || !content) {
      console.log(title, content, req.body)
      return res.json({ error: 'empty field' })
    }
    try {
      const { model } = await require('../../db')
      const { user, note } = model
      const newNote = await note({ title, content }).save()
      const currentUser = await user.findById(req.session.userId)
      currentUser.notes.unshift(newNote)
      await currentUser.save()
      res.json({ error: null })
    } catch (error) {
      res.json({ error: error.message })
    }
  })

module.exports = router
