const fs = require("fs")
const puppeteer = require("puppeteer")


const crawler = async () => {
    const browser = await puppeteer.launch({headless : false}) //일단 브라우저보이게

    const page1 = await browser.newPage(); //새창1 띄우고
    const page2 = await browser.newPage(); //새창2 띄우고

    await page1.goto('https://cafe.naver.com/culturebloom') //이동할 사이트
    await page2.goto('https://cafe.naver.com/culturebloom') //이동할 사이트

    await page1.waitFor(3000); //3초 대기후


    await page1.close(); // 창1페이지닫기
    await page2.close(); // 창2페이지닫기


    await browser.close() // 브라우저 끄기

}

crawler();