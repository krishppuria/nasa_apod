const mongoose = require("mongoose")
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const config = require("./config")
const { db: { host, port, name } } = config;
const url = `mongodb://${host}:${port}/${name}`;

//Apod schema 
const apodSchema = Schema({
    date: { type: String, unique: true },
    title: String,
    copyright: String,
    desc: String,
    media_type: { type: String, enum: ['image', 'video'] },
    media_url: String,
}, { collection: "Apod" });




let collection = {};

//Mongodb conection establishment
collection.getPlanetoryCollection = async () => {
    try {
        return (await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })).model('Apod', apodSchema)
    } catch (err) {
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    }
}


module.exports = collection;