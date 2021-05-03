const express = require('express')
const router = express.Router()

router.get('/',(req, res, next)=>{
    console.log("홈피")
    // res.send("홈페이지")
    // res.sendFile()
    // res.sendFile(path.join(__dirname,"/views/Home.html"))
    res.render('Home', {
        title: '메인페이지'
    });
    
})

module.exports = router