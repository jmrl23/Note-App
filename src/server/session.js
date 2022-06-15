/**
 * Session configuration of the application. Responsible for session
 * security and performance.
 */

const express_session = require('express-session')
const MongoStore = require('connect-mongo')
const session = express_session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  resave: false,
  saveUninitialized: false
})

module.exports = session
