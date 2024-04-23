const {Router} = require("express");
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog.model");

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

router.get("/addBlog", (req, res) => {
    return res.render("addBlog",{
        user : req.user
    });

})
router.post("/", upload.single("CoverImage"),async (req,res)=>{
    const {title, body}=req.body;
    const blog = await Blog.create({
        body,
        title,
        user: req.user._id,
        coverImageUrl: `uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})

module.exports = router