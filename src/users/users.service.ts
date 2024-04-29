import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { ValidationService } from 'src/utils/validateHelper';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly validationService: ValidationService,
  ) {}

  // Handle hash password
  hashPassword(password: string) {
    var salt = genSaltSync(10);
    var hash = hashSync(password, salt);
    return hash;
  }
  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.hashPassword(createUserDto.password);
    Object.assign(createUserDto, {
      password: hashPassword,
    });
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  findAll() {
    return `This action returns all users`;
  }
  // Get user by id
  findOne(id: string) {
    const idErr = this.validationService.checkValidId(id);
    if (idErr) return idErr;

    return this.userModel
      .findOne({
        _id: id,
      })
      .then((data) => {
        if (!data) return idErr;
      });
  }

  async update(updateUserDto: UpdateUserDto) {
    const idErr = this.validationService.checkValidId(updateUserDto._id);
    if (idErr) return idErr;

    return await this.userModel.updateOne(
      {
        _id: updateUserDto._id,
      },
      { ...updateUserDto },
    );
  }

  async remove(id: string) {
    const idErr = this.validationService.checkValidId(id);
    if (idErr) return idErr;
    return await this.userModel.findByIdAndRemove(id);
  }
}
