const mongoose = require('mongoose')
const { Schema } = mongoose


//initial definition of document
const recipientSchema = new Schema ({
    email: String,
    responded: { type: Boolean, default: false }
})

module.exports = recipientSchema