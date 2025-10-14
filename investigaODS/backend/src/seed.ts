import 'reflect-metadata';
import { DataSource } from 'typeorm';
import configuration from './config/configuration';
import { SnakeNamingStrategy } from './database/snake-naming.strategy';
import { MembershipPlan, MembershipPlanCode } from './plans/membership-plan.entity';
import { User } from './users/user.entity';
import { UserRole } from './users/user-role.enum';
import { Subscription, SubscriptionStatus } from './subscriptions/subscription.entity';
import { Course, CourseModality, CourseTier, CourseVisibility } from './courses/course.entity';
import { CourseModule } from './courses/course-module.entity';
import { Lesson } from './lessons/lesson.entity';
import { Quiz, QuizType } from './quizzes/quiz.entity';
import { Question, QuestionType } from './quizzes/question.entity';
import { Option } from './quizzes/option.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  const config = configuration();
  const dataSource = new DataSource({
    type: 'mysql',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.name,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
      MembershipPlan,
      User,
      Subscription,
      Course,
      CourseModule,
      Lesson,
      Quiz,
      Question,
      Option,
    ],
  });

  await dataSource.initialize();
  const planRepo = dataSource.getRepository(MembershipPlan);
  const userRepo = dataSource.getRepository(User);
  const subscriptionRepo = dataSource.getRepository(Subscription);
  const courseRepo = dataSource.getRepository(Course);
  const moduleRepo = dataSource.getRepository(CourseModule);
  const lessonRepo = dataSource.getRepository(Lesson);
  const quizRepo = dataSource.getRepository(Quiz);
  const questionRepo = dataSource.getRepository(Question);
  const optionRepo = dataSource.getRepository(Option);

  for (const plan of [
    { code: MembershipPlanCode.BASIC, name: 'Basic', features: { live: false } },
    { code: MembershipPlanCode.PRO, name: 'Pro', features: { live: true } },
  ]) {
    const existing = await planRepo.findOne({ where: { code: plan.code } });
    if (!existing) {
      await planRepo.save(planRepo.create(plan));
    }
  }

  const adminEmail = 'admin@example.com';
  let admin = await userRepo.findOne({ where: { email: adminEmail } });
  if (!admin) {
    admin = userRepo.create({
      email: adminEmail,
      passwordHash: await bcrypt.hash('Admin123!', 10),
      role: UserRole.ADMIN,
      firstName: 'Admin',
      lastName: 'User',
    });
    await userRepo.save(admin);
  }

  let instructor = await userRepo.findOne({ where: { email: 'instructor@example.com' } });
  if (!instructor) {
    instructor = userRepo.create({
      email: 'instructor@example.com',
      passwordHash: await bcrypt.hash('Instructor123!', 10),
      role: UserRole.INSTRUCTOR,
      firstName: 'Investiga',
      lastName: 'Instructor',
    });
    await userRepo.save(instructor);
  }

  const basicPlan = await planRepo.findOne({ where: { code: MembershipPlanCode.BASIC } });
  if (basicPlan && instructor) {
    const subExists = await subscriptionRepo.findOne({
      where: { user: { id: instructor.id }, status: SubscriptionStatus.ACTIVE },
    });
    if (!subExists) {
      await subscriptionRepo.save(
        subscriptionRepo.create({
          user: instructor,
          plan: basicPlan,
          status: SubscriptionStatus.ACTIVE,
          startAt: new Date(),
        }),
      );
    }
  }

  let course = await courseRepo.findOne({ where: { slug: 'intro-investigaods' } });
  if (!course && instructor) {
    course = courseRepo.create({
      owner: instructor,
      title: 'Intro to InvestigaODS',
      slug: 'intro-investigaods',
      summary: 'Getting started with sustainable investigations.',
      visibility: CourseVisibility.PUBLIC,
      modality: CourseModality.SELF_PACED,
      tierRequired: CourseTier.FREE,
      hasCertificate: true,
    });
    course = await courseRepo.save(course);

    const module = await moduleRepo.save(
      moduleRepo.create({ course, index: 1, title: 'Welcome Module' }),
    );

    const lesson = await lessonRepo.save(
      lessonRepo.create({ module, index: 1, title: 'Welcome Lesson', content: 'Introduction' }),
    );

    const quiz = await quizRepo.save(
      quizRepo.create({ title: 'Getting Started Quiz', lesson, course, type: QuizType.QUIZ }),
    );

    const question = await questionRepo.save(
      questionRepo.create({
        quiz,
        type: QuestionType.MCQ,
        prompt: 'InvestigaODS focuses on which goals?',
        points: 1,
      }),
    );

    await optionRepo.save(
      optionRepo.create({ question, text: 'Sustainable Development Goals', isCorrect: true }),
    );
    await optionRepo.save(
      optionRepo.create({ question, text: 'Random Objectives', isCorrect: false }),
    );
  }

  await dataSource.destroy();
  // eslint-disable-next-line no-console
  console.log('Seed completed');
}

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Seed failed', error);
  process.exit(1);
});
