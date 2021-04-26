const electron = require("electron")
const ipc = electron.ipcRenderer

const fs = require("fs")
// const cheerio = require('cheerio')
const puppeteer = require("puppeteer")


const crawler = async () => {
    try{
    const browser = await puppeteer.launch({headless : process.env.NODE_ENV ==='production'}); //배포환경에서는 화면안보이게
    console.log("부롤러2021 작동")
    

    const [page1, page2] = await Promise.all([ //동시에 열고
        browser.newPage(),
        browser.newPage()
    ]);

    //userAgent 설정
    await Promise.all([
        //navigator.userAgent
        page1.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"),
        page2.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36")
        
    ])

    // console.log(await page1.evaluate('navigator.userAgent')) //useragent정상작동확인


    await Promise.all([ //동시에 여는건 순서대로 열필요 없음
        page1.goto('https://cafe.naver.com/culturebloom'), //이동할 사이트
        page2.goto('https://cafe.naver.com/culturebloom') //이동할 사이트
    ]);



    await Promise.all([
        page1.waitFor(1000),//1초 대기후
        page2.waitFor(1000),//1초 대기후
    ])

    
    await Promise.all([
        page1.click('#menuLink264'),//먹방수다이동
        page2.click('#menuLink264'),//먹방수다이동
    ])

    console.log("먹방수다 이동")

    // await Promise.all([
    //     page1.waitFor(2000),//2초 대기후
    //     page2.waitFor(2000),//2초 대기후
    // ])

    // await page2.waitForResponse((response) =>{
    //     return response.url().includes('특정태그');
    // })


    console.log("흠좀무")


    const content =  await page1.evaluate(()=>{
        console.log(document)
        const test1 = document.querySelector("a");
        const bulletin_number = document.querySelector("#main-area > div:nth-child(7) > table > tbody > tr:nth-child(1) > td.td_article > div.board-number > div.inner_number").textContent
        return {
            test1, bulletin_number
        }
    })
 
    console.log(content)

    await Promise.all([
        page1.waitFor(8000),//3초 대기후
        page2.waitFor(8000),//3초 대기후
    ])


    await page1.close(); // 창1페이지닫기
    await page2.close(); // 창2페이지닫기


    await browser.close() // 브라우저 끄기
    console.log("부롤러2021 정지")

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