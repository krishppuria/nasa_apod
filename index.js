const express = require("express")
const app = express();
const requestLogger = require("./util/requestlogger")
const errorLogger = require("./util/errorlogger");
const router = require("./routes/routes");
const bodyparser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyparser.json());
app.use(requestLogger);
app.use('/',router);
app.use(errorLogger);
let PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{console.log(`Started Listening on port ${PORT}`)});