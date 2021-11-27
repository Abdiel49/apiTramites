const cors = require('cors');
const express = require('express');
const data = require('./assets/data');

const app = express();
const port = 3000;
const URL= 'http://localhost';

app.use(cors({
  origin: '*'
}));

app.get('/api/tramites/umss', (req, res) => {
  if(data.length > 0){
    res.status(200).send(data);
  }else{
    res.status(404).send({data: null, message:"data is empty"});
  }
});

app.get('/api/tramites/umss/:id', (req, res) => {
  const idReq = req.params.id;
  if(idReq< data.length){
    res.status(200).send({data: data[idReq]});
  }else{
    res.status(404).send({data: null, id: idReq, message:"not find data id"});
  }
});

app.listen(port, () => {
  console.log(`Example app listening at ${URL}:${port}`);
});

module.exports = app;