import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import { GROQ_CLIENT } from '#common/utils/constants';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: GROQ_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        new Groq({
          apiKey: config.get<string>('GROQ_API_KEY'),
        }),
    },
  ],
  exports: [GROQ_CLIENT],
})
export class GroqModule {}
