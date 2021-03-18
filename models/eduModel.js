const mongoose = require('mongoose')
const schema = mongoose.Schema;

const EduSchema = new schema({
    name:{type:String},
    year:{type:String},
    degre:{type:String},
    ix:{type:String},
})
module.exports = mongoose.model("Edu",EduSchema)