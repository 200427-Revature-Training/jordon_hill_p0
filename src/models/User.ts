export class User {
    id: number;
    name: string;

    /**
     * Static function for creating a Pokemon instance from the structure the
     * database gives us
     */
    static from(obj: UserRow): User {
        const user = new User(
            obj.id, obj.name
        );
        return user;
    }

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    /* Alternatively use this without property declaration */
    // constructor(private id: number, private name: string,
    //             private species: string, private boxID: Date) {
    // }
}

export interface UserRow {
    id: number;
    name: string;
}