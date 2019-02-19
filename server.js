let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors');

let neo4j = require('neo4j-driver').v1;

let port = process.env.PORT || 4000;
let neo4jPort = "7687";

let router = express.Router();
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


/**************************************************************************************************************************************************** */
router.get('/leftMenu', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    let result = transaction.run("MATCH (title:Title),(entry:Entries) MATCH (title)-[rel:HAS_ENTRY]->(entry) RETURN count(rel) AS COUNT, title.text as text, title.id as id order by COUNT DESC");
    return result;
  });
  //session.close();
  //driver.close();

  readTxResultPromise.then(function (result) {
    obj = '[';
    result.records.forEach(function (record) {
      obj += '{"text":' + '"' + record.get('text') + '", "id":' + '"' + record.get('id') + '", "COUNT":' + '"' + record.get('COUNT') + '"},'
    });
    obj = obj.substring(0, obj.length - 1);
    obj += ']';
    data = JSON.parse(obj);
    res.json(data);
  }).catch(function (error) {
  });
});

router.get('/getCurrentTitle/:id', function (req, res) {

  console.log('sooon ' + req.params.id);
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH(currTit:Title) WHERE currTit.id = '" + req.params.id + "' RETURN currTit";
    console.log(query);
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {
    res.json(result.records[0].get('currTit').properties);
    console.log(result.records[0].get('currTit'));

  }).catch(function (error) {
    console.log(error);
  });
});

router.post('/addComment', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (user:User{id:'" + req.body.userId + "'}), (title:Title{id: '" + req.body.titleId + "'}) CREATE (entry:Entries{id:randomUUID(),userName:'" + req.body.userName + "',name:'" + req.body.name + "',text:'" + req.body.comment + "',createDate:datetime()}) CREATE (user)-[rel:AUTHOR{relName:'author',createDate:datetime()}]->(entry)<-[r:HAS_ENTRY]-(title) RETURN entry";
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {

    if (result.records[0].get('entry').properties.id.length > 0) {
      res.send("ok");
    } else {
      res.send("err");
    }

  }).catch(function (error) {
    console.log(error);
  });

});

router.get('/getTitleComments/:id/:userid/:pageNum', function (req, res) {

  console.log(req.params.id + ' - ' + req.params.userid + ' - ' + req.params.pageNum);

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (title:Title) WHERE title.id='" + req.params.id + "' MATCH (user:User) WHERE user.id ='" + req.params.userid + "' OPTIONAL MATCH (title)-[:HAS_ENTRY]->(entry:Entries) OPTIONAL MATCH (user)-[userLike:like]->(entry) OPTIONAL MATCH (user)-[userFavorite:favorite]->(entry) OPTIONAL MATCH (user)-[userDislike:dislike]->(entry) OPTIONAL MATCH (user)-[userRepost:repost]->(entry) OPTIONAL MATCH ()-[rel:like]->(entry) OPTIONAL MATCH ()-[rel2:favorite]->(entry) OPTIONAL MATCH ()-[rel3:dislike]->(entry) OPTIONAL MATCH ()-[rel4:repost]->(entry) RETURN user.profile_pics as profile_pics, entry.name, entry.text, entry.id, entry.userName, entry.createDate, count(DISTINCT(rel)) AS like, count(DISTINCT(rel2)) AS favorite, count(DISTINCT(rel3)) AS dislike, count(DISTINCT(rel4)) AS repost, count(DISTINCT(userLike)) AS userLike, count(DISTINCT(userFavorite)) AS userFavorite, count(DISTINCT(userDislike)) AS userDislike, count(DISTINCT(userRepost)) AS userRepost ORDER BY entry.createDate DESC SKIP " + ((req.params.pageNum - 1)*5) + " LIMIT 5";
    console.log(query);
    let result = transaction.run(query);
    return result;
  });

  readTxResultPromise.then(function (result) {
    
    obj = '[';
    result.records.forEach(function (record) {
      var time = record.get('entry.createDate')
      var newTime = time.day + '.' + time.month + '.' + time.year + ' ' + time.hour + ':' + time.minute;
      obj += '{"profile_pics":' + '"' + record.get('profile_pics') + '","name":' + '"' + record.get('entry.name') + '", "text":' + '"' + record.get('entry.text') + '", "id":' + '"' + record.get('entry.id') + '", "userName":' + '"' + record.get('entry.userName') + '", "createDate":' + '"' + newTime + '", "like":' + '"' + record.get('like') + '", "favorite":' + '"' + record.get('favorite') + '", "dislike":' + '"' + record.get('dislike') + '", "repost":' + '"' + record.get('repost') + '", "userLike":' + '"' + record.get('userLike') + '", "userFavorite":' + '"' + record.get('userFavorite') + '", "userDislike":' + '"' + record.get('userDislike') + '", "userRepost":' + '"' + record.get('userRepost') + '" },'
    });
    obj = obj.substring(0, obj.length - 1);
    obj += ']';
    data = JSON.parse(obj);
    res.json(data);
  }).catch(function (error) {
    console.log(error);
  });
});

router.post('/login', function (req, res) {
  console.log("login");
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();
  //req.body.userName, req.body.pass

  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (n:User) WHERE n.userName ='" + req.body.userName + "' and n.pass ='" + req.body.pass + "' RETURN n";
    let result = transaction.run(query);
    return result;
  });

  readTxResultPromise.then(function (result) {
    res.json(result.records[0].get('n').properties);
    console.log(result.records[0].get('n').properties);

  }).catch(function (error) {
    console.log(error);
  });
});

//************************************** LIKE SERVİSİ BAŞLANGIÇ **********************************************************
router.post('/likeService', function (req, res) {
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    
    let query = "MATCH (user:User),(entry:Entries) WHERE user.userName = '" + req.body.userName + "' AND entry.id = '" + req.body.id + "' CREATE UNIQUE (user)-[rel:like {relName:'like',createDate:datetime()}]->(entry) RETURN  rel"
    //console.log(query);
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {

    //console.log(result.records[0].get('rel').properties.createDate.year.low);
    if (result.records[0].get('rel').properties.createDate.year.low > 0) {
      res.send("ok");
    } else {
      res.send("err");
    }

  }).catch(function (error) {
    console.log(error);
  });
});

router.post('/unlikeService', function (req, res) {
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    
    let query = "MATCH (user:User)-[r:like]->(entry:Entries) WHERE user.userName = '" + req.body.userName + "' AND entry.id = '" + req.body.id + "' CREATE (user)-[r2: deleted_like {relName:'deletedLike',createDate: r.createDate, deleteDate:datetime()}]->(entry) DELETE r RETURN r2"
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {

    //console.log(result.records[0].get('rel').properties.createDate.year.low);
    if (result.records[0].get('r2').properties.deleteDate.year.low > 0) {
      res.send("deleted");
    } else {
      res.send("err");
    }

  }).catch(function (error) {
    console.log(error);
  });
});

//************************************* LIKE SERVİSİ BİTİŞ **********************************************

// ************************* FAVORITE SERVİSİ BAŞLANGIÇ**************************************************
router.post('/favoriteService', function (req, res) {
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (user:User),(entry:Entries) WHERE user.userName = '" + req.body.userName + "' AND entry.id = '" + req.body.id + "' CREATE UNIQUE (user)-[rel2:favorite {relName:'fav',createDate:datetime()}]->(entry) RETURN  rel2"
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {
    if (result.records[0].get('rel2').properties.createDate.year.low > 0) {
      res.send("ok");
    } else {
      res.send("err");
    }

  }).catch(function (error) {
    console.log(error);
  });
});

router.post('/unfavoriteService', function (req, res) {
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    
    let query = "MATCH (user:User)-[r:favorite]->(entry:Entries) WHERE user.userName = '" + req.body.userName + "' AND entry.id = '" + req.body.id + "' CREATE (user)-[r2: deleted_favorite {relName:'deletedFav',createDate: r.createDate, deleteDate:datetime()}]->(entry) DELETE r RETURN r2";
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {
    if (result.records[0].get('r2').properties.deleteDate.year.low > 0) {
      res.send("deleted");
    } else {
      res.send("err");
    }

  }).catch(function (error) {
    console.log(error);
  });
});

// *********************************** FAVORITE SERVİSİ BİTİŞ ***********************************************

//*********************************** DISLIKE SERVİSİ BAŞLANGIÇ *****************************************************

router.post('/dislikeService', function (req, res) {
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (user:User),(entry:Entries) WHERE user.userName = '" + req.body.userName + "' AND entry.id = '" + req.body.id + "' CREATE UNIQUE (user)-[rel3:dislike {relName:'dislike',createDate:datetime()}]->(entry) RETURN  rel3";
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {
    if (result.records[0].get('rel3').properties.createDate.year.low > 0) {
      res.send("ok");
    } else {
      res.send("err");
    }

  }).catch(function (error) {
    console.log(error);
  });
});

router.post('/undislikeService', function (req, res) {
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    
    let query = "MATCH (user:User)-[r:dislike]->(entry:Entries) WHERE user.userName = '" + req.body.userName + "' AND entry.id = '" + req.body.id + "' CREATE (user)-[r2: deleted_dislike {relName:'deleted_dislike',createDate: r.createDate, deleteDate:datetime()}]->(entry) DELETE r RETURN r2";
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {
    if (result.records[0].get('r2').properties.deleteDate.year.low > 0) {
      res.send("deleted");
    } else {
      res.send("err");
    }

  }).catch(function (error) {
    console.log(error);
  });
});

//**************************************DISLIKE SERVİSİ BİTİŞ *************************************

//*********************************** REPOST SERVİSİ BAŞLANGIÇ *****************************************************

router.post('/repostService', function (req, res) {
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();
  //console.log("it is here");
  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (user:User),(entry:Entries) WHERE user.userName = '" + req.body.userName + "' AND entry.id = '" + req.body.id + "' CREATE UNIQUE (user)-[rel4:repost {relName:'rePost',createDate:datetime()}]->(entry) RETURN  rel4";
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {
    if (result.records[0].get('rel4').properties.createDate.year.low > 0) {
      res.send("ok");
    } else {
      res.send("err");
    }

  }).catch(function (error) {
    console.log(error);
  });
});

router.post('/unrepostService', function (req, res) {
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    
    let query = "MATCH (user:User)-[r:repost]->(entry:Entries) WHERE user.userName = '" + req.body.userName + "' AND entry.id = '" + req.body.id + "' CREATE (user)-[r2: deleted_repost {relName:'deleted_repost',createDate: r.createDate, deleteDate:datetime()}]->(entry) DELETE r RETURN r2"
    //console.log(query);
    let result = transaction.run(query);
    return result;
  });


  readTxResultPromise.then(function (result) {
    if (result.records[0].get('r2').properties.deleteDate.year.low > 0) {
      res.send("deleted");
    } else {
      res.send("err");
    }

  }).catch(function (error) {
    console.log(error);
  });
});


router.post('/deleteEntry', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    
    let query = "MATCH (user:User{id:'" + req.body.userId + "'})-[:AUTHOR]-> (entry:Entries{id:'" + req.body.entryId + "'}) DETACH DELETE entry"
    //console.log(query);
    let result = transaction.run(query);
    return result;
  });

  readTxResultPromise.then(function (result) {
    //if (result.records[0].get('r2').properties.deleteDate.year.low > 0) {
      res.send("deleted");
    //} else {
     // res.send("err");
    //}

  }).catch(function (error) {
    console.log(error);
  });
});

router.get('/getMainFlow/:id/:pg', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (user:User) WHERE user.id = '" + req.params.id + "'" + `
  MATCH (user)-[r:FOLLOW]->(a)
  MATCH (a)-[rel:like]->(b)<-[:HAS_ENTRY]-(title:Title)
  OPTIONAL MATCH  (user)-[userLike:like]->(b) OPTIONAL MATCH  (user)-[userFavorite:favorite]->(b) 
  OPTIONAL MATCH  (user)-[userRepost:repost]->(b) OPTIONAL MATCH (user)-[userDislike:dislike]->(b) 
  OPTIONAL MATCH ()-[CountLike:like]->(b) OPTIONAL MATCH ()-[countFav:favorite]->(b) 
  OPTIONAL MATCH ()-[countDislike:dislike]->(b) OPTIONAL MATCH ()-[countRepost:repost]->(b) 
  OPTIONAL MATCH (userCreatedEntry)-[relAuth:AUTHOR]->(b)
  with collect({usr:user.name, entryId:b.id, entryName:b.name, entryUser:b.userName, entryText:b.text,hasRelName:a.name, hasRelUserName:a.userName, 
  hasRelUserId:a.id, hasRelImg:a.profile_pics, relType:rel.relName,relCreateDate:rel.createDate, titleId:title.id, title:title.text, userLike:(userLike), 
  userFavorite:(userFavorite), userRepost:(userRepost), userDislike:userDislike, CountLike:CountLike, countFav:countFav, countDislike:countDislike,
  countRepost:countRepost,createdEntryUserId :userCreatedEntry.id, userCreatedEntryImg:userCreatedEntry.profile_pics, createdEntryTime:b.createDate}) as like
  `+"MATCH (user:User) WHERE user.id = '" + req.params.id + "'" + `
  MATCH (user)-[r:FOLLOW]->(a)
  MATCH (a)-[rel:favorite]->(c)<-[:HAS_ENTRY]-(title:Title) 
  OPTIONAL MATCH  (user)-[userLike:like]->(c) OPTIONAL MATCH  (user)-[userFavorite:favorite]->(c) 
  OPTIONAL MATCH  (user)-[userRepost:repost]->(c) OPTIONAL MATCH (user)-[userDislike:dislike]->(c) 
  OPTIONAL MATCH ()-[CountLike:like]->(c) OPTIONAL MATCH ()-[countFav:favorite]->(c) 
  OPTIONAL MATCH ()-[countDislike:dislike]->(c) OPTIONAL MATCH ()-[countRepost:repost]->(c) 
  OPTIONAL MATCH (userCreatedEntry)-[relAuth:AUTHOR]->(c)
  with like + collect({usr:user.name, entryId:c.id, entryName:c.name, entryUser:c.userName, entryText:c.text, hasRelName:a.name, hasRelUserName:a.userName, 
  hasRelUserId:a.id, hasRelImg:a.profile_pics, relType:rel.relName, relCreateDate:rel.createDate, titleId:title.id, title:title.text,userLike:(userLike), 
  userFavorite:(userFavorite), userRepost:(userRepost), userDislike:userDislike, CountLike:CountLike, countFav:countFav, countDislike:countDislike, 
  countRepost:countRepost,createdEntryUserId :userCreatedEntry.id, userCreatedEntryImg:userCreatedEntry.profile_pics, createdEntryTime:c.createDate}) as likeAndFav
  `+"MATCH (user:User) WHERE user.id = '" + req.params.id + "'" + `
  MATCH (user)-[r:FOLLOW]->(a)
  MATCH (a)-[rel:AUTHOR]->(d)<-[:HAS_ENTRY]-(title:Title) 
  OPTIONAL MATCH (user)-[userLike:like]->(d) OPTIONAL MATCH (user)-[userFavorite:favorite]->(d) 
  OPTIONAL MATCH (user)-[userRepost:repost]->(d) OPTIONAL MATCH (user)-[userDislike:dislike]->(d) 
  OPTIONAL MATCH ()-[CountLike:like]->(d) OPTIONAL MATCH ()-[countFav:favorite]->(d) 
  OPTIONAL MATCH ()-[countDislike:dislike]->(d) OPTIONAL MATCH ()-[countRepost:repost]->(d) 
  OPTIONAL MATCH (userCreatedEntry)-[relAuth:AUTHOR]->(d)
  with likeAndFav + collect({usr:user.name, entryId:d.id, entryName:d.name, entryUser:d.userName, entryText:d.text, hasRelName:a.name, hasRelUserName:a.userName, 
  hasRelUserId:a.id ,hasRelImg:a.profile_pics, relType:rel.relName, relCreateDate:rel.createDate, titleId:title.id, title:title.text, userLike:(userLike), 
  userFavorite:(userFavorite), userRepost:(userRepost), userDislike:userDislike, CountLike:CountLike, countFav:countFav, countDislike:countDislike, 
  countRepost:countRepost,createdEntryUserId :userCreatedEntry.id, userCreatedEntryImg:userCreatedEntry.profile_pics, createdEntryTime:d.createDate}) as likeAndFavAndAUTHOR
  `+"MATCH (user:User) WHERE user.id = '" + req.params.id + "'" + `
  MATCH (user)-[r:FOLLOW]->(a)
  MATCH (a)-[rel:repost]->(e)<-[:HAS_ENTRY]-(title:Title) 
  OPTIONAL MATCH(user)-[userLike:like]->(e) OPTIONAL MATCH(user)-[userFavorite:favorite]->(e) 
  OPTIONAL MATCH (user)-[userRepost:repost]->(e) OPTIONAL MATCH (user)-[userDislike:dislike]->(e) 
  OPTIONAL MATCH ()-[CountLike:like]->(e) OPTIONAL MATCH ()-[countFav:favorite]->(e) 
  OPTIONAL MATCH ()-[countDislike:dislike]->(e) OPTIONAL MATCH ()-[countRepost:repost]->(e) 
  OPTIONAL MATCH (userCreatedEntry)-[relAuth:AUTHOR]->(e)
  with likeAndFavAndAUTHOR + collect({usr:user.name, entryId:e.id, entryName:e.name,entryUser:e.userName, entryText:e.text, hasRelName:a.name, hasRelUserName:a.userName,
  hasRelUserId:a.id, hasRelImg:a.profile_pics, relType:rel.relName, relCreateDate:rel.createDate, titleId:title.id, title:title.text, userLike:userLike, userFavorite: userFavorite,
  userRepost: userRepost, userDislike:userDislike, CountLike:CountLike, countFav:countFav, countDislike:countDislike, countRepost:countRepost, createdEntryUserId :userCreatedEntry.id, 
  userCreatedEntryImg:userCreatedEntry.profile_pics, createdEntryTime:e.createDate}) as likeAndFavAndAUTHORAndRepost
  `+"MATCH (user:User) WHERE user.id = '" + req.params.id + "'" + `
  MATCH (user)-[rel:AUTHOR]->(f)<-[:HAS_ENTRY]-(title:Title) 
OPTIONAL MATCH(user)-[userLike:like]->(f) OPTIONAL MATCH(user)-[userFavorite:favorite]->(f) 
OPTIONAL MATCH (user)-[userRepost:repost]->(f) OPTIONAL MATCH (user)-[userDislike:dislike]->(f) 
OPTIONAL MATCH ()-[CountLike:like]->(f) OPTIONAL MATCH ()-[countFav:favorite]->(f) 
OPTIONAL MATCH ()-[countDislike:dislike]->(f) OPTIONAL MATCH ()-[countRepost:repost]->(f) 
OPTIONAL MATCH (userCreatedEntry)-[relAuth:AUTHOR]->(f)
with likeAndFavAndAUTHORAndRepost + collect({usr:user.name, entryId:f.id, entryName:f.name,entryUser:f.userName, entryText:f.text, hasRelName:user.name, hasRelUserName:user.userName,
hasRelUserId:user.id, hasRelImg:user.profile_pics, relType:rel.relName, relCreateDate:rel.createDate, titleId:title.id, title:title.text, userLike:userLike, userFavorite: userFavorite,
userRepost: userRepost, userDislike:userDislike, CountLike:CountLike, countFav:countFav, countDislike:countDislike, countRepost:countRepost, createdEntryUserId :userCreatedEntry.id, 
userCreatedEntryImg:userCreatedEntry.profile_pics, createdEntryTime:f.createDate}) as likeAndFavAndAUTHORAndRepostAndMyEntry 
UNWIND likeAndFavAndAUTHORAndRepostAndMyEntry as row 
return row.entryName as createdEntryUser, row.createdEntryUserId as createdEntryUserId, row.hasRelUserName as hasRelUserName, row.hasRelName as hasRelName, 
row.hasRelUserId as hasRelUserId, count(DISTINCT(row.CountLike)) as CountLike, count(DISTINCT(row.countFav)) as countFav, count(DISTINCT(row.countDislike)) as countDislike, 
count(DISTINCT(row.countRepost)) as countRepost, count(DISTINCT(row.userLike)) as userLike, count(DISTINCT(row.userFavorite)) as userFavorite, count(DISTINCT(row.userRepost)) as userRepost,
count(DISTINCT(row.userDislike)) as userDislike, row.relType as relType, row.entryId as entryId, row.entryText as entry, row.titleId as titleId, row.title as title, row.userCreatedEntryImg as createdEntryUserImg, 
row.relCreateDate as relCreateDate, row.createdEntryTime as createdEntryTime, row.usr  ORDER by row.relCreateDate DESC SKIP 0
  ` + " LIMIT " + req.params.pg * 5;
    console.log(query);
    let result = transaction.run(query);
    return result;
  });

  readTxResultPromise.then(function (result) {
    
    obj = '[';
    result.records.forEach(function (record) {
      //console.log(record.get('hasRelName')); 

      //entry oluşturulma tarihi
      let createdEntryTimeByRaw = record.get('createdEntryTime');
      let createdEntryTime = createdEntryTimeByRaw.day + '.' + createdEntryTimeByRaw.month + '.' + createdEntryTimeByRaw.year + ' ' + createdEntryTimeByRaw.hour + ':' + createdEntryTimeByRaw.minute;
      console.log(createdEntryTime);
      let eventTimeByRaw = record.get('relCreateDate');
      console.log('bismillah' +eventTimeByRaw);
      let eventTime = eventTimeByRaw.day + '.' + eventTimeByRaw.month + '.' + eventTimeByRaw.year + ' ' + eventTimeByRaw.hour + ':' + eventTimeByRaw.minute;

      obj += '{"title":' + '"' + record.get('title') + '", "titleId":' + '"' + record.get('titleId') + '", "entry":' + '"' + record.get('entry') + '", "entryId":' + '"' + record.get('entryId') + '", "createdEntryUser":' + '"' + record.get('createdEntryUser') + '", "createdEntryUserId":' + '"' + record.get('createdEntryUserId') + '", "createdEntryUserImg":' + '"' + record.get('createdEntryUserImg') + '", "hasRelUserId":' + '"' + record.get('hasRelUserId') + '", "hasRelName":' + '"' + record.get('hasRelName') + '", "relType":' + '"' + record.get('relType') + '", "CountLike":' + '"' + record.get('CountLike') + '", "countFav":' + '"' + record.get('countFav') + '", "countDislike":' + '"' + record.get('countDislike') + '", "countRepost":' + '"' + record.get('countRepost') + '", "userLike":' + '"' + record.get('userLike') + '", "userFavorite":' + '"' + record.get('userFavorite') + '", "userRepost":' + '"' + record.get('userRepost') + '", "userDislike":' + '"' + record.get('userDislike') + '", "createdEntryTime":' + '"' + record.get('createdEntryTime') + '", "createdEntryTime":' + '"' + createdEntryTime + '", "eventTime":' + '"' + eventTime + '", "eventTimeForSorting":' + '"' + eventTimeByRaw + '"},'
    });
    obj = obj.substring(0, obj.length - 1);
    obj += ']';
    data = JSON.parse(obj);
    //console.log(data);
    //res.send("ok");
    res.json(data);
  }).catch(function (error) {
    console.log(error);
  });
});


//************************************** PROFİL/HAKKIMIZDA İÇERİK SERVİSİ BAŞLANGIÇ************************/
router.get('/aboutService/:userid/', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();
  let readTxResultPromise = session.readTransaction(function (transaction) {
    
    let query = "MATCH (userinfo:Userinfo) WHERE userinfo.id='" + req.params.userid + "' RETURN  userinfo"
    //console.log(query);
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {
    //console.log(result.records[0].get('userinfo').properties);
    res.json(result.records[0].get('userinfo').properties);
  }).catch(function (error) {
    console.log(error);
  });
  
});
//**************************************REPOST SERVİSİ BİTİŞ *************************************

//************************************** PROFİL/TAKİPÇİ İÇERİK SERVİSİ BAŞLANGIÇ************************/
router.get('/followerService/:userid/', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();
  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (user:User)<-[r:FOLLOW]-(a:User) WHERE user.id = '"+ req.params.userid + "'" + `
    OPTIONAL MATCH  (a)-[rel1:FOLLOW]->(followedUser:User)
    OPTIONAL MATCH  (a)<-[rel2:FOLLOW]-(followerUser:User)
    OPTIONAL MATCH (a)-[rel3:AUTHOR]->(createdEntry:Entries)
    with collect({userId:a.id,name:a.name, userName : a.userName, userProfilePics:a.profile_pics,rank:a.rank,followedUser:followedUser,followerUser:followerUser,createdEntry:createdEntry}) as data
    UNWIND data as row
    return row.userId as userId,row.userName as userName, row.name as name, row.userProfilePics as userProfilePics, row.rank as userRank, count(distinct(row.followedUser)) as followedUser, count(distinct(row.followerUser)) as followerUser,count(distinct(row.createdEntry)) as createdEntry
    `;
    console.log(query);
    let result = transaction.run(query);
    return result;
  });

  readTxResultPromise.then(function (result) {
    obj = '[';
    result.records.forEach(function (record) {
      obj += '{"userId":' + '"' + record.get('userId') + '", "userName":' + '"' + record.get('userName') + '", "name":' + '"' + record.get('name') + '", "userProfilePics":' + '"' + record.get('userProfilePics') + '", "userRank":' + '"' + record.get('userRank') + '", "followedUser":' + '"' + record.get('followedUser') + '", "followerUser":' + '"' + record.get('followerUser') + '", "createdEntry":' + '"' +  record.get('createdEntry') + '"},'
    });
    obj = obj.substring(0, obj.length - 1);
    obj += ']';
    data = JSON.parse(obj);
    console.log(data);
    res.json(data);
  }).catch(function (error) {
    console.log(error);
  });

});

//************************************** PROFİL/TAKİPÇİ İÇERİK SERVİSİ BİTİŞ ****************************/

//************************************** PROFİL/TAKİP EDİLEN İÇERİK SERVİSİ BAŞLANGIÇ************************/
router.get('/followedService/:userid/', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();
  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (user:User)-[r:FOLLOW]->(a:User) WHERE user.id = '"+ req.params.userid + "'" + `
    OPTIONAL MATCH  (a)-[rel1:FOLLOW]->(followedUser:User)
    OPTIONAL MATCH  (a)<-[rel2:FOLLOW]-(followerUser:User)
    OPTIONAL MATCH (a)-[rel3:AUTHOR]->(createdEntry:Entries)
    with collect({userId:a.id,name:a.name, userName : a.userName, userProfilePics:a.profile_pics,rank:a.rank,followedUser:followedUser,followerUser:followerUser,createdEntry:createdEntry}) as data
    UNWIND data as row
    return row.userId as userId,row.userName as userName, row.name as name, row.userProfilePics as userProfilePics, row.rank as userRank, count(distinct(row.followedUser)) as followedUser, count(distinct(row.followerUser)) as followerUser,count(distinct(row.createdEntry)) as createdEntry
    `;
    console.log(query);
    let result = transaction.run(query);
    return result;
  });

  readTxResultPromise.then(function (result) {
    obj = '[';
    result.records.forEach(function (record) {
      obj += '{"userId":' + '"' + record.get('userId') + '", "userName":' + '"' + record.get('userName') + '", "name":' + '"' + record.get('name') + '", "userProfilePics":' + '"' + record.get('userProfilePics') + '", "userRank":' + '"' + record.get('userRank') + '", "followedUser":' + '"' + record.get('followedUser') + '", "followerUser":' + '"' + record.get('followerUser') + '", "createdEntry":' + '"' +  record.get('createdEntry') + '"},'
    });
    obj = obj.substring(0, obj.length - 1);
    obj += ']';
    data = JSON.parse(obj);
    console.log(data);
    res.json(data);
  }).catch(function (error) {
    console.log(error);
  });

});

//************************************** PROFİL/TAKİP EDİLEN İÇERİK SERVİSİ BİTİŞ ****************************/


//************************************ Favori entrilerim ********************************************************/
router.get('/getMyFavoriteEtries/:userid/:pg/', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();
  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (user:User)-[userFav:favorite]->(a:Entries)<-[:HAS_ENTRY]-(title:Title) WHERE user.id = '"+ req.params.userid + "'" + `
    OPTIONAL MATCH  (user)-[userLike:like]->(a) 
    OPTIONAL MATCH  (user)-[userFavorite:favorite]->(a) 
    OPTIONAL MATCH  (user)-[userRepost:repost]->(a) 
    OPTIONAL MATCH (user)-[userDislike:dislike]->(a)
    OPTIONAL MATCH ()-[CountLike:like]->(a) OPTIONAL MATCH ()-[countFav:favorite]->(a) 
    OPTIONAL MATCH ()-[countDislike:dislike]->(a) OPTIONAL MATCH ()-[countRepost:repost]->(a) 
    OPTIONAL MATCH (userCreatedEntry)-[relAuth:AUTHOR]->(a)
    with collect({usr:user.name, entryId:a.id, entryOwnerId:userCreatedEntry.id, entryOwnerName:userCreatedEntry.name, entryOwnerUserName:userCreatedEntry.userName,
    entryOwnerImg:userCreatedEntry.profile_pics,  entryText:a.text, entryCreateDate:a.createDate, 
    titleId:title.id, title:title.text, userLike:(userLike), 
    userFavorite:(userFavorite), userRepost:(userRepost), userDislike:userDislike, CountLike:CountLike, countFav:countFav, countDislike:countDislike,
    countRepost:countRepost,createdEntryUserId :userCreatedEntry.id, userCreatedEntryImg:userCreatedEntry.profile_pics, createdEntryTime:a.createDate, 
    relCreateDate : userFav.createDate }) as fav
    UNWIND fav  as row
    return count(DISTINCT(row.userLike)) as userLike, count(DISTINCT(row.userFavorite)) as userFavorite, count(DISTINCT(row.userRepost)) as userRepost, 
    count(DISTINCT(row.userDislike)) as userDislike, count(DISTINCT(row.CountLike)) as CountLike, count(DISTINCT(row.countFav)) as countFav, 
    count(DISTINCT(row.countRepost)) as countRepost, count(DISTINCT(row.countDislike)) as countDislike, row.entryId as entryId,  
    row.createdEntryUserId as createdEntryUserId,  row.entryOwnerName as entryOwnerName,  row.entryOwnerUserName as entryOwnerUserName, 
    row.entryOwnerImg as entryOwnerImg, row.entryText as entryText, row.titleId as titleId, row.title as title, row.entryCreateDate as entryCreateDate,
    row.relCreateDate as relCreateDate ORDER by row.relCreateDate DESC SKIP 0
    ` + " LIMIT " + req.params.pg * 5;
    console.log(query);
    let result = transaction.run(query);
    return result;
  });
//countDislike
  readTxResultPromise.then(function (result) {
    obj = '[';
    result.records.forEach(function (record) {
      let entryCreateDateAsRaw = record.get('entryCreateDate');
      let entryCreateDate = entryCreateDateAsRaw.day + '.' + entryCreateDateAsRaw.month + '.' + entryCreateDateAsRaw.year + ' ' + entryCreateDateAsRaw.hour + ':' + entryCreateDateAsRaw.minute;
  
      let relCreateDateAsRaw = record.get('relCreateDate');
      let relCreateDate = relCreateDateAsRaw.day + '.' + relCreateDateAsRaw.month + '.' + relCreateDateAsRaw.year + ' ' + relCreateDateAsRaw.hour + ':' + relCreateDateAsRaw.minute;
  
      obj += '{"userLike":' + '"' + record.get('userLike') + '", "userFavorite":' + '"' + record.get('userFavorite') + '", "userRepost":' + '"' + record.get('userRepost') + '", "userDislike":' + '"' + record.get('userDislike') + '", "CountLike":' + '"' + record.get('CountLike') + '", "countFav":' + '"' + record.get('countFav') + '", "countRepost":' + '"' + record.get('countRepost') + '", "countDislike":' + '"' + record.get('countDislike') + '", "entryId":' + '"' +  record.get('entryId') + '", "createdEntryUserId":' + '"' +  record.get('createdEntryUserId') + '", "entryOwnerName":' + '"' +  record.get('entryOwnerName') + '", "entryOwnerUserName":' + '"' +  record.get('entryOwnerUserName') + '", "entryOwnerImg":' + '"' +  record.get('entryOwnerImg') + '", "entryText":' + '"' +  record.get('entryText') + '", "titleId":' + '"' +  record.get('titleId') + '", "title":' + '"' +  record.get('title') + '", "entryCreateDate":' + '"' +  entryCreateDate + '", "relCreateDate":' + '"' +  relCreateDate + '"},'
    });
    obj = obj.substring(0, obj.length - 1);
    obj += ']';
    data = JSON.parse(obj);
    console.log(data);
    res.json(data);
  }).catch(function (error) {
    console.log(error);
  });

});

// ************************************************** Profil sayfası oluşturduğum ve repost ettiğim entryler 
router.get('/getMyEntriesForProfilPage/:userid/:pg/', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();
  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (user:User)-[author:AUTHOR]->(a:Entries)<-[:HAS_ENTRY]-(title:Title) WHERE user.id = '"+ req.params.userid + "'" + `
    OPTIONAL MATCH  (user)-[userLike:like]->(a) 
    OPTIONAL MATCH  (user)-[userFavorite:favorite]->(a) 
    OPTIONAL MATCH  (user)-[userRepost:repost]->(a) 
    OPTIONAL MATCH (user)-[userDislike:dislike]->(a)
    OPTIONAL MATCH ()-[CountLike:like]->(a) OPTIONAL MATCH ()-[countFav:favorite]->(a) 
    OPTIONAL MATCH ()-[countDislike:dislike]->(a) OPTIONAL MATCH ()-[countRepost:repost]->(a) 
    OPTIONAL MATCH (userCreatedEntry)-[relAuth:AUTHOR]->(a)
    with collect({usr:user.name, entryId:a.id, entryOwnerId:userCreatedEntry.id, entryOwnerName:userCreatedEntry.name, entryOwnerUserName:userCreatedEntry.userName, 
    entryOwnerImg:userCreatedEntry.profile_pics,  entryText:a.text, entryCreateDate:a.createDate, 
    titleId:title.id, title:title.text, userLike:(userLike),relType:author.relName, 
    userFavorite:(userFavorite), userRepost:(userRepost), userDislike:userDislike, CountLike:CountLike, countFav:countFav, countDislike:countDislike,
    countRepost:countRepost, createdEntryUserId :userCreatedEntry.id, userCreatedEntryImg:userCreatedEntry.profile_pics, createdEntryTime:a.createDate, 
    relCreateDate:author.createDate }) as auther
    ` + "MATCH (user:User)-[rpost:repost]->(a:Entries)<-[:HAS_ENTRY]-(title:Title) WHERE user.id = '"+ req.params.userid + "'" +  `
    OPTIONAL MATCH  (user)-[userLike:like]->(a) 
    OPTIONAL MATCH  (user)-[userFavorite:favorite]->(a) 
    OPTIONAL MATCH  (user)-[userRepost:repost]->(a) 
    OPTIONAL MATCH (user)-[userDislike:dislike]->(a)
    OPTIONAL MATCH ()-[CountLike:like]->(a) OPTIONAL MATCH ()-[countFav:favorite]->(a) 
    OPTIONAL MATCH ()-[countDislike:dislike]->(a) OPTIONAL MATCH ()-[countRepost:repost]->(a) 
    OPTIONAL MATCH (userCreatedEntry)-[relAuth:AUTHOR]->(a)
    with auther + collect({usr:user.name, entryId:a.id, entryOwnerId:userCreatedEntry.id, entryOwnerName:userCreatedEntry.name, entryOwnerUserName:userCreatedEntry.userName,
    entryOwnerImg: userCreatedEntry.profile_pics,  entryText:a.text, entryCreateDate:a.createDate, 
    titleId:title.id, title:title.text, userLike:(userLike), relType:rpost.relName,  
    userFavorite:(userFavorite), userRepost:(userRepost), userDislike:userDislike, CountLike:CountLike, countFav:countFav, countDislike:countDislike,
    countRepost:countRepost,createdEntryUserId :userCreatedEntry.id, userCreatedEntryImg:userCreatedEntry.profile_pics, createdEntryTime:a.createDate, relCreateDate : rpost.createDate }) as autherRepost
    UNWIND autherRepost  as row
    return count(DISTINCT(row.userLike)) as userLike, count(DISTINCT(row.userFavorite)) as userFavorite, count(DISTINCT(row.userRepost)) as userRepost, count(DISTINCT(row.userDislike)) as userDislike, 
    count(DISTINCT(row.CountLike)) as CountLike, count(DISTINCT(row.countFav)) as countFav, count(DISTINCT(row.countRepost)) as countRepost, count(DISTINCT(row.countDislike)) as countDislike, row.entryId as entryId,  
    row.createdEntryUserId as createdEntryUserId,  row.entryOwnerName as entryOwnerName,  row.entryOwnerUserName as entryOwnerUserName, row.entryOwnerImg as entryOwnerImg, row.entryText as entryText, row.titleId as titleId, 
    row.title as title, row.entryCreateDate as entryCreateDate,row.relType as relType, row.relCreateDate as relCreateDate ORDER by row.relCreateDate DESC SKIP 0
    `+ " LIMIT " + req.params.pg * 5;
    console.log(query);
    let result = transaction.run(query);
    return result;
  });
//countDislike
  readTxResultPromise.then(function (result) {
    obj = '[';
    result.records.forEach(function (record) {
      let entryCreateDateAsRaw = record.get('entryCreateDate');
      let entryCreateDate = entryCreateDateAsRaw.day + '.' + entryCreateDateAsRaw.month + '.' + entryCreateDateAsRaw.year + ' ' + entryCreateDateAsRaw.hour + ':' + entryCreateDateAsRaw.minute;
  
      let relCreateDateAsRaw = record.get('relCreateDate');
      let relCreateDate = relCreateDateAsRaw.day + '.' + relCreateDateAsRaw.month + '.' + relCreateDateAsRaw.year + ' ' + relCreateDateAsRaw.hour + ':' + relCreateDateAsRaw.minute;
  
      obj += '{"userLike":' + '"' + record.get('userLike') + '", "userFavorite":' + '"' + record.get('userFavorite') + '", "userRepost":' + '"' + record.get('userRepost') + '", "userDislike":' + '"' + record.get('userDislike') + '", "CountLike":' + '"' + record.get('CountLike') + '", "countFav":' + '"' + record.get('countFav') + '", "countRepost":' + '"' + record.get('countRepost') + '", "countDislike":' + '"' + record.get('countDislike') + '", "entryId":' + '"' +  record.get('entryId') + '", "createdEntryUserId":' + '"' +  record.get('createdEntryUserId') + '", "entryOwnerName":' + '"' +  record.get('entryOwnerName') + '", "entryOwnerUserName":' + '"' +  record.get('entryOwnerUserName') + '", "entryOwnerImg":' + '"' +  record.get('entryOwnerImg') + '", "entryText":' + '"' +  record.get('entryText') + '", "titleId":' + '"' +  record.get('titleId') + '", "title":' + '"' +  record.get('title') + '",  "relType":' + '"' +  record.get('relType') + '",  "entryCreateDate":' + '"' +  entryCreateDate + '", "relCreateDate":' + '"' +  relCreateDate + '"},'
    });
    obj = obj.substring(0, obj.length - 1);
    obj += ']';
    data = JSON.parse(obj);
    //console.log(data);
    res.json(data);
  }).catch(function (error) {
    console.log(error);
  });

});

router.get('/getEntryCountForCurrentTitle/:titleid/', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    
    let query = "MATCH (title:Title{id:'" + req.params.titleid + "'})-[rel:HAS_ENTRY]->(abc) RETURN count(rel) as entriesCount";
    //console.log(query);
    let result = transaction.run(query);
    return result;
  });

  readTxResultPromise.then(function (result) {

    const singleRecord = result.records[0];
   
    console.log(singleRecord.get('entriesCount').low);
    //if (result.records[0].get('r2').properties.deleteDate.year.low > 0) {
      res.send(singleRecord.get('entriesCount').low.toString());
    //} else {
     // res.send("err");
    //}

  }).catch(function (error) {
    console.log(error);
  });
});


router.get('/getPersonalInformation/:userId/', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();
  req.params.titleid 
  let readTxResultPromise = session.readTransaction(function (transaction) {
    
    let query = "MATCH (per:PersonalInformation) WHERE per.userId ='" + req.params.userId  + "' RETURN per";
    //console.log(query);
    let result = transaction.run(query);
    return result;
  });

  readTxResultPromise.then(function (result) {

    const singleRecord = result.records[0];
   
    //console.log(singleRecord.get('per').properties);
      res.json(singleRecord.get('per').properties);
  }).catch(function (error) {
    console.log(error);
  });
});

router.post('/setPersonalInformation', function (req, res) {
  //req.body.entryId
  existPersonalInformation(req.body.userId).then(function (data) {//thenden sonraki ilk fonk resolve, ikincisi reject dir.


    let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
      maxTransactionRetryTime: 30000
    });
    let session = driver.session();
    let readTxResultPromise = session.readTransaction(function (transaction) {
      let query = "";
      if(data > 0){
        query ="MATCH (per:PersonalInformation) WHERE per.userId ='"+ req.body.userId +"' SET per.userName = '"+ req.body.userName +"', per.livingCity='"+ req.body.livingCity + "', per.email='"+ req.body.email +"', per.dateOfBirth='"+ req.body.dateOfBirth +"', per.aboutYou='"+ req.body.aboutYou +"', per.gender='"+ req.body.gender +"', per.accountOfFacebook='"+req.body.accountOfFacebook +"', per.accountOfTwitter='"+ req.body.accountOfTwitter +"', per.accountOfYoutube='"+ req.body.accountOfYoutube +"', per.accountOfInstagram='" + req.body.accountOfInstagram + "', per.accountOfSpotify='"+ req.body.accountOfSpotify +"', per.updateDate=timestamp() RETURN per"
      }
      else{
        query =  "MERGE (per:PersonalInformation{userName:'" + req.body.userName + "',id:randomUUID(), userId:'"+req.body.userId+"', livingCity:'"+ req.body.livingCity +"', email:'" + req.body.email +"',dateOfBirth:'"+ req.body.dateOfBirth +"',aboutYou:'" + req.body.aboutYou + "',gender:'"+ req.body.gender +"',accountOfFacebook:'"+ req.body.accountOfFacebook +"',accountOfTwitter:'" + req.body.accountOfTwitter+"',accountOfYoutube:'" + req.body.accountOfYoutube +"',accountOfInstagram:'" + req.body.accountOfInstagram + "',accountOfSpotify:'" + req.body.accountOfSpotify + "',creatDate:timestamp(), updateDate:timestamp()})  return per"
      }
      console.log(query);
      let result = transaction.run(query);
      return result;
    });
  
    readTxResultPromise.then(function (result) {
     //console.log(result.get('per').properties);
     res.send('OK');
    }).catch(function (error) {
      console.log(error);
    });

}, function (error) {
    console.log(error);
})

});



router.post('/test', function (req, res) {
  existPersonalInformation('ecb9c07f-42c9-4bf5-9dca-42319164d6d3-').then(function (data) {//thenden sonraki ilk fonk resolve, ikincisi reject dir.
    if(data > 0){
      console.log('kayıt var');
    }
    else{
      console.log("Kayıt yok");
    }

}, function (error) {
    console.log(error);
})

  res.send('OK');
});


router.get('/getHobbiesAndInterests/:userId/', function (req, res) {

  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();
  req.params.titleid 
  let readTxResultPromise = session.readTransaction(function (transaction) {
    
    let query = "MATCH (data:HobbiesAndInterests) WHERE data.userId ='" + req.params.userId  + "' RETURN data";
    //console.log(query);
    let result = transaction.run(query);
    return result;
  });

  readTxResultPromise.then(function (result) {
    const singleRecord = result.records[0];
    //console.log(singleRecord.get('data').properties);
    res.json(singleRecord.get('data').properties);
  }).catch(function (error) {
    console.log(error);
  });
});


router.post('/setHobbiesAndInterests', function (req, res) {
  
  existHobbiesAndInterests(req.body.userId).then(function (data) {//thenden sonraki ilk fonk resolve, ikincisi reject dir.


    let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
      maxTransactionRetryTime: 30000
    });
    let session = driver.session();
    let readTxResultPromise = session.readTransaction(function (transaction) {
      let query = "";
      if(data > 0){
        query ="MATCH (hb:HobbiesAndInterests) where hb.userId ='" + req.body.userId + "' SET hb.hobbies = '" + req.body.hobbies  + "', hb.favoriteArtists='" + req.body.favoriteArtists  + "', hb.favoriteSeries='" + req.body.favoriteSeries + "', hb.favoriteBooks='" + req.body.favoriteBooks + "', hb.favoriteFilms = '" + req.body.favoriteFilms + "', hb.favoriteWritings='" + req.body.favoriteWritings + "', hb.favoriteGames='"+ req.body.favoriteGames + "',  hb.otherInterests='" + req.body.otherInterests +"'  return hb";
      }
      else{
        query =  "MERGE (data:HobbiesAndInterests{id:randomUUID(), userId:'" + req.body.userId  + "', hobbies:'" + req.body.hobbies +"', favoriteArtists:'" + req.body.favoriteArtists + "',favoriteSeries:'" + req.body.favoriteSeries + "',favoriteBooks:'"+ req.body.favoriteBooks +"',favoriteFilms:'" + req.body.favoriteFilms + "',favoriteWritings:'" + req.body.favoriteWritings +"',favoriteGames:'" + req.body.favoriteGames + "', otherInterests:'"+ req.body.otherInterests +"'})  return data";
      }
      console.log(query);
      let result = transaction.run(query);
      return result;
    });
  
    readTxResultPromise.then(function (result) {
     //console.log(result.get('per').properties);
     res.send('OK');
    }).catch(function (error) {
      console.log(error);
    });

}, function (error) {
    console.log(error);
})
});

router.post('/register', function (req, res) {
  console.log("register server.js");
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();
  //req.body.userName, req.body.pass

  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "CREATE (user:User{name:'" + req.body.name + "', rank:'Çaylak',id:randomUUID(),userName:'" + req.body.userName + "',pass:'" + req.body.pass + "',profile_pics:'bakimbi_default.jpg',email:'" + req.body.email + "',createDate:datetime()}) RETURN user";
    let result = transaction.run(query);
    return result;
  });

  readTxResultPromise.then(function (result) {
    res.json(result.records[0].get('user').properties);
    console.log(result.records[0].get('user').properties);

  }).catch(function (error) {
    res.send(error);
    console.log(error);
  });
});

//************ USERADVICE SERVİSİ BAŞLANGIÇ ******************
router.post('/userAdviceService/', function (req, res) {
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();
  let readTxResultPromise = session.readTransaction(function (transaction) {
    //console.log("UserAdvice Verisi: " + JSON.stringify(req.body));
    let query = "MATCH (user:User) WHERE user.id = '" + req.body.loggedId + "' OPTIONAL MATCH  (usr:User)<-[rel:FOLLOW]-() WHERE usr.id <> '" + req.body.loggedId + "' OPTIONAL MATCH (user)-[isFollowed:FOLLOW]->(usr) return usr.id as userId, usr.name as name,usr.userName as userName, usr.rank as rank, usr.profile_pics as profile_pics, count(DISTINCT(rel)) as  followerCount, CASE isFollowed WHEN null THEN 0 ELSE 1 END as followedStatus SKIP 0 LIMIT 30";
    //console.log("Tavsiye Sorgusu: " + query);
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {
    obj = '[';
    result.records.forEach(function (record) {
      obj += '{"userId":' + '"' + record.get('userId') + '", "userName":' + '"' + record.get('userName') + '", "name":' + '"' + record.get('name') + '", "profile_pics":' + '"' + record.get('profile_pics') + '", "rank":' + '"' + record.get('rank') + '", "followedStatus":' + '"' + record.get('followedStatus') + '"},'
    });
    obj = obj.substring(0, obj.length - 1);
    obj += ']';
    data = JSON.parse(obj);
    //console.log(data);
    //console.log("Veri tipi: " + typeof(data));
    res.json(data);
  }).catch(function (error) {
    console.log(error);
  });
});
//************ USERADVICE SERVİSİ BİTİŞ ******************

//************ FOLLOW SERVİSİ BAŞLANGIÇ ******************
router.post('/followService/', function (req, res) {
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (user:User) WHERE user.userName = '" + req.body.userName + "' MATCH (followed:User) WHERE followed.id = '" + req.body.followedid + "' CREATE UNIQUE (user)-[follow:FOLLOW {relName:'follow',createDate:datetime()}]->(followed) RETURN  follow";
    //console.log("Follow Query: " + query);
    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {
    //console.log(result.records[0].get('follow').properties);
    if (result.records[0].get('follow').properties.createDate.year.low > 0) {
      res.send("ok");
    } else {
      res.send("err");
    }

  }).catch(function (error) {
    console.log(error);
  });
});
//************ FOLLOW SERVİSİ BİTİŞ ******************

//************ UNFOLLOW SERVİSİ BAŞLANGIÇ ******************
router.post('/unfollowService', function (req, res) {
  let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
    maxTransactionRetryTime: 30000
  });
  let session = driver.session();

  let readTxResultPromise = session.readTransaction(function (transaction) {
    let query = "MATCH (user:User)-[r:FOLLOW]->(followed:User) WHERE user.userName = '" + req.body.userName + "' AND followed.id = '" + req.body.followedid + "' CREATE (user)-[unfollow:UNFOLLOW {createDate: r.createDate, deleteDate:datetime()}]->(followed) DELETE r RETURN unfollow";

    let result = transaction.run(query);
    return result;
  });
  readTxResultPromise.then(function (result) {
    console.log(result.records[0].get('unfollow').properties);
    if (result.records[0].get('unfollow').properties.deleteDate.year.low > 0) {
      res.send("deleted");
    } else {
      res.send("err");
    }

  }).catch(function (error) {
    console.log(error);
  });
});
//************ UNFOLLOW SERVİSİ BİTİŞ ******************

app.use(router);




//-------------------------------------------------------------------FONKSİYONLAR ---------------------------------------------------------------------------
//İlerde farklı bir js dosyasına taşınacak

/*Personal bilgisi varmı yok mu kontrolü varsa sıfırdan büyük yoksa 0 döner. */ 
function existPersonalInformation(userId){
  return new Promise(function (resolve, reject) {
      
      let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
          maxTransactionRetryTime: 30000
        });
        let session = driver.session();
      
        let readTxResultPromise = session.readTransaction(function (transaction) {
          let query = "MATCH (per:PersonalInformation) WHERE per.userId ='" + userId + "' return count(per.id) as ret";
          let result = transaction.run(query);
          return result;
        });
        readTxResultPromise.then(function (result) {
          resolve(result.records[0].get('ret').low);
      
        }).catch(function (error) {
          console.log(error);
          resolve(0);
        });
  });
}

function existHobbiesAndInterests(userId){
  return new Promise(function (resolve, reject) {
      
      let driver = neo4j.driver("bolt://localhost:" + neo4jPort, neo4j.auth.basic("neo4j", "123123."), {
          maxTransactionRetryTime: 30000
        });
        let session = driver.session();
      
        let readTxResultPromise = session.readTransaction(function (transaction) {
          let query = "MATCH (data:HobbiesAndInterests) WHERE data.userId ='" + userId + "' RETURN count(data.id) as ret";
          let result = transaction.run(query);
          return result;
        });
        readTxResultPromise.then(function (result) {
          resolve(result.records[0].get('ret').low);
      
        }).catch(function (error) {
          console.log(error);
          resolve(0);
        });
  });
}

