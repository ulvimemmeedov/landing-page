const projectModel = require("../models/projectModel");

const Projects = async (req, res, next) => {
  try {
    const projects = await projectModel.create({
      name: req.body.name,
      des: req.body.des,
      lang: req.body.lang,
      img: req.body.img,
      link: req.body.link
    });
    res.json(projects);
  } catch (err) {
    return next(err);
  }
};
module.exports = {
  Projects,
};
