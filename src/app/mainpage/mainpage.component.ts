import {Component, Input, OnInit} from '@angular/core';
import {Figure, Set} from "../shared/data";
import {BackendserviceService} from "../shared/backendservice.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  figures!: Figure [];
  sets!: Set [];
  closeResult = '';
  @Input() form: FormGroup;

  constructor(
    private bs: BackendserviceService,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      nameControl: ['', Validators.required],
      topicControl: ['', Validators.required],
      articleNumberControl: ['', Validators.required],
      purchasePriceControl: ['',Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
      salePriceControl: ['',Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
    });
  }

  ngOnInit(): void {
    this.readAllfigures();
    this.readAllSets();
  }

  trackByDatafig(index: number, figure: Figure): string { return figure._id; }
  trackByDataSet(index: number, set: Set): string { return set._id; }

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
}
