const mongoose = require('mongoose')
const schema = mongoose.Schema;

const SettingsSchema = new schema({
    name:{type: String},
    job:{type:String},
    title: { type: String },
    image: { type: String },
    resume: { type: String},
    skillsPr:{type: String},
    skillsFr:{type: String},
    skillsLb:{type: String},
    skillsDb:{type: String},
    country:{type: String},
    tell:{type: String},
    email:{type: String},
    ex:{type: String},
    age:{type: String},
    hi:{type: String},
    des:{type: String},
    front:{type: String},
    desk:{type: String},
    back:{type: String},
})
module.exports = mongoose.model("Settings",SettingsSchema)