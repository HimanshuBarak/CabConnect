const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

//signup
router.post('/',(req,res)=>{
    let {name,email,password} = req.body;
    console.log(req);
    //validation of signup form
    let errors = [];
      if (!name) {
        return res.status(400).json({errorMessage:"Please enter your name"});
        }  
      if (!email) {
        return res.status(400).json({errorMessage:"Please enter your email"});
      } 
     
      if (!password) {
        return res.status(400).json({errorMessage:"Please enter your password"});
      }  
     
     
    //checking if the user already exists if not than create the user
    User.findOne({email:email})
    .then(user =>{
        if(user){
            return res.status(422).json({errorMessage:"The email you entered already exists"});
        }
        else{
            const user = new User({
                name:name,
                email:email,
                password:password,
            });
            //crypting the password using hash and salt
            bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
                if (err) throw err;
                user.password = hash;
                user.save()  //saving the password to the database
                    .then(response => {
                       res.status(200).json({success: true, result: response})
                    })
                    .catch(err => {
                        res.status(500).json({ errors: [{ error: err }] });
                     });
                  });
               });
              }
    })
    .catch(err =>{
               res.status(500).json({
                 errors: [{ error: 'Something went wrong' }]
               });
           })
})

//for login 
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate the email and the password
    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    
     
    // sign the token
    const token = jwt.sign(
      {
        user: existingUser._id,
        name: existingUser.name,
        email: existingUser.email
      },
      process.env.JWT_SECRET
    );
    // send the token in a HTTP-only cookie
    res
     .cookie("token", token, {
        httpOnly: true,
       
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});


//for logging out
router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
       
      })
      .send();
  });

  //basically responds with true if your logged in and false if you are not logged in
  router.get("/loggedIn", (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.json(false);
  
      jwt.verify(token, process.env.JWT_SECRET);
  
      res.send(true);
    } catch (err) {
      res.json(false);
    }
  });
  router.get("/user", (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.json(false);
  
      const verified=jwt.verify(token, process.env.JWT_SECRET);
      
      res.json(verified);
    } catch (err) {
      res.json(false);
    }
  });



module.exports = router;