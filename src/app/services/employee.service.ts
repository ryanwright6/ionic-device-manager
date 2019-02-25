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

  async addEmployee(firstName: string, lastName: string, department: string, position: string) {
    return new Promise(async (resolve, reject) => {
      const token = (Math.random() + 1).toString(36).substr(2, 10);
      this.employeeList.push({
        firstName: firstName,
        lastName: lastName,
        department: department,
        position: position,
        id: token
      });
      this.storage.set('employees', this.employeeList).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }


  async editEmployee(firstName: string, lastName: string, department: string, position: string, id: string) {
    return new Promise(async (resolve, reject) => {
      const index = await this.employeeList.findIndex(employee => {
        return id === employee.id;
      });
      this.employeeList[index] = {
        firstName: firstName,
        lastName: lastName,
        department: department,
        position: position,
        id: id,
      };
      this.storage.set('employees', this.employeeList).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  async deleteEmployee(id: string) {
    return new Promise(async (resolve, reject) => {
      const index = await this.employeeList.findIndex(employee => {
        return id === employee.id;
      });
      this.employeeList.splice(index, 1);
      this.storage.set('employees', this.employeeList).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

}
