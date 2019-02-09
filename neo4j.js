var neo4j = require('neo4j-driver').v1;
//var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "123123."));
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "123123."), {maxTransactionRetryTime: 30000});
const express = require('express')
const app = express()
const port = 4000
var session = driver.session();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var readTxResultPromise = session.readTransaction(function (transaction) {
  var result = transaction.run("MATCH (actor:Person)-[role:ACTED_IN]->(movie:Movie) WHERE movie.title ='Top Gun' RETURN actor.name as name, role.earnings as earnings   ORDER BY role.earnings DESC");
  return result;
});

readTxResultPromise.then(function (result) {
  session.close();
 obj ='[';
 result.records.forEach(function (record) {
  obj += '{"name":' + '"' + record.get('name') + '", "earnings":' + record.get('earnings').low +'},'
  //console.log(record.get('name') + " - " + record.get('earnings'));
});
obj = obj.substring(0, obj.length-1);
obj += ']';

data = JSON.parse(obj);
console.log(data[0].name);

}).catch(function (error) {
  console.log(error);
});