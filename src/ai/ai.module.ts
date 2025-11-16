import { AIService } from './ai.service';
import { Module } from '@nestjs/common';
import { GroqModule } from './groq.module';

@Module({
  imports: [GroqModule],
  providers: [AIService],
  exports: [AIService],
})
export class AIModule {}
