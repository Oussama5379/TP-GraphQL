import { Injectable } from '@nestjs/common';
import { DatabaseService, UserRecord } from '../../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): UserRecord[] {
    return this.databaseService.users;
  }

  findOneById(id: string): UserRecord | undefined {
    return this.findAll().find((user) => user.id === id);
  }
}
