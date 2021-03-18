const workModel = require("../models/workModel");

const Work = async (req, res, next) => {
  try {
    const work = await workModel.create({
      name: req.body.name,
      des: req.body.des,
      year: req.body.year
    });
    res.json(work);
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  Work
};
