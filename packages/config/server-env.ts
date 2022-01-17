import dotenv from 'dotenv';
import env from 'env-var';
import findUpSync from 'findup-sync';

dotenv.config({ path: findUpSync('.env')! });

export const ServerEnv = {
  ENV: env.get('NODE_ENV').asString(),
  IS_DEV: env.get('NODE_ENV').asString() === 'development',
  IS_PROD: env.get('NODE_ENV').asString() === 'production',
  PORT: env.get('PORT').default(3000).asPortNumber(),

  WEB_URL: env.get('WEB_URL').default('http://localhost:8080').asString(),
  REDIS_URL: env.get('REDIS_URL').required().asString(),

  COOKIE_TOKEN: env.get('COOKIE_NAME').default('session').asString(),
  COOKIE_REFRESH: env.get('COOKIE_REFRESH').default('refesh').asString(),
  COOKIE_TOKEN_TTL: 1000 * 60 * 5, // 5 minutes
  COOKIE_REFRESH_TTL: 1000 * 60 * 60 * 60 * 24 * 1, // 1 day
};
