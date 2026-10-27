"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let MailService = MailService_1 = class MailService {
    config;
    logger = new common_1.Logger(MailService_1.name);
    transporter;
    devUrl = null;
    constructor(config) {
        this.config = config;
    }
    async onModuleInit() {
        await this.init();
    }
    async init() {
        if (this.config.get('SMTP_HOST')) {
            this.transporter = nodemailer.createTransport({
                host: this.config.get('SMTP_HOST'),
                port: this.config.get('SMTP_PORT'),
                secure: this.config.get('SMTP_SECURE') === 'true',
                auth: {
                    user: this.config.get('SMTP_USER'),
                    pass: this.config.get('SMTP_PASS'),
                },
            });
        }
        else {
            const testAccount = await nodemailer.createTestAccount();
            this.transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
            this.devUrl = 'https://ethereal.email/login';
            this.logger.warn('=== EMAIL DE DESARROLLO (Ethereal) ===');
            this.logger.warn(`Login: ${testAccount.user}`);
            this.logger.warn(`Pass: ${testAccount.pass}`);
            this.logger.warn(`Ver correos: ${this.devUrl}`);
            this.logger.warn('========================================');
        }
    }
    async sendPasswordReset(email, resetUrl) {
        const info = await this.transporter.sendMail({
            from: '"Eventos App" <onboarding@resend.dev>',
            to: email,
            subject: 'Recuperación de Contraseña',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #0f0f1a; border-radius: 16px; color: #e5e7eb;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 48px; height: 48px; margin: 0 auto 12px; background: linear-gradient(135deg, #06b6d4, #a855f7, #ec4899); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">✨</div>
            <h1 style="font-size: 24px; margin: 0; color: #fff;">Recupera tu Contraseña</h1>
          </div>
          <p style="font-size: 14px; line-height: 1.6; margin-bottom: 24px;">Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón para crear una nueva contraseña:</p>
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #06b6d4, #a855f7); color: #fff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px;">Restablecer Contraseña</a>
          </div>
          <p style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">Si no solicitaste esto, ignora este correo.</p>
          <p style="font-size: 12px; color: #6b7280;">Este enlace expira en 1 hora.</p>
          <p style="font-size: 12px; color: #6b7280; word-break: break-all;">${resetUrl}</p>
        </div>
      `,
        });
        if (this.devUrl) {
            this.logger.warn(`Email preview: ${nodemailer.getTestMessageUrl(info)}`);
        }
        return info;
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map