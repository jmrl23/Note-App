const router = require('express').Router()

router

  .get('/fetch', async (req, res) => {
    if (!req.session.userId) {
      res.json({ error: 'no session', documents: [] })
    }
    try {
      const { model } = await require('../../db')
      const { user } = model
      const target = await user.findById(req.session.userId).populate('notes')
      res.json({ error: null, documents: target.notes })
    } catch (error) {
      res.status(500).json({ error: error.message, documents: [] })
    }
  })

  .get('/fetch/:noteId([0-9a-z]{24})', async (req, res) => {
    if (!req.session.userId) {
      res.json({ error: 'no session', document: null })
    }
    try {
      const { model } = await require('../../db')
      const { user } = model
      const target = await user.findById(req.session.userId).populate('notes')
      const document = target.notes.find(note => note._id === req.params.noteId)
      res.json({ error: null, document })
    } catch (error) {
      res.status(500).json({ error: error.message, document: null })
    }
  })

module.exports = router
