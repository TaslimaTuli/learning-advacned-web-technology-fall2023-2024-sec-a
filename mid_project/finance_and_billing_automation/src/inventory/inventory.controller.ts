// src/inventory/inventory.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { StockItemDto } from './dto/stock-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/type/roles.decorator';
import { Role } from 'src/type/role.enum';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('create-inventory')
  @Roles('finance staff', 'admin')
  @UsePipes(ValidationPipe)
  async create(@Body() inventoryDto: StockItemDto) {
    await this.inventoryService.create(inventoryDto);
    return {
      message: 'Item created successfully!!',
    };
  }

  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('get-inventory')
  @Roles('finance staff', 'finance manager', 'admin')
  async findAll() {
    try {
      const stockItems = await this.inventoryService.findAll();
      return {
        message: 'List of Items: ',
        data: stockItems,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  //search
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('search-inventory/:itemCode')
  @Roles('finance staff', 'admin', 'finance manager')
  async findOne(@Param('itemCode') itemCode: string) {
    const stockItem = await this.inventoryService.findOne(itemCode);

    if (!stockItem) {
      return {
        message: 'Item not found :(',
      };
    }

    return {
      message: 'Item Details: ',
      data: stockItem,
    };
  }
  @UseGuards(AuthenticatedGuard)
  @Put('update/:itemCode')
  @UsePipes(ValidationPipe)
  async update(
    @Param('itemCode') itemCode: string,
    @Body() inventoryDto: StockItemDto,
  ) {
    await this.inventoryService.update(itemCode, inventoryDto);
    return {
      message: 'Item updated successfully!!',
      data: inventoryDto,
    };
  }

  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Delete('delete/:itemCode')
  @Roles('finance staff', 'admin')
  async remove(@Param('itemCode') itemCode: string) {
    await this.inventoryService.remove(itemCode);
    return {
      message: 'Stock Item deleted successfully!!',
    };
  }
}
