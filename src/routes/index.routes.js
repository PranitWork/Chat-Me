
const express= require('express');


const router = express.Router();

router.get("/",(req,resp)=>{
    resp.render("Home")
})

module.exports = router;