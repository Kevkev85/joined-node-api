import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarvelModule } from './marvel/marvel.module';

@Module({
  imports: [MarvelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
