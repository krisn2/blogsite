const {Router} = require("express");
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog.model");

const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
  
  const upload = multer({ storage: storage })

router.get("/addBlog", (req, res) => {
    return res.render("addBlog",{
        user : req.user
    });

})

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  return res.render("viewBlog", {
    user : req.user,
    blog
  });
})




router.post("/", upload.single("CoverImage"), async (req, res) => {
  const { title, body } = req.body;
  const user = req.user; // Store user for clarity

  if (!user) {
    // Handle the case where user is not authenticated (e.g., redirect to login)
    return res.status(401).send("Unauthorized");
  }

  const blog = await Blog.create({
    body,
    title,
    user: user._id, // Access _id only if user is defined
    coverImageUrl: `uploads/${req.file.filename}`
  });

  return res.redirect(`/blog/${blog._id}`);
});


module.exports = router