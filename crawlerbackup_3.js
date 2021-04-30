const electron = require("electron")
const ipc = electron.ipcRenderer

// const fs = require("fs")
const axios = require("axios")
const cheerio = require('cheerio')
// const puppeteer = require("puppeteer")
const iconv = require('iconv-lite')
const sanitizeHtml = require('sanitize-html')


const crawler = async () => {
    try{
    //Target = "https://cafe.naver.com/ArticleList.nhn?search.clubid=27745269&search.menuid=264&search.boardtype=L"
    // const response = await axios.get(Target);
    
    const config = {
        method: "get",
        url: "https://cafe.naver.com/ArticleList.nhn?search.clubid=27745269&search.menuid=264&search.boardtype=L",
        // headers: {
        //     'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"
        // },
        responseType : "arraybuffer"
        // responseEncoding: 'binary'
    }

    let rawdata = await axios(config)
    

    // const contents = iconv.decode(rawdata.data, "EUC-KR").toString

    // console.log("지점1")
    // console.log(contents)


    // console.log(response.status)

    if (rawdata.status === 200){//응답이 성공한경우
        // const html = rawdata.data
        // console.log(html)
        console.log("시작1")
        const contents = iconv.decode(rawdata.data, "EUC-KR")
        console.log(contents)




        const $ = cheerio.load(contents, {decodeEntities: true});
        const numbertags = sanitizeHtml($('.inner_number'), {
            parser: {
              decodeEntities: true
            }
          });
        
        const titletags = sanitizeHtml($('.article'), {
            parser: {
              decodeEntities: true
            }
          });

        const writertags = sanitizeHtml($('.m-tcol-c'), {
            parser: {
              decodeEntities: true
            }
          });
        
        const datetags = sanitizeHtml($('.td-date'), {
            parser: {
              decodeEntities: true
            }
        });

        // console.log(numbertags)
        console.log(titletags)
        // console.log(writertags)
        // console.log(datetags)

        // let number = $('.inner_number').text();
        // // console.log(number)
        // console.log(typeof(number))
        // let number2 = number.substring(0,5)

        // let title = $('.article').text();
        // // console.log(number)
        // console.log(typeof(title))
        // let title2 = title.substring(0,5) 

        // let nick = $('.m-tcol-c').text();
        // // console.log(number)
        // console.log(typeof(nick))
        // let nick2 = nick.substring(0,5) 

        // let date = $('.td-date').text();
        // // console.log(number)
        // console.log(typeof(date))
        // let date2 = date.substring(0,5) 

        // result = number2+title2+nick2+date2

        // return result
        
    } else {
        console.log("실패")
    }


    } catch(e) {
        console.log(e)
    }
}






let lastresult
// var Btn = window.document.createElement("button")
// Btn.innerHTML = "크롤링구동" 버튼생성이 왜안되는지 잘모르겠음

const Btn = window.document.getElementById("CB")
const Last = window.document.getElementById("LAST")

// console.log(Btn)
Btn.addEventListener('click' , function(){
    console.log("함수호출")
    lanum = crawler()

    
    console.log("호호")
    // console.log(lanum)
    lanum.then(
        result => lastresult=result
    )
    
    // console.log(typeof(lanum))
    Last.innerHTML = lastresult
})




// module.exports = crawler