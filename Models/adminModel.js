const mongoose = require('mongoose')
const  userModel=require('./UserModel')

const  adminSchema = new mongoose.Schema({

})
const Admin=userModel.discriminator('admin' , adminSchema)

module.exports = mongoose.model('admin')