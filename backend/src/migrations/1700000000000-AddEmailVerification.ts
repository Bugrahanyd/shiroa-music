import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddEmailVerification1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("users", new TableColumn({
      name: "emailVerified",
      type: "boolean",
      default: false
    }));

    await queryRunner.addColumn("users", new TableColumn({
      name: "verificationToken",
      type: "varchar",
      isNullable: true
    }));

    await queryRunner.addColumn("users", new TableColumn({
      name: "resetPasswordToken",
      type: "varchar",
      isNullable: true
    }));

    await queryRunner.addColumn("users", new TableColumn({
      name: "resetPasswordExpires",
      type: "timestamp",
      isNullable: true
    }));

    await queryRunner.addColumn("users", new TableColumn({
      name: "avatar",
      type: "varchar",
      isNullable: true
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "emailVerified");
    await queryRunner.dropColumn("users", "verificationToken");
    await queryRunner.dropColumn("users", "resetPasswordToken");
    await queryRunner.dropColumn("users", "resetPasswordExpires");
    await queryRunner.dropColumn("users", "avatar");
  }
}
