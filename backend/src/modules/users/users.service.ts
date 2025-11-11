import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity.postgres";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(email: string, password: string, name: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      name
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
}
