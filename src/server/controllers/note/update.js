const router = require('express').Router()

router

  .get('/update/:noteId([0-9a-z]{24})', async (req, res, next) => {
    if (!req.session.userId) {
      return next()
    }
    try {
      const { model } = await require('../../db')
      const { note } = model
      const targetNote = await note.findById(req.params.noteId)
      if (!targetNote) {
        return res.json({ error: 'cannot find note' })
      }
      res.render('update-note', { id: req.params.noteId })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  .put('/update/:noteId([0-9a-z]{24})', async (req, res, next) => {
    if (!req.session.userId) {
      return next()
    }
    const noteId = req.params.noteId
    let { title, content } = req.body
    if (!title) {
      title = 'Untitled'
    }
    try {
      const { model } = await require('../../db')
      const { user, note } = model
      const currentUser = await user.findById(req.session.userId)
      if (!currentUser.notes.find(note => note.toString() === noteId)) {
        return res.json({ error: 'cannot find note' })
      }
      const targetNote = await note.findById(noteId)
      targetNote.title = title
      targetNote.content = content
      targetNote.lastUpdated = new Date()
      await targetNote.save()
      res.json({ error: null })
    } catch(error) {
      res.status(500).json({ error: error.message })
    }
  })

module.exports = router
