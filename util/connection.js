const mongoose = require("mongoose")
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
// mongoose.set()
const url="mongodb://localhost:27017/NasaPlanetory_DB";

const apodSchema = Schema({
    date: {type:String, unique: true},
    title: String,
    copyright: String,
    desc: String,
    media_type:{ type: String, enum: ['image','video']},
    media_url:String,
}, { collection: "Apod" });




let collection = {};

collection.getPlanetoryCollection = async() => {
    try {
        return (await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })).model('Apod', apodSchema)
    } catch (err) {
        console.log((err));
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    }
}


module.exports = collection;