import { Injectable } from '@nestjs/common';
import { DatabaseService, SkillRecord } from '../../database/database.service';

@Injectable()
export class SkillService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll(): SkillRecord[] {
    return this.databaseService.skills;
  }

  findOneById(id: string): SkillRecord | undefined {
    return this.findAll().find((skill) => skill.id === id);
  }

  findByIds(ids: string[]): SkillRecord[] {
    const skillIds = new Set(ids);
    return this.findAll().filter((skill) => skillIds.has(skill.id));
  }
}
