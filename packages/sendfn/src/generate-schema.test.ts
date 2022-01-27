import { expect, describe, test } from 'vitest';
import { generateSchema } from './generate-schema';

describe('generate-schema', () => {
  test('simple expressions', () => {
    // https://handlebarsjs.com/guide/#simple-expressions

    const schema = generateSchema(`
      {{name}} {{company}}
    `);

    expect(schema).toEqual({
      properties: {
        name: {},
        company: {},
      },
    });
  });

  test('nested input objects', () => {
    // https://handlebarsjs.com/guide/#nested-input-objects
    const schema = generateSchema(`
      {{user.name}}
      {{user.contact.email}}
    `);

    expect(schema).toEqual({
      properties: {
        user: {
          properties: {
            name: {},
            contact: {
              properties: {
                email: {},
              },
            },
          },
        },
      },
    });
  });

  test('with', () => {
    // https://handlebarsjs.com/guide/#evaluation-context
    // https://handlebarsjs.com/guide/builtin-helpers.html#with

    const schema = generateSchema(`
      {{#with category}}
        {{name}}
      {{/with}}

      {{#with account.user}}
        {{name}}
        {{contact.email}}
      {{/with}}
    `);

    expect(schema).toEqual({
      properties: {
        category: {
          properties: {
            name: {},
          },
        },
        account: {
          properties: {
            user: {
              properties: {
                name: {},
                contact: {
                  properties: {
                    email: {},
                  },
                },
              },
            },
          },
        },
      },
    });
  });

  test('each', () => {
    // https://handlebarsjs.com/guide/#evaluation-context
    // https://handlebarsjs.com/guide/builtin-helpers.html#each

    const schema = generateSchema(`
      {{#each categories}}
        {{this}}
      {{/each}}

      {{#each user}}
        {{this.name}}
        {{this.contact.email}}
      {{/each}}
    `);

    expect(schema).toEqual({
      properties: {
        categories: {
          elements: {},
        },
        user: {
          elements: {
            properties: {
              name: {},
              contact: {
                properties: {
                  email: {},
                },
              },
            },
          },
        },
      },
    });
  });

  test('if', () => {
    // https://handlebarsjs.com/guide/builtin-helpers.html#if

    const schema = generateSchema(`
      {{#if category}}
        {{category}}
      {{/if}}

      {{#if account.user}}
        {{account.user.name}}
        {{#if account.user.contact}}
          {{account.user.contact.email}}
        {{/if}}
      {{else}}
        {{account.status}}
      {{/if}}
    `);

    expect(schema).toEqual({
      optionalProperties: {
        category: {},
        account: {
          optionalProperties: {
            user: {
              optionalProperties: {
                contact: {
                  properties: {
                    email: {},
                  },
                },
              },
              properties: {
                name: {},
              },
            },
          },
          properties: {
            status: {},
          },
        },
      },
    });
  });

  test('unless', () => {
    // https://handlebarsjs.com/guide/builtin-helpers.html#unless

    const schema = generateSchema(`
      {{#unless category}}
        {{category}}
      {{/unless}}

      {{#unless user}}
        {{user.name}}
        {{#unless user.contact.email}}
          {{user.contact.email}}
        {{/unless}}
      {{else}}
        {{organization}}
      {{/unless}}
    `);

    expect(schema).toEqual({
      optionalProperties: {
        category: {},
        user: {
          optionalProperties: {
            contact: {
              optionalProperties: {
                email: {},
              },
            },
          },
          properties: {
            name: {},
          },
        },
      },
      properties: {
        organization: {},
      },
    });
  });

  test('with nested in if/unless', () => {
    const schema = generateSchema(`
      {{#if user}}
        {{#with user}}
          {{name}}
          {{contact.email}}
        {{/with}}
      {{/if}}
    `);

    expect(schema).toEqual({
      optionalProperties: {
        user: {
          properties: {
            name: {},
            contact: {
              properties: {
                email: {},
              },
            },
          },
        },
      },
    });
  });

  test('if nested in with nested in each', () => {
    const schema = generateSchema(`
      {{#each account.user}}
        {{name}}
        {{#with cars}}
          {{#if make}}
            {{make}}
          {{/if}}
          {{color.interior}}
        {{/with}}
      {{/each}}
    `);

    expect(schema).toEqual({
      properties: {
        account: {
          properties: {
            user: {
              elements: {
                properties: {
                  name: {},
                  cars: {
                    optionalProperties: {
                      make: {},
                    },
                    properties: {
                      color: {
                        properties: {
                          interior: {},
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  });

  test('recursive relationships in an each tag', () => {
    const schema = generateSchema(`
      {{#each comments}}
        {{this.author}}
        {{#each this.comments}}
          {{#if this.author}}
            {{this.author}}
          {{/if}}
        {{/each}}
      {{/each}}
    `);

    expect(schema).toEqual({
      properties: {
        comments: {
          elements: {
            properties: {
              author: {},
              comments: {
                elements: {
                  optionalProperties: {
                    author: {},
                  },
                },
              },
            },
          },
        },
      },
    });
  });
});
