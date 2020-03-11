const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()
const port = 3000

let db = new sqlite3.Database('files.sqlite');

app.use('/static', express.static('public'))

app.get('/files', function (req, res) {
    const sql = "SELECT * FROM Files";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.json(rows);
    });
});

app.post('/files', function (req, res) {
    var id = uuidv4();
    var text = req.body.Text;
    var filename = req.body.Filename;
    var pseudo = req.body.Pseudo;
    db.run(
        "INSERT INTO Files VALUES (?,?)",
        [id, text, filename, pseudo]
    );
    console.log('Got body:', req.body);
});

app.get('/', function (req, res) {
    res.send("Good Try ;)");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}