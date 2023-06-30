import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { TYPE_OF_ASSIGNMENT, MODE_OF_FILING, STATUS, NAME_REGEX, CONTACT_NUMBER_REGEX, NUMBER_REGEX, ADD_CLIENT_TITLE, ADD_CLIENT_MESSAGE, SOMETHING_WENT_WRONG, PAN_REGEX, EMAIL_REGEX } from '../../core/constants/constant'
import { ClientAddService } from './client-add.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';


@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  typeOfAssignment = TYPE_OF_ASSIGNMENT;
  modeOfFiling = MODE_OF_FILING;
  statusList = STATUS;
  clientForm: FormGroup;
  currentYear = moment().format('YYYY');
  nextYear: any;
  financialYear: any;
  assessmentYear: any;
  hidePassword = true;

  
  constructor(private fb: FormBuilder,
    private clientAddService: ClientAddService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.nextYear = parseInt(this.currentYear) + 1;
    this.financialYear = `${(Number(this.currentYear) - 1).toString()}-${(Number(this.currentYear)).toString().slice(-2)}`;
    this.assessmentYear = `${this.currentYear.toString()}-${this.nextYear.toString().slice(-2)}`
    this.buildClientForm();
  }

  buildClientForm() {
    this.clientForm = this.fb.group({
      firstName: ['', {
        validators: [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(NAME_REGEX)
        ],
        updateOn: 'blur'
      }],
      lastName: ['', {
        validators: [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(NAME_REGEX)
        ],
        updateOn: 'blur'
      }],
      contactNumber: ['', {
        validators: [
          Validators.required,
          Validators.pattern(CONTACT_NUMBER_REGEX)
        ],
        updateOn: 'blur'
      }],
      emailAddress: ['', {
        validators: [
          Validators.required,
          Validators.pattern(EMAIL_REGEX)
        ],
        updateOn: 'blur'
      }],
      pan: ['', {
        validators: [
          Validators.required,
          Validators.pattern(PAN_REGEX)
        ],
        updateOn: 'blur'
      }
      ],
      itPassword: ['', [Validators.required]],
      address: ['', [Validators.required]],
      typeOfAssignment: ['', [Validators.required]],
      fees: ['', [
        Validators.required,
        Validators.pattern(NUMBER_REGEX)
      ]],
      totalIncome: ['', [
        Validators.required,
        Validators.pattern(NUMBER_REGEX)
      ]],
      netIncome: ['', [
        Validators.required,
        Validators.pattern(NUMBER_REGEX)
      ]],
      taxPaid: ['', [
        Validators.required,
        Validators.pattern(NUMBER_REGEX)
      ]],
      taxRefund: ['', [
        Validators.required,
        Validators.pattern(NUMBER_REGEX)
      ]],
      modeOfFiling: ['', [Validators.required]],
      dateOfFiling: ['', [Validators.required]],
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
        totalIncome: this.clientForm.value.totalIncome,
        netIncome: this.clientForm.value.netIncome,
        taxPaid: this.clientForm.value.taxPaid,
        taxRefund: this.clientForm.value.taxRefund,
        modeOfFiling: this.clientForm.value.modeOfFiling,
        dateOfFiling: this.clientForm.value.dateOfFiling,
        status: this.clientForm.value.status,
      }
    ]

    this.clientForm.value.transactionDetails = transactionDetails;
    this.clientAddService.saveClient(this.clientForm.value).subscribe(res => {
      this.clearClient();
      this.toastr.success(ADD_CLIENT_MESSAGE, ADD_CLIENT_TITLE);
    }, (error) => {
      if (error.error && error.error.code) {
        this.toastr.error(error.error.message, ADD_CLIENT_TITLE);
      } else {
        this.toastr.error(SOMETHING_WENT_WRONG, ADD_CLIENT_TITLE);
      }
    });
  }

  clearClient() {
    this.clientForm.reset({});
    // Object.keys(this.clientForm.controls).forEach(key => {
    //   this.clientForm.controls[key].setErrors(null)
    // });
  }
}
