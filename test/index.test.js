const assert = require('assert');
const chai = require('chai');
const chaiHTTP = require('chai-http')
const server = require('../index');
const data = require('../assets/data');

chai.should();
chai.use(chaiHTTP);

describe('Pruebas de Enpoints en la API de tramites', () => {
  
  it('Pruebas en "/api/tramites/umss" return done - 200', ( done )=>{
    chai.request(server)
    .get('/api/tramites/umss')
    .end(( err, response)=>{
      response.should.have.status(200);
      response.body.should.be.a('array');
      response.body.length.should.not.be.eq(0);
      response.body.length.should.be.eq(data.length);
      done();
    })
  });

  it('Pruebas en "/api/tramites" return 404', ( done )=>{
    chai.request(server)
    .get('/api/tramites')
    .end(( err, response)=>{
      response.should.have.status(404);
      done();
    })
  });

  it('Pruebas en "/api/tramites/umss/:id" return 200', ( done )=>{
    const id = 0;
    chai.request(server)
    .get(`/api/tramites/umss/${ id }`)
    .end(( err, response)=>{
      response.should.have.status(200);
      response.body.data.requisitos.should.be.a('array');
      response.body.data.requisitos.length.should.be.eq( data[id].requisitos.length );
      response.body.data.requisitos.length.should.not.be.eq( 0 );
      response.body.data.id.should.be.eq( id );
      done();
    })
  });

  it('Pruebas en "/api/tramites/umss/sad" error id - 404', ( done )=>{
    const id = 'sad';
    chai.request(server)
    .get(`/api/tramites/umss/${ id }`)
    .end(( err, response)=>{
      response.should.have.status(404);
      response.body.message.should.be.eq('not find data id');
      response.body.id.should.be.eq( id );
      response.body.should.be.a('object');
      done();
    })
  });

});
