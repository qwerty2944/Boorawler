const electron = require("electron")
const ipc = electron.ipcRenderer

// const fs = require("fs")
// const axios = require("axios")
const cheerio = require('cheerio')
// const puppeteer = require("puppeteer")
const iconv = require('iconv-lite')
// const Iconv1 = require('iconv').Iconv;
const sanitizeHtml = require('sanitize-html')
const request = require('request');

// const iconv1 = new Iconv1('bin','utf-8')

//태그 선택 체이닝 https://www.zerocho.com/category/jQuery/post/57a9abece6cb6015004403a8

const crawler = async () => {
    try{
    const url = "https://cafe.naver.com/ArticleList.nhn?search.clubid=27745269&search.menuid=264&search.boardtype=L"
    
    request({
        url: "https://cafe.naver.com/ArticleList.nhn?search.clubid=27745269&search.menuid=264&search.boardtype=L",
        method: 'GET',
        encoding: null,
      }, (error, response, body) => {
        const decodedResult = iconv.decode(body, 'euc-kr');
        const $ = cheerio.load(decodedResult);

        const countnumbertags = $('.inner_number').length
        console.log(countnumbertags)


        numbertag = $('.inner_number').eq(countnumbertags-1).text()

        titletag = $('.inner_number').eq(countnumbertags-1).parent().parent().find('a').text().trim();   
        split_titletag = titletag.split("  ")
        split_titletag = split_titletag.filter( v => v != "")
        split_titletag = split_titletag.filter( v => v != "\n").filter( v => v != "\n\n")
        split_titletag = split_titletag.join()

        nametag = sanitizeHtml( $('.inner_number').eq(countnumbertags-1).parent().parent().parent().find('td').eq(1).find('a').text() )
        
        timetag = sanitizeHtml( $('.inner_number').eq(countnumbertags-1).parent().parent().parent().find('td').eq(3).text() )

        console.log(numbertag)
        console.log(split_titletag);
        console.log(nametag)
        console.log(timetag)
        

        // console.log(titletags);
        // console.log(writertags)
        // console.log(datetags)
      });

      

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
   
    lanum = crawler()
    
    

    lanum.then(
        result => lastresult=result
    )
    Last.innerHTML = lastresult
   
    // console.log(typeof(lanum))
    
})




// module.exports = crawler