const express = require('express');
const router = express.Router();
const mysqlcon = require('../Database');
const cloudinary =  require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get('/', (req, res) => {
    mysqlcon.query('Select * From Imagenes Where estado = 1 Order By FechaCreacion Desc', (err,rows, fileds)=>{
        if(err){
            console.log(err)
        }
        else{
            res.render('index', { images : rows});
        }
    })
});

router.get('/images/upload', (req,res)=>{
    res.render('upload'); 
});

router.post('/images/upload', async (req,res)=>{
    const { title, description } = req.body;
    const { FileImagenFondo } = req.body;
    const result = await cloudinary.v2.uploader.upload(FileImagenFondo);
    const query = 'insert into Imagenes(Titulo, Descripcion, Imagen, FechaCreacion, Estado) values(?, ?, ?, ?, 1)';
    mysqlcon.query(query, [title, description, result.url, new Date()]);
    res.redirect('/');
});

router.get('/images/:id', (req,res)=>{
    const id_img = req.params.id

    mysqlcon.query('Select * From Imagenes Where ID = ?', id_img, (err,rows, fileds)=>{
        if(err){
            console.log(err)
        }
        else{
            res.render('profile', { image : rows[0]});
        }
    })
});

router.get('/images/:id/delete', async (req, res)=>{
    const id_img = req.params.id
    await mysqlcon.query('Update Imagenes Set Estado = 0 Where ID = ?', [id_img]);
    // await mysqlcon.query('Delete Fromn Imagenes');
    res.redirect('/');
});

module.exports = router;