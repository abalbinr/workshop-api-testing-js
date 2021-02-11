const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://api.github.com/user/following';
let usuario;

describe('Consumiendo Métodos PUT', () => {
  it('Seguir al usuario aperdomob', async () => {
    const response = await agent.put(`${urlBase}/aperdomob`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.NO_CONTENT); // 204 No Content
  });

  it('verificar que se sigue a aperdomob', async () => {
    const response = await agent.get(`${urlBase}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    usuario = response.body.find((usuarios) => usuarios.login === 'aperdomob'); // Buscar de mis seguidores a aperdomob
    expect(usuario.login).equal('aperdomob');
  });

  it('Volver a seguir al usuario aperdomob', async () => {
    const response = await agent.put(`${urlBase}/aperdomob`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.NO_CONTENT); // 204 No Content
  });
});
