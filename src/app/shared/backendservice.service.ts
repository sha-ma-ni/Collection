import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Figure, Set } from "./data";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {
  baseUrl = 'http://localhost:3000/';


  constructor(private http: HttpClient) {
  };

  //FIGURE--------------------------------------------------------------------------------
  getAllfigures():
    Observable<Figure[]> {
    return this.http.get<Figure[]>(this.baseUrl + 'allfigures');
  };

  getFigureById(id: string): Observable<Figure> {
    return this.http.get<Figure>(this.baseUrl + 'allfigures/' + id)
  }

  createfigure(figure: Figure): void {
    this.http.post<Figure>(this.baseUrl + 'figure', figure)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  deleteFigure(id: string): Observable<Figure> {
    return this.http.delete<Figure>(this.baseUrl + 'figures/' + id)
  }

  updateFigure(id: string, figure: Figure): Observable<Figure> {
    return this.http.patch<Figure>(this.baseUrl + 'figures/' + id, figure);
  }


  //SET--------------------------------------------------------------------------------------
  getAllsets():
    Observable<Set[]> {
    return this.http.get<Set[]>(this.baseUrl + 'allsets');
  };

  deleteSet(id: string): Observable<Set> {
    return this.http.delete<Set>(this.baseUrl + 'sets/' + id)
  }

  getSetById(id: string): Observable<Set> {
    return this.http.get<Set>(this.baseUrl + 'allsets/' + id)
  }

  createset(set: Set): void {
    this.http.post<Set>(this.baseUrl + 'set', set)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateSet(id: string, set: Set):
    Observable<Set> {
    return this.http.patch<Set>(this.baseUrl + 'sets/' + id, set);
  }
}
