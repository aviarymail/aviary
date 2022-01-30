import { SchemaFormElements, SchemaFormProperties, SchemaFormType } from 'jtd';
import { Merge } from 'type-fest';

export type Schema = Merge<Merge<SchemaFormType, SchemaFormElements>, SchemaFormProperties>;
export type Type = 'value' | 'value[]' | 'object[]' | 'object';
export type Segment = [type: Type, optional: boolean];
export type AST = Record<string, Segment>;
