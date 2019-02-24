import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDeviceComponent } from 'src/app/components/add-device/add-device.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AddDeviceComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AddDeviceComponent
  ],
})
export class SharedModule { }
