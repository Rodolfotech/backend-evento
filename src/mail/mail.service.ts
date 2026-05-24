import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;
  private devUrl: string | null = null;

  constructor(private config: ConfigService) {}

  async onModuleInit() {
    await this.init();
  }

  private async init() {
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
    } else {
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

  async sendPasswordReset(email: string, resetUrl: string) {
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
}
