const router = require("express").Router();

const User = require('../models/User.model')

// Get signup page
router.get("/signup", (req, res, next) => {
    res.render('auth')
})

/* POST signup page */
router.post("/signup", async(req, res, next) => {
   const body ={...req.body }

   if (body.password.length < 6) {
    res.render('auth/signup', { errorMessage: 'Password too short', body: req.body })
  } else{

      const bcrypt = require('bcryptjs');   
      const salt = bcrypt.genSaltSync(12);
      const passwordHash = bcrypt.hashSync("body.password", salt);
      console.log(passwordHash)
      body.password = passwordHash;
  
      try{
         await User.create(body);
         res.send(body);
      }
      catch(error){
          console.log("error in auth promise", error);
      };
  }
})

// Get LOGIN page
router.get("/login", (req, res, next) => {
    res.render('login')
})

/* POST signup page */
router.post("/login", async(req, res, next) => {
    console.log('SESSION =====> ', req.session)
    const body = req.body
  
    const userMatch = await User.find({ username: body.username })
    console.log(userMatch)
    if (userMatch.length) {
      // User found
      const user = userMatch[0]
  
      if (bcrypt.compareSync(body.password, user.passwordHash)) {
        // Correct password
        console.log(user)
        res.render('profile', { user })
      } else {
        // Incorrect password
      }
    } else {
      // User not found
    }

    
})

module.exports = router;
