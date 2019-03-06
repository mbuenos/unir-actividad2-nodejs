var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

var MongoClient = require('mongodb').MongoClient;



app.get('/foro', function (req, res) {
    if (req.headers['token']!="marcobueno"){
        res.status(403);
        res.json({
           error:"token invalido" 
        });
        return;
    }
    MongoClient.connect('mongodb://panamericano:itf1234@ds121135.mlab.com:21135/panamericano', 
    function(err, db) {
        console.log("Conectado al servidor")
                
        var collection = db.collection('preguntas');
        collection.find().toArray(function (err, result) {
            res.status(200);
            res.json(result); 

            // Cerrar el cliente
            db.close();
        });
      
    });
})
app.get('/respuestas/:id', function (req, res) {
    var IDpregunta = req.params.id;
    MongoClient.connect('mongodb://panamericano:itf1234@ds121135.mlab.com:21135/panamericano', 
    function(err, db) {
        console.log("Conectado al servidor")
                
        var collection = db.collection('respuestas');
        collection.find( { id_pregunta : IDpregunta} ).toArray(function (err, result) {
            res.status(200);
            res.json(result); 

            // Cerrar el cliente
            db.close();
        });
      
    });
})



app.delete('/foro/:id', function (req, res) {
    var IDpreguntas = require('mongodb').ObjectID(req.params.id);
    MongoClient.connect('mongodb://panamericano:itf1234@ds121135.mlab.com:21135/panamericano', 
    function(err, db) {
        console.log("Conectado al servidor")
                
        var collection = db.collection('preguntas');
        collection.remove( { _id : IDpreguntas }, function (err, result) {
            res.status(200);
            res.json({ 
                    mensaje : "borrado con exito"
                }); 
            // Cerrar el cliente
            db.close();
        });
      
    });
})
app.delete('/respuesta/:id', function (req, res) {
    var IDrespuesta = require('mongodb').ObjectID(req.params.id);
    MongoClient.connect('mongodb://panamericano:itf1234@ds121135.mlab.com:21135/panamericano', 
    function(err, db) {
        console.log("Conectado al servidor")
                
        var collection = db.collection('respuestas');
        collection.remove( { _id : IDrespuesta }, function (err, result) {
            res.status(200);
            res.json({ 
                    mensaje : "borrado con exito"
                }); 
            // Cerrar el cliente
            db.close();
        });
      
    });
})


app.get('/foro/:id', function (req, res) {
    var IDpreguntas = require('mongodb').ObjectID(req.params.id);
    MongoClient.connect('mongodb://panamericano:itf1234@ds121135.mlab.com:21135/panamericano', 
    function(err, db) {
        console.log("Conectado al servidor")
                
        var collection = db.collection('preguntas');
        collection.find( { _id : IDpreguntas } ).toArray(function (err, result) {
            res.status(200);
            res.json(result); 

            // Cerrar el cliente
            db.close();
        });
      
    });
})
app.get('/respuesta/:id', function (req, res) {
    var IDrespuesta = require('mongodb').ObjectID(req.params.id);
    MongoClient.connect('mongodb://panamericano:itf1234@ds121135.mlab.com:21135/panamericano', 
    function(err, db) {
        console.log("Conectado al servidor")
                
        var collection = db.collection('respuestas');
        collection.find( { _id : IDrespuesta } ).toArray(function (err, result) {
            res.status(200);
            res.json(result); 

            // Cerrar el cliente
            db.close();
        });
      
    });
})
app.put('/foro/:id', function (req, res) {
    var IDpregunta = require('mongodb').ObjectID(req.params.id);
    MongoClient.connect('mongodb://panamericano:itf1234@ds121135.mlab.com:21135/panamericano', 
    function(err, db) {
        console.log("Conectado al servidor")

        var a1 = {
            pregunta: req.body.pregunta,
            id_usuario: req.body.usuario
        }
                
        var collection = db.collection('preguntas');
        collection.update({ _id : IDpregunta }, {$set: a1 }, function (err, result) {
            res.status(201);
            res.json({
                modificado : true
            });
            // Cerrar el cliente
            db.close();
        });
  
    });
})
app.put('/respuesta/:id', function (req, res) {
    var IDrespuesta = require('mongodb').ObjectID(req.params.id);
    MongoClient.connect('mongodb://panamericano:itf1234@ds121135.mlab.com:21135/panamericano', 
    function(err, db) {
        console.log("Conectado al servidor")

        var a1 = {
            respuesta: req.body.respuesta,
            id_usuario: req.body.usuario,
            id_pregunta: req.body.pregunta
        }
                
        var collection = db.collection('respuestas');
        collection.update({ _id : IDrespuesta }, {$set: a1 }, function (err, result) {
            res.status(201);
            res.json({
                modificado : true
            });
            // Cerrar el cliente
            db.close();
        });
  
    });
})

app.post('/foro', function (req, res) {
    MongoClient.connect('mongodb://panamericano:itf1234@ds121135.mlab.com:21135/panamericano', 
    function(err, db) {
        console.log("Conectado al servidor")

        var a1 = {
            pregunta: req.body.pregunta,
            id_usuario: req.body.usuario
        }
                
        var collection = db.collection('preguntas');
        collection.insert(a1, function (err, result) {
            res.status(201);
            res.json({
                insertado : true
            });
            // Cerrar el cliente
            db.close();
        });
  
    });
})
app.post('/respuesta/:id', function (req, res) {
    var IDpregunta = req.params.id;
    MongoClient.connect('mongodb://panamericano:itf1234@ds121135.mlab.com:21135/panamericano', 
    function(err, db) {
        console.log("Conectado al servidor")

        var a1 = {
            respuesta: req.body.respuesta,
            id_usuario: req.body.usuario,
            id_pregunta: IDpregunta
        }
                
        var collection = db.collection('respuestas');
        collection.insert(a1, function (err, result) {
            res.status(201);
            res.json({
                insertado : true
            });
            // Cerrar el cliente
            db.close();
        });
  
    });
})


app.listen(5000, function() { 
    console.log("funcionando en 5000")
});


