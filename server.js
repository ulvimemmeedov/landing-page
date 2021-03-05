if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  
  const initializePassport = require('./passport-config')
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
  
  const users = [
    ulvi={
        "id": "1614789785624",
        "name": "Ülvi Məmmədov",
        "email": "onezerolord@gmail.com",
        "password": "$2b$10$m5iWEQKGTVkAJRz95KJPOeko.M98HccZq0eYTkg7Gv9NDtSfaANNq"
        
    }
  ]
  
  
  app.set('view-engine', 'ejs')
  app.use(express.static(__dirname + '/views'));

  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: 'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))

  app.get('/',(req,res)=>{
    res.render('index.ejs')
  })  
  app.get('/admin', checkAuthenticated, (req, res) => {
    res.render('admin.ejs',{ name: req.user.name})
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('adminLogin.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/adminLogin',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  app.get('/users',checkAuthenticated, (req,res)=>{
      res.json(users)
  })
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/home')
    }
    next()
  }
  
  app.listen(2000)