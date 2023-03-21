import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BackendserviceService} from "../../shared/backendservice.service";
import {Figure, Set} from "../../shared/data";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-allsets',
  templateUrl: './allsets.component.html',
  styleUrls: ['./allsets.component.css']
})
export class AllsetsComponent implements OnInit {
  sets!: Set[];
  set!: Set;
  form: FormGroup;
  closeResult = '';
  error: HttpErrorResponse;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private bs: BackendserviceService,
    private router: Router,
    config: NgbModalConfig,
    private fb: FormBuilder,
    private modalService: NgbModal,
  ) {
    // Konfiguration des modalen Dialogs
    config.backdrop = 'static';   // schliesst nicht, wenn man in das Fenster dahinter klickt
    config.keyboard = false;      // Modaler Dialog kann nicht durch ESC beendet werden
    // Formular fuer delete
    this.form = this.fb.group(
      {
        nameControl: ['', Validators.required],
        topicControl: ['', Validators.required],
        articleNumberControl: ['', Validators.required],
        purchasePriceControl: ['', Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
        salePriceControl: ['', Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
      });
  };

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
  //to help ngFor identify unique items in array
  trackByData(index: number, set: Set): number {
    return set._id;
  }
  deleteSet(id: number): void {
    this.bs.deleteSet(id).subscribe(
      {
        next: (response) => {
          console.log('response : ', response);
        },
        error: (err) => console.log(err),
        complete: () => console.log('deleteOne() completed')
      });
    window.location.reload();
  }

  readOneSet(id: number): void {
    this.bs.getSetById(id).subscribe({
      next: (response) => {
        this.set = response;
        console.log(this.set);
        this.form.patchValue({
          nameControl: this.set?.name,
          topicControl: this.set?.topic,
          articleNumberControl: this.set?.articleNumber,
          purchasePriceControl: this.set?.purchasePrice,
          salePriceControl: this.set?.salePrice
        });
        return this.set;
      },
      error: (err) => console.log(err),
      complete: () => console.log('readOneFig() completed, id: ' + this.set._id)
    });
  }
}
