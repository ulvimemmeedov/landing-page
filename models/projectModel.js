const mongoose = require('mongoose')
const schema = mongoose.Schema;

const ProjectSchema = new schema({
    name:{type:String},
    des:{type:String},
    lang:{type:String},
    img:{type:String},
    link:{type:String}
})
module.exports = mongoose.model("Project",ProjectSchema)