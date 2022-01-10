import dotenv from 'dotenv';
import env from 'env-var';
import findUpSync from 'findup-sync';

dotenv.config({ path: findUpSync('.env') });

export const Config = {
  ENV: env.get('NODE_ENV').asString(),
  IS_DEV: env.get('NODE_ENV').asString() === 'development',
  IS_PROD: env.get('NODE_ENV').asString() === 'production',
  PORT: env.get('PORT').default(3000).asPortNumber(),
  SECRET_KEY: env.get('SECRET_KEY').default('secret').asString(),
  COOKIE: env.get('COOKIE').default('session').asString(),
  WEB_URL: env.get('WEB_URL').default('http://localhost:8080').asString(),
  REDIS_URL: env.get('REDIS_URL').required().asString(),
};
