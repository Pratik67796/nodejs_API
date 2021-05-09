// const http = require('http');
var express = require('express');
var app = express();
var ejs = require('ejs');
const path = require('path');
const host = process.env.HOST || 'localhost'
var mysql = require('mysql');
var bodyParser = require('body-parser')
const http = require('http').Server(app);
const fs = require('fs');
var bcrypt = require('bcrypt');
var multer  = require('multer')
const fileUpload = require('express-fileupload')
//const { getMaxListeners } = require('node:process');

//for calling  ejs file 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//start server on 3800
app.set('port', process.env.PORT || 3000)

//bodyparser
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(fileUpload())

app.use(express.static(__dirname + '/public'));
app.use('/public',express.static(__dirname + '/public'));

app.use('/',require('./router/api.route'))


app.listen(app.get('port'), host, (error) => {
    console.log('Listening on http://' + host + ':' + app.get('port'));
})

global.basePath = __dirname
global.uploadPath = basePath + '/public/'
global.baseURL = 'http://' + host + ':' + app.get('port') + '/'
global.uploadURL = baseURL + 'public/'