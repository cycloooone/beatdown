const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
// const port = 3000;
const dbConfig = require('./config/database.config.js');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//swagger
const swaggerUi = require("swagger-ui-express")
swaggerDocument = require("./swagger.json")
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully Connected to Database!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use('/users', require('./routes/userRoute'))
app.use('/api/users', require('./routes/userApiRoute'))
app.use('/beats', require('./routes/beatRoute'))
app.use('/api/beats', require('./routes/beatApiRoute'))

app.use("/", require("./routes/root"));
app.use("/home", require("./routes/home"));
app.use("/about", require("./routes/about"));
app.use("/register", require("./routes/register"));
app.use("/admin/beats/add", require("./routes/add-beat"));
app.use("/find-lyrics", require("./routes/find-lyrics"))
app.use("/login", require("./routes/login"))

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);