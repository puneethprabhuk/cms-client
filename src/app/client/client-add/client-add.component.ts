import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { TYPE_OF_ASSIGNMENT, STATUS, NAME_REGEX, CONTACT_NUMBER_REGEX, NUMBER_REGEX, ADD_CLIENT_TITLE, ADD_CLIENT_MESSAGE, SOMETHING_WENT_WRONG } from '../../core/constants/constant'
import { ClientAddService } from './client-add.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';


@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  typeOfAssignment = TYPE_OF_ASSIGNMENT
  statusList = STATUS;
  clientForm: FormGroup;
  currentYear = moment().format('YYYY');
  nextYear: any;
  nextAssessmentYear: any;
  financialYear: any;
  assessmentYear: any;
  
  constructor(private fb: FormBuilder,
    private clientAddService: ClientAddService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.nextYear = parseInt(this.currentYear) + 1;
    this.nextAssessmentYear = this.nextYear + 1;
    this.financialYear = `${this.currentYear}-${this.nextYear.toString().slice(-2)}`;
    this.assessmentYear = `${this.nextYear.toString()}-${this.nextAssessmentYear.toString().slice(-2)}`

    this.buildClientForm();
  }

  buildClientForm() {
    this.clientForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern(NAME_REGEX)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern(NAME_REGEX)
      ]],
      contactNumber: ['', [
        Validators.required,
        Validators.pattern(CONTACT_NUMBER_REGEX)
      ]],
      emailAddress: ['', [
        Validators.required,
        Validators.email
      ]],
      address: ['', [Validators.required]],
      typeOfAssignment: ['', [Validators.required]],
      fees: ['', [
        Validators.required,
        Validators.pattern(NUMBER_REGEX)
      ]],
      financialYear: [this.financialYear, [Validators.required]],
      assessmentYear: [this.assessmentYear, [Validators.required]],
      remarks: [''],
      status: ['', [Validators.required]],
    })
  }

  saveClient() {
    let transactionDetails = [
      {
        typeOfAssignment: this.clientForm.value.typeOfAssignment,
        financialYear: this.clientForm.value.financialYear,
        assessmentYear: this.clientForm.value.assessmentYear,
        fees: this.clientForm.value.fees,
        status: this.clientForm.value.status,
      }
    ]

    this.clientForm.value.transactionDetails = transactionDetails;
    this.clientAddService.saveClient(this.clientForm.value).subscribe(res => {
      this.clearClient();
      this.toastr.success(ADD_CLIENT_MESSAGE, ADD_CLIENT_TITLE);
    }, (error) => {
      if(error.error && error.error.code) {
        this.toastr.error(error.error.message, ADD_CLIENT_TITLE);
      } else {
        this.toastr.error(SOMETHING_WENT_WRONG, ADD_CLIENT_TITLE);
      }
    });
  }

  clearClient() {
    this.clientForm.reset({});
    Object.keys(this.clientForm.controls).forEach(key =>{
      this.clientForm.controls[key].setErrors(null)
    });
  }
}
