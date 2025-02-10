import { Module } from '@nestjs/common';
import { importConfigModule } from './config/importConfigModule';
import { UserModule } from './user/user.module';
import { importTypeOrmModule } from './typeorm/importTypeOrmModule';
import { importCacheModule } from './cache/importCacheModule';
import { CaptchaModule } from './captcha/captcha.module';
import { RsaModule } from './rsa/rsa.module';
import { AuthModule } from './auth/auth.module';
import { ResponseModule } from './response/response.module';
import { MemorySpiralModule } from './memory-spiral/memory-spiral.module';
import { importServeStaticModule } from './serve-static/importServeStaticModule';

@Module({
  imports: [
    importConfigModule(),
    importTypeOrmModule(),
    importCacheModule(),
    importServeStaticModule(),
    ResponseModule,
    CaptchaModule,
    UserModule,
    RsaModule,
    AuthModule,
    MemorySpiralModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
