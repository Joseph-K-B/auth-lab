const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const UserService = require('../lib/services/userService.js');


describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

 

  it('posts new user to DB', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@email.com',
        password: 'fake-password'
      });
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@email.com'
    });
  });

  it('checks for existing users', async () => {
    await UserService.createUser({
      email: 'test@email.com',
      password: 'fake-password'
    });

    
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@email.com',
        password: 'fake-password'
      });
    
    expect(res.body).toEqual({
      message: 'User already exists',
      status: 500
    });
  });

  it('logs existing user in via post route', async () => {
    // jest.setTimeout(10000);
    await UserService.createUser({
      email: 'test@email.com',
      password: 'fake-password'
    });
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ 
        email: 'test@email.com',
        password:'fake-password' });
    console.log('AT LOGIN TEST', res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'test@email.com'
    });
  });

  afterAll(() => {
    pool.end();
  });
});
