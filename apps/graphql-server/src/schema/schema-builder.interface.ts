import { PothosPrismaTypes } from '@aviarymail/db';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SocketStream } from 'fastify-websocket';
import { PubSub } from 'mercurius';

export interface ISchemaBuilder {
  Scalars: {
    ID: { Input: string; Output: string };
    DateTime: { Input: Date; Output: Date };
  };

  Objects: {
    SuccessResponse: { success: boolean };
  };

  Context: {
    request: FastifyRequest;
    reply: FastifyReply;
    pubsub: PubSub;
    currentUserId?: string;
    sessionId?: string;
  };

  SubscriptionContext: {
    connection: SocketStream;
    request: FastifyRequest;
    pubsub: PubSub;
    currentUserId?: string;
    sessionId?: string;
  };

  AuthScopes: {
    public: true;
    loggedIn: boolean;
  };

  PrismaTypes: PothosPrismaTypes;

  DefaultInputFieldRequiredness: true;
}
