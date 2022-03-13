import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { TYPE_OF_ASSIGNMENT, STATUS, NUMBER_REGEX } from "src/app/core/constants/constant";
import { ClientViewService } from "../client-view.service";


export interface DialogData {
  transactionDetails: any;
  clientId: any;
}

@Component({
  selector: 'app-transaction-add',
  templateUrl: 'blank-transaction-add.component.html'
})

export class TransactionAddComponentPopup implements OnInit {

  @Output() close = new EventEmitter();
  @Input() transactionDetails;
  @Input() clientId;


  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.openDialog();
    }, 650);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TransactionAddComponent, {
      height: '65%',
      width: '50%',
      data: {
        transactionDetails: this.transactionDetails,
        clientId: this.clientId
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.close.emit(result)
      } else {
        this.close.emit({});
      }
    })
  }
}

@Component({
  selector: 'app-transaction-add-dialog',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss']
})
export class TransactionAddComponent implements OnInit {

  transactionForm: FormGroup;
  transactionDetails: any;
  formTitle: string;
  buttonText: string;
  typeOfAssignment = TYPE_OF_ASSIGNMENT;
  statusList = STATUS;
  clientId: any;
  currentYear = moment().format('YYYY');
  nextYear: any;
  nextAssessmentYear: any;
  financialYear: any;
  assessmentYear: any;

  constructor(public dialogRef: MatDialogRef<Body>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private clientViewService: ClientViewService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.nextYear = parseInt(this.currentYear) + 1;
    this.nextAssessmentYear = this.nextYear + 1;
    this.financialYear = `${this.currentYear}-${this.nextYear.toString().slice(-2)}`;
    this.assessmentYear = `${this.nextYear.toString()}-${this.nextAssessmentYear.toString().slice(-2)}`
    this.transactionDetails = this.data.transactionDetails;
    this.clientId = this.data.clientId;
    if (this.transactionDetails) {
      this.formTitle = "Update transaction";
      this.buttonText = "Update";
    } else {
      this.formTitle = "Add new transaction";
      this.buttonText = "Add";
    }
    this.buildTransactionForm();
  }

  buildTransactionForm() {
    this.transactionForm = this.fb.group({
      typeOfAssignment: [this.transactionDetails ? this.transactionDetails.typeOfAssignment : '',
      [
        Validators.required
      ]
      ],
      fees: [this.transactionDetails ? this.transactionDetails.fees : '',
      [
        Validators.required,
        Validators.pattern(NUMBER_REGEX)
      ]
      ],
      financialYear: [this.transactionDetails ? this.transactionDetails.financialYear : this.financialYear,
      [
        Validators.required
      ]
      ],
      assessmentYear: [this.transactionDetails ? this.transactionDetails.assessmentYear : this.assessmentYear,
      [
        Validators.required
      ]
      ],
      status: [this.transactionDetails ? this.transactionDetails.status : '',
      [
        Validators.required
      ]
      ],
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  addTransaction() {
    if(this.transactionDetails) {
      let transactionDetails = this.transactionForm.value;
      transactionDetails._id = this.transactionDetails?._id;
      this.clientViewService.updateTransaction(this.clientId, transactionDetails).subscribe(res => {
        this.toastr.success("Transaction updated successfully", "Transaction Update");
        this.dialogRef.close('transaction_updated');
      }, (error) => {
        this.toastr.error("Error while updating transaction", "Transaction update");
      });
    } else {
      this.clientViewService.addTransaction(this.clientId, this.transactionForm.value).subscribe(res => {
        this.toastr.success("Transaction added successfully", "Transaction Add");
        this.dialogRef.close('transaction_updated');
      }, (error) => {
        this.toastr.error("Error while adding transaction", "Transaction add");
      });
    }
  }
}
