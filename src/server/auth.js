module.exports = (req, res, next) => {
  const { auth } = req.query
  const host = req.header('host')
  const referer = req.header('referer')?.replace(/(^\w+:|^)\/\//, '') || ''
  if (referer.startsWith(host)) {
    return next()
  }
  if (auth !== process.env.AUTH) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}