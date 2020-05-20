import * as userService from '../../src/services/user-service';
import * as userDao from '../../src/daos/user-dao';
import { User } from '../../src/models/User';

jest.mock('../../src/daos/user-dao');

const mockUserDao = userDao as any;

describe('saveUser', () => {
    test('422 returned if no name provided', async () => {
        // userDao.saveUser will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockUserDao.saveUser.mockImplementation(() => ({}));

        const payload = {};

        try {
            // This async function should reject due to missing firstName
            await userService.saveUser(payload);
            fail('userService.saveUser did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no name provided', async () => {
        // userDao.saveUser will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockUserDao.saveUser.mockImplementation(() => ({}));

        const payload = {};

        try {
            // This async function should reject due to missing firstName
            await userService.saveUser(payload);
            fail('userService.saveUser did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('Input object transformed to User object', async () => {
        mockUserDao.saveUser.mockImplementation(o => o);

        const payload = {
            name: 'Hallstead'
        };

        const result = await userService.saveUser(payload);

        expect(payload).not.toBeInstanceOf(User);
        expect(result).toBeInstanceOf(User);
    });

    test('ID value of input is replaced in output', async () => {
        mockUserDao.saveUser.mockImplementation(o => o);

        const payload = {
            id: 15,
            name: 'Hallstead'
        };

        const result = await userService.saveUser(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockUserDao.saveUser.mockImplementation(o => o);

        const payload = {
            name: 'Hallstead',
            likesSkateboards: true
        };

        const result = await userService.saveUser(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});