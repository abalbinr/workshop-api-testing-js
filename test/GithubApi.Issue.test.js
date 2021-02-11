const agent = require('superagent');
const { expect } = require('chai');

const urlBase = 'https://api.github.com/user';
let usuario;

describe('Consumiendo métodos POST y PATCH', () => {
  it('Verificar si este usuario tiene repositorios publicos', async () => {
    const response = await agent.get(`${urlBase}`) // https://docs.github.com/rest/reference/users#check-if-a-person-is-followed-by-the-authenticated-user
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    const repoPublico = response.body.public_repos > 0;
    expect(repoPublico).to.equal(true); // https://www.chaijs.com/api/bdd/
    usuario = response.body;
  });

  it('Verificar que un repo exista en la lista de todos los repositorios de este usuario', async () => {
    const response = await agent.get(`${usuario.repos_url}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    const repoID = response.body[0].id;

    const repositorio = response.body.find((repos) => repos.name === 'Kaggle');
    expect(repositorio.id).to.equal(repoID);
  });

  it('Crear un nuevo issue en un repositorio', async () => {
    const issueNuevo = { title: 'SuperIssue', description: 'Un gran problema fue creado' };
    const response = await agent.post('https://api.github.com/repos/abalbinr/Kaggle/issues', issueNuevo)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.body.title).to.equal('SuperIssue');
    expect(response.body.body).to.equal(null);
  });

  it('Modificar el issue en un repositorio', async () => {
    const issueModificado = { body: 'modificacion' };
    const response = await agent.patch('https://api.github.com/repos/abalbinr/Kaggle/issues/8', issueModificado)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.body.title).to.equal('SuperIssue');
    expect(response.body.body).to.equal('modificacion');
  });
});
