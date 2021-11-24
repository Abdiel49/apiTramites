const express = require('express')
// import express from 'express'

const data = require('./assets/data')
const app = express();
const port = 3000;
const URL= 'http://localhost';

app.get('/api/tramites', (req, res) => {
  res.send(data)
})

app.get('/api/tramites/:id', (req, res) => {
  const idReq = req.params.id;
  if(idReq< data.length){
    res.status(200).send({data: data[idReq], id: idReq})
  }else{
    res.status(404).send({data: null, id: idReq, message:" not find data id"})
  }
})

app.post('/api/tramites', (req, res) => {
  console.log( req.params.body );
  res.send('this is a post mrthod!')
})

app.listen(port, () => {
  console.log(`Example app listening at ${URL}:${port}`)
})
