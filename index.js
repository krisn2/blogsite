const path = require ("path");
const express = require ("express");
const mongoose = require ("mongoose");

const userRoute = require('./router/user.router');

const app = express();
const PORT = 3000;
mongoose.connect("mongodb://localhost:27017/blogsite")
.then (()=> console.log("MongoDB connected"))

app.set('view engine', "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

app.get("/", (req,res)=>{
    res.render("home");
})

app.use("/user" ,userRoute)

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));