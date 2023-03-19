import {Component, Inject} from '@angular/core';
import {DialogData} from "../register/register.component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
