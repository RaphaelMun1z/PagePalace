const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// Rotas
app.get('/books', (req, res) => {
    const sql = "SELECT * FROM books"
    conn.query(sql, function (err, data) {
        if (err) {
            console.log(err)
            return
        }

        const books = data
        res.render('books', { books })
    })
})

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, pageqty) VALUES (?)`
    const values = [title, pageqty];

    conn.query(sql, [values], function (err) {
        if (err) {
            console.log(err)
            return
        }
        res.redirect('/books')
    })
})

// Conexão BD
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'nodemysql',
})

conn.connect(function (err) {
    if (err) {
        console.log(err)
    }

    console.log('Conectou ao MySQL!')

    app.listen(3000)
})