// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Get all users
  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  // Get a single user by ID
  findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // Create a new user
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

  // Update a user
  update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  // Delete a user
  remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
