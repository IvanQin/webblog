/**
 * Created by Qinyifan on 17/12/29.
 */
const express = require('express');
const router = express.Router();
const dbHelper = require("../utils/dbHelper");
/**
 * all of the database operation have the same api? the difference is the params
 * post will handle insertion/delete/update ...
 * get will handle search...
 */
router.post('/', function (req, res, next) {
    let content = req.body;
    dbHelper.entrance(JSON.stringify(content)).then(resolve => res.send(resolve),rej => res.send(rej));
    //res.render('index', {title: 'Express'});
});


module.exports = router;