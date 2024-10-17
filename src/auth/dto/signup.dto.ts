import {
  IsString,
  IsEmail,
  IsOptional,
  IsIn,
  Matches,
  Min,
  Max,
  IsStrongPassword,
} from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  // This regex ensures the phone number starts with 0 and is 10 digits long
  @IsOptional()
  @Matches(/^0\d{9}$/, {
    message: 'Phone number must be 10 digits and start with 0',
  })
  phoneNumber?: string;

  @IsIn(['user', 'admin'])
  role: 'user' | 'admin';
}
