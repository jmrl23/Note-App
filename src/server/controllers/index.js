/**
 * Auto register all routes inside the `controllers` directory,
 * this mimics the MVC architecture.
 */

const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const getFolders = dir => {
  const collection = []
  for (const folder of fs.readdirSync(dir)) {
    const location = path.join(dir, folder)
    if (!fs.lstatSync(location).isDirectory()) {
      continue
    }
    collection.push(location, ...getFolders(location))
  }
  return collection
}

const parseRoute = stack => {
  const collection = []
  for (const layer of stack) {
    if (layer.constructor.name !== 'Layer') {
      continue
    }
    collection.push({ path: p, stack: s, method: m } = layer.route)
  }
  return collection
}

getFolders(__dirname + '/../').forEach(dir => {
  for (const content of fs.readdirSync(dir)) {
    const location = path.join(dir, content)
    if (!fs.lstatSync(location).isFile() || path.extname(location).toLowerCase() !== '.js') {
      continue
    }
    const file = require(location)
    if (typeof file !== 'function') {
      continue
    }
    const { stack } = file
    if (stack.length < 1) {
      continue
    }
    const routes = parseRoute(stack)
    for (const route of routes) {
      const controller = dir.replace(__dirname, '').replace(/\\/g, '/')
      let p = `${controller}${route.path}`.replace(/\/$/g, '')
      if (p === '') {
        p = '/'
      }
      for (const stack of route.stack) {
        const { handle, method } = stack
        router[method](p, handle)
        console.log(`${method.toUpperCase()}\t|\t${p}`)
      }
    }
  }
})

module.exports = router
