var { Router } = require('express');
var express = require('express')
var router = express.Router()
var mysql = require('mysql');
var ejs = require('ejs');
var db = require('../database/db');
var student = require('../controller/api.controller');
var app = express();


// router.get("/", (req, res) => {
//     res.send({ message: "Welcome to apis application. world" });
//   });
router.get('/',(req,res) => {
     res.render('login');
});
router.post('/send',(req,res)=>{
    student.insert(req,res)
});


router.get('/fetch',(req,res)=>{
    student.select(req,res)
});


router.put('/delete/:id',(req,res)=>{
    student.delete(req,res)
});

router.post('/update/:id',(req,res)=>{
    student.update(req,res)
});

router.post('/uplode',(req,res)=>{
    student.insertt(req,res)
});

router.get('/imagefetch',(req,res)=>{
    student.immagefetch(req,res)
});

router.post('/login',(req,res)=>{
    student.login(req,res)
});

router.post('/multiimage',(req,res)=>{
    student.multiimage(req,res)
});

module.exports = router