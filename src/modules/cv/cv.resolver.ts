import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Subscription,
  Resolver,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import type {
  CvRecord,
  SkillRecord,
  UserRecord,
} from '../../database/database.service';
import { CV_CHANGED } from '../../common/events/cv.events';
import type { CreateCvInput, UpdateCvInput } from '../../graphql';
import { CvService } from './cv.service';

@Resolver('Cv')
export class CvResolver {
  constructor(
    private readonly cvService: CvService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query()
  cvs(): CvRecord[] {
    return this.cvService.findAll();
  }

  @Query()
  cv(_: unknown, @Args() args: { id: string }): CvRecord | undefined {
    return this.cvService.findOneById(args.id);
  }

  @ResolveField()
  user(@Parent() cv: CvRecord): UserRecord | undefined {
    return this.cvService.findUserForCv(cv.ownerId);
  }

  @ResolveField()
  skills(@Parent() cv: CvRecord): SkillRecord[] {
    return this.cvService.findSkillsForCv(cv.id);
  }

  @Mutation()
  createCv(
    _: unknown,
    @Args() args: { createCvInput: CreateCvInput },
  ): Promise<CvRecord> {
    return this.cvService.create(args.createCvInput);
  }

  @Mutation()
  updateCv(
    _: unknown,
    @Args() args: { updateCvInput: UpdateCvInput },
  ): Promise<CvRecord> {
    return this.cvService.update(args.updateCvInput);
  }

  @Mutation()
  removeCv(_: unknown, @Args() args: { id: string }): Promise<boolean> {
    return this.cvService.remove(args.id);
  }

  @Subscription()
  cvChanged() {
    return this.pubSub.asyncIterableIterator(CV_CHANGED);
  }
}
