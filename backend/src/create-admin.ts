import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: ["dist/**/*.entity.js"]
});

async function createAdmin() {
  await AppDataSource.initialize();
  
  const hashedPassword = await bcrypt.hash("Admin123!", 10);
  
  await AppDataSource.query(
    `INSERT INTO "user" (email, password, name, role, "creditBalance", "createdAt", "updatedAt") 
     VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
     ON CONFLICT (email) DO UPDATE SET role = 'admin'`,
    ["admin@shiroa.com", hashedPassword, "Admin", "admin", 0]
  );
  
  console.log("✅ Admin user created: admin@shiroa.com / Admin123!");
  await AppDataSource.destroy();
}

createAdmin().catch(console.error);
