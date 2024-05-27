import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
class Company {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  name: string;
}
export class CreateUserDto {
  @IsEmail({}, { message: 'Định dạng email không đúng' })
  @IsNotEmpty({ message: 'Email không được để trốnng' })
  email: string;
  @IsNotEmpty({ message: 'Password không được để trống' })
  password: string;
  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;
  @IsNotEmpty({ message: 'Age không được để trống' })
  age: number;
  @IsNotEmpty({ message: 'Phone không được để trống' })
  phone: string;
  @IsNotEmpty({ message: 'Gender không được để trống' })
  gender: string;
  @IsNotEmpty({ message: 'Role không được để trống' })
  role: string;
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
  @IsNotEmpty({ message: 'Address không được để trống' })
  address: string;
  refreshToken: string;
  createAt: Date;
  updateAt: Date;
}
