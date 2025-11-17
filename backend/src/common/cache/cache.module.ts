import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get('REDIS_HOST');
        
        if (!redisHost || redisHost === 'localhost') {
          // Use memory cache for development
          return { ttl: 300 };
        }
        
        return {
          store: redisStore,
          host: redisHost,
          port: configService.get('REDIS_PORT') || 6379,
          ttl: 300,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}