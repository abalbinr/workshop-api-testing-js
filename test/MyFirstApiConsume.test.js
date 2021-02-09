// Para ejecutar las pruebas se usa npm test

const agent = require('superagent'); // Documentación https://visionmedia.github.io/superagent/
const statusCode = require('http-status-codes');
const chai = require('chai');

const expect = chai.expect;

describe('First Api Tests', () => {
});

// prueba consumiendo un servicio GET
it('Consume GET Service', async () => {
    const response = await agent.get('https://httpbin.org/ip');
  
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
});

// prueba consumiendo un servicio GET con Query Parameters
it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };
  
    const response = await agent.get('https://httpbin.org/get').query(query);
  
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.args).to.eql(query);
});

//