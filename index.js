const path = require ("path");
const express = require ("express");
const mongoose = require ("mongoose");
const cookieparser = require("cookie-parser")

const Blog = require('./models/blog.model');

const userRoute = require('./router/user.router');
const blog = require('./router/blog.router');


const { chechForAuthenticationCookie } = require("./middlewares/auth.mid");



const app = express();
const PORT = 3000;
mongoose.connect("mongodb://localhost:27017/blogsite")
.then (()=> console.log("MongoDB connected"))



app.set('view engine', "ejs");
app.set("views", path.resolve("./views"));




app.use(express.urlencoded({extended: false}));
app.use(cookieparser());
app.use(chechForAuthenticationCookie("token"));




app.get("/", async(req,res)=>{

    const allBlog = await Blog.find({});
    res.render("home",{
        user : req.user,
        blog : allBlog
    });
})

app.use("/user" ,userRoute)
app.use("/blog" , blog)



app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));