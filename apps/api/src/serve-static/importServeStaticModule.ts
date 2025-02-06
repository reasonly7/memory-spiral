import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

export const importServeStaticModule = () => {
  return ServeStaticModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return [
        {
          rootPath: path.resolve(
            process.cwd(),
            configService.get('app.publicPath'),
          ),
          exclude: [`${configService.get('app.globalPrefix')}/*`], // 确保 API 路由不会被静态资源覆盖
          serveStaticOptions: {
            index: 'index.html',
            cacheControl: true,
          },
        },
      ];
    },
  });
};
