var express = require('express');
var router = express.Router();

router.post('/getCart', function(req, res) {
    var db = req.db;
    var email = req.body.email;    
    db.get('cart').findOne({email}).then(cart =>{ 
        if(cart){                                  
            res.send(cart);        
        }
        else{
            res.json(204);
        }
    });    
});

router.post('/userCart', function(req, res) {
    var db = req.db;
    var email = req.body.email;
    const existingCart = db.get('cart').findOne({email});
    if(existingCart){
        db.collection('cart').update(email,req.body,function(err,res){
            if(err) throw err;
            res.json(200);
        });
    }
    db.collection('cart').insert(req.body,function(err,res){
        if(err) throw err;
        res.json(200);
    });
    res.json(204);
});


module.exports = router;