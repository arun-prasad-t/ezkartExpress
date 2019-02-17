var express = require('express');
var router = express.Router();

router.post('/save',function(req, res) {
    var db = req.db;
    var orderDetail = req.body;
    console.log(orderDetail);
    db.collection('orders').insert(orderDetail,function(err,res){
        if(err) throw err;         
    });    
    res.json(200);    
});

router.post('/getOrders',function(req, res) {
    var db = req.db;
    var email = req.body.email;    
    db.get('orders').find({email}).then(orders =>{
        console.log(orders);
        if(orders){                    
            res.send(orders);
        }
        else{
            res.json(null);
        }
    });           
});

module.exports = router;