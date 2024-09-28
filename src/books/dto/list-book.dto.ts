import {
  IsOptional,
  IsString,
  IsIn,
  IsInt,
  Min,
  IsPositive,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ListBookDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['name', 'type', 'genre', 'isbn'])
  searchType?: 'name' | 'type' | 'genre' | 'isbn';

  @IsOptional()
  @IsIn(['available', 'unavailable'])
  filter?: 'available' | 'unavailable';

  //   @Transform(({ value }) => (value ? parseInt(value, 10) : 10))
  @IsInt()
  @IsPositive()
  limit: number = 10;

  //   @Transform(({ value }) => (value ? parseInt(value, 10) : 1))
  @IsInt()
  @Min(1) // Ensures the page is at least 1
  page: number = 1;
}
