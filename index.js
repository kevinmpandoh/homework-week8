const express = require("express");
const app = express();
const pool = require("./queries.js")
const film = require('./routes/film.js');
const categories = require('./routes/category.js')

app.use('/', film);
app.use('/', categories)



pool.connect((err, res) => {
    if (err) console.log(err);
    console.log("Berhasil Konek Database")
})

// Mulai server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
