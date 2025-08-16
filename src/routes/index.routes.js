
const express= require('express');
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/",authMiddleware.authUser,(req,resp)=>{
    resp.render("Home")
})

module.exports = router;