import path from 'path';
import fs from 'fs';
import { lexicographicSortSchema, printSchema } from 'graphql';
import { Config } from '../lib/config';
import { builder } from './schema-builder';

import './object-types/project.type';
import './object-types/session.type';
import './object-types/team-invite.type';
import './object-types/team-membership.type';
import './object-types/team.type';
import './object-types/user.type';

import './queries/me.query';
import './queries/project.query';
import './queries/team.query';

import './mutations/login.mutation';
import './mutations/logout.mutation';
import './mutations/signup.mutation';

import './input-types/pagination-input';

export const schema = builder.toSchema({});

if (Config.IS_DEV) {
  const schemaPath = path.join(process.cwd(), '../../schema.graphql');
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  const existing = fs.existsSync(schemaPath) && fs.readFileSync(schemaPath, 'utf-8');

  if (existing !== schemaAsString) {
    fs.writeFileSync(schemaPath, schemaAsString);
  }
}
