import { Component } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { AddDeviceComponent } from '../components/add-device/add-device.component';
import { DevicesService } from '../services/devices.service';
import { animate, state, style, transition, trigger, stagger, query, keyframes } from '@angular/animations';
import { BookingComponent } from '../components/booking/booking.component';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  animations: [
    trigger('editingBanner', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.2s ease-in', style(
          { transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('0.2s ease-out',
          style({ transform: 'translateY(-100%)' }))
      ])
    ]),
  ],
})
export class Tab1Page {
  public loading: boolean;
  public editing = false;

  constructor(
    private modalController: ModalController,
    public devicesService: DevicesService,
    private employeeService: EmployeeService,
  ) {
    this.devicesService.getStoredDevices();
    this.employeeService.getStoredEmployees();
  }

  async addDevice() {
    const modal = await this.modalController.create({
      component: AddDeviceComponent,
      componentProps: {},
    });
    return await modal.present();
  }

  async book(device: any) {
    const modal = await this.modalController.create({
      component: BookingComponent,
      componentProps: { device: device },
    });
    return await modal.present();
  }

  clear() {
    this.devicesService.clearStoredDevices();
  }

  toggleEditing() {
    this.editing = !this.editing;
  }
}
