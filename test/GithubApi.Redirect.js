const agent = require('superagent');
const { expect } = require('chai');

const urlBase = 'https://github.com/aperdomob/redirect-test';

describe('Consumiendo metodos HEAD y redireccionando peticiones', () => {
  it('Comprobar el estado 301 y su redirección', async () => {
    let response;
    try {
      response = await agent.head(`${urlBase}`)
        .auth('token', 'dcef4d17bb0d1746f91a9d355da1936b06f56cc7')
        .set('User-Agent', 'agent');
    } catch (respuesta) {
      response = respuesta;
    }

    expect(response.status).to.equal(301);
    expect(response.response.header.location).to.equal('https://github.com/aperdomob/new-redirect-test');
  });
});
