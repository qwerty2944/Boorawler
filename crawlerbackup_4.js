const electron = require("electron")
const ipc = electron.ipcRenderer

// const fs = require("fs")
const axios = require("axios")
const cheerio = require('cheerio')
// const puppeteer = require("puppeteer")
const iconv = require('iconv-lite')
// const Iconv1 = require('iconv').Iconv;
const sanitizeHtml = require('sanitize-html')
const request = require('request');

// const iconv1 = new Iconv1('bin','utf-8')

const crawler = async () => {
    try{

    const test = request({
        url: "https://cafe.naver.com/ArticleList.nhn?search.clubid=27745269&search.menuid=264&search.boardtype=L",
        method: 'GET',
        encoding: null,
      }, (error, response, body) => {
        const decodedResult = iconv.decode(body, 'euc-kr');
        console.log(decodedResult);
      });

    dotest = await test()

    const config = {
        method: "get",
        url: "https://cafe.naver.com/ArticleList.nhn?search.clubid=27745269&search.menuid=264&search.boardtype=L",
        responseType : "arraybuffer",
        responseEncoding : 'binary'
    }

    const rawdata =  await axios(config)
    // console.log(rawdata.data.toString())
    // console.log(rawdata.data.toString('binary'))

    const refinerawdata = await iconv.encode(rawdata.data,'euc-kr')
    console.log(refinerawdata)
    
    // console.log(rawdata.data)

    // const contents = await iconv.decode(rawdata.data, "UTF-8")
    // const contents = await iconv1.convert(rawdata.data).toString()
    // console.log(contents)
    // let rawdata = await axios(config).then(function(response){
    //     data = iconv.decode(rawdata.data, "EUC-KR")
    //     console.log(data)
    // })

    // iconv = new Iconv1('euc-kr', 'UTF8')
    // console.log(rawdata)

    if (rawdata.status === 200){//응답이 성공한경우
        // const html = rawdata.data
        // console.log(html)
        console.log("시작1")
        // const contents = await iconv.decode(rawdata.data, "EUC-KR")
        // // const contents = iconv.convert(rawdata.data)
        // console.log(contents)




        const $ = cheerio.load(rawdata.data, {decodeEntities: true});

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

        console.log(numbertags)
  
        // console.log(titletags)
        // const refinetitletags = await iconv1.convert(rawdata.data).toString()
        const tobinarytags = await new Buffer(titletags, 'binary')
        const refinetitletags = await iconv1.convert(tobinarytags).toString('utf-8')
        console.log(refinetitletags)

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