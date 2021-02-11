const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://github.com/aperdomob/redirect-test';

describe('Consumiendo metodos HEAD y redireccionando peticiones', () => {
  it('Comprobar el estado 301 y su redirección', async () => {
    let response;
    try {
      response = await agent.head(`${urlBase}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
    } catch (respuesta) {
      response = respuesta;
    }

    expect(response.status).to.equal(301);
    expect(response.response.header.location).to.equal('https://github.com/aperdomob/new-redirect-test');
  });

  it('Verificar la redireccion con el metodo GET', async () => {
    const response = await agent.get(`${urlBase}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');
    expect(response.status).to.equal(statusCode.OK);
  });
});
