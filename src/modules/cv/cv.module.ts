import { Module } from '@nestjs/common';
import { CvResolver } from './cv.resolver';
import { CvService } from './cv.service';

@Module({
  providers: [CvResolver, CvService],
  exports: [CvService],
})
export class CvModule {}
