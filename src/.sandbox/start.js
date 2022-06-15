if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: __dirname + '/dev.env' })
}

require(__dirname + '/../server/index.js')
