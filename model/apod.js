const dbModel = require('../util/connection');

const planetoryDb={}

planetoryDb.getData = async(date)=>{
    let db = await dbModel.getPlanetoryCollection();
    let data= await db.findOne({date},{_id:0,copyright:0,__v:0});
    return data;
}

planetoryDb.setData = async(insData)=>{
    let db = await dbModel.getPlanetoryCollection();
    let data = await db.insertMany(insData);
    return data
}

module.exports = planetoryDb;