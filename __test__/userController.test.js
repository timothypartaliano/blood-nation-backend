const UserController = require('../controllers/userController');
const { User } = require('../models');

jest.mock('../models', () => ({
  User: {
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  }
}));

jest.mock('../helpers/bcrypt', () => ({
  comparePassword: jest.fn(),
}));

jest.mock('../helpers/jwt', () => ({
  generateToken: jest.fn(),
}));

describe('UserController', () => {
  describe('GetUserByID', () => {
    it('should return 404 if user is not found', async () => {
      const req = { params: { id: 'non-existing-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findByPk.mockResolvedValue(null);

      await UserController.GetUserByID(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return user if found', async () => {
      const req = { params: { id: 'existing-id' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const fakeUser = { id: 'existing-id', username: 'testuser', email: 'test@example.com', phone_number: '1234567890' };

      User.findByPk.mockResolvedValue(fakeUser);

      await UserController.GetUserByID(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeUser);
    });
  });

  describe('Register', () => {
    it('should register a new user', async () => {
      const req = { body: { username: 'testuser', email: 'test@example.com', password: 'password', phoneNumber: '1234567890' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const fakeUser = { id: 'newly-generated-id', ...req.body };

      User.create.mockResolvedValue(fakeUser);

      await UserController.Register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: fakeUser.id,
        username: fakeUser.username,
        email: fakeUser.email,
        phone_number: fakeUser.phone_number
      });
    });
  });

  describe('Login', () => {
    it('should return 404 if user is not found', async () => {
      const req = { body: { email: 'nonexisting@example.com', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      User.findOne.mockResolvedValue(null);

      await UserController.Login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: `User with email ${req.body.email} not found` });
    });

    it('should return 401 if password is incorrect', async () => {
      const req = { body: { email: 'test@example.com', password: 'wrongpassword' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const fakeUser = { id: 'existing-id', email: req.body.email, password: 'correcthashedpassword' };
      User.findOne.mockResolvedValue(fakeUser);
      require('../helpers/bcrypt').comparePassword.mockReturnValue(false);

      await UserController.Login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: `User's password with email ${req.body.email} does not match` });
    });

    it('should return token and user details if login is successful', async () => {
      const req = { body: { email: 'test@example.com', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const fakeUser = { id: 'existing-id', email: req.body.email, password: 'correcthashedpassword' };
      User.findOne.mockResolvedValue(fakeUser);
      require('../helpers/bcrypt').comparePassword.mockReturnValue(true);
      require('../helpers/jwt').generateToken.mockReturnValue('generated-token');

      await UserController.Login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: 'generated-token', user_id: fakeUser.id, username: fakeUser.username });
    });
  });
});
