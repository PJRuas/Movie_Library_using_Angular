import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../../models/alert';

@Component({
  selector: 'dio-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alert = {
    title: 'Done!',
    description: 'Your request was completed with success.',
    btnSuccess: 'OK',
    btnCancel: 'Cancel',
    colorBtnSuccess: 'accent',
    colorBtnCancel: 'warn',
    hasBtnClose: false
  } as Alert;

  constructor(public dialogRef: MatDialogRef<AlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Alert) { }

  ngOnInit() {
    if (this.data) {
      this.alert.title = this.data.title || this.alert.title;
      this.alert.description = this.data.description || this.alert.description;
      this.alert.btnSuccess = this.data.btnSuccess || this.alert.btnSuccess;
      this.alert.btnCancel = this.data.btnCancel || this.alert.btnCancel;
      this.alert.colorBtnSuccess = this.data.colorBtnSuccess || this.alert.colorBtnSuccess;
      this.alert.colorBtnCancel = this.data.colorBtnCancel || this.alert.colorBtnCancel;
      this.alert.hasBtnClose = this.data.hasBtnClose || this.alert.hasBtnClose;
    }
  }

}
