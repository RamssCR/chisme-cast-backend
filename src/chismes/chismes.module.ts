import { Chisme, ChismeSchema } from './entities/chisme.entity';
import { AIModule } from '#ai/ai.module';
import { ChismesController } from './chismes.controller';
import { ChismesGateway } from './chismes.gateway';
import { ChismesService } from './chismes.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chisme.name, schema: ChismeSchema }]),
    AIModule,
  ],
  controllers: [ChismesController],
  providers: [ChismesService, ChismesGateway],
  exports: [ChismesService, ChismesGateway],
})
export class ChismesModule {}
