import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // xóa các fields dư trong payload,
    forbidNonWhitelisted: true, // báo lỗi ra postmman
    // transform: true , // chuyển đổi dữ liệu object thành instance của DTO
  }))
  app.useGlobalInterceptors(new TransformInterceptor());
  const configService = new ConfigService(); 
  await app.listen(configService.get('PORT') ?? 3000);
  console.log(`Application is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
