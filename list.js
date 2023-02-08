const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');

const url = "https://chaldal.com/";
const category = [];

async function getPdata(){
    try{
        const response = await axios.get(url);
        const $= cheerio.load(response.data);
        
        const products = $('ul.level-0 > div> a');
        products.each((idx, el)=> {
            const categorylist = {name:'',slug:''};
            categorylist.name = $(el).children('a').text();
            categorylist.slug = $(el).children('#page > div > div.headerWrapper > div > div.menuWrapper > div > div > div.menu-container > div.menu > ul.level-0 > li:nth-child(4) > div > a').attr('href');
            
            category.push({
                categorylist
            });
            
        });
        /*console.log(category);
        fs.writeFile("coutries.json", JSON.stringify(category, null, 2), (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Successfully written data to file");
          });*/
    }
    catch(error){
        console.error(error);
    }
}

getPdata();