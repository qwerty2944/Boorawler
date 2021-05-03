const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path')
const ejs = require('ejs')
const homeRoutes = require('./routes/Home.js')
const listRoutes = require('./routes/List.js')

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));

app.set('port', process.env.PORT || 8000);
app.use(morgan('dev'))
// app.use('/', express.static(path.join(__dirname,'public3030'))) //static은 성공하면 next를 호출하지않음
// 처음이 요청경로 뒤가 실제경로


app.use('/',homeRoutes);
app.use('/list',listRoutes)
// app.get('/',(req, res, next)=>{
//     console.log("홈피")
//     // res.send("홈페이지")
//     res.sendFile(path.join(__dirname,"Home.html"))
    
// })
// app.get('/',(req, res, next)=>{
//     console.log("홈피")
//     // res.send("홈페이지")
//     res.sendFile("/Home.html")
    
// })

// app.get('/write',(req, res, next)=>{
//     console.log("쓰기")
//     // res.send("글쓰기")
// })




app.listen(app.get('port'), (err, req, res, next)=>{
    console.log(app.get('port')+'에서 실행중')
})
