import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDeviceComponent } from 'src/app/components/add-device/add-device.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from 'src/app/components/add-employee/add-employee.component';
import { BookingComponent } from 'src/app/components/booking/booking.component';
import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  declarations: [
    AddDeviceComponent,
    AddEmployeeComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    PipeModule
  ],
  exports: [
    AddDeviceComponent,
    AddEmployeeComponent,
    BookingComponent
  ],
})
export class SharedModule { }
