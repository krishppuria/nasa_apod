const { default: axios } = require("axios");
const { model } = require("mongoose");
const apodDb = require("../model/apod")
const util = require("../util/util")
const https = require("https")
const fs = require("fs");
const path = require("path");
const config = require("../util/config")


let planetryService = {}

//downloads image and stores in local storage
downloadImage = async (url,date) => {
    try {
        const imgName= url.split('/')[url.split('/').length-1]
        const imagePath = path.resolve("./public/", 'images',imgName )
        const imageWriter = fs.createWriteStream(imagePath)
        const imageRes = await axios.get(url,{responseType:'stream'})
        imageRes.data.pipe(imageWriter)
        return new Promise((resolve,reject)=>{
            imageWriter.on("close",resolve(imgName));
            imageWriter.on("error",reject);
        })
    } catch (error) {
        throw error;
    }
}

//function to fetch Apod data from Nasa website.
fetchData = async (date) => {
    const api_url = config.nasa_api;
    let getApiData = await axios.get(api_url, {
        params: {
            api_key: process.env.NASA_API_KEY,
            date: date,
        }
    })
    if (getApiData["data"].media_type === "image"){
        const imgName = await downloadImage(getApiData["data"].url,date)
        getApiData["data"].url="/images/"+imgName;
    } 
        
    return getApiData;

}


planetryService.checkApod = async (date) => {
    const data = await apodDb.getData(date);
    if (data) { //check if Apod exists in our db
        return data;
    }
    else { //fetch Apod data from Nasa.
        let apiData = await fetchData(date)
        util.renameProp(apiData['data'], 'explanation', 'desc'); // changing explanation property to desc (acording to our database schema)
        util.renameProp(apiData['data'], 'url', 'media_url'); // changing url property to media_url (acording to our database schema)
        const resultData = await apodDb.setData(apiData['data']);
        if (resultData)
            return resultData;
        else {
            let error = new Error("Sorry for Interuption, Some Internal Error Occured!!");
            error.status = 500;
            throw error;
        }

    }
}

module.exports = planetryService;