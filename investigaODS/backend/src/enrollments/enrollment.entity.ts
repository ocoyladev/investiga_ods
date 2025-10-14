import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';
import { Cohort } from '../cohorts/cohort.entity';

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED',
}

@Entity({ name: 'enrollments' })
export class Enrollment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.enrollments, { eager: true })
  user!: User;

  @ManyToOne(() => Course, (course) => course.enrollments, { eager: true })
  course!: Course;

  @ManyToOne(() => Cohort, (cohort) => cohort.enrollments, { eager: true, nullable: true })
  cohort?: Cohort;

  @Column({ type: 'enum', enum: EnrollmentStatus, default: EnrollmentStatus.ACTIVE })
  status!: EnrollmentStatus;

  @Column({ name: 'enrolled_at', type: 'datetime' })
  enrolledAt!: Date;
}
