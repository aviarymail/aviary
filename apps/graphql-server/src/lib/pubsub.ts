import RedisEmitter from 'mqemitter-redis';

export const emitter = RedisEmitter({
  enableAutoPipelining: true,
});
