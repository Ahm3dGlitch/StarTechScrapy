const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const url = "https://www.startech.com.bd";
const prod_Data = []
async function getPdata(){
    try{
        const response = await axios.get(url);
        const $= cheerio.load(response.data);
        
        const products = $("div.p-item");
        products.each(function(){
            Name = $(this).find("h4 a").text();
            Price = $(this).find("div.p-item-price").text().trim();

            prod_Data.push({Name,Price});
              
        });
        console.log(prod_Data);
        fs.writeFile("Star.json", JSON.stringify(prod_Data, null, 2), (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Successfully written data to file");
        });
    }
    catch(error){
        console.error(error);
    }
    
}

getPdata();