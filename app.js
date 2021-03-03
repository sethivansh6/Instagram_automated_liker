require("dotenv").config()
const puppeteer = require("puppeteer")
console.log(process.env.email)

async function call(noOfPost) {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto("https://www.instagram.com/", { waitUntil: "networkidle2" })
  await page.waitForSelector(".HmktE", { visible: true })
  await page.type("input[name='username']", process.env.email, {
    delay: 100,
  })
  await page.type("input[name='password']", process.env.password, {
    delay: 100,
  })

  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click("button[type='submit']"),
  ])

  await page.type("input[placeholder='Search']", process.env.pageName)
  await page.waitForSelector("._01UL2 .fuqBx a", { visible: true })
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click(".-qQT3"),
  ])

  await page.waitForSelector("._9AhH0", { visible: true })
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click("._9AhH0"),
  ])
  let i = 0
  do {
    await page.waitForSelector(".fr66n button")
    await page.click(".fr66n button")
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      page.click("._65Bje.coreSpriteRightPaginationArrow"),
    ])
    i++
  } while (i < noOfPost)

  await browser.close()
}

call(10)
