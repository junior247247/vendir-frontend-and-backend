const express = require('express');
const { Create } = require('../models/stock');
const { UpdateStock } = require('../models/products');
const app = express()



app.get('/stock/:id', (req, res) => {

})

app.post('/stock', (req, res) => {
    let { UserId, Stock, ProducId } = req.body;
    Create(UserId, ProducId, Stock).then((resp, err) => {
        if (err) return res.json({ ok: false, err })
        res.json({ ok: true, data: resp })
    })

})



app.put('/stock', (req, res) => {

    let { UserId, Stock, ProducId } = req.body

    UpdateStock(UserId, Stock, ProducId).then((resp,err)=>{
        if(err)return res.json({ok:false}).status(400)
        res.json({ok:true,data:resp}).status(200)
    })
})

module.exports = app;