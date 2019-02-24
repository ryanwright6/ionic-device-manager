import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  public deviceList: Array<any> = [];

  constructor(
    private storage: Storage
  ) {
  }

  getStoredDevices() {
    this.storage.get('devices').then((val) => {
      this.deviceList = val;
      console.log('Here are the devices', val);
    });
  }
}
