import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto, passwordHash: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
}
