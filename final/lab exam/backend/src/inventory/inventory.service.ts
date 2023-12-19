// src/inventory/inventory.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entitie/inventory.entity';
import { StockItemDto } from './dto/stock-item.dto';
//import { User } from '../users/entities/user.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    // @InjectRepository(User)
    // private readonly UserRepository: Repository<User>,
  ) {}

  async create(inventoryDto: StockItemDto): Promise<void> {
    //check existing itemCode
    const { itemCode } = inventoryDto;
    const existingUsername = await this.inventoryRepository.findOne({
      where: { itemCode },
    });
    if (existingUsername) {
      throw new ConflictException('Product already exists!');
    }

    const inventory = this.inventoryRepository.create(inventoryDto);
    await this.inventoryRepository.save(inventory);
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.find();
  }

  async findOne(itemCode: string): Promise<Inventory | undefined> {
    return this.inventoryRepository.findOne({ where: { itemCode } });
  }

  async update(itemCode: string, inventoryDto: StockItemDto): Promise<void> {
    const existingInventory = await this.inventoryRepository.findOne({
      where: { itemCode },
    });

    if (!existingInventory) {
      throw new NotFoundException(
        `Inventory with itemCode '${itemCode}' not found`,
      );
    }

    await this.inventoryRepository.update(existingInventory.id, inventoryDto);
  }

  async remove(itemCode: string): Promise<void> {
    const existingInventory = await this.inventoryRepository.findOne({
      where: { itemCode },
    });

    if (!existingInventory) {
      throw new NotFoundException(
        `Inventory with itemCode '${itemCode}' not found`,
      );
    }

    await this.inventoryRepository.remove(existingInventory);
  }
}
