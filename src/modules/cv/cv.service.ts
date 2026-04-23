import { Inject, Injectable } from '@nestjs/common';
import * as crypto from 'node:crypto';
import { GraphQLError } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import {
  CvRecord,
  DatabaseService,
  SkillRecord,
  UserRecord,
} from '../../database/database.service';
import { CV_CHANGED } from '../../common/events/cv.events';
import type { CreateCvInput, UpdateCvInput } from '../../graphql';
import { SkillService } from '../skill/skill.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CvService {
  constructor(
    private readonly db: DatabaseService,
    private readonly userService: UserService,
    private readonly skillService: SkillService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
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

  async create(input: CreateCvInput): Promise<CvRecord> {
    const user = this.userService.findOneById(input.ownerId);
    if (!user) {
      throw new GraphQLError('User not found');
    }

    const skills = this.skillService.findByIds(input.skillIds);
    if (skills.length !== input.skillIds.length) {
      throw new GraphQLError('One or more skills not found');
    }

    const { skillIds, ...cvInput } = input;
    const newCv: CvRecord = { id: crypto.randomUUID(), ...cvInput };

    this.db.cvs.push(newCv);

    input.skillIds.forEach((skillId) => {
      this.db.cvSkills.push({ cvId: newCv.id, skillId });
    });

    await this.pubSub.publish(CV_CHANGED, {
      cvChanged: { action: 'CREATED', cv: newCv },
    });

    return newCv;
  }

  async update(input: UpdateCvInput): Promise<CvRecord> {
    const index = this.db.cvs.findIndex((cv) => cv.id === input.id);
    if (index === -1) {
      throw new GraphQLError('CV not found');
    }

    if (input.ownerId !== undefined && input.ownerId !== null) {
      const user = this.userService.findOneById(input.ownerId);
      if (!user) {
        throw new GraphQLError('User not found');
      }
    }

    if (input.skillIds !== undefined && input.skillIds !== null) {
      const skills = this.skillService.findByIds(input.skillIds);
      if (skills.length !== input.skillIds.length) {
        throw new GraphQLError('One or more skills not found');
      }

      const remainingCvSkills = this.db.cvSkills.filter(
        (cvSkill) => cvSkill.cvId !== input.id,
      );

      remainingCvSkills.push(
        ...input.skillIds.map((skillId) => ({ cvId: input.id, skillId })),
      );

      this.db.cvSkills.splice(0, this.db.cvSkills.length, ...remainingCvSkills);
    }

    const updatedCv: CvRecord = {
      ...this.db.cvs[index],
      ...(input.name !== undefined && input.name !== null
        ? { name: input.name }
        : {}),
      ...(input.age !== undefined && input.age !== null
        ? { age: input.age }
        : {}),
      ...(input.job !== undefined && input.job !== null
        ? { job: input.job }
        : {}),
      ...(input.ownerId !== undefined && input.ownerId !== null
        ? { ownerId: input.ownerId }
        : {}),
    };

    this.db.cvs[index] = updatedCv;

    await this.pubSub.publish(CV_CHANGED, {
      cvChanged: { action: 'UPDATED', cv: updatedCv },
    });

    return this.db.cvs[index];
  }

  async remove(id: string): Promise<boolean> {
    const index = this.db.cvs.findIndex((cv) => cv.id === id);
    if (index === -1) {
      throw new GraphQLError('CV not found');
    }

    this.db.cvs.splice(index, 1);

    await this.pubSub.publish(CV_CHANGED, {
      cvChanged: { action: 'DELETED', cv: null },
    });

    const remainingCvSkills = this.db.cvSkills.filter((cs) => cs.cvId !== id);
    this.db.cvSkills.splice(0, this.db.cvSkills.length, ...remainingCvSkills);

    return true;
  }
}
