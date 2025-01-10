import {Injectable} from '@angular/core';
import {User} from "./data";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/';

  user!: User | null;
  loggedIn = false;

  constructor(private http: HttpClient) {
  }
// Registriert einen neuen Benutzer
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'adduser/', user);
  }
// Überprüft, ob der Benutzer eingeloggt ist
  isLoggedin(): boolean {
    return this.loggedIn;
  }
//Benutzer eingeloggt und gespeichert
  login(user: User): void {
    this.loggedIn = true;
    this.user = user;
  }

  logout(): void {
    this.loggedIn = false;
    this.user = null;
  }
//angemeldeter Benutzer
  getUser(): User | null {
    return this.user;
  }
//prüft,ob Email bereits exestiert
  checkIfExists(email: null | undefined): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + email);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'login/', {email: email, password: password});
  }
}
