const fs = require("fs")
// const cheerio = require('cheerio')
const puppeteer = require("puppeteer")


const crawler = async () => {
    const browser = await puppeteer.launch({headless : process.env.NODE_ENV ==='production'}); //배포환경에서는 화면안보이게
    console.log("부롤러2021 작동")
    

    const [page1, page2] = await Promise.all([ //동시에 열고
        browser.newPage(),
        browser.newPage()
    ]);

    await Promise.all([ //동시에 여는건 순서대로 열필요 없음
        page1.goto('https://cafe.naver.com/culturebloom'), //이동할 사이트
        page2.goto('https://cafe.naver.com/culturebloom') //이동할 사이트
    ]);



    await Promise.all([
        page1.waitFor(3000),//3초 대기후
        page2.waitFor(3000),//3초 대기후
    ])

    
    await Promise.all([
        // page1.click(3000),//??로이동
        page2.click('#menuLink264'),//먹방수다이동
    ])


    await page1.close(); // 창1페이지닫기
    await page2.close(); // 창2페이지닫기


    await browser.close() // 브라우저 끄기
    console.log("부롤러2021 정지")
}

crawler();