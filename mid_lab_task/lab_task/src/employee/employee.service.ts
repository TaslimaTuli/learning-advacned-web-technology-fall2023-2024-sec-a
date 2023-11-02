import { Injectable } from '@nestjs/common';
import { EmployeeDto } from './users/employee.dto';
@Injectable()
export class EmployeeService {
  private employees: EmployeeDto[] = [];

  create(employee: EmployeeDto) {
    this.employees.push(employee);
  }

  findById(id: number): EmployeeDto {
    return this.employees[id];
  }

  findAll(): EmployeeDto[] {
    return this.employees;
  }

  delete(id: number): EmployeeDto {
    const index = this.employees.findIndex((employee) => employee.id === id);
    const deletedEmployee = this.employees.splice(index, 1)[0];

    return deletedEmployee;
  }
}
