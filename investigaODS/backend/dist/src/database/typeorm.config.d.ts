import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export declare const typeOrmConfigFactory: (configService: ConfigService) => Promise<TypeOrmModuleOptions>;
