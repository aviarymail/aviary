export interface IntrospectionResult {
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  messageTpls: MessageTemplate[];
}

export interface MessageTemplate {
  id: string;
  name: string;
  slug: string;
  description: string;
  schema: Record<string, SchemaParam>;
}

export interface SchemaParam {
  id: string;
  type: 'string' | 'number' | 'array' | 'enum';
  default?: string | number;
}
