import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { IsValidRole } from './custom-validator';

export enum ROLE {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  //---
  // @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
  //   message: 'Valid Role is Required',
  // })

  //---
  // @IsEnum([{ INTERN: 'INTERN', ENGINEER: 'ENGINEER', ADMIN: 'ADMIN' }]) // ok

  //---
  // @IsEnum(ROLE, { message: `Valid Role is Required` }) // ok
  // role: string;

  //---
  // @IsString()
  // @Validate(IsValidRole, { message: 'Valid Role is Required' })
  // @IsEnum(ROLE)
  // role: ROLE;

  //---

  @IsString()
  @Validate(IsValidRole)
  @IsEnum(ROLE)
  role: ROLE;
}
