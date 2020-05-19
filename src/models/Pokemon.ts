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
            obj.id, obj.name, obj.species, obj.box_id, obj.user_id
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
}

export interface PokemonRow {
    id: number;
    name: string;
    species: string;
    box_id: number;
    user_id: number;
}