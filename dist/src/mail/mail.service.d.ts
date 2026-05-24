import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class MailService implements OnModuleInit {
    private config;
    private readonly logger;
    private transporter;
    private devUrl;
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
    private init;
    sendPasswordReset(email: string, resetUrl: string): Promise<any>;
}
