const dbModel = require('../util/connection');

const planetoryDb={}

planetoryDb.getData = async(date)=>{
    let db = await dbModel.getPlanetoryCollection();
    let data= await db.findOne({'date':date});
    console.log(data);
    return data;
}

planetoryDb.setData = async(insData)=>{
    // console.log(insData);
    let db = await dbModel.getPlanetoryCollection();
    let data = await db.insertMany(insData);
    console.log(data);
    return data
}

module.exports = planetoryDb;