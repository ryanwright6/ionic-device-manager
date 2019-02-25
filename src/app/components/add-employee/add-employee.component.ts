import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, Form } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  public addEmployeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private employeeService: EmployeeService,
    private toastService: ToastService,
  ) {

    this.addEmployeeForm = this.formBuilder.group({
      firstName: [
        '',
        Validators.compose([Validators.required]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.required]),
      ],
      department: [
        '',
        Validators.compose([Validators.required]),
      ],
    });
  }

  ngOnInit() { }

  close() {
    this.modalController.dismiss();
  }

  async submit(addEmployeeForm: FormGroup): Promise<void> {
    if (!addEmployeeForm.valid) {
      return;
    } else {
      const firstName: string = addEmployeeForm.value.firstName;
      const lastName: string = addEmployeeForm.value.lastName;
      const department: string = addEmployeeForm.value.department;
      this.employeeService.addEmployee(firstName, lastName, department).then(() => {
        this.modalController.dismiss();
        this.toastService.presentToast(
          firstName + lastName + ' was successfully added to the Roller employee list'
        );
      });
    }
  }
}
