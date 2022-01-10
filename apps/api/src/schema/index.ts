import path from 'path';
import fs from 'fs';
import { lexicographicSortSchema, printSchema } from 'graphql';

import { Config } from '../lib/config';
import { builder } from './schema-builder';

import './input-types/pagination-input';

import './mutations/confirm-email.mutation';
import './mutations/login.mutation';
import './mutations/logout.mutation';
import './mutations/signup.mutation';

import './queries/me.query';

export const schema = builder.toSchema({});

if (Config.IS_DEV) {
  const schemaPath = path.join(process.cwd(), '../../schema.graphql');
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  const existing = fs.existsSync(schemaPath) && fs.readFileSync(schemaPath, 'utf-8');

  if (existing !== schemaAsString) {
    fs.writeFileSync(schemaPath, schemaAsString);
  }
}
