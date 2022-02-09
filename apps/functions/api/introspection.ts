import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json([
    {
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
    },
    {
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
    },
  ]);
}
