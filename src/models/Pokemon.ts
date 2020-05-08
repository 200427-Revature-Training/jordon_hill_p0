export class Pokemon {
    id: number;
    name: string;
    species: string;
    boxID: number;
    userID: number;

    /**
     * Static function for creating a Pokemon instance from the structure the
     * database gives us
     */
    static from(obj: PokemonRow): Pokemon {
        const pokemon = new Pokemon(
            obj.id, obj.name, obj.species, obj.boxID, obj.userID
        );
        return pokemon;
    }

    constructor(id: number, name: string, species: string, boxID: number, userID: number) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.boxID = boxID;
        this.userID = userID;
    }

    /* Alternatively use this without property declaration */
    // constructor(private id: number, private name: string,
    //             private species: string, private boxID: Date) {
    // }
}

export interface PokemonRow {
    id: number;
    name: string;
    species: string;
    boxID: number;
    userID: number;
}