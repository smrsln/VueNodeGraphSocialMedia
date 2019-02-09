var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors');


var router = express.Router();

var neo4j = require('neo4j-driver').v1;

var port = process.env.PORT || 4000;
var router = express.Router();

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


function getLocation(){
    return new Promise(function(resolve, reject){
        resolve('istanbul');
    })
}