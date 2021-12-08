const dotenv = require('dotenv');
//configuring .env
dotenv.config();
const express = require("express")
// creating app server from express
const app = express();
const requestLogger = require("./util/requestlogger")
const errorLogger = require("./util/errorlogger");
const router = require("./routes/routes");
const bodyparser = require("body-parser");
//view engine setup
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyparser.json());
app.use(requestLogger);
app.use('/',router);
app.use(errorLogger);
//defining port
const PORT = process.env.PORT || 3000
//starting express server
app.listen(PORT, ()=>{console.log(`Started Listening on port ${PORT}`)});