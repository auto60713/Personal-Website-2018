const express = require('express');
const app = express(); 
const path = require('path');

 

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

//首頁
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/views/index.html');
});

app.get('/data', function (req, res) {
  res.sendfile(__dirname + '/models/profile.json');
});

app.get('/data2', function (req, res) {
  res.sendfile(__dirname + '/models/projects.json');
});

app.listen(8080, function () {
  console.log('Example app is running on port 8080!')
});

