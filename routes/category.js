const express = require("express");
const router = express.Router();
const pool = require("../queries.js")

router.get("/category", (req, res) => {
    
    try {
        pool.query('SELECT * FROM category', (err, results) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (results.rows.length === 0) {
                res.status(404).json({ message: 'Data tidak ditemukan' });
            } else {
                res.json(results.rows);
            }
        })
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.' });
    }
})

router.get("/category/:id", (req, res) => {
    const id = req.params.id;

    try {
        pool.query('SELECT * FROM category WHERE category_id = $1', [id], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.rows.length === 0) {
                res.status(404).json({ message: 'Data tidak ditemukan' });
            } else {
                res.json(result.rows[0]);
            }
        });    
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.' });
    }
})

module.exports = router