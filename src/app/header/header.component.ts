import { Component, OnInit } from '@angular/core';
import { AuthService } from "../shared/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(
    private as: AuthService
  ) { }

  ngOnInit(): void {
  }
  checkIfLoggedIn(): boolean {
    this.loggedIn = this.as.isLoggedin();
    return this.loggedIn;
  }

  logout(): void {
    this.as.logout();
  }

}
