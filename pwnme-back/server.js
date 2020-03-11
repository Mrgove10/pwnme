const express = require('express');
const sqlite3 = require('sqlite3');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const sanitizer = require('sanitize')();
const cors = require('cors')

const app = express();
const port = 3000;

let db = new sqlite3.Database('files.sqlite');

app.use('/static', express.static('public'))
app.use(bodyParser.json());
app.use(cors())
app.use(fileUpload({
    tempFileDir: '/public/'
}));

// Create the collection of api keys
const apiKeys = new Map();
apiKeys.set('123456789', {
  id: 1,
  name: 'app1',
  secret: 'secret1'
});

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
    console.log('post')
    console.log(req.files);
    try {
        var id = uuidv4();
        var text = sanitizer.value(req.body.Text, 'string');
        var filename = sanitizer.value(req.body.Filename, 'string');
        var pseudo = sanitizer.value(req.body.Pseudo, 'string');
        var adddate = new Date().getTime();
        db.run(
            "INSERT INTO Files (ID, Pseudo, Filename, Text, AddDate) VALUES (?,?,?,?,?)",
            [id, text, filename, pseudo, adddate]
        );
        res.json(id);
    }
    catch (e) {
        res.json(e);
    }
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