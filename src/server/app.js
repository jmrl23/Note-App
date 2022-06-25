/**
 * Main dispatcher for the application, this holds app configurations,
 * routes, and global middlewares.
 */

const express = require('express')
const app = express()

app.set('json spaces', 2)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/../views')

app.use(
  express.static(__dirname + '/../public', {
    maxAge: process.env.NODE_ENV === 'production' ? 
    31536000 : 0
  }),
  express.urlencoded({ extended: false }),
  express.json(),
  require('./auth'),
  require('./session'),
  require('./minify'),
  require('./controllers')
)

module.exports = app
