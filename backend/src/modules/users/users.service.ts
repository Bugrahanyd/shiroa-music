import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { User } from "./user.entity.postgres";
import { ConfigService } from "@nestjs/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

@Injectable()
export class UsersService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY')
      }
    });
    this.bucketName = this.configService.get('S3_BUCKET_NAME');
  }

  async create(email: string, password: string, name: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      emailVerified: false
    });
    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async updateCreditBalance(userId: string, amount: number): Promise<User> {
    const user = await this.findById(userId);
    user.creditBalance = Number(user.creditBalance) + amount;
    return this.userRepository.save(user);
  }

  async updateProfile(userId: string, updateData: { name?: string; email?: string }): Promise<User> {
    const user = await this.findById(userId);
    if (updateData.name) user.name = updateData.name;
    if (updateData.email) user.email = updateData.email;
    return this.userRepository.save(user);
  }

  async uploadAvatar(userId: string, file: any): Promise<string> {
    const key = `avatars/${userId}-${Date.now()}.${file.mimetype.split('/')[1]}`;
    
    await this.s3Client.send(new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    }));

    const avatarUrl = `https://${this.bucketName}.s3.amazonaws.com/${key}`;
    const user = await this.findById(userId);
    user.avatar = avatarUrl;
    await this.userRepository.save(user);
    
    return avatarUrl;
  }

  async verifyEmail(token: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { verificationToken: token } });
    if (!user) throw new Error('Invalid verification token');
    
    user.emailVerified = true;
    user.verificationToken = null;
    return this.userRepository.save(user);
  }

  async createPasswordResetToken(email: string): Promise<string> {
    const user = await this.findByEmail(email);
    if (!user) throw new Error('User not found');
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await this.userRepository.save(user);
    
    return resetToken;
  }

  async resetPassword(token: string, newPassword: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { resetPasswordToken: token } });
    if (!user) throw new Error('Invalid reset token');
    if (user.resetPasswordExpires < new Date()) throw new Error('Token expired');
    
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    return this.userRepository.save(user);
  }
}
