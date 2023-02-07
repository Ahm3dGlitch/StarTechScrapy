const table = require("table-scraper");
const url = "https://www.startech.com.bd/motorola-moto-g31";

table.get(url)
    .then(function(tableData) {
               tableData === 
              [ 
                [ 
                  {'0':'name', '1':'value'}
                  //{ State: 'New York', 'Capital City': 'Albany', 'Pop.': 'Eight Million' } 
                ] 
              ]
              console.log(tableData);
              
            });