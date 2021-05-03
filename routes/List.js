const express = require('express')
const router = express.Router()
const sanitizeHtml = require('sanitize-html')

router.get('/',(req, res, next)=>{
    // /write로 적지마 중복됨
    console.log(sanitizeHtml(res))
    // res.send("홈페이지")
    // res.sendFile()
    res.render('List', {
        title: '쓰기페이지'
    });
    
})

module.exports = router