import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Figure, User} from "./data";
import {Set} from "./data";
import {Observable} from "rxjs";
import {response} from "express";

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

  getFigureById(id: number): Observable<Figure> {
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

  deleteFigure(id: number): Observable<Figure> {
    return this.http.delete<Figure>(this.baseUrl + 'figures/' + id)
  }

  updateFigure(id: number, figure: Figure):
    Observable<Figure> {
    return this.http.put<Figure>(this.baseUrl + 'figures/' + id, figure);
  }

  // updatefigure(id: string, figure: Figure): void {
  //   this.http.patch<Figure>(this.baseUrl + 'editfigure/' + id, figure)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         console.log(response._id);
  //       },
  //       error => {
  //         console.log(error);
  //       });


  //SET--------------------------------------------------------------------------------------
  getAllsets():
    Observable<Set[]> {
    return this.http.get<Set[]>(this.baseUrl + 'allsets');
  };

  deleteSet(id: number): Observable<Set> {
    return this.http.delete<Set>(this.baseUrl + 'sets/' + id)
  }

  getSetById(id: number): Observable<Set> {
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
}
