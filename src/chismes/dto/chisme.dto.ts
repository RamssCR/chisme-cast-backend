import { IsString } from 'class-validator';

export class CreateChismeDto {
  @IsString()
  question: string;
}
