const mongoose = require('mongoose')
const schema = mongoose.Schema;

const WorkSchema = new schema({
    name:{type:String},
    des:{type:String},
    year:{type:String}
})
module.exports = mongoose.model("Work",WorkSchema)