import { Component, OnInit } from '@angular/core';
import {Figure, Set} from "../shared/data";
import {BackendserviceService} from "../shared/backendservice.service";

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  figure!: Figure;
  figures!: Figure [];
  set!: Set;
  sets!: Set [];
  closeResult = '';

  constructor(
    private bs: BackendserviceService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.readAllfigures();
    this.readAllSets();
  }

  trackByDatafig(index: number, figure: Figure): number { return figure._id; }
  trackByDataSet(index: number, set: Set): number { return set._id; }

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

  readAllSets(): void {
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

  readOneFigure(id: number): void {
    this.bs.getFigureById(id).subscribe({
      next: (response) => {
        this.figure = response;
        return this.figure;
      },
      error: (err) => console.log(err),
      complete: () => console.log('readOne() completed')
    });
  }

  openModalFig(editModal:any, id: number) {
    this.readOneFigure(id);
    this.modalService.open(editModal, {ariaLabelledBy: 'edit-modal-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  })
  }
}
