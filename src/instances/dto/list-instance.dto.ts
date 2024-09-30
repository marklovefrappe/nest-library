import { Transform } from 'class-transformer';
import { IsInt, IsPositive, Min, IsOptional } from 'class-validator';

export class ListInstanceDto {
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  @IsOptional()
  @IsInt()
  @IsPositive()
  bookId?: number;

  @Transform(({ value }) => (value ? parseInt(value, 10) : 10))
  @IsInt()
  @IsPositive()
  limit: number = 10;

  @Transform(({ value }) => (value ? parseInt(value, 10) : 1))
  @IsInt()
  @Min(1) // Ensures the page is at least 1
  page: number = 1;
}
