/**
 * Created by Qinyifan on 18/2/28.
 */
const express = require('express');
const router = express.Router();
const dbHelper = require("../utils/dbHelper");
const md5 = require('js-md5');
router.post('/', function (req, res, next) {
    let content = req.body;
    dbHelper.entrance(JSON.stringify(content)).then(resolve => res.send(resolve), rej => res.send(rej));
    //res.render('index', {title: 'Express'});
});

router.post('/get-token', (req, res, next) => {
    let content = req.body;
    // use current Time and roomId
    let str = Date.now() + '&' + content['roomId'];
    let encodeStr = md5(str);
    res.cookie('token', encodeStr, {maxAge: 3600*1000, httpOnly: true}); // expire time
    res.send('Success');

});

module.exports = router;