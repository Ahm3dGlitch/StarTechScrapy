const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const url = 'https://www.chaldal.com/';

request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const categories = [];

    
    $('.level-0 li a').each((i, el) => {
      const category = $(el).text().trim();
      categories.push(category);
    });
    fs.writeFile("coutries.json", JSON.stringify(categories, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });

    console.log(categories);
  }
});
