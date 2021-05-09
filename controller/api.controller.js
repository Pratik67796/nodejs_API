var { Router } = require('express');
var express = require('express')
var mysql = require('mysql');
var router = require('../router/api.route');
var db = require('../database/db');
var student = require('../model/student');
var image = require('../model/image');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;
var multer  = require('multer')
// var jwt = require('jsonwebtoken');
const { sign } = require("jsonwebtoken");

var fileExtension = require('file-extension');
const randomstring = require("randomstring");
const fs = require('fs');
const { selectWhere } = require('../model/student');

var USer = {
    insert:function (req,res)
    {
         Name = req.body.name;
         number = req.body.number;
         password = req.body.password;
    
       
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                var objData = {
                    Name: req.body.name,
                    number: req.body.number,
                    password: hash,
                    }
            student.insert(objData).then(result=>{
            res.status(201).json({
                message: "Your Data Is succesfully inserted",
                post: result
            });
        }).catch(error=>{
            res.status(500).json({
                message: "opps!! somthing went wrong.. plzz try again ",
                post: error
            });
        })
    });
        
    },
    select: function(req,res)
    {
        student.select().then(result=>{
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json({
                message: "something  is bad plzz check your code",
                post:error
            });
        });
    },
    delete: function (req,res) 
    {
        id = req.params.id;
        student.delete(id).then(result=>{
            res.status(201).json({
                message: "Your Data Is succesfully deleted",
                //post: result
            });
        }).catch(error=>{
            res.status(500).json({
                message: "opps!! somthing went wrong.. plzz try again ",
                //post: error
            });
        })
        
    },

    update: function (req,res)
    {
            id = req.params.id;
           
            console.log(id);
            var objData = {
                Name: req.body.name,
                number: req.body.number,
                password: req.body.password,
                }
                console.log(objData);
            student.update(objData,id).then(result=>{
                res.status(201).json({
                    message: "Your Data Is succesfully updated",
                    post: result
                });
            }).catch(error=>{
                res.status(500).json({
                    message: "your data is not update ",
                    post: error
                });
            })
            
    },
    insertt:function (req,res)
    {
        var image_name = '';
        if (req.files != null && req.files.photoImage != undefined)
        {
            var imageFile = req.files.photoImage;
            var ext = fileExtension(imageFile.name);
            image_name = randomstring.generate() + '.' + ext;
            imageFile.mv(uploadPath + '/image/' + image_name, function () { });
           
        }

        var objData = {
            img: image_name,
            }
            
            image.insertt(objData).then(result=>{
                res.status(201).json({
                    message: "Your image Is succesfully added",
                    post: result
                });
            }).catch(error=>{
                res.status(500).json({
                    message: "your image is not inserted",
                    post: error
                });
            })
    },

    multiimage: async function (req,res)
    {
        var image_name = '';
        console.log("req.files.photoImage ->",req.files.photoImage)
        if (req.files != null && req.files.photoImage != undefined)
        {
            for(var i=0; i < req.files.photoImage.length; i++)
            {
                var imageFile = req.files.photoImage[i];
                var ext = fileExtension(imageFile.name);
                image_namexyz = randomstring.generate() + '.' + ext;
                image_name += ","+image_namexyz
                imageFile.mv(uploadPath + '/miltiple_image/' + image_namexyz, function () { });
            }
        }
            var objData = {
                img: image_name,
            }
            
            image.insertt(objData).then(result=>{
                res.status(201).json({
                    message: "Your multiple image Is succesfully added",
                    post: result
                });
            }).catch(error=>{
                res.status(500).json({
                    message: "your multiple  image is not inserted",
                    post: error
                });
            })
    },

    immagefetch: function (req,res)
    {
        image.select().then(result=>{
            // <img src="/about_image/<%= row.image %>" style="height:100px;width:100px"></img>
            var path = uploadURL+'image/'
            result.forEach(async element => {
                element.imageUrl = path + element.img;
            });
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json({
                message: "something  is bad plzz check your code",
                post:error
            });
        });   
    },
    
    login: async function  (req,res)
    {
        const body =req.body;
        // Pass saved encrypted password as second parameter
        student.selectWhere("name='"+body.name+"'").then(async (result,err)=>{
            if(err){
                console.log(err);
            }
            if(result.length == 0){
                return res.json({
                    success:0,
                    message:"User not found.",
                });
            }
            console.log('result[0].name --> ',result[0].name)
            console.log('result[0].password --> ',result[0].password)
            var checkPassword = await bcrypt.compare(req.body.password.trim(), result[0].password)
            if(checkPassword){
                const jsontoken = sign({re:result},"pratik",{
                    expiresIn:"1h"
                });
                // bcrypt.compare(Password, body.password);
                return res.json({
                    success: 1,
                    message: "login succesfully",
                    token: jsontoken
                });
            }else{
                return res.json({
                    success:0,
                    message:"invalid username or password",
                });
            }
        });
   
    },


}

module.exports = USer;

