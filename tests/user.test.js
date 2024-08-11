jest.mock('../config/prisma', () => {
    return {
        user: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    };
});

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { getUser, getUserById, createUser } = require('../controllers/user.controller');
const mockRequest = require('../consts/mock-request.const');
const mockResponse = require('../consts/mock-response.const');

describe('getUser function', () => {
    test('should return 200 with the list of users', async () => {
        const mockUsers = [
            { id: 1, name: 'test test', email: 'test@example.com', profile: { identity_type: 'ID', identity_number: '1234' }, bank_account: [] },
        ];
        prisma.user.findMany.mockResolvedValue(mockUsers);

        const req = mockRequest();
        const res = mockResponse();

        await getUser(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: 'success',
            message: 'Users retrieved successfully',
            data: mockUsers
        });
    });

    test('should return 500 if there is an error', async () => {
        prisma.user.findMany.mockRejectedValue(new Error('Database error'));

        const req = mockRequest();
        const res = mockResponse();

        await getUser(req, res);

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({
            status: 'error',
            message: 'Failed to retrieve users'
        });
    });
});

describe('getUserById function', () => {
    test('should return 200 with the user data if found', async () => {
        const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', profile: { identity_type: 'ID', identity_number: '1234' }, bank_account: [] };
        prisma.user.findUnique.mockResolvedValue(mockUser);

        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        await getUserById(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
            status: 'success',
            message: 'User retrieved successfully',
            data: mockUser
        });
    });

    test('should return 404 if user not found', async () => {
        prisma.user.findUnique.mockResolvedValue(null);

        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        await getUserById(req, res);

        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledWith({
            status: 'error',
            message: 'User not found'
        });
    });

    test('should return 500 if there is an error', async () => {
        prisma.user.findUnique.mockRejectedValue(new Error('Database error'));

        const req = mockRequest({}, { id: 1 });
        const res = mockResponse();

        await getUserById(req, res);

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({
            status: 'error',
            message: 'Failed to retrieve user'
        });
    });
});

describe('createUser function', () => {
    test('should return 201 and create a new user', async () => {
        const mockUser = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            profile: { identity_type: 'ID', identity_number: '1234' }
        };
        bcrypt.hash.mockResolvedValue('hashedpassword');
        prisma.user.create.mockResolvedValue(mockUser);

        const req = mockRequest({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'plaintextpassword',
            identity_type: 'ID',
            identity_number: '1234'
        });
        const res = mockResponse();

        await createUser(req, res);

        expect(res.status).toBeCalledWith(201);
        expect(res.json).toBeCalledWith({
            status: 'success',
            message: 'User created successfully',
            data: mockUser
        });
    });

    test('should return 500 if there is an error', async () => {
        bcrypt.hash.mockResolvedValue('hashedpassword');
        prisma.user.create.mockRejectedValue(new Error('Database error'));

        const req = mockRequest({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'plaintextpassword',
            identity_type: 'ID',
            identity_number: '1234'
        });
        const res = mockResponse();

        await createUser(req, res);

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({
            status: 'error',
            message: 'Failed to create user'
        });
    });
});
