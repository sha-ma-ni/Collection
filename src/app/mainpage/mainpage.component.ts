import { Component, OnInit } from '@angular/core';
import {Figure} from "../shared/data";
import {BackendserviceService} from "../shared/backendservice.service";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  figure!: Figure;
  figures!: Figure [];

  constructor(
    private bs: BackendserviceService,
  ) { }

  ngOnInit(): void {
    this.readAllfigures();
  }

  trackByData(index: number, figure: Figure): number { return figure._id; }

  readAllfigures(): void {
    this.bs.getAllfigures().subscribe(
      {
        next: (response) => {
          this.figures = response;
          console.log (this.figures);
          return this.figures;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }
}
