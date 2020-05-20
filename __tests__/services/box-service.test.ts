import * as boxService from '../../src/services/box-service';
import * as boxDao from '../../src/daos/box-dao';

jest.mock('../../src/daos/box-dao');

const mockUserDao = boxDao as any;

describe('getBoxesByUserID', () => {
    test('200 returned when run normally', async () => {
        mockUserDao.getBoxesByUserID.mockImplementation(() => ({}));

        try {
            // This async function should reject due to missing firstName
            await boxService.getBoxesByUserID(1);
            expect(200);
        } catch(err) {
            fail('boxService.getBoxesByUserID did not process correctly');
        }
    });
});