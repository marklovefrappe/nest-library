import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  isbn: string;

  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsIn(['fiction', 'non_fiction'])
  type: 'fiction' | 'non_fiction';

  @IsString()
  genre: string;

  @IsString()
  briefContent: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  enable?: boolean = true;
}
