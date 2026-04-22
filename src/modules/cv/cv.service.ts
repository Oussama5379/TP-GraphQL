import { Injectable } from '@nestjs/common';
import {
  CvRecord,
  DatabaseService,
  SkillRecord,
  UserRecord,
} from '../../database/database.service';
import { SkillService } from '../skill/skill.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CvService {
  constructor(
    private readonly db: DatabaseService,
    private readonly userService: UserService,
    private readonly skillService: SkillService,
  ) {}

  findAll(): CvRecord[] {
    return this.db.cvs;
  }

  findOneById(id: string): CvRecord | undefined {
    return this.db.cvs.find((cv) => cv.id === id);
  }

  findUserForCv(ownerId: string): UserRecord | undefined {
    return this.userService.findOneById(ownerId);
  }

  findSkillsForCv(cvId: string): SkillRecord[] {
    const skillIds = this.db.cvSkills
      .filter((cvSkill) => cvSkill.cvId === cvId)
      .map((cvSkill) => cvSkill.skillId);

    return this.skillService.findByIds(skillIds);
  }
}
