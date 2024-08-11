jest.mock('../config/prisma', () => {
    return {
        user: {
            findUnique: jest.fn(),
        },
    };
});

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { login, register } = require('../controllers/auth.controller');
const mockRequest = require('../consts/mock-request.const');
const mockResponse = require('../consts/mock-response.const');

describe('login function', () => {
    test('should return 401 if email does not exist', async () => {
        prisma.user.findUnique.mockResolvedValue(null);

        const req = mockRequest({ email: 'test@example.com', password: 'password123' });
        const res = mockResponse();

        await login(req, res);

        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({ message: 'User is not registered' });
    });

    test('should return 401 if password does not match', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedpassword' };
        prisma.user.findUnique.mockResolvedValue(mockUser);
        bcrypt.compareSync.mockReturnValue(false);

        const req = mockRequest({ email: 'test@example.com', password: 'wrongpassword' });
        const res = mockResponse();

        await login(req, res);

        expect(res.status).toBeCalledWith(401);
        expect(res.json).toBeCalledWith({ message: 'Incorrect email/password' });
    });

    test('should return 200 and a token if credentials are correct', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashedpassword' };
        prisma.user.findUnique.mockResolvedValue(mockUser);
        bcrypt.compareSync.mockReturnValue(true);
        jwt.sign.mockReturnValue('fake-jwt-token');

        const req = mockRequest({ email: 'test@example.com', password: 'password123' });
        const res = mockResponse();

        await login(req, res);

        expect(res.json).toBeCalledWith({ token: 'fake-jwt-token' });
    });
});

describe('register function', () => {
    test('should return 400 if any field is missing', async () => {
        const req = mockRequest({ name: 'test', email: 'test@example.com' });
        const res = mockResponse();

        await register(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({ message: 'All fields are required' });
    });

    test('should create a new user and return 201', async () => {
        const req = mockRequest({ name: 'test', email: 'test@example.com', password: 'password123' });
        const res = mockResponse();

        await register(req, res);

        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith({ message: 'User created' });
    });
});