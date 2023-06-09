const express = require('express')
const { Create, GetId, CreateRutaAndMunicipio, List,GetById, Update } = require('../models/ruta')
const app = express()




app.post('/ruta', (req, res) => {
    const body = req.body
    Create(body).then((resp, err) => {
        if (err) return res.json({ ok: false, err }).status(400)
        GetId().then((resp, err) => {
            res.json({ ok: true, data: resp }).status(200)
            
        })

    })
})

app.put('/ruta', (req, res) => {
    const  body=req.body
    Update(body).then((resp)=>{
        res.json({ok:true,data:resp}).status(200)
    }).catch(err=>{
        res.json({ok:false,err}).status(400)
    })
})


app.get('/ruta/:id',(req,res)=>{
    let id=req.params.id
    GetById(id).then((resp,err)=>{
        if(err)return res.json({ok:false,err}).status(400)
        res.json({ok:true,data:resp}).status(200)
    })
})


app.get('/ruta', (req, res) => {
    let limite = req.query.limit || 20
    let from = req.query.from || 0
    List(from,limite).then((resp,err)=>{
        if(err)return res.json({ok:false,err}).status(400)
        res.json({ok:true,data:resp})
    })
})





module.exports = app