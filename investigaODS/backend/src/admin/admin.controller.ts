import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/user-role.enum';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  async listUsers() {
    const users = await this.usersService.findAll();
    return users.map(({ passwordHash, ...rest }) => rest);
  }

  @Patch('users/:id')
  async updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    const updated = await this.usersService.update(Number(id), dto);
    const { passwordHash, ...rest } = updated;
    return rest;
  }
}
