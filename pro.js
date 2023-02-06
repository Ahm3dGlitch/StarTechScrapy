const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const url = "https://www.startech.com.bd/motorola-moto-g31";
const prod_Data = []

async function getPdata() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const products = $("div.product-details");
    
    products.each(function() {
      
      const name =$(this).find('h1.product-name').text(); 
      const image = $(this).find("a.thumbnail").attr('href');
      const discountPrice = parseFloat($(this).find("td.product-price").text().trim().replaceAll(',',''));
      const oldPrice = parseFloat($(this).find("td.product-regular-price").text().trim().replaceAll(',',''));
      const status = $(this).find("td.product-status").text();
      const code = $(this).find("td.product-code").text();
      const brand = $(this).find("td.product-brand").text();
      const details =$(this).find("ul>li").text();
      const specs = $(this).find("table.flex-table:nth-of-type(1) tr").text();
      prod_Data.push({
        name,image,discountPrice,oldPrice,status,code,brand,details,specs
      })
    });
    console.log(prod_Data);
    /*fs.writeFile("profile.json", JSON.stringify(prod_Data, null, 2), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file");
    });*/
  }
  catch (error) {
    console.error(error);
  }

}
getPdata();
