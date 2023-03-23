import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl, Validators,
} from "@angular/forms";
import {Figure} from "../../shared/data";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendserviceService} from "../../shared/backendservice.service";
import {Location} from '@angular/common';


@Component({
  selector: 'app-editfigure',
  templateUrl: './editfigure.component.html',
  styleUrls: ['./editfigure.component.css']
})
export class EditfigureComponent implements OnInit {
  id: string = '';
  figure!: Figure;
  figures!: Figure [];
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private bs: BackendserviceService,
              private fb: FormBuilder,
              private location: Location,
              private router: Router) {
    this.form = this.fb.group({
      nameControl: ['', Validators.required],
      topicControl: ['', Validators.required],
      articleNumberControl: ['', Validators.required],
      purchasePriceControl: ['',Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
      salePriceControl: ['',Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readOneFig(this.id);
  }


  readOneFig(id: string): void {
    this.bs.getFigureById(id).subscribe({
      next: (response) => {
        this.figure = response;
        console.log(this.figure);
        this.form.patchValue({
          nameControl: this.figure?.name,
          topicControl: this.figure?.topic,
          articleNumberControl: this.figure?.articleNumber,
          purchasePriceControl: this.figure?.purchasePrice,
          salePriceControl: this.figure?.salePrice
        });
        return this.figure;
      },
      error: (err) => console.log(err),
      complete: () => console.log('readOneFig() completed ')
    });
  }



  update(): void {
    const values = this.form.value;
    this.figure.name = values.nameControl;
    this.figure.topic = values.topicControl;
    this.figure.articleNumber = values.articleNumberControl;
    this.figure.purchasePrice = values.purchasePriceControl;
    this.figure.salePrice = values.salePriceControl;

    // console.log(this.figure);
    //this.updateEvent.emit(this.figure);
    this.bs.updateFigure(this.id, this.figure)
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

    this.router.navigateByUrl('/allfigures');

  }


  cancel(): void {
    this.location.back();
  }

}
