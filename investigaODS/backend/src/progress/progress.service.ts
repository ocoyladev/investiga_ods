import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonProgress } from './lesson-progress.entity';
import { Lesson } from '../lessons/lesson.entity';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(LessonProgress)
    private readonly progressRepository: Repository<LessonProgress>,
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  async updateProgress(lessonId: number, user: User, dto: UpdateProgressDto) {
    const lesson = await this.lessonsRepository.findOne({
      where: { id: lessonId },
      relations: ['module', 'module.course'],
    });
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    let progress = await this.progressRepository.findOne({
      where: { lesson: { id: lessonId }, user: { id: user.id } },
    });
    if (!progress) {
      progress = this.progressRepository.create({
        lesson,
        user,
        progressPct: 0,
        completed: false,
      });
    }
    if (dto.progressPct !== undefined) {
      progress.progressPct = dto.progressPct;
    }
    if (dto.completed !== undefined) {
      progress.completed = dto.completed;
    }
    progress.lastViewedAt = new Date();
    const saved = await this.progressRepository.save(progress);
    return this.stripUser(saved);
  }

  async getCourseProgress(courseId: number, user: User) {
    const progress = await this.progressRepository
      .createQueryBuilder('progress')
      .leftJoinAndSelect('progress.lesson', 'lesson')
      .leftJoin('lesson.module', 'module')
      .leftJoin('module.course', 'course')
      .where('course.id = :courseId', { courseId })
      .andWhere('progress.userId = :userId', { userId: user.id })
      .getMany();
    return progress.map((entry) => this.stripUser(entry));
  }

  private stripUser(entry: LessonProgress) {
    if (entry.user) {
      const { passwordHash, ...user } = entry.user as any;
      entry.user = user;
    }
    return entry;
  }
}
