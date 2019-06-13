import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmployeeService } from 'src/app/services/employee.service';
import { DevicesService } from 'src/app/services/devices.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  public searchForm: FormGroup;
  public employeeSelectedId: any;
  public employeeSelected: any;
  public device: any;

  constructor(
    private modalController: ModalController,
    public employeeService: EmployeeService,
    private devicesService: DevicesService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      employeeName: ['',],
    });
  }

  ngOnInit() { }


  close() {
    this.modalController.dismiss();
  }

  select(employee) {
    this.employeeSelected = employee;
  }

  book() {
    this.devicesService.bookDevice(this.device, this.employeeSelected).then(() => {
      this.modalController.dismiss();
      this.toastService.presentToast(
        'Thanks ' + this.employeeSelected.firstName + ', you are now responsible for this device, please return it at the end of the day'
      );
    });
  }

}
