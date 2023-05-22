const express = require('express')


const Vendor = require('../models/vendor')
const io = require('../server')
const app = express()



app.get('/vendor', (req, res) => {
    const limit=req.query.limite || 20 
    const from =req.query.from || 0
    Vendor.List(from,limit).then((resp)=>{
        res.json({ok:true,data:resp}).status(200)
    })

})

app.post('/vendor', (req, res) => {
    const body = req.body
    Vendor.Create(body).then((resp) => {
        Vendor.VendorId().then((data) => {
            res.json({ ok: true, data: data }).status(200)
            io.emit('vendor',{data:''})
        })
    }).catch(err => {
        res.json({ ok: false, err }).status(400)
    })
})

app.post('/vendorandroute', (req, res) => {
    const body = req.body
    Vendor.CreateVendorAndRoute(body).then((resp, err) => {

      //  res.json({ ok: true, data: '' }).status(200)

    }).then((err) => {
        res.json({ ok: false, err }).status(400)
    })
})







module.exports = app;