const router = require('express').Router()
const conn = require('../config/db/index')

// GET PRODUCT
router.get('/inventory', (req, res) => {

    const sql = `SELECT i.inventory_id, p.name, s.branch_name, i.inventory FROM inventory i JOIN products p 
    ON i.product_id = p.product_id JOIN stores s 
    ON i.store_id = s.store_id;`
 

    conn.query(sql, (err, result) => {
       if(err) return res.send(err)
  
       res.send({result})
    })
})

// EDIT PRODUCT
router.patch('/product/:product_id', (req, res) => {
   
    const sql = `UPDATE products SET ? WHERE product_id = ?`
    const data = [req.body, req.params.product_id]
    
    conn.query(sql, data, (err, result) => {
       if(err) return res.send(err)
  
       res.send(result)
    })
})

//  DELETE PRODUCT
router.delete('/inventory/:inventory_id', (req, res) => {
    const sql = `DELETE FROM stores WHERE store_id = ?`
    const data = req.params.store_id

    conn.query(sql, data, (err, result)=>{
        if(err) return res.send(err.sqlMessage)

        res.send({
            message: 'terhapus'
        })
    })
})

// TAMBAH PRODUCT
router.post ('/product', (req, res)=>{
    const sql = `INSERT INTO product set ?`
    const data = req.body

    conn.query (sql, data, (err, result)=>{
        if(err) return res.status(500).send(err)

        res.status(200).send(result)
    })
})

module.exports = router