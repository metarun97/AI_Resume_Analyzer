import request from 'supertest';
import app from '../src/app.js';
import User from '../src/models/user.model.js';

const validPayload = () => ({
  username: 'testuser',
  email: 'test.user@example.com',
  password: 'Password123!',
  fullName: {
    firstName: 'Test',
    lastName: 'User',
  }
})

beforeEach(async () => {
  const payload = validPayload();
  await request(app).post('/api/auth/register').send(payload);
});


describe('POST /api/auth/login', () => {
  it('responds 200 and login your user with username', async () => {
    const payload = validPayload();
    const res = await request(app).post('/api/auth/login').send(payload);


    const user = await User.findOne({ username: payload.username }).lean().select("+password");

    expect(res.status).toBe(200);
    expect(user).toBeTruthy();
    expect(user.username).toBe(payload.username);
    expect(user.fullName.firstName).toBe(payload.fullName.firstName);
    expect(user.fullName.lastName).toBe(payload.fullName.lastName);
    expect(user.password).not.toBe(payload.password);
    expect(user.password.length).toBeGreaterThan(6);
  });
  it('responds 200 and login your user with email', async () => {
    const payload = validPayload();
    const res = await request(app).post('/api/auth/login').send(payload);


    const user = await User.findOne({ email: payload.email }).lean().select("+password");
    expect(res.status).toBe(200);
    expect(user).toBeTruthy();
    expect(user.email).toBe(payload.email);
    expect(user.fullName.firstName).toBe(payload.fullName.firstName);
    expect(user.fullName.lastName).toBe(payload.fullName.lastName);
    expect(user.password).not.toBe(payload.password);
    expect(user.password.length).toBeGreaterThan(6);
  });
});
