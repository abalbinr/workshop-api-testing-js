const agent = require('superagent');
const { expect } = require('chai');

const urlBase = 'https://api.github.com/user';

describe('Consumiendo métodos POST y PATCH', () => {
  it('Verificar si este usuario tiene repositorios publicos', async () => {
    const response = await agent.get(`${urlBase}`) // https://docs.github.com/rest/reference/users#check-if-a-person-is-followed-by-the-authenticated-user
      .auth('token', 'dcef4d17bb0d1746f91a9d355da1936b06f56cc7')
      .set('User-Agent', 'agent');

    const repoPublico = response.body.public_repos > 0;
    expect(repoPublico).to.equal(true); // https://www.chaijs.com/api/bdd/
  });
});
