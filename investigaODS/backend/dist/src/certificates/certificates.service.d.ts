import { Repository } from 'typeorm';
import { Certificate } from './certificate.entity';
import { CoursesService } from '../courses/courses.service';
import { UsersService } from '../users/users.service';
import { Cohort } from '../cohorts/cohort.entity';
import { IssueCertificateDto } from './dto/issue-certificate.dto';
import { User } from '../users/user.entity';
export declare class CertificatesService {
    private readonly certificatesRepository;
    private readonly cohortsRepository;
    private readonly coursesService;
    private readonly usersService;
    constructor(certificatesRepository: Repository<Certificate>, cohortsRepository: Repository<Cohort>, coursesService: CoursesService, usersService: UsersService);
    issue(courseId: number, dto: IssueCertificateDto, issuer: User): Promise<Certificate>;
    listForUser(userId: number): Promise<Certificate[]>;
    verify(serial: string): Promise<Certificate>;
    private stripRelations;
}
