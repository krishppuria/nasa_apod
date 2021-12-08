const env = process.env.NODE_ENV
const config ={}
config.dev = {
    db: {
        host: "localhost",
        port: "27017",
        name: "NasaPlanetory_DB"
    },
    nasa_api: "https://api.nasa.gov/planetary/apod"
};

config.prod = {
    db: {
        host: "localhost",
        port: "27017",
        name: "NasaPlanetory_DB"
    },
    nasa_api: "https://api.nasa.gov/planetary/apod"
};
module.exports = config[env]