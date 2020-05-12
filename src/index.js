const express = require('express')
const app = express()
const port = 2020

// import route
const productRoute = require('./routes/productRoute')
const storeRoute = require('./routes/storeRoute')
// const uiRoute = require('./routes/uiRoute')

app.use(express.json())
app.use(productRoute)
app.use(storeRoute)
// app.use(uiRoute)

app.get('/', (req, res)=>{
    res.send({message : "Akses berhasil"})
})

// menghidupkan API
app.listen(port, ()=>console.log('API is running'))

