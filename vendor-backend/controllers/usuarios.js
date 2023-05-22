const express = require('express');
const io = require('../server');
const app = express();
const User = require('../models/usuario')
const bcrypt=require('bcrypt')
let secret=''

const jwt=require('jsonwebtoken')

/*app.pos('/auth',(req,res)=>{
    const token= jwt.sign({data:''},secret,{expiresIn:'1d'})

   // bcrypt.compareSync(req.body.pass,bcrypt.hashSync(dbpass,10))
})*/

app.post('/usuario', (req, res) => {
    let body = req.body
    User.Create(body).then((resp) => {
        User.UserId().then((resp) => {
            res.json({ ok: true, data: resp }).status(200)
        })
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})

app.put("/usuario/:id", (req, res) => {


})

app.get('/usuario', (req, res) => {



})

module.exports = app;