const express = require('express')
const bodyParser = require('body-parser')

const server = express()
const geeks = []

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

function checkGeekExists (req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' })
  }
  return next()
}

function checkGeekInArray (req, res, next) {
  const geek = geeks[req.params.index]

  if (!geek) {
    return res.status(400).json({ error: 'User não exist' })
  }
  req.geek = geek
  req.index = req.params.index
  req.update = req.body

  return next()
}

server.get('/users', (req, res) => {
  return res.json(geeks)
})

server.get('/users/:index', checkGeekInArray, (req, res) => {
  return res.json(req.geek)
})

server.post('/users', checkGeekExists, (req, res) => {
  const geek = req.body
  geeks.push(geek)
  return res.json(geeks)
})

server.put('/users/:index', (req, res) => {
  geeks[req.params.index] = req.body
  return res.json(geeks)
})

server.delete('/users/:index', checkGeekInArray, (req, res) => {
  geeks.splice(req.index, 1)
  return res.send({ success: `Registro ${req.index} Removido!` })
})

server.listen(3000)
