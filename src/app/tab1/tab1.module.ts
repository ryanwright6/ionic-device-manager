import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { SharedModule } from '../modules/shared/shared.module';
import { AddDeviceComponent } from '../components/add-device/add-device.component';
import { BookingComponent } from '../components/booking/booking.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    SharedModule,
  ],
  declarations: [Tab1Page],
  entryComponents: [AddDeviceComponent, BookingComponent],
})
export class Tab1PageModule { }
