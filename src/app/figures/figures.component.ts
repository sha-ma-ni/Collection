import {Component, OnInit} from '@angular/core';
import {Figure} from "../shared/data";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendserviceService} from "../shared/backendservice.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {response} from "express";


@Component({
  selector: 'app-figures',
  templateUrl: './figures.component.html',
  styleUrls: ['./figures.component.css']
})

export class FiguresComponent implements OnInit {
  figures!: Figure [];
  figure!: Figure;
  // selectedfigureId: string;
  form: FormGroup;
  closeResult = '';

  constructor(
    private route: ActivatedRoute,
    private bs: BackendserviceService,
    private router: Router,
    // config: NgbModalConfig,
    private fb: FormBuilder,
    private modalService: NgbModal,
    // private location: Location,
    private error: HttpErrorResponse,

  ) {
    // Konfiguration des modalen Dialogs
    // config.backdrop = 'static';   // schliesst nicht, wenn man in das Fenster dahinter klickt
    // config.keyboard = false;      // Modaler Dialog kann nicht durch ESC beendet werden
    // Formular fuer delete
    this.form = this.fb.group(
      {
        nameControl: ['', Validators.required],
        topicControl: ['', Validators.required],
        articleNumberControl: ['', Validators.required],
        purchasePriceControl: [''],
        salePriceControl: [''],
      });
  };

  ngOnInit(): void {
    this.readAllfigures();
    // this.selectedfigureId = String(this.route.snapshot.paramMap.get('id'))
    // if(this.selectedfigureId === '0') {
    //   this.readAllfigures();
    // } else if (this.selectedfigureId > '0') {
    //   this.readOne(this.selectedfigureId);
    // }
  }

  readAllfigures(): void {
    this.bs.getAllfigures().subscribe(
      {
        next: (response) => {
          this.figures = response;
          console.log(this.figures);
          return this.figures;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }

  //to help ngFor identify unique items in array
  trackByData(index: number, figure: Figure): number {
    return figure._id;
  }

  // readOneFig(id: number): void {
  //   this.bs.getFigureById(id).subscribe(
  //     (response: Figure) => this.figure = response,
  //     error => this.error = error,
  //   );
  // }


  deleteFigure(id: number): void {
    this.bs.deletefigure(id).subscribe(
      {
        next: (response) => {
          console.log('response : ', response);
        },
        error: (err) => console.log(err),
        complete: () => console.log('deleteOne() completed')
      }
    )
  }

  // open(content: any, id: number): void {
  //   this.readOneFig(id);
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.result = `Closed with: ${result}`;
  //     if (closeResult === 'delete') {
  //       this.deleteFigure(this.figure?._id);
  //     } else {
  //       location.reload()
  //     }
  //   });
  // }

  openModal() {
    const dialogConfirm = new MatDialogConfig();
  }
}

