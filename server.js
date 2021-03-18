  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  const dotenv = require('dotenv')
  const conn = require('./database/database')
  const initializePassport = require('./passport-config')
  const { Settings } = require('./controllers/settingsController')
  const {Projects} = require('./controllers/projectController')
  const {Edu} = require('./controllers/eduController')
  const {Work} = require('./controllers/workController')
  const mongoose = require('mongoose')
  const settModel = require('./models/settingModel')
  const proModel = require('./models/projectModel')
  const eduModel = require('./models/eduModel')
  const workModel = require('./models/workModel')

  
  const users = [
    ulvi={
        "id": "1614789785624",
        "name": "Ülvi Məmmədov",
        "email": "onezerolord@gmail.com",
        "password": "$2b$10$m5iWEQKGTVkAJRz95KJPOeko.M98HccZq0eYTkg7Gv9NDtSfaANNq"
        
    }
  ]
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
  dotenv.config()
  conn();
  var settingObject =[]
  var projectObject = []
  var eduObject = []
  var workObject = []
  app.listen(process.env.PORT);

app.set('view-engine', 'ejs').use(express.static(__dirname + '/views'))
  .use(express.urlencoded({ extended: false }))
  .use(flash())
  .use(session({secret: 'process.env.SESSION_SECRET',resave: false,saveUninitialized: false}))
  .use(passport.initialize())
  .use(passport.session()).use(methodOverride('_method'))
  .post("/settings",checkAuthenticated,Settings)
  .post("/projects",checkAuthenticated,Projects)
  .post("/edu",checkAuthenticated,Edu)
  .post("/work",checkAuthenticated,Work)
  .get('/',(req,res)=>{
    settModel.find({}).then(data =>{
      settingObject = data;
    })
    proModel.find({}).then(data =>{
      projectObject = data;
  
    })
    eduModel.find({}).then(data=>{
      eduObject = data
    })
    workModel.find({}).then(data=>{
      workObject = data
    })
   res.render('index.ejs', {setting: settingObject, project :projectObject, edu:eduObject, work:workObject}); 
  })
  .get('/admin', checkAuthenticated, (req, res) => {

    settModel.find({}).then(data =>{
      settingObject = data;
    })
     proModel.find({}).then(data =>{
      projectObject = data;

    })
    eduModel.find({}).then(data=>{
      eduObject = data
    })
    workModel.find({}).then(data=>{
      workObject = data
    })
      res.render('admin.ejs',{setting: settingObject, project :projectObject,  edu:eduObject, work:workObject})
      
  })
  .get('/login', checkNotAuthenticated, (req, res) => {
    res.render('adminLogin.ejs')
  })
  .post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/adminLogin',
    failureFlash: true
  }))
  .delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  .get('/*',(req,res)=>{
    res.send(404)
    })
    
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/*')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/admin')
    }
    next()
  }
  
  