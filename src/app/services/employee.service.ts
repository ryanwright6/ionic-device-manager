import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public employeeList: Array<any> = [];

  constructor(
    private storage: Storage
  ) { }

  getStoredEmployees() {
    return this.storage.get('employees').then((val) => {
      if (val !== null) {
        this.employeeList = val;
      }
    });
  }

  async addEmployee(firstName: string, lastName: string, position: string) {
    return new Promise(async (resolve, reject) => {
      this.employeeList.push({
        firstName: firstName,
        lastName: lastName,
        position: position,
      });
      this.storage.set('employees', this.employeeList).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

}
