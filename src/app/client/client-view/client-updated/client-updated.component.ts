import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from "ngx-toastr";
import { CONTACT_NUMBER_REGEX, NAME_REGEX, PAN_REGEX } from "src/app/core/constants/constant";
import { ClientViewService } from "../client-view.service";

export interface DialogData {
  clientDetails: any;
}

@Component({
  selector: 'app-client-update',
  templateUrl: 'blank-client-update.component.html'
})

export class ClientUpdatedComponentPopUp implements OnInit {

  @Output() close = new EventEmitter();
  @Input() clientDetails;


  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.openDialog();
    }, 650);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientUpdatedComponent, {
      height: '65%',
      width: '50%',
      data: {
        clientDetails: this.clientDetails
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
  selector: 'app-client-updated-popup',
  templateUrl: './client-updated.component.html',
  styleUrls: ['./client-updated.component.scss']
})
export class ClientUpdatedComponent implements OnInit {

  clientDetails: any;
  clientForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<Body>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private clientViewService: ClientViewService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.clientDetails = this.data.clientDetails;
    this.buildClientUpdateForm();
  }


  buildClientUpdateForm() {
    this.clientForm = this.fb.group({
      firstName: [
        this.clientDetails?.firstName ? this.clientDetails?.firstName : '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(NAME_REGEX)
        ]
      ],
      lastName: [
        this.clientDetails?.lastName ? this.clientDetails?.lastName : '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern(NAME_REGEX)
        ]
      ],
      emailAddress: [
        this.clientDetails?.emailAddress ? this.clientDetails?.emailAddress : '',
        [
          Validators.required,
          Validators.email,
        ]
      ],
      contactNumber: [
        this.clientDetails?.contactNumber ? this.clientDetails?.contactNumber : '',
        [
          Validators.required,
          Validators.pattern(CONTACT_NUMBER_REGEX)
        ]
      ],
      address: [
        this.clientDetails?.address ? this.clientDetails?.address : '',
        [
          Validators.required
        ]
      ],
      pan: [
        this.clientDetails?.pan ? this.clientDetails?.pan : '',
        [
          Validators.required,
          Validators.pattern(PAN_REGEX)
        ]
      ],
      itPassword: [
        this.clientDetails?.itPassword ? this.clientDetails?.itPassword : '',
        [
          Validators.required
        ]
      ],
      remarks: [
        this.clientDetails?.remarks ? this.clientDetails?.remarks : '',
      ],
    });
  }

  


  close() {
    this.dialogRef.close();
  }


  updateClient() {
    let clientData = this.clientForm.value;
    clientData['transactionDetails'] = this.clientDetails?.transactionDetails;
    this.clientViewService.updateClient(this.clientDetails?._id, clientData).subscribe(res => { 
      this.toastr.success("Client details updated successfully", "Client update");
      this.dialogRef.close('client_updated');
    }, (error) => {
      this.toastr.error("Error while updating client details", "Client update");
    });
  }

}
