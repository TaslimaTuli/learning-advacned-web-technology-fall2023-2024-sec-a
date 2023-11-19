import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entitie/inventory.entity';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory, User]),
    //TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  providers: [InventoryService, UsersService],
  controllers: [InventoryController],
  exports: [UsersService],
})
export class InventoryModule {}
