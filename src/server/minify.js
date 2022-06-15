/**
 * Minifies the output for `response.render` method. This makes the
 * performance of the application's response faster.
 */

const minifyHTML = require('express-minify-html-2')
const minify = minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: false,
    removeEmptyAttributes: true,
    minifyJS: true
  }
})

module.exports = minify
