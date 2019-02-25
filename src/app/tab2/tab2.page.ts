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
  }

  headerColour(department: string) {
    let colour;
    switch (department) {
      case 'Marketing': colour = { background: '#7044ff' };
        break;
      case 'Commercial': colour = { background: '#0cd1e8' };
        break;
      case 'Development': colour = { background: '#3880ff' };
        break;
      case 'Design': colour = { background: '#10dc60' };
        break;
      case 'Project Management': colour = { background: '#ff9f05' };
        break;
      case 'Management': colour = { background: '#0eccac' };
        break;
      default:
    }
    return colour;

  }

  async addEmployee() {
    const modal = await this.modalController.create({
      component: AddEmployeeComponent,
      componentProps: {},
    });
    return await modal.present();
  }

  async editEmployee(employee: any) {
    const modal = await this.modalController.create({
      component: AddEmployeeComponent,
      componentProps: { employee: employee },
    });
    return await modal.present();
  }
}
