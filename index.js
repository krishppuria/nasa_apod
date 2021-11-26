const express = require("express")
const app = express();
const requestLogger = require("./util/requestlogger")
const errorLogger = require("./util/errorlogger");
const router = require("./routes/routes");
const bodyparser = require("body-parser")

app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(requestLogger);
app.use('/',router);
app.use(errorLogger);

app.listen(3000);