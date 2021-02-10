const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://api.github.com';

describe('Consumiendo Métodos GET', () => {
  it('Verificando datos de aperdomob', async () => {
    const response = await agent.get(`${urlBase}/users/aperdomob`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.name).equal('Alejandro Perdomo');
    expect(response.body.company).equal('PSL');
    expect(response.body.location).equal('Colombia');
  });
});
