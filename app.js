require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const webRouters = require('./src/routes/web.routes')
const studentRouters = require('./src/routes/student.routes')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use('/', webRouters);
app.use('/api/mahasiswa', studentRouters);
app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`)
})