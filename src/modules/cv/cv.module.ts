import { Module } from '@nestjs/common';
import { CvResolver } from './cv.resolver';
import { CvService } from './cv.service';
import { UserModule } from '../user/user.module';
import { SkillModule } from '../skill/skill.module';

@Module({
  imports: [UserModule, SkillModule],
  providers: [CvResolver, CvService],
  exports: [CvService],
})
export class CvModule {}
