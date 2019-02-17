var express = require('express');
var router = express.Router();
var request = require('request');
var jsonToTable = require('json-to-table');

async function getFollower(req, res){
    if(!req.body.account){
        console.log("please submit with account")
        return res.status(403);
    }
    account = req.body.account;
    url = 'https://api.github.com/users/'+ account.trim() +'/followers';
    // console.log(url)
   
    request.get({url, headers : {
        'User-Agent' : 'request'
    }}, function(error, response, body){
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        const statusCode = response && response.statusCode;
        if(statusCode!='200'){
            console.log('user not found');
            // ressend(new Buffer('<p>User is not found!</p>'));
            res.send('<script>alert("User is not found!")</script>');
            return;
        }
        const jsoned = JSON.parse(body)
        const data = jsoned.map(json => ({avatar : json.avatar_url , login : json.login, url: json.html_url}))
        res.render('follower', {followers : data})
        // res.render('index', {title : 'express'})
    });


};

router.route("/").post(getFollower);

// router.post("/", function(req, res){
//     // account = res.body.account;
//     if(!req.body.account){
//         console.log("please submit with account")
//         return res.status(403);
//     }

//     console.log('account : ', req.body.account)
//     followers = await getFollower(req.body.account);
//     res.json(followers);
// });

module.exports = router;