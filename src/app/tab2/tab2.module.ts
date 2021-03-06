import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { AddEmployeeComponent } from '../components/add-employee/add-employee.component';
import { SharedModule } from '../modules/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    SharedModule
  ],
  declarations: [Tab2Page],
  entryComponents: [AddEmployeeComponent],
})
export class Tab2PageModule { }
