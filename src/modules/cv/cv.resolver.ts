import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import type {
  CvRecord,
  SkillRecord,
  UserRecord,
} from '../../database/database.service';
import { CvService } from './cv.service';

@Resolver('Cv')
export class CvResolver {
  constructor(private readonly cvService: CvService) {}

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
}
