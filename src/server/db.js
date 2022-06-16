/**
 * Database connection, this holds the schemas and models for database
 * database entites.
 */

const mongoose = require('mongoose')
const crypto = require('crypto-js')

module.exports = new Promise(async (resolve, reject) => {
  try {
    await mongoose.connect(process.env.DB_STRING)

    const NoteSchema = mongoose.Schema({
      title: { type: String, required: true },
      content: { type: String, requried: true },
      lastUpdated: { type: Date, default: () => new Date() }
    })

    NoteSchema.pre('remove', function (callback) {
      this.model('user').remove({ notes: this._id , callback})
    })

    const note = mongoose.model('note', NoteSchema)

    const UserSchema = mongoose.Schema({
      username: { type: String, index: true },
      dateJoined: { type: Date, default: () => new Date() },
      auth: {
        username: { type: String, index: true },
        password: { type: String, required: true },
        salt: { 
          type: String, 
          default: () => crypto.MD5(Date.now().toString().toString()).toString() 
        }
      },
      notes: [ { type: mongoose.Schema.Types.ObjectId, ref: 'note' } ]
    })

    UserSchema.pre('save', function (next) {
      if (!this.isModified('auth.password')) {
        return next()
      }
      this.auth.password = crypto.SHA256(this.auth.password + this.auth.salt).toString()
      next()
    })

    const user = mongoose.model('user', UserSchema)

    resolve({
      schema: { NoteSchema, UserSchema },
      model: { note, user }
    })
  } catch (error) {
    reject(error.message)
  }
})
