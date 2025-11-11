import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get('FRONTEND_URL');
    const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;
    
    // TODO: Replace with SendGrid when API key is available
    console.log(`
      ========================================
      VERIFICATION EMAIL
      To: ${email}
      Link: ${verificationUrl}
      ========================================
    `);
    
    // SendGrid implementation:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(this.configService.get('SENDGRID_API_KEY'));
    // await sgMail.send({
    //   to: email,
    //   from: 'noreply@shiroa.com',
    //   subject: 'Verify your SHIROA account',
    //   html: `<a href="${verificationUrl}">Click here to verify</a>`
    // });
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const frontendUrl = this.configService.get('FRONTEND_URL');
    const resetUrl = `${frontendUrl}/reset-password?token=${token}`;
    
    console.log(`
      ========================================
      PASSWORD RESET EMAIL
      To: ${email}
      Link: ${resetUrl}
      ========================================
    `);
  }

  async sendPurchaseConfirmation(email: string, trackTitle: string, licenseKey: string): Promise<void> {
    console.log(`
      ========================================
      PURCHASE CONFIRMATION
      To: ${email}
      Track: ${trackTitle}
      License: ${licenseKey}
      ========================================
    `);
  }
}
