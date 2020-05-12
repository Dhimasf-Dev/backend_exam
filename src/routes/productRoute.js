const router = require('express').Router()
const conn = require('../config/db/index')
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')

// UPLOAD GAMBAR
const upload = multer({
    limits: {
        fileSize: 10000000 // Byte , default 1MB
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){ // will be error if the extension name is not one of these
            return cb(new Error('Please upload image file (jpg, jpeg, or png)')) 
        }
 
        cb(undefined, true)
    }
 })

//  ALAMAT GAMBAR
 const filesDirectory = path.join(__dirname, '../files')

// MENAMBAHKAN PRODUCT
router.post ('/product', async(req, res)=>{
    const sql = `INSERT INTO product set ?`
    const data = req.body

    conn.query (sql, data, (err, result)=>{
        if(err) return res.status(500).send(err)

        res.status(200).send(result)
    })

})

// UPLOAD GAMBAR
router.post('/product/image', upload.single('image'), async (req, res) => {

    try {
       const fileName = `${req.body.username}-product.png`
       const sql = `UPDATE users SET avatar = ? WHERE username = ?`
       const data = [fileName, req.body.username]
 
       await sharp(req.file.buffer).resize(300).png().toFile(`${filesDirectory}/${fileName}`)
 
       conn.query(sql, data, (err, result) => {

          if(err) return res.status(500).send(err)
 
          res.status(201).send({ message: 'Berhasil di upload' })
       })
 
       
    } catch (err) {res.status(500).send(err.message)}
 
 }, (err, req, res, next) => {  
    res.send(err)
 })

module.exports = router

