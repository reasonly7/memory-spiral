import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    port: Number(process.env.APP_PORT || 3000),
    globalPrefix: process.env.APP_GLOBAL_PREFIX || '/api/rest/v1',
    cors: process.env.APP_CORS === 'true',
    publicPath: process.env.APP_PUBLIC_PATH || './public',
  };
});
