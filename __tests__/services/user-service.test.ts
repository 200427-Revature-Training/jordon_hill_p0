import * as userService from '../../src/services/user-service';
import * as userDao from '../../src/daos/user-dao';
import { User } from '../../src/models/User';

jest.mock('../../src/daos/user-dao');

const mockUserDao = userDao as any;
/*
describe('getUserByName', () => {
    test('Normal behavior Json with status 200', async => {
        mockUserDao.getUserByName.mockImplementation(() => ({}));


    })
});
/*
describe('saveUser', () => {
    test('422 returned if no firstName provided', async () => {
        // userDao.saveUser will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockPeopleDao.saveUser.mockImplementation(() => {
            console.log('This is what mock dao actually calls');
        });

        const payload = {
            lastName: 'Smith',
            birthdate: '2020-01-01'
        }

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
    */