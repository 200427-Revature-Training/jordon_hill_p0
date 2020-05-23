/* istanbul ignore file */
export class Box {
    id: number;
    name: string

    /**
     * Static function for creating a Pokemon instance from the structure the
     * database gives us
     */
    static from(obj: BoxRow): Box {
        const box = new Box(
            obj.id, obj.name
        );
        return box;
    }

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export interface BoxRow {
    id: number;
    name: string;
}