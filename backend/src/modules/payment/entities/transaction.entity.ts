import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/user.entity.postgres";

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded"
}

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  trackId: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ default: "usd" })
  currency: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  creditsUsed: number;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.PENDING
  })
  status: TransactionStatus;

  @Column()
  stripePaymentIntentId: string;

  @Column({ type: "jsonb", nullable: true })
  providerInfo: any;

  @Column({ nullable: true })
  licenseKey: string;

  @CreateDateColumn()
  createdAt: Date;
}
