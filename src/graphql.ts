
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export class Cv {
    id: string;
    name: string;
    age: number;
    job: string;
    user?: Nullable<User>;
    skills?: Nullable<Skill[]>;
}

export abstract class IQuery {
    abstract cvs(): Cv[] | Promise<Cv[]>;

    abstract cv(id: string): Nullable<Cv> | Promise<Nullable<Cv>>;
}

export class Skill {
    id: string;
    designation: string;
}

export class User {
    id: string;
    name: string;
    email: string;
    role: Role;
}

type Nullable<T> = T | null;
