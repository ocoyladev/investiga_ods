import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { CourseModule } from '../courses/course-module.entity';
import { LessonProgress } from '../progress/lesson-progress.entity';
import { Quiz } from '../quizzes/quiz.entity';

@Entity({ name: 'lessons' })
export class Lesson extends BaseEntity {
  @ManyToOne(() => CourseModule, (module) => module.lessons, { onDelete: 'CASCADE' })
  module!: CourseModule;

  @Column()
  index!: number;

  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ name: 'video_url', nullable: true })
  videoUrl?: string;

  @Column({ name: 'duration_min', type: 'int', nullable: true })
  durationMin?: number;

  @Column({ type: 'json', nullable: true })
  resources?: Record<string, unknown>;

  @OneToMany(() => LessonProgress, (progress) => progress.lesson)
  progresses!: LessonProgress[];

  @OneToMany(() => Quiz, (quiz) => quiz.lesson)
  quizzes!: Quiz[];
}
