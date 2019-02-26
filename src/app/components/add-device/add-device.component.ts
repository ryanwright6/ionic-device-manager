import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, Form } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DevicesService } from 'src/app/services/devices.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent implements OnInit {
  public addDeviceForm: FormGroup;
  public device: any;
  public editing: boolean;
  public title = 'Add New Device';
  public description = 'Complete the form below and press submit to add a new device.';
  public alreadyExists = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private devicesService: DevicesService,
    private toastService: ToastService,
  ) {

    this.addDeviceForm = this.formBuilder.group({
      deviceName: [
        '',
        Validators.compose([Validators.required]),
      ],
      platform: [
        '',
        Validators.compose([Validators.required]),
      ],
    });
  }

  ngOnInit() {
    if (this.device !== undefined) {
      this.editing = true;
      this.title = 'Edit Device';
      this.description = 'Edit the form below and press save to make your changes';
      this.addDeviceForm.get('deviceName').setValue(this.device.name);
      this.addDeviceForm.get('platform').setValue(this.device.platform);
    }
  }

  close() {
    this.modalController.dismiss();
  }

  async submit(addDeviceForm: FormGroup): Promise<void> {
    if (!addDeviceForm.valid) {
      return;
    } else {
      const deviceName: string = addDeviceForm.value.deviceName;
      const platform: string = addDeviceForm.value.platform;
      const index = await this.devicesService.deviceList.findIndex(obj => {
        return obj.name === deviceName;
      });
      if (index === -1) {
        if (this.editing !== true) {
          this.addDevice(deviceName, platform);
        } else {
          this.updateDevice(deviceName, platform, this.device);
        }
      } else {
        this.toastService.presentToast(
          deviceName + ' already exists, devices must have a unique name!'
        );
      }
    }
  }

  addDevice(deviceName: string, platform: string) {
    this.devicesService.addDevice(deviceName, platform).then(() => {
      this.modalController.dismiss();
      this.toastService.presentToast(
        deviceName + ' was successfully added to the Roller device list'
      );
    });
  }

  updateDevice(deviceName: string, platform: string, oldDeviceInfo: any) {
    this.devicesService.editDevice(deviceName, platform, this.device).then(() => {
      this.modalController.dismiss();
      this.toastService.presentToast(
        deviceName + ' was successfully updated'
      );
    });
  }

  delete() {
    this.devicesService.deleteDevice(this.device).then(() => {
      this.modalController.dismiss();
      this.toastService.presentToast(
        'The device was successfully removed from the Roller device list'
      );
    });
  }

}
