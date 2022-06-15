/**
 * Responsible for making the application running.
 */

const { NODE_ENV: ENV, PORT } = process.env
const server = require('./server')

server.listen(PORT, () => {
  console.table({ ENV, PORT })
})
