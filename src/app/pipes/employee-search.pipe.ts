import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeSearch'
})
export class EmployeeSearchPipe implements PipeTransform {

  transform(employees: any[], searchTerm: any): any {
    if (!employees) {
      return [];
    }
    if (!searchTerm) {
      return employees;
    }
    searchTerm = searchTerm.toLowerCase();
    return employees.filter(employee => {
      let searchString = employee.firstName + ' ' + employee.lastName;
      return searchString.toLowerCase().includes(searchTerm);
    });
  }

}
