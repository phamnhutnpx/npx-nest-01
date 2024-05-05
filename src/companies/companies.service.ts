import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schema/company.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { ValidationService } from 'src/utils/validateHelper';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
    private readonly validationService: ValidationService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    const createdCompany = await this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return createdCompany;
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(updateCompanyDto: UpdateCompanyDto) {
    const idErr = this.validationService.checkValidId(updateCompanyDto._id);
    if (idErr) return idErr;

    return await this.companyModel.updateOne(
      {
        _id: updateCompanyDto._id,
      },
      { ...updateCompanyDto },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
