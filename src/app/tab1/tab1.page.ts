import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddDeviceComponent } from '../components/add-device/add-device.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private modalController: ModalController
  ) {

  }

  async addDevice() {
    const modal = await this.modalController.create({
      component: AddDeviceComponent,
      componentProps: {},
    });
    return await modal.present();
  }
}
