const electron = require("electron")
const ipc = electron.ipcRenderer

const fs = require("fs")
const cheerio = require('cheerio')
const puppeteer = require("puppeteer")


const crawler = async () => {
    try{
    const browser = await puppeteer.launch({headless : process.env.NODE_ENV ==='production'}); //배포환경에서는 화면안보이게
    console.log("부롤러2021 작동");
    const page1 = await browser.newPage();

    await page1.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"),
    
    await page1.setViewport({
        width:1080,
        height:1080
    })

    await page1.goto('https://cafe.naver.com/culturebloom');
    page1.waitFor(1000);
    page1.click('#menuLink264')
    page1.waitFor(2000)

    // let itemName = await page1.$eval(
    //     // copy selector 를 이용하여 가져온다.
    //     "#main-area"
    //     , element => {
    //         return element.textContent;
    //     })

    // console.log(itemName)
    
    //중요 !!! 아이프레임있기 때문에 아래코드로 카페의 진짜 url을 알아낸다
    //"https://cafe.naver.com/ArticleList.nhn?search.clubid=27745269&search.menuid=264&search.boardtype=L"
    const frame = await page1.frames().find(frame => frame.name() === 'cafe_main')


    // console.log(frame)
    // const getBulletin = await page1.evaluate( () => {
    //     // const mainarea = document.querySelector("#main-area")
    //     const mainarea = document.querySelector("#main-area > div:nth-child(7) > table > tbody > tr:nth-child(1) > td.td_article > div.board-number > div")
    //     // const lastnumber = mainarea.querySelector("div:nth-child(7)")

        
    //     return mainarea
    // })

    // console.log(getBulletin)


    

    console.log("부롤러2021 정지")
    // await page1.close()
    // await browser.close()
    

    } catch(e) {
        console.log(e)
    }
}







// var Btn = window.document.createElement("button")
// Btn.innerHTML = "크롤링구동" 버튼생성이 왜안되는지 잘모르겠음

const Btn = window.document.getElementById("CB")
// console.log(Btn)
Btn.addEventListener('click' , function(){
    console.log("함수호출")
    crawler()
})
// module.exports = crawler