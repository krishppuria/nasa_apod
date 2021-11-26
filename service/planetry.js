const { default: axios } = require("axios");
const { model } = require("mongoose");
const apodDb = require("../model/apod")
const util = require("../util/util")

planetryService = {}

planetryService.checkApod = async (date) => {
    let data = await apodDb.getData(date);
    if (data) {
        return data;
    }
    else {
        let getApiData = await axios.get("https://api.nasa.gov/planetary/apod", {
            params: {
                api_key: "nV4CRchouUSYyZw1j8HthdC1lOIIAbVfYnobquLt",
                date: date,
            }
        })
        util.renameProp(getApiData['data'], 'explanation', 'desc');
        util.renameProp(getApiData['data'], 'url', 'media_url');
        let insertData = await apodDb.setData(getApiData['data']);
        if (insertData)
            return insertData[0];
        else {
            error = new Error("Sorry for Interuption, Some Internal Error Occured!!");
            error.status=500;
            throw error;
        }

    }
}

module.exports = planetryService;