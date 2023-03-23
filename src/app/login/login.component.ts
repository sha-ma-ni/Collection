import {AuthService} from "../shared/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loggedIn = false;
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });
  warning: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const values = this.loginForm.value;
    const email = values.email;
    const password =  values.password;
    console.log('values email', email)
    console.log('values password', password)

    this.auth.loginUser(email!, password!).subscribe({
        next: (response) => {
          this.warning = false;
          this.auth.login(response);
          this.loggedIn = true;
          console.log('login response',response);
          this.router.navigate(['/home'], {state: {data: {loggedIn: this.loggedIn}}});
        },
        error: (err) => {
          console.log('login error',err);
          this.warning = true;
        },
        complete: () => console.log('login completed')
      }
    )
  }
}
