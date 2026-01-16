// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
        role: dto.role,
        companyName: dto.companyName,
        contactInfo: dto.contactInfo,
      },
    });
  }

  // THIS MUST EXIST
  update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  // THIS MUST EXIST
  remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
