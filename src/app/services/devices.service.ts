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
    return this.storage.get('devices').then((val) => {
      if (val !== null) {
        this.deviceList = val;
      }
    });
  }

  clearStoredDevices() {
    this.storage.clear();
    this.deviceList = [];
  }

  async addDevice(deviceName: string, platform: string) {
    return new Promise(async (resolve, reject) => {
      this.deviceList.push({
        name: deviceName,
        platform: platform,
        status: 'vacant',
        employee: undefined,
      });
      this.storage.set('devices', this.deviceList).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }
}
