import { Component } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { AddDeviceComponent } from '../components/add-device/add-device.component';
import { DevicesService } from '../services/devices.service';
import { animate, state, style, transition, trigger, stagger, query, keyframes } from '@angular/animations';
import { BookingComponent } from '../components/booking/booking.component';
import { EmployeeService } from '../services/employee.service';
import { ToastService } from '../services/toast.service';

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
    private alertController: AlertController,
    private toastService: ToastService
  ) {
    this.devicesService.getStoredDevices();
    this.employeeService.getStoredEmployees();
  }

  deviceClicked(device: any) {
    if (this.editing) {
      this.editDevice(device);
    } else if (device.status === 'vacant') {
      this.bookDevice(device);
    } else {
      this.returnDevice(device);
    }
  }

  async addDevice() {
    const modal = await this.modalController.create({
      component: AddDeviceComponent,
      componentProps: {},
    });
    return await modal.present();
  }

  async editDevice(device: any) {
    const modal = await this.modalController.create({
      component: AddDeviceComponent,
      componentProps: { device: device },
    });
    return await modal.present();
  }

  async bookDevice(device: any) {
    const modal = await this.modalController.create({
      component: BookingComponent,
      componentProps: { device: device },
    });
    return await modal.present();
  }

  async returnDevice(device: any) {
    const alert = await this.alertController.create({
      header: 'Return Device',
      message: 'Please confirm you are returning ' + device.name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          }
        }, {
          text: 'Return',
          handler: () => {
            this.devicesService.returnDevice(device).then(() => {
              this.toastService.presentToast(
                'Thank you for returning ' + device.name
              );
            });
          }
        }
      ]
    });

    await alert.present();
  }

  clear() {
    this.devicesService.clearStoredDevices();
  }

  toggleEditing() {
    this.editing = !this.editing;
  }
}
