const express = require('express')
const io = require('../server')
const { CloseOrden,CreateTotalOrden, ShwoOrdenDetail, CreateOrdenDetails, UpdateOrdenDetail, CreateOrden, OrdenId, CheckProductInOrden, DeleteOrden, SelectOrdenNoClose } = require('../models/Orden')
const app = express()




app.get('/orden', (req, res) => {
    SelectOrdenNoClose().then((resp) => {
        res.json({ ok: true, data: resp }).status(200)
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})

app.put('/closeorden/:id', (req, res) => {
    let id=req.params.id
    CloseOrden(id).then((resp)=>{
        res.json({ok:true,data:resp}).status(200)
    }).catch((err)=>{
        res.json({ok:false,err}).status(400)
    })
})

app.post('/creteordentotal', (req, res) => {
    const body = req.body
    CreateTotalOrden(body).then((resp) => {
        res.json({ ok: true, data: resp }).status(200)
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})

app.post('/checkproductinorden', (req, res) => {
    const { ordenid, ProductId } = req.body

    CheckProductInOrden(ordenid, ProductId).then((data) => {
        res.json({ ok: true, data: data }).status(200)
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})

app.delete('/orden/:id', (req, res) => {
    let id = req.params.id
    DeleteOrden(id).then((resp) => {
        res.json({ ok: true, data: resp }).status(200)
        io.emit('orden', { data: '' })
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})

app.post('/createorden', (req, res) => {
    CreateOrden().then((data) => {
        OrdenId().then((resp) => {
            res.json({ ok: true, data: resp }).status(200)
        })
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})

app.get('/orden/:id', (req, res) => {
    let id = req.params.id
    ShwoOrdenDetail(id).then((resp) => {
        res.json({ ok: true, data: resp }).status(200)
    }).catch(err => {
        res.json({ ok: false, err }).status(400)
    })
})
app.post('/orden', (req, res) => {
    CreateOrdenDetails(req.body).then((resp) => {

        res.json({ ok: true, data: resp }).status(200)
        io.emit('orden', { data: '' })
    }).catch(err => {
        res.json({ ok: false, err }).status(400)
    })
})

app.put('/orden', (req, res) => {
    UpdateOrdenDetail(req.body).then((resp) => {

        res.json({ pk: true, data: resp }).status(200)
        io.emit('orden', { data: '' })
    }).catch((err) => {
        res.json({ ok: false, err }).status(400)
    })
})



module.exports = app