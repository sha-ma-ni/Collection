import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {User} from "../shared/data";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ConfirmComponent} from "../confirm/confirm.component";
import {response} from "express";
import {AuthService} from "../shared/auth.service";
import {Location} from "@angular/common";
import {database} from "ngx-bootstrap-icons";

export interface DialogData {
  headline: string;
  info: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide = true;
  user!: User;

  checkPasswords: ValidatorFn = (group: AbstractControl):
    ValidationErrors | null =>
  {
    let pass = this.registerForm?.get('password')?.value;
    let confirmPass = this.registerForm?.get('passwordrepeat')?.value
    return pass === confirmPass ? null : { notSame: true }

  }

  registerForm = this.fb.group({
    firstname: [null, Validators.required],
    lastname: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.compose([
      Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
      Validators.minLength(8),
      Validators.maxLength(20)])
    ],
    passwordrepeat: [null],
  }, { validators: this.checkPasswords });


  constructor(
    private fb: FormBuilder,
    private as: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private location: Location,
  ) {}

  onSubmit(): void {
    const values = this.registerForm.value;
    this.user = {
      password: values.password!,
      email: values.email!,
      firstname: values.firstname!,
      lastname: values.lastname!
    };
    console.log(this.user)
    this.as.registerUser(this.user).subscribe({
      next: (response) => {
        console.log('response', response)
        this.user = response;
        this.as.login(this.user)
        // this.openDialog({headline: "Success", info: "User " + " registered"});
      },
      error: (err) => {
        console.log(err)
        // this.openDialog({headline: "Error", info: "E-Mail already exist"});
      },
      complete: () => console.log('register completed')
    });
    this.router.navigateByUrl('');
  }

  checkIfExists(evt: any): void {
    let email = this.registerForm.get('email')?.value;
    this.as.checkIfExists(email).subscribe(
      response => {
        console.log(response);
        if(response) {
          this.openDialog("E-Mail already exist");
        }
      },
        (error) => {
        console.log(error);
      }
    );
  }

  openDialog(data: string) {
    this.dialog.open(ConfirmComponent, { data });
  }
  // openDialog() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   this.dialog.open(ConfirmComponent, dialogConfig);
  // }
  cancel(): void {
    this.location.back();
  }
}
