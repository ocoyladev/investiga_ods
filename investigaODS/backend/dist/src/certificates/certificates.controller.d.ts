import { CertificatesService } from './certificates.service';
import { User } from '../users/user.entity';
import { IssueCertificateDto } from './dto/issue-certificate.dto';
export declare class CertificatesController {
    private readonly certificatesService;
    constructor(certificatesService: CertificatesService);
    issue(id: number, dto: IssueCertificateDto, user: User): Promise<import("./certificate.entity").Certificate>;
    myCertificates(user: User): Promise<import("./certificate.entity").Certificate[]>;
    verify(serial: string): Promise<import("./certificate.entity").Certificate>;
}
