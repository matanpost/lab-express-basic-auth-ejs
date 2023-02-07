const router = require("express").Router();

const User = require('../models/User.model')

// Get signup page
router.get("/signup", (req, res, next) => {
    res.render('auth')
})

/* POST signup page */
router.post("/signup", async(req, res, next) => {
  
    const body ={...req.body }

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
})

module.exports = router;
