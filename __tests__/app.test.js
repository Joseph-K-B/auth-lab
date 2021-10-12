const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const UserService = require('../lib/services/UserService.js');
// const { agent } = require('superagent');


describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

 

  it('posts new user to DB', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@email.com',
        password: 'fake-password',
        role: 'QUEEN'
      });
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@email.com',
      role: 'QUEEN'
    });
  });



  it('checks for existing users', async () => {
    await UserService.createUser({
      email: 'test@email.com',
      password: 'fake-password',
      roleTitle: 'QUEEN'
    });
 
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@email.com',
        password: 'fake-password',
        roleTitle: 'QUEEN'
      });
    
    expect(res.body).toEqual({
      message: 'User already exists',
      status: 400
    });
  });

  it('logs existing user in via post route', async () => {
    // jest.setTimeout(10000);
    await UserService.createUser({
      email: 'test@email.com',
      password: 'fake-password',
      roleTitle: 'QUEEN'
    });
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email: 'test@email.com',
        password:'fake-password',
        roleTitle: 'QUEEN'
      });
    console.log('AT LOGIN TEST', res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@email.com',
      role: 'QUEEN'
    });
  });

  it('ensures login credentials exist in DB', async () => {
    await UserService.createUser({
      email: 'test@email.com',
      password: 'fake-password',
      roleTitle: 'PAWN'
    });

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test@email.com',
        password:'password',
        roleTitle: 'PAWN' 
      });
    console.log('AT 401 TEST', res.body);
    expect(res.body).toEqual({
      message: 'Invalid email/password',
      status: 401 }
    );
  });

  it('gets user currently logged in using cookie at /me', async () => {
    await UserService.createUser({
      email: 'test@email.com',
      password: 'fake-password',
      roleTitle: 'PAWN'
    });

    const agent = await request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@email.com',
        password:'fake-password',
        roleTitle: 'PAWN'
      });

    const res = await agent
      .get('/api/v1/auth/me');

    expect(res.body).toEqual({
      id: expect.any(String),
      exp: expect.any(Number),
      iat: expect.any(Number),
      email: 'test@email.com',
      role: 'PAWN'
    });
  });

  it('allows queen to update users roles if authorized after authentication', async () => {
    await UserService.createUser({
      email: 'test@email.com',
      password: 'fake-password',
      roleTitle: 'PAWN'
    });

    const agent = await request.agent(app);
    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@email.com',
        password:'fake-password',
        roleTitle: 'PAWN' })
      .patch('/api/v1/auth/1')
      .send({
        email: 'test@email.com',
        password: 'fake-password',
        roleTitle: 'ROOK'
      })
      .then((res) => {
        expect(res.body).toEqual(
          {
            id: '2',
            email: 'test@email.com',
            password: 'fake-password',
            roleTitle: 'ROOK'
          }
        );
      });
  });

  afterAll(() => {
    pool.end();
  });
});
