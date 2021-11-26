const { default: axios } = require("axios");
const { model } = require("mongoose");
const apodDb = require("../model/apod")
const util = require("../util/util")
const https = require("https")
const fs = require("fs");
const path = require("path");


planetryService = {}

downloadImage = async (url,date) => {
    try {
        const img= url.split('/')[url.split('/').length-1]
        const imageName = path.resolve("./public/", 'images',img )
        const imageWriter = fs.createWriteStream(imageName)
        const imageRes = await axios.get(url,{responseType:'stream'})
        imageRes.data.pipe(imageWriter)
        return new Promise((resolve,reject)=>{
            imageWriter.on("close",resolve(img));
            imageWriter.on("error",reject);
        })
    } catch (error) {
        throw error;
    }
}

fetchData = async (date) => {
    let api_url = "https://api.nasa.gov/planetary/apod";
    let getApiData = await axios.get(api_url, {
        params: {
            api_key: process.env.NASA_API_KEY,
            date: date,
        }
    })
    if (getApiData["data"].media_type === "image"){
        let imgName = await downloadImage(getApiData["data"].url,date)
        getApiData["data"].url="/images/"+imgName;
    } 
        
    return getApiData;

}

planetryService.checkApod = async (date) => {
    let data = await apodDb.getData(date);
    if (data) {
        return data;
    }
    else {
        let getApiData = await fetchData(date)
        util.renameProp(getApiData['data'], 'explanation', 'desc');
        util.renameProp(getApiData['data'], 'url', 'media_url');
        let insertData = await apodDb.setData(getApiData['data']);
        if (insertData)
            return insertData[0];
        else {
            let error = new Error("Sorry for Interuption, Some Internal Error Occured!!");
            error.status = 500;
            throw error;
        }

    }
}

module.exports = planetryService;