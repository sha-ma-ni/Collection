import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
import {BackendserviceService} from "../../shared/backendservice.service";
import {Set} from "../../shared/data";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {filter} from "rxjs";

@Component({
  selector: 'app-allsets',
  templateUrl: './allsets.component.html',
  styleUrls: ['./allsets.component.css']
})
export class AllsetsComponent implements OnInit {
  id: string;
  sets!: Set[];
  set!: Set;
  form: FormGroup;
  formEdit: FormGroup;
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
    // modal Dialog config
    config.backdrop = 'static';   // will not be closed in the background
    config.keyboard = false;      // Modal dialog cannot be terminated by ESC
    // for delete
    this.form = this.fb.group(
      {
        nameControl: ['', Validators.required],
        topicControl: ['', Validators.required],
        articleNumberControl: ['', Validators.required],
        purchasePriceControl: ['', Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
        salePriceControl: ['', Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
      });
    //for update
    this.formEdit = new FormGroup({
      nameControl: new FormControl<string>(''),
      topicControl: new FormControl<string>(''),
      articleNumberControl: new FormControl<string>(''),
      purchasePriceControl: new FormControl<number>(0),
      salePriceControl: new FormControl<number>(0),
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
  trackByData(index: number, set: Set): string {
    return set._id;
  }
  deleteSet(id: string): void {
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

  readOneSet(id: string): void {
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

  openModal(content: any, id: string): void {

    this.readOneSet(id);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'delete') {
        this.deleteSet(this.set?._id);
      } else {
        location.reload();
      }
    });
  }

  openEditModal(edit: any, id: string) {
    this.readOneSet(id);
    this.modalService.open(edit, {ariaLabelledBy: 'modal-basic-title2'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'update') {
        this.update();
      } else {
        location.reload();
      }
    });
  }

  update(): void {
    const values = this.formEdit.value;
    this.set.name = values.nameControl!;
    this.set.topic = values.topicControl!;
    this.set.articleNumber = values.articleNumberControl!;
    this.set.purchasePrice = values.purchasePriceControl!;
    this.set.salePrice = values.salePriceControl!;

    console.log(this.set);
    // this.updateEvent.emit(this.set);
    this.bs.updateSet(this.id, this.set)
      .subscribe({
          next: (response) => {
            console.log(response);
            console.log(response._id);
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => console.log('update() completed')
        }
      );
    this.router.navigateByUrl('/allsets');
  }


}
