const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const url = "https://www.startech.com.bd/motorola-moto-g31";
const prod_Data = []

async function getPdata() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const scrapedData = [];
    const tableHeaders = [];
    $("tr>td").each((index, element) => {
        if (index === 0) {
            const ths = $(element).find("thead");
            $(ths).each((i, element) => {
            tableHeaders.push(
                $(element).text().toLowerCase()
                );
            });
            
            console.log(tableHeaders);
            return true;
        }
        const tds = $(element).find("td");
        const tableRow = {};
        $(tds).each((i, element) => {
        tableRow[tableHeaders[i]] = $(element).text();
    });
   scrapedData.push(tableRow);
 });
 console.log(scrapedData);

}
    catch(error){
        console.error(error);
    }
}
getPdata();
