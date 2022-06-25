const router = require('express').Router()

router.get('/update/:noteId([0-9a-z]{24})', async (req, res, next) => {
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
    const { title, content } = targetNote
    res.render('update-note', { title, content })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
