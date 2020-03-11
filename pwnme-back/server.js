const express = require('express');
const sqlite3 = require('sqlite3');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors')
const xss = require("xss");

const app = express();

app.use('/static', express.static('public'))
app.use(bodyParser.json());
app.use(cors())
app.use(fileUpload({
    tempFileDir: '/public/'
}));

const port = 3000;

let db = new sqlite3.Database('files.sqlite');

// Create the collection of api keys
//routes
app.get('/files', function (req, res) {
    console.log('get')
    const sql = "SELECT * FROM Files";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.json(rows);
    });
});

app.post('/files', function (req, res) {
    console.log('post');
    console.log(req.body);
    var id = uuidv4();
    var text = xss(req.body.Text);
    var filename = xss(req.body.Filename);
    var pseudo = xss(req.body.Pseudo);
    var adddate = new Date().getTime();
    db.run(
        "INSERT INTO Files (ID, Pseudo, Filename, Text, AddDate) VALUES (?,?,?,?,?)",
        [id, text, filename, pseudo, adddate]
    );
    res.json(id);
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