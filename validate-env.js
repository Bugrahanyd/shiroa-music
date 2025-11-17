#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const requiredEnvs = {
  backend: ['JWT_SECRET', 'DATABASE_URL', 'MONGODB_URI'],
  frontend: ['NEXT_PUBLIC_API_URL']
};

function validateEnv() {
  let valid = true;
  
  // Backend validation
  const backendEnv = path.join(__dirname, 'backend', '.env');
  if (!fs.existsSync(backendEnv)) {
    console.error('❌ Backend .env file missing');
    valid = false;
  } else {
    const content = fs.readFileSync(backendEnv, 'utf8');
    requiredEnvs.backend.forEach(key => {
      if (!content.includes(`${key}=`)) {
        console.error(`❌ Backend missing: ${key}`);
        valid = false;
      }
    });
  }
  
  // Frontend validation
  const frontendEnv = path.join(__dirname, 'frontend', '.env.local');
  if (!fs.existsSync(frontendEnv)) {
    console.error('❌ Frontend .env.local file missing');
    valid = false;
  } else {
    const content = fs.readFileSync(frontendEnv, 'utf8');
    requiredEnvs.frontend.forEach(key => {
      if (!content.includes(`${key}=`)) {
        console.error(`❌ Frontend missing: ${key}`);
        valid = false;
      }
    });
  }
  
  if (valid) {
    console.log('✅ Environment validation passed');
  } else {
    console.log('\n💡 Run: cp .env.example .env && cp frontend/.env.local.example frontend/.env.local');
    process.exit(1);
  }
}

validateEnv();