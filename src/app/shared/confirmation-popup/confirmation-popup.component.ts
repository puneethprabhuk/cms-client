import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    titleText: any,
    messageText: any;
    confirmText: any,
    cancelText: any;
    action: any;

}

@Component({
    selector: 'app-confirmation-window',
    templateUrl: 'blank-confirmation-popup.component.html'
})

export class ConfWindowComponent implements OnInit {

    @Input() titleText;
    @Input() messageText;
    @Input() confirmText;
    @Input() cancelText;
    @Input() action;

    @Output() close = new EventEmitter();


    constructor(public dialog: MatDialog) {

    }

    ngOnInit(): void {
        setTimeout(() => {
            this.openDialog();
        }, 250);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(ConfirmationWindowComponent, {
            height: '30%',
            width: '30%',
            data: {
                titleText: this.titleText,
                messageText: this.messageText,
                confirmText: this.confirmText,
                cancelText: this.cancelText,
                action: this.action
            }
        })
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.close.emit(result)
            } else {
                this.close.emit({});
            }
        })
    }
}


@Component({
    selector: 'app-conf-window',
    templateUrl: 'confirmation-popup.component.html',
})


export class ConfirmationWindowComponent implements OnInit {

    titleText: any;
    messageText: any;
    cancelText: any;
    confirmText: any;
    action: any;
    confirmButtonColor = 'primary'

    constructor(public dialogRef: MatDialogRef<Body>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit(): void {
        this.titleText = this.data.titleText;
        this.messageText = this.data.messageText;
        this.confirmText = this.data.confirmText;
        this.cancelText = this.data.cancelText;
        this.action = this.data.action;
        if(this.confirmText === 'Delete') {
            this.confirmButtonColor = 'warn';
        }
    }

    closeModal() {
        this.dialogRef.close();
    }

    confirm() {
        this.dialogRef.close(this.titleText);
    }
}

