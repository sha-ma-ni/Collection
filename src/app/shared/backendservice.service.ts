import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Figure} from "./data";
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

  getAllfigures():
    Observable<Figure[]> {
    return this.http.get<Figure[]>(this.baseUrl + 'allfigures');
  };

  getAllsets():
    Observable<Set[]> {
    return this.http.get<Set[]>(this.baseUrl + 'allsets');
  };

  // getOneFigure(id: string): Observable<Figure> {
  //   return this.http.get<Figure>(this.baseUrl + 'figure/' + id);
  // }

  deletefigure(id: number): void {
    this.http.delete<Figure>(this.baseUrl + 'figure/' + id)
      .subscribe(
        response => {
          console.log(response);
          console.log(response._id);
        },
      error =>  {
          console.log(error);
        });
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
  //   // Observable<Figure> {
  //   // return this.http.patch<Figure>(this.baseUrl + 'allfigures/' + id, figure);
  // }

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

  getFigureById(id: number): Observable < Figure > {
      return this.http.get<Figure>(this.baseUrl + 'editfigure/' + id)
    }
  }
