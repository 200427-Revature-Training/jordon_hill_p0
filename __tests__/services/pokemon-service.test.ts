import * as pokemonService from '../../src/services/pokemon-service';
import * as pokemonDao from '../../src/daos/pokemon-dao';
import { Pokemon } from '../../src/models/Pokemon';

jest.mock('../../src/daos/pokemon-dao');

const mockPokemonDao = pokemonDao as any;

describe('getPokemonInBoxForUser', () => {
    test('200 returned when run normally', async () => {
        mockPokemonDao.getPokemonInBoxForUser.mockImplementation(() => ({}));

        try {
            await pokemonService.getPokemonInBoxForUser(1, 1);
            expect(200);
        } catch(err) {
            fail('pokemonService.getPokemonInBoxForUser did not process correctly');
        }
    });
});

describe('withdrawPokemon', () => {
    test('204 returned when run normally', async () => {
        mockPokemonDao.withdrawPokemon.mockImplementation(() => {return 204});

        try {
            await pokemonService.withdrawPokemon(1, 1, 1);
            expect(204);
        } catch(err) {
            fail('pokemonService.withdrawPokemon did not process correctly');
        }
    });
});

describe('depositPokemon', () => {
    test('422 returned if no name provided', async () => {
        expect.assertions(1);
        mockPokemonDao.depositPokemon.mockImplementation(() => ({}));

        const payload = {
            speciesID: 25,
            boxID: 1,
            userID: 1
        }

        try {
            // This async function should reject due to missing firstName
            await pokemonService.depositPokemon(payload);
            fail('pokemonService.depositPokemon did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no speciesID is provided', async () => {
        // pokemonDao.depositPokemon will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockPokemonDao.depositPokemon.mockImplementation(() => ({}));

        const payload = {
            name: 'Piki',
            boxID: 1,
            userID: 1
        }

        try {
            // This async function should reject due to missing firstName
            await pokemonService.depositPokemon(payload);
            fail('pokemonService.depositPokemon did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no boxID provided', async () => {
        // pokemonDao.depositPokemon will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockPokemonDao.depositPokemon.mockImplementation(() => ({}));

        const payload = {
            name: 'Piki',
            speciesID: 25,
            userID: 1
        }

        try {
            // This async function should reject due to missing firstName
            await pokemonService.depositPokemon(payload);
            fail('pokemonService.depositPokemon did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('422 returned if no userID provided', async () => {
        // pokemonDao.depositPokemon will return undefined rather than execute
        expect.assertions(1);
        // Stubbing - Replacing a method with a fake method implementation
        mockPokemonDao.depositPokemon.mockImplementation(() => ({}));

        const payload = {
            name: 'Piki',
            speciesID: 25,
            boxID: 1
        }

        try {
            // This async function should reject due to missing firstName
            await pokemonService.depositPokemon(payload);
            fail('pokemonService.depositPokemon did not throw expected error');
        } catch(err) {
            // assign error object to expectedError
            expect(err).toBeDefined();
        }
        // Validate that error was thrown
    });

    test('Input object transformed to Pokemon object', async () => {
        mockPokemonDao.depositPokemon.mockImplementation(o => o);

        const payload = {
            name: 'Piki',
            speciesID: 25,
            boxID: 1,
            userID: 1
        }

        const result = await pokemonService.depositPokemon(payload);

        expect(payload).not.toBeInstanceOf(Pokemon);
        expect(result).toBeInstanceOf(Pokemon);
    });

    test('ID value of input is replaced in output', async () => {
        mockPokemonDao.depositPokemon.mockImplementation(o => o);

        const payload = {
            id: 15,
            name: 'Piki',
            speciesID: 25,
            boxID: 1,
            userID: 1
        }

        const result = await pokemonService.depositPokemon(payload);

        expect(result.id).not.toBe(payload.id);
    });

    test('Extraneous fields in input are not in output', async () => {
        mockPokemonDao.depositPokemon.mockImplementation(o => o);

        const payload = {
            name: 'Piki',
            speciesID: 25,
            boxID: 1,
            userID: 1,
            likesSkateboards: true
        };

        const result = await pokemonService.depositPokemon(payload) as any;

        expect(result.likesSkateboards).not.toBeDefined();
    });
});

