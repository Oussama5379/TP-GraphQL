/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class CreateCvInput {
  name: string;
  age: number;
  job: string;
  ownerId: string;
  skillIds: string[];
}

export class UpdateCvInput {
  id: string;
  name?: Nullable<string>;
  age?: Nullable<number>;
  job?: Nullable<string>;
  ownerId?: Nullable<string>;
  skillIds?: Nullable<string[]>;
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

export abstract class IMutation {
  abstract createCv(createCvInput: CreateCvInput): Cv | Promise<Cv>;

  abstract updateCv(updateCvInput: UpdateCvInput): Cv | Promise<Cv>;

  abstract removeCv(id: string): boolean | Promise<boolean>;
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
