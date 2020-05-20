/* istanbul ignore file */
export class Box {
    id: number;
    name: string;
    numPokemon: number;

    /**
     * Static function for creating a Pokemon instance from the structure the
     * database gives us
     */
    static from(obj: BoxRow): Box {
        const box = new Box(
            obj.id, obj.box_name, parseInt(obj.num_users_pokemon_in_box, 10)

        );
        return box;
    }

    constructor(id: number, name: string, numPokemon: number) {
        this.id = id;
        this.name = name;
        this.numPokemon = numPokemon;
    }
}

export interface BoxRow {
    id: number;
    box_name: string;
    num_users_pokemon_in_box: string;
}