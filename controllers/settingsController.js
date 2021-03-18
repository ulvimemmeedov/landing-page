const settingModel = require('../models/settingModel')


const Settings = async (req, res,next)=>{

    try{
        const settings = await settingModel.create({
            name : req.body.name,
            job : req.body.job,
            title : req.body.title,
            image : req.body.image,
            resume : req.body.resume,
            skillsPr : req.body.skillsPr,
            skillsFr : req.body.skillsFr,
            skillsLb : req.body.skillsLb,
            skillsDb : req.body.skillsDb,
            country : req.body.country,
            ex : req.body.ex,
            tell : req.body.tell,
            email : req.body.email,
            age : req.body.age,
            hi : req.body.hi,
            des : req.body.des,
            front : req.body.front,
            desk : req.body.desk,
            back : req.body.back
        })
            res.json(settings)
    }
    catch(err){
        return next(err)
    }
    }
    module.exports={
        Settings
    }
