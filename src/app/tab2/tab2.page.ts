import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ModalController } from '@ionic/angular';
import { AddEmployeeComponent } from '../components/add-employee/add-employee.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public loading: boolean;
  constructor(
    public employeeService: EmployeeService,
    private modalController: ModalController
  ) {
    this.populateEmployees();
  }

  async populateEmployees() {
    this.loading = true;
    this.employeeService.getStoredEmployees().then(() => {
      this.loading = false;
    });
  }

  async addEmployee() {
    const modal = await this.modalController.create({
      component: AddEmployeeComponent,
      componentProps: {},
    });
    return await modal.present();
  }
}
