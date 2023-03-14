import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BackendserviceService} from "../../shared/backendservice.service";
import { Set } from "../../shared/data";

@Component({
  selector: 'app-allsets',
  templateUrl: './allsets.component.html',
  styleUrls: ['./allsets.component.css']
})
export class AllsetsComponent implements OnInit {
  sets!: Set[];

  constructor(
    private route: ActivatedRoute,
    private bs: BackendserviceService
  ) { };

  ngOnInit(): void {
    this.readAllsets();
  }

  readAllsets(): void {
    this.bs.getAllsets().subscribe(
      {
        next: (response) => {
          this.sets = response;
          console.log (this.sets);
          return this.sets;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }
}
