import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResendService {
  private apiKey: string;
  private fromEmail: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.fromEmail = this.configService.get<string>('EMAIL_FROM');
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: this.fromEmail,
        to: [to],
        subject,
        html
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to send email: ${JSON.stringify(error)}`);
    }
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00CED1;">Welcome to SHIROA! 🎵</h1>
        <p>Hi ${name},</p>
        <p>Thanks for joining SHIROA - Everything for your sound.</p>
        <p>Start exploring exclusive tracks and build your perfect sound library.</p>
        <a href="${this.configService.get('FRONTEND_URL')}/tracks" 
           style="display: inline-block; background: #00CED1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
          Browse Tracks
        </a>
        <p>Best regards,<br>The SHIROA Team</p>
      </div>
    `;

    await this.sendEmail(to, 'Welcome to SHIROA!', html);
  }

  async sendPurchaseConfirmation(to: string, trackTitle: string, amount: number): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00CED1;">Purchase Confirmed! 🎉</h1>
        <p>Your purchase of <strong>${trackTitle}</strong> is complete.</p>
        <p>Amount: <strong>$${amount}</strong></p>
        <p>You can download your track from your purchases page.</p>
        <a href="${this.configService.get('FRONTEND_URL')}/purchases" 
           style="display: inline-block; background: #00CED1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
          View Purchases
        </a>
        <p>Best regards,<br>The SHIROA Team</p>
      </div>
    `;

    await this.sendEmail(to, `Purchase Confirmed: ${trackTitle}`, html);
  }
}
