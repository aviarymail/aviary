import { FastifyRequest, FastifyReply } from 'fastify';
import { SocketStream } from 'fastify-websocket';
import { PubSub } from 'mercurius';

export interface ISchemaBuilder {
  Scalars: {
    ID: { Input: string; Output: string };
    DateTime: { Input: Date; Output: Date };
  };

  Context: {
    request: FastifyRequest;
    reply: FastifyReply;
    pubsub: PubSub;
    currentUserId?: string;
  };

  SubscriptionContext: {
    connection: SocketStream;
    request: FastifyRequest;
    pubsub: PubSub;
    currentUserId?: string;
  };

  AuthScopes: {
    public: true;
    loggedIn: boolean;
  };

  DefaultInputFieldRequiredness: true;
}
