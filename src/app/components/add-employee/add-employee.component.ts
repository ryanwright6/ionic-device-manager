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
  public employee: any;
  public editing: boolean;
  public title = 'Add New Employee';
  public description = 'Complete the form below and press submit to add a new employee.';

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
      position: [
        '',
        Validators.compose([Validators.required]),
      ],
    });
  }

  ngOnInit() {
    if (this.employee !== undefined) {
      this.editing = true;
      this.title = 'Edit Employee';
      this.description = 'Edit the form below and press save to make your changes';
      this.addEmployeeForm.get('firstName').setValue(this.employee.firstName);
      this.addEmployeeForm.get('lastName').setValue(this.employee.lastName);
      this.addEmployeeForm.get('position').setValue(this.employee.position);
      this.addEmployeeForm.get('department').setValue(this.employee.department);
    }
  }

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
      const position: string = addEmployeeForm.value.position;
      if (this.editing !== true) {
        this.employeeService.addEmployee(firstName, lastName, department, position).then(() => {
          this.modalController.dismiss();
          this.toastService.presentToast(
            firstName + ' ' + lastName + ' was successfully added to the Roller employee list'
          );
        });
      } else {
        const id = this.employee.id;
        this.employeeService.editEmployee(firstName, lastName, department, position, id).then(() => {
          this.modalController.dismiss();
          this.toastService.presentToast(
            firstName + ' ' + lastName + ' was successfully updated'
          );
        });
      }
    }
  }
}
