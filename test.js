const fs = require('fs');
const { data } = require('jquery');
const { exit } = require('process');
const puppeteer = require('puppeteer');



let content = '';

let splitedContent;

let url = [];

let h1 = [];

let result = '';

fs.readFile('result.csv', function (err, data) {
  if (err) throw err;

  content = data.toString();

  // console.log(content);

  let splitedContent = content.split(/\s+/);



  // console.log(splitedContent);

  // console.log(url.length);
  // console.log(splitedContent.length);

  for (let i = 0; i < splitedContent.length; i++) {
    url[i] = splitedContent[i].substr(19, 43);
  }

  // console.log(url);



  (async () => {

    for (let i = 10213; i < splitedContent.length; i++) {


      const browser = await puppeteer.launch({
        executablePath:
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless: true
      });
      const page = await browser.newPage();

      await page.goto(url[i], { waitUntil: 'networkidle2' });



      h1[i] = await page.$('#container > h1');
      // let state = await page.$("#movie_player > div.html5-video-container > video").outerHTML;

      h1[i] = await page.evaluate(e => {

        try {
          return e.innerText;
        } catch (error) {
          console.log(error);
          return 'error';
        }
      }, h1[i]);

      // h1[i] = await h1[i].substr();

      console.log(i + 1 + '\t' + h1[i] + '      ===================>' + totalSeconds + 's');

      await browser.close();



      result = splitedContent[i] + ',' + h1[i] + '\n\n';


      fs.appendFile('tempresult.csv', result, function (err) {
        if (err)
          console.log(err);
      });
    }




    

    


    await console.log('\n' + 'run here!!' + '\n');
    exit(0);
  })();




});


var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
}
















// (async () => {




//   const browser = await puppeteer.launch({
//     executablePath:
//     'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
//     headlesplitedContent: false
//   });
//   const page = await browser.newPage();




//   //進kkbox官網
//   await page.goto('https://www.youtube.com/', { waitUntil: 'networkidle2' });
//   //點擊搜尋並輸入查找的歌
//   // await page.click("#search");
//   await page.waitFor(500);
//   await page.type('#search', "擱淺");
//   await page.waitFor(500);
//   await page.click("#search-icon-legacy");
//   // await page.keyboard.presplitedContent('Enter');
//   // await (await page.$('input[title="Google 搜尋"]')).presplitedContent('Enter', { waitUntil: 'networkidle2' });
//   await page.waitForSelector('span');

//   //點擊歌曲列表中的第一首
//   // await page.click('#search-page > div.container > div.top-result > table > tbody > tr > td.song-data > a');

//   // await page.waitForSelector('span');

//   page.once('load', console.log('Page loaded!'));


//   // var length = await (await page.$$('.lyrics__content__ok')).length;    //length = 2

//   // const LYRIC_SELECTOR1 = await page.$('body > main > div.view-wide > div.song-content > div.lyrics > p:nth-child(2)');


//   // let lyricCtn = "";

//   // lyricCtn += await page.evaluate(e => {
//   //   return e.innerText;
//   // }, LYRIC_SELECTOR1);







//   console.log('\n' + 'run here!!' + '\n');
//   // await browser.close();
// })();