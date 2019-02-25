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
        checkedOut: undefined,
      });
      this.storage.set('devices', this.deviceList).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  async editDevice(deviceName: string, platform: string, oldDeviceInfo: any) {
    return new Promise(async (resolve, reject) => {
      const index = await this.deviceList.findIndex(obj => {
        return obj.name === oldDeviceInfo.name;
      });
      this.deviceList[index] = {
        name: deviceName,
        platform: platform,
        status: oldDeviceInfo.status,
        employee: oldDeviceInfo.employee,
        checkedOut: oldDeviceInfo.checkedOut,
      };
      this.storage.set('devices', this.deviceList).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  async deleteDevice(device: any) {
    return new Promise(async (resolve, reject) => {
      const index = await this.deviceList.findIndex(obj => {
        return obj.name === device.name;
      });
      this.deviceList.splice(index, 1);
      this.storage.set('devices', this.deviceList).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  async bookDevice(device: any, employee: any) {
    return new Promise(async (resolve, reject) => {
      const index = await this.deviceList.findIndex(obj => {
        return obj.name === device.name;
      });
      const currentDate = Date.now();
      this.deviceList[index] = {
        name: device.name,
        platform: device.platform,
        status: 'occupied',
        employee: employee,
        checkedOut: currentDate,
      };
      this.storage.set('devices', this.deviceList).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }

  async returnDevice(device: any) {
    return new Promise(async (resolve, reject) => {
      const index = await this.deviceList.findIndex(obj => {
        return obj.name === device.name;
      });
      this.deviceList[index] = {
        name: device.name,
        platform: device.platform,
        status: 'vacant',
        employee: undefined,
        checkedOut: undefined,
      };
      this.storage.set('devices', this.deviceList).then(() => {
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  }
}
