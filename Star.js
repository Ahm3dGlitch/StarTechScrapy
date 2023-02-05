const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const url = "https://www.startech.com.bd";
const prod_Data = []
let name;
let regularprice;
let offerprice;
async function getPdata(){
    try{
        const response = await axios.get(url);
        const $= cheerio.load(response.data);
        
        const products = $("div.p-item");
        products.each(function(){
            name = $(this).find("h4 a").text();
            //anchorlink = $(this).find("h4 a").attr('href');
            //imagelink = $(this).find("a img").attr('src');
            price = $(this).find("span.price-new").text();
            console.log(price);
            if($(this).find("span.price-new").data()!==null){
            
                regularprice = $(this).find("span.price-old").text().trim();
                offerprice = $(this).find("span.price-new").text().trim();
                prod_Data.push(`Name: ${name}`,`Offer Price: ${offerprice}`,`Regular Price: ${regularprice}`);
            }
            else{
                regularprice = $(this).find("div.p-item-price").text().trim();
                prod_Data.push(`Name: ${name}`,`Price: ${regularprice}`);
            }
              
        });
        console.log(prod_Data);
        /*fs.writeFile("Star.json", JSON.stringify(prod_Data, null, 2), (err) => {
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
