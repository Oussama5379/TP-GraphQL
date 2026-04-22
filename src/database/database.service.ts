import { Injectable } from '@nestjs/common';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface CvRecord {
  id: string;
  name: string;
  age: number;
  job: string;
  ownerId: string;
}

export interface SkillRecord {
  id: string;
  designation: string;
}

export interface CvSkillRecord {
  cvId: string;
  skillId: string;
}

@Injectable()
export class DatabaseService {
  private readonly usersData: UserRecord[] = [
    {
      id: 'usr-001',
      name: 'Alice Martin',
      email: 'alice.martin@example.com',
      role: 'ADMIN',
    },
    {
      id: 'usr-002',
      name: 'Youssef Benali',
      email: 'youssef.benali@example.com',
      role: 'USER',
    },
    {
      id: 'usr-003',
      name: 'Sara Dupont',
      email: 'sara.dupont@example.com',
      role: 'USER',
    },
  ];

  private readonly skillsData: SkillRecord[] = [
    { id: 'skl-001', designation: 'TypeScript' },
    { id: 'skl-002', designation: 'NestJS' },
    { id: 'skl-003', designation: 'React' },
    { id: 'skl-004', designation: 'GraphQL' },
    { id: 'skl-005', designation: 'Docker' },
  ];

  private readonly cvsData: CvRecord[] = [
    {
      id: 'cv-001',
      name: 'Alice Martin',
      age: 32,
      job: 'Senior Backend Engineer',
      ownerId: 'usr-001',
    },
    {
      id: 'cv-002',
      name: 'Youssef Benali',
      age: 27,
      job: 'Full Stack Developer',
      ownerId: 'usr-002',
    },
    {
      id: 'cv-003',
      name: 'Sara Dupont',
      age: 29,
      job: 'Frontend Engineer',
      ownerId: 'usr-003',
    },
    {
      id: 'cv-004',
      name: 'Youssef Benali',
      age: 27,
      job: 'Platform Engineer',
      ownerId: 'usr-002',
    },
  ];

  private readonly cvSkillsData: CvSkillRecord[] = [
    { cvId: 'cv-001', skillId: 'skl-001' },
    { cvId: 'cv-001', skillId: 'skl-002' },
    { cvId: 'cv-001', skillId: 'skl-004' },
    { cvId: 'cv-001', skillId: 'skl-005' },
    { cvId: 'cv-002', skillId: 'skl-001' },
    { cvId: 'cv-002', skillId: 'skl-002' },
    { cvId: 'cv-002', skillId: 'skl-003' },
    { cvId: 'cv-002', skillId: 'skl-004' },
    { cvId: 'cv-003', skillId: 'skl-001' },
    { cvId: 'cv-003', skillId: 'skl-003' },
    { cvId: 'cv-004', skillId: 'skl-002' },
    { cvId: 'cv-004', skillId: 'skl-004' },
    { cvId: 'cv-004', skillId: 'skl-005' },
  ];

  get users(): UserRecord[] {
    return this.usersData;
  }

  get cvs(): CvRecord[] {
    return this.cvsData;
  }

  get skills(): SkillRecord[] {
    return this.skillsData;
  }

  get cvSkills(): CvSkillRecord[] {
    return this.cvSkillsData;
  }
}
