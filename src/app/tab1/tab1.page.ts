import { Component } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { AddDeviceComponent } from '../components/add-device/add-device.component';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public loading: boolean;

  constructor(
    private modalController: ModalController,
    public devicesService: DevicesService,
  ) {
    this.populateDevices();
  }

  async populateDevices() {
    this.loading = true;
    this.devicesService.getStoredDevices().then(() => {
      this.loading = false;
    });
  }

  async addDevice() {
    const modal = await this.modalController.create({
      component: AddDeviceComponent,
      componentProps: {},
    });
    return await modal.present();
  }

  clear() {
    this.devicesService.clearStoredDevices();
  }
}
