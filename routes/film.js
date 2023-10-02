const express = require("express");
const router = express.Router();
const pool = require("../queries.js")

router.get("/film", (req, res) => {

    try {
        pool.query('SELECT * FROM film', (err, results) => {
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

// Rute untuk menampilkan data list film berdasarkan kategori
router.get('/film/category/:categoryName', async (req, res) => {
    const categoryName = req.params.categoryName;

    try {
        // Lakukan query untuk mengambil data film berdasarkan kategori
        const query = `
            SELECT c.name AS Category_Name, f.*
            FROM film f
            JOIN film_category fc ON f.film_id = fc.film_id
            JOIN category c ON fc.category_id = c.category_id
            WHERE c.name = $1;
        `;
        
        const { rows } = await pool.query(query, [categoryName]);
        
        if (rows.length === 0) {
            res.status(404).json({ message: 'Tidak ada film dalam kategori ini.' });
        } else {
            res.json(rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.' });
    }
});

router.get("/film/id/:id", async (req, res) => {
    const id = req.params.id;

    try {
        pool.query('SELECT * FROM film WHERE film_id = $1', [id], (err, result) => {
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data.' });
    }    
})

module.exports = router