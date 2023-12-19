// src/invoices/invoices.controller.ts
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Delete,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { InvoiceService } from './invoices.service';
import { InvoiceDto } from './dto/invoice.dto';
import { Invoice } from './entities/invoices.entity';
import { Product } from './entities/product.entity';
//import { LocalAuthGuard } from 'src/auth/local-auth.guard';
//import { AuthenticatedGuard } from 'src/auth/auth.guard';
//import { Roles } from 'src/type/roles.decorator';
//import { Role } from 'src/type/role.enum';
//import { RolesGuard } from 'src/auth/roles.guard';
//import { Invoice } from 'src/invoices/entities/invoices.entity';
import { InventoryService } from '../inventory/inventory.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoiceService) {}

  //@UseGuards(AuthenticatedGuard, ) //RolesGuard
  @Post('create')
  //@Roles('billing staff', 'admin')
  @ApiCreatedResponse({
    description: 'Invoice Created Successfully :)',
    type: Invoice,
  })
  @ApiBadRequestResponse({ description: 'Try Again :( ' })
  @UsePipes(ValidationPipe)
  async createInvoice(
    @Body() invoiceDto: InvoiceDto,
  ): Promise<{ products: Product[]; invoice: Invoice }> {
    try {
      const result = await this.invoicesService.create(invoiceDto);

      // Access the products and invoice
      const savedProducts = result.products;
      const savedInvoice = result.invoice;

      return { products: savedProducts, invoice: savedInvoice };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  //@UseGuards(AuthenticatedGuard, )//RolesGuard
  @Get('all')
  //@Roles('billing staff', 'billing manager', 'admin')
  @ApiOkResponse({
    description: 'Retrieve financial report details successfully.',
    type: Invoice,
  })
  @ApiBadRequestResponse({
    description: 'Try Again :( ',
  })
  async get(): Promise<Invoice[]> {
    return await this.invoicesService.get();
  }

  // @UseGuards(AuthenticatedGuard, RolesGuard)
  // @Delete('delete/:id')
  // @Roles('billing staff', 'admin')
  // async remove(@Param('id') id: number) {
  //   await this.invoicesService.delete(id);
  //   return {
  //     message: 'Product from invoice deleted successfully!!',
  //   };
  //

  // @Patch('update/:id')
  // @UsePipes(ValidationPipe)
  // async updateInvoice(
  //   @Param('id') id: string,
  //   @Body() updateDto: InvoiceDto,
  // ): Promise<Invoice> {
  //   const invoiceId = parseInt(id, 10);
  //   return await this.invoicesService.update(invoiceId, updateDto);
  // }
}
