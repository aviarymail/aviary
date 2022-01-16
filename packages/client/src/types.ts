export interface AviaryTemplate {
  id: string;
  name: string;
  slug: string;
  blocks: Array<AviaryBlock>;
}

export interface AviaryBlock {
  id: string;
  name: string;
  slug: string;
  fields: Array<AviaryField>;
}

export interface AviaryField {
  key: string;
  required: boolean;
  type: 'text' | 'url' | 'number';
}
