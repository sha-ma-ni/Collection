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
  hide = true; //Password sichtbar/unsichtbar
  loggedIn = false;
  
 // Initialisierung des Formulars mit E-Mail und Passwort
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });
  warning: boolean; //zeig,ob Fehlermeldung biem Login angezeigt werden soll

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  // Überprüfen, ob das Formular gültig ist, bevor die Anfrage gesendet wird
  onSubmit(): void {
    // die Werte aus dem Formular extrahieren
    const values = this.loginForm.value;
    const email = values.email;
    const password =  values.password;
    console.log('values email', email)
    console.log('values password', password)

    //LoginUser-Methode aufrufen, um Authentifizirung durchzuführen
    this.auth.loginUser(email!, password!).subscribe({
        next: (response) => {
          this.warning = false; //deaktiviert, wenn Login erfolgreich
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
