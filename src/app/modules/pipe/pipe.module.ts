import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeSearchPipe } from 'src/app/pipes/employee-search.pipe';

@NgModule({
  declarations: [
    EmployeeSearchPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    EmployeeSearchPipe
  ]
})
export class PipeModule { }
