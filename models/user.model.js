const prisma = require('../config/prisma');

const USER_MODEL = {
		getUser: async () => {
			try {
				const users = await prisma.user.findMany({
					include: {
						accounts: true,
						profile: true,
					},
				});
				return users;
			} catch (error) {
				throw new Error('Failed to retrieve users');
			}
		},
	
		getUserById: async (id) => {
			try {
				const user = await prisma.user.findUnique({
					where: { id: id },
					include: {
						accounts: true,
						profile: true,
					},
				});
				return user;
			} catch (error) {
				throw new Error('Failed to retrieve user');
			}
		},
	
		createUser: async (name, email, password) => {
			try {
				const user = await prisma.user.create({
					data: {
						name,
						email,
						password,
					}
				});
				return user;
			} catch (error) {
				throw new Error('Failed to create user');
			}
		}
	};

module.exports = USER_MODEL;