const {Router} = require("express");
const User = require("../models/usere.model");

const router = Router()

router.get("/signup", (req, res) => {
     return res.render("signup");
})

router.get("/signin", (req, res) => {
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

router.post("/signin",async (req, res) => {
    const {email,password} = req.body;
    // console.log(email, password)
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password)
        // console.log("token", token)
        
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin",{
            error:"Incorrect email or password",
        })
    }

})

router.get("/signout", (req, res) => {
    return res.clearCookie("token").redirect("/");
})

module.exports = router