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

beforeAll(() => {
  process.env.JWT_SECRET = 'test_jwt_secret';
});

describe('GET /api/auth/me', () => {
  it('responds 200 and returns decoded user from token cookie', async () => {
    const payload = validPayload();
    const registerRes = await request(app).post('/api/auth/register').send(payload);

    const cookies = registerRes.headers['set-cookie'];
    expect(cookies).toBeDefined();

    const meRes = await request(app).get('/api/auth/me').set('Cookie', cookies);

    expect(meRes.status).toBe(200);
    expect(meRes.body.message).toBe('User fetched Successfully');
    expect(meRes.body.user).toBeTruthy();

    const user = await User.findOne({ email: payload.email }).lean();
    expect(String(user._id)).toBe(String(meRes.body.user.id));
  });

  it('responds 401 when no token cookie is present', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized:Token not found');
  });

  it('responds 401 when token is invalid', async () => {
    const res = await request(app).get('/api/auth/me').set('Cookie', ['token=invalidtoken']);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized:Invalid token');
  });
});
