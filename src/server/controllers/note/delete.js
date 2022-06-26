const router = require('express').Router()

router.delete('/delete/:noteId([0-9a-z]{24})', async (req, res) => {
  try {
    const { model } = await require('../../db')
    const { note } = model
    const result = await note.findOneAndDelete({ _id: req.params.noteId })
    res.json({ error: null })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
