const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');

const url = "https://chaldal.com/";
const category = [];

async function getPdata(){
    try{
        const response = await axios.get(url);
        const $= cheerio.load(response.data);
        
        const products = $('div');
        products.each((idx, el)=> {
            setTimeout(function(){
                const categorylist = {name:'',slug:''};
                categorylist.name = $(el).children('a').text();
                categorylist.slug = $(el).children('a').attr('href');
                category.push({
                    categorylist
                });
            },1);
            
            
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