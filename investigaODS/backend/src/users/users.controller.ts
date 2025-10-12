import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from './user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@CurrentUser() user: User) {
    const found = await this.usersService.findById(user.id);
    if (!found) {
      return null;
    }
    const { passwordHash, ...rest } = found;
    return rest;
  }

  @Patch('me')
  async updateProfile(@CurrentUser() user: User, @Body() dto: UpdateUserDto) {
    const { role, ...restDto } = dto;
    const updated = await this.usersService.update(user.id, restDto);
    const { passwordHash, ...rest } = updated;
    return rest;
  }
}
