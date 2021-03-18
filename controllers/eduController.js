const EduModel = require('../models/eduModel')


const Edu = async (req, res,next)=>{

    try{
        const edu = await EduModel.create({
            name : req.body.name,
            year : req.body.year,
            degre : req.body.degre,
            ix : req.body.ix
        })
            res.json(edu)
    }
    catch(err){
        return next(err)
    }
    }
    module.exports={
        Edu
    }
