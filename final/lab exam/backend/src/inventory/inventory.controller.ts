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
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { StockItemDto } from './dto/stock-item.dto';
// import { AuthenticatedGuard } from 'src/auth/auth.guard';
// import { RolesGuard } from 'src/auth/roles.guard';
// import { Roles } from 'src/type/roles.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Inventory } from './entitie/inventory.entity';

@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  //@UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('create-inventory')
  //@Roles('finance staff', 'admin')
  @ApiCreatedResponse({
    description: 'Stock Item Created Successfully :)',
    type: Inventory,
  })
  @ApiBadRequestResponse({
    description: 'Create Stock Item Failed. Try Again :( ',
  })
  @UsePipes(ValidationPipe)
  async create(@Body() inventoryDto: StockItemDto) {
    try {
      await this.inventoryService.create(inventoryDto);
      return {
        message: 'Stock Item created successfully!!',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //@UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('get-inventory')
  //@Roles('finance staff', 'finance manager', 'admin')
  @ApiOkResponse({
    description: 'Retrieve all stock items successfully.',
    type: Inventory,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'Retrieve Stock Items Failed. Try Again :( ',
  })
  async findAll() {
    try {
      const stockItems = await this.inventoryService.findAll();
      return {
        message: 'List of Stock Items: ',
        data: stockItems,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //@UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('search-inventory/:itemCode')
  //@Roles('finance staff', 'admin', 'finance manager')
  @ApiOkResponse({
    description: 'Retrieve stock item details successfully.',
    type: Inventory,
  })
  @ApiBadRequestResponse({
    description: 'Retrieve Stock Item Details Failed. Try Again :( ',
  })
  async findOne(@Param('itemCode') itemCode: string) {
    try {
      const stockItem = await this.inventoryService.findOne(itemCode);

      if (!stockItem) {
        return {
          message: 'Stock Item not found :(',
        };
      }

      return {
        message: 'Stock Item Details: ',
        data: stockItem,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //@UseGuards(AuthenticatedGuard, RolesGuard)
  @Put('update/:itemCode')
  //@Roles('finance staff', 'admin')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({
    description: 'Stock Item updated successfully.',
    type: Inventory,
  })
  @ApiBadRequestResponse({
    description: 'Update Stock Item Failed. Try Again :( ',
  })
  async update(
    @Param('itemCode') itemCode: string,
    @Body() inventoryDto: StockItemDto,
  ) {
    try {
      await this.inventoryService.update(itemCode, inventoryDto);
      return {
        message: 'Stock Item updated successfully!!',
        data: inventoryDto,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //@UseGuards(AuthenticatedGuard, RolesGuard)
  @Delete('delete/:itemCode')
  //@Roles('finance staff', 'admin')
  @ApiOkResponse({ description: 'Stock Item deleted successfully.' })
  @ApiBadRequestResponse({
    description: 'Delete Stock Item Failed. Try Again :( ',
  })
  async remove(@Param('itemCode') itemCode: string) {
    try {
      await this.inventoryService.remove(itemCode);
      return {
        message: 'Stock Item deleted successfully!!',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
