import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EmployeeDto } from './users/employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('create')
  create(@Body() employee: EmployeeDto) {
    this.employeeService.create(employee);
    return {
      message: `New user created`,
    };
  }

  @Get('all')
  findAll() {
    return this.employeeService.findAll();
  }

  @Get('search/:id')
  findById(@Param('id') id: number) {
    return this.employeeService.findById(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    const deletedEmployee = this.employeeService.delete(id);
    return {
      message: `Employee with ID ${id} has been deleted.`,
    };
  }
}
