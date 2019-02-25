import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDeviceComponent } from 'src/app/components/add-device/add-device.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from 'src/app/components/add-employee/add-employee.component';

@NgModule({
  declarations: [
    AddDeviceComponent,
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    AddDeviceComponent,
    AddEmployeeComponent
  ],
})
export class SharedModule { }
