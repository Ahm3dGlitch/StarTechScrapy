const fs = require('fs');
const https = require('https');

const url ="https://www.startech.com.bd/image/cache/catalog/mobile/motorola/moto-g31/moto-g31-mineral-grey-01-500x500.webp";

https.get(url,(res)=>{
    const path ="download-imageMotog31.webp";
    const writeStream = fs.createWriteStream(path);

    res.pipe(writeStream);

    writeStream.on("finish",()=>{
        writeStream.close();
        console.log("Download Complete!");
    });
});