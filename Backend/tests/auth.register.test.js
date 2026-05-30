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
});

describe('POST /api/auth/register', () => {
  it('responds 201 and creates a new user', async () => {
    const payload = validPayload();
    const res = await request(app).post('/api/auth/register').send(payload);

    expect(res.status).toBe(201);

    const user = await User.findOne({ email: payload.email }).lean();
    expect(user).toBeTruthy();
    expect(user.email).toBe(payload.email);
    expect(user.username).toBe(payload.username);
    expect(user.fullName.firstName).toBe(payload.fullName.firstName);
    expect(user.fullName.lastName).toBe(payload.fullName.lastName);
    expect(user.password).not.toBe(payload.password);
    expect(user.password.length).toBeGreaterThan(6);
  });

  it('returns 4xx when required fields are missing and does not create a user', async () => {
    const payload = { email: 'no.user@example.com', password: 'Password123!' };
    const res = await request(app).post('/api/auth/register').send(payload);

    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);

    const user = await User.findOne({ email: payload.email }).lean();
    expect(user).toBeFalsy();
  });

  it('returns 4xx for invalid email format and does not create a user', async () => {
    const payload = { username: 'bademail', email: 'not-an-email', password: 'Password123!', fullName: { firstName: 'Bad', lastName: 'Email' } };
    const res = await request(app).post('/api/auth/register').send(payload);

    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);

    const user = await User.findOne({ username: payload.username }).lean();
    expect(user).toBeFalsy();
  });

  it('returns 4xx for too-short passwords and does not create a user', async () => {
    const payload = { username: 'shortpass', email: 'short.pass@example.com', password: '123', fullName: { firstName: 'Short', lastName: 'Pass' } };
    const res = await request(app).post('/api/auth/register').send(payload);

    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);

    const user = await User.findOne({ email: payload.email }).lean();
    expect(user).toBeFalsy();
  });

  it('returns 4xx when email already exists and does not create a duplicate', async () => {
    const payload = validPayload();
    await User.create({ username: payload.username, email: payload.email, password: 'hashedpassword', fullName: payload.fullName });

    const res = await request(app).post('/api/auth/register').send(payload);

    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);

    const users = await User.find({ email: payload.email }).lean();
    expect(users.length).toBe(1);
  });
});
