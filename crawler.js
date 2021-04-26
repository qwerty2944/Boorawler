const electron = require("electron")
const ipc = electron.ipcRenderer

const fs = require("fs")
const axios = require("axios")
const cheerio = require('cheerio')
const puppeteer = require("puppeteer")


const crawler = async () => {
    try{
    Target = "https://cafe.naver.com/ArticleList.nhn?search.clubid=27745269&search.menuid=264&search.boardtype=L"
    const response = await axios.get(Target);

    console.log(response.status)

    if (response.status === 200){//응답이 성공한경우
        const html = response.data;
        // console.log(html)
        const $ = cheerio.load(html);
        const number = $('.inner_number').text();
        // console.log(number)

        return number
        
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
    console.log(lanum)
    lanum.then(
        result => lastresult=result
    )
    
    // console.log(typeof(lanum))
    Last.innerHTML = lastresult
})




// module.exports = crawler