import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateInstanceDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  bookId: number;

  @IsString()
  bookCondition: string;

  @IsString()
  location: string;
}
