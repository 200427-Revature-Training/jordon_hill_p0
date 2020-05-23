export class Species {
    id: number;
    name: string;

    /**
     * Static function for creating a Species instance from the structure the
     * database gives us
     */
    static from(obj: SpeciesRow): Species {
        const species = new Species(
            obj.id, obj.name
        );
        return species;
    }

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export interface SpeciesRow {
    id: number;
    name: string;
}