/**
 * Main dispatcher for the application, this holds app configurations,
 * routes, and global middlewares.
 */

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/../views')

app.use(
  express.static(__dirname + '/../public'),
  express.urlencoded({ extended: false }),
  express.json(),
  require('./session'),
  require('./minify'),
  require('./controllers')
)

module.exports = app
