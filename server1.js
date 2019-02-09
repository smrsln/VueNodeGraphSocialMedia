var express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose');

var Todo = require('./models/Todo');
var router = express.Router();

mongoose.connect("mongodb://localhost:27017/vuenodedb",{ useNewUrlParser: true }).then(
          () => {console.log('Database connection is successful') },
          err => { console.log('Error when connecting to the database'+ err)}
);
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

var PORT = process.env.PORT || 4000;


//http://127.0.0.1:4000/todos
router.get('/todos', function (req, res) {
  Todo.find((err, todos) =>{
    if(err){
      console.log(err);
    }
    else {
      res.json(todos);
      //res.send(tamamdır);
    }
  });
});

//verilen id ye ait kaydı al
router.get('/todo/:id', function (req, res) {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo)
      return next(new Error('Error getting the todo!'));
    else {
      res.json(todo);
    }
  });

});

router.post('/create', function (req, res) {
  console.log(req.body);
  var todo = new Todo(req.body);
   todo.save().then( todo => {
   res.status(200).json({'message': 'Todo successfully added '});
   })
   .catch(err => {
    res.status(400).send("Error when saving to database");
   });
});


router.put('/todos/:id', function (req, res) {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo)
      return next(new Error('Error getting the todo!'));
    else {
      todo.name = req.body.name;
      todo.save().then( todo => {
          //res.json('Todo updated successfully');
          res.status(200).send("Todo updated successfully");
      })
      .catch(err => {
            res.status(400).send("Error when updating the todo");
      });
    }
  });
});

router.get('/delete/:id', function (req, res) {
    Todo.findByIdAndRemove({_id: req.params.id}, (err,todo) =>{
        if(err) res.json(err);
        else res.status(200).send("Kayıt silindi.");
    });
});

app.use(router);
app.listen(PORT, function(){
  console.log("Express server " + PORT + " nolu portta çalışıyor...");
});

//http://127.0.0.1:4000/todos



