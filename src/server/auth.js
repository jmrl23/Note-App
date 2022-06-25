/**
 * Authorization checker
 * 
 * Check if a user is already logged in or the request 
 * is from the same host
 */

module.exports = (req, res, next) => {
  const { auth } = req.query
  const host = req.header('host')
  const referer = req.header('referer')?.replace(/(^\w+:|^)\/\//, '') || ''
  if (referer.startsWith(host) || req.session?.userId) {
    return next()
  }
  if (auth !== process.env.AUTH) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}