import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, Form } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss'],
})
export class AddDeviceComponent implements OnInit {
  public addDeviceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
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

  ngOnInit() { }

  close() {
    this.modalController.dismiss();
  }

  async submit(addDeviceForm: FormGroup): Promise<void> {
    if (!addDeviceForm.valid) {
      return;
    } else {
      const deviceName: string = addDeviceForm.value.deviceName;
      const platform: string = addDeviceForm.value.platform;
    }
  }

}
