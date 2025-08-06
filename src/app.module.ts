import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { CategoryModule } from './modules/category/category.module';
import { StartTimingMiddleware } from './common/middlewares/start-timing.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Add this line
    }),
    
    SequelizeModule.forRootAsync({
      inject: [ConfigService,],
      useFactory: (config: ConfigService) => sequelizeConfig(config),

    }),
    CategoryModule,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(StartTimingMiddleware).forRoutes('*');
  }
 }
