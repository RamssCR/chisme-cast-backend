import { ChismesModule } from '#chismes/chismes.module';
import { DatabaseModule } from '#database/database.module';
import { Module } from '@nestjs/common';
import { PipeModule } from '#common/pipes/pipe.module';

@Module({
  imports: [ChismesModule, DatabaseModule, PipeModule],
})
export class AppModule {}
