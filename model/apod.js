const dbModel = require('../util/connection');

const planetoryDb={}

//get apod data from database
planetoryDb.getData = async(date)=>{
    const db = await dbModel.getPlanetoryCollection();
    const data= await db.findOne({date},{_id:0,copyright:0,__v:0});
    return data;
}

//inserting document to collection
planetoryDb.setData = async(insData)=>{
    const db = await dbModel.getPlanetoryCollection();
    const insertedData = await db.create(insData);
    console.log("ins",insertedData)
    return insertedData;
}

module.exports = planetoryDb;