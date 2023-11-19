// financial.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { FinancialService } from './financial-report.service';
import { FinancialReportDto } from '../dto/financial-report.dto';
import { FinancialReport } from '../entities/financial-report.entity';
import { AuthenticatedGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/type/roles.decorator';
import { Role } from 'src/type/role.enum';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Financial Reports')
@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('report')
  @Roles('finance staff', 'admin')
  @ApiCreatedResponse({
    description: 'Created Successfully :)',
    type: FinancialReport,
  })
  @ApiBadRequestResponse({ description: 'Try Again :( ' })
  @UsePipes(ValidationPipe)
  async createFinancialReport(
    @Body() financialReportDto: FinancialReportDto,
  ): Promise<FinancialReport> {
    try {
      return await this.financialService.createFinancialReport(
        financialReportDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Get('all-reports')
  @Roles('finance manager', 'finance staff', 'admin')
  @ApiOkResponse({
    description: 'Retrieve financial report details successfully.',
    type: FinancialReport,
  })
  @ApiBadRequestResponse({
    description: 'Try Again :( ',
  })
  async getFinancialReports(): Promise<FinancialReport[]> {
    return await this.financialService.getFinancialReports();
  }
}
