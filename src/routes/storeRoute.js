const router = require('express').Router()
const conn = require('../config/db/index')

router.post ('/store', (req, res)=>{
    const sql = `INSERT INTO stores set ?`
    const data = req.body

    conn.query (sql, data, (err, result)=>{
        if(err) return res.status(500).send(err)

        res.status(200).send(result)
    })
})

module.exports = router