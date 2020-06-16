export class User {
    id: number;
    name: string;
    password: string;

    /**
     * Static function for creating a User instance from the structure the
     * database gives us
     */
    static from(obj: UserRow): User {
        const user = new User(
            obj.id, obj.name, obj.password_hash
        );
        return user;
    }

    constructor(id: number, name: string, password: string) {
        this.id = id;
        this.name = name;
        this.password = password;
    }
}

export interface UserRow {
    id: number;
    name: string;
    password_hash: string;
}