var express = require('express');
var router = express.Router();

router.post('/login', function(req, res) {
    var db = req.db;
    var email = req.body.email;
    console.log(req.body);
    db.get('user').findOne({email}).then(user =>{
        console.log(user);
        if(user && user.password == req.body.password){                    
            res.send(user);
        }
        else{
            res.json(null);
        }
    });
});

router.post('/register',function(req, res) {
    var db = req.db;
    var userProfile = req.body;    
    console.log(userProfile);
    db.collection('user').insert(userProfile,function(err,res){
        if(err) throw err;         
    });    
    res.json(200);    
});

router.post('/update', function(req, res) {
    var db = req.db;
    var id = req.body._id;
    var newValues ={$set: {'phone':req.body.phone , 'address':req.body.address}};
    console.log(id);
    console.log(newValues);    
    if(id){
        db.collection('user').update(id,newValues,function(err,res){
            if(err) throw err;            
        });        
    }
    db.get('user').findOne(id).then(user =>{
        console.log(user);
        if(user){                    
            res.send(user);
        }
        else{
            res.json(null);
        }
    });    
});

module.exports = router;