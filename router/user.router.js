const {Router} = require("express");
const User = require("../models/usere.model");

const router = Router()

router.get("/signup", (req, res) => {
     return res.render("signup");
})

router.get("/login", (req, res) => {
   return  res.render("signin");
})
router.post("/signup",async (req, res) => {
    const {fullName, email, password} = req.body;

    // res.send({fullName, email, password})

    await User.create({
        fullName,
        email,
        password
    })
    res.redirect("/")

})

router.post("/login", (req, res) => {
    const {email,password} = req.body;
    const user = User.matchPassword(email,password)

   if(user) return res.redirect("/")
})

module.exports = router