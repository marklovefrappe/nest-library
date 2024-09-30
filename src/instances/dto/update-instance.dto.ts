import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class UpdateInstanceDto {
  @IsOptional()
  @IsEnum(['available', 'rented', 'damaged'], {
    message: 'Status must be either available, rented, or damaged',
  })
  status?: 'available' | 'rented' | 'damaged';

  @IsOptional()
  @IsString()
  bookCondition?: string;

  @IsOptional()
  @IsDateString({}, { message: 'dueDate must be a valid ISO date string' })
  dueDate?: string;

  @IsOptional()
  @IsBoolean({ message: 'rentedOut must be a boolean' })
  rentedOut?: boolean;

  @IsOptional()
  @IsString()
  location?: string;
}
