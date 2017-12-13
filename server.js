// if the builan is true then write
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

// MongoClient.connect('mongodb://demo:demo@ds125146.mlab.com:25146/savage', (err, database) => {
MongoClient.connect('mongodb://mariacristina:rasberry205@ds117849.mlab.com:17849/studentlist', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('studentlist').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {studentlist: result})
  })
})

app.post('/studentlist', (req, res) => {
  db.collection('studentlist').save({name: req.body.name, msg: req.body.msg, checked: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/studentlist', (req, res) => {
  db.collection('studentlist')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg,}, {
    $set: {
      thumbUp:req.body.thumbUp + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/studentlist2', (req, res) => {
  db.collection('studentlist')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      thumbUp:req.body.thumbUp - 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/studentlist', (req, res) => {
  db.collection('studentlist').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
