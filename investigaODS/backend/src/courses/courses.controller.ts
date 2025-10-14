import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseFilterDto } from './dto/course-filter.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user-role.enum';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../users/user.entity';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async list(@Query() filters: CourseFilterDto) {
    return this.coursesService.findAll(filters);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.coursesService.findById(Number(id));
  }

  @Get(':id/outline')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async outline(@Param('id') id: number, @CurrentUser() user: User) {
    return this.coursesService.getOutline(Number(id), user);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async create(@CurrentUser() user: User, @Body() dto: CreateCourseDto) {
    return this.coursesService.create(user, dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async update(@Param('id') id: number, @CurrentUser() user: User, @Body() dto: UpdateCourseDto) {
    return this.coursesService.update(Number(id), dto, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async remove(@Param('id') id: number, @CurrentUser() user: User) {
    await this.coursesService.remove(Number(id), user);
    return { success: true };
  }

  @Post(':id/modules')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async createModule(
    @Param('id') id: number,
    @CurrentUser() user: User,
    @Body() dto: CreateModuleDto,
  ) {
    return this.coursesService.createModule(Number(id), dto, user);
  }

  @Post('/modules/:id/lessons')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  async createLesson(
    @Param('id') id: number,
    @CurrentUser() user: User,
    @Body() dto: CreateLessonDto,
  ) {
    return this.coursesService.createLesson(Number(id), dto, user);
  }
}
