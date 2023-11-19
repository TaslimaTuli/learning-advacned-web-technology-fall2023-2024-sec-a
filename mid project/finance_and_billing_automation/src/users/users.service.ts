import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; //to hash password
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/entities/user.entity';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(registerUserDto: UserDto): Promise<User> {
    const { username, password, name, email } = registerUserDto;

    // Check if username is already taken
    const existingUsername = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    // Check if email is already taken
    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException('Email is already taken');
    }

    const salt = await bcrypt.genSalt(); //A salt is a random string
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.name = name;
    user.email = email;
    user.role = 'member';

    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }
  //created by admin
  async createByAdmin(registerUserDto: UserDto): Promise<User> {
    const { username, password, name, email, role } = registerUserDto;

    // Check if username is already taken
    const existingUsername = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    // Check if email is already taken
    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException('Email is already taken');
    }

    const salt = await bcrypt.genSalt(); //A salt is a random string
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.name = name;
    user.email = email;
    user.role = role;

    return this.userRepository.save(user);
  }
}
