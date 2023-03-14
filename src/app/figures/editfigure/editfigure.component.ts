import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import { Figure } from "../../shared/data";
import { ActivatedRoute, Router } from "@angular/router";
import { BackendserviceService } from "../../shared/backendservice.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-editfigure',
  templateUrl: './editfigure.component.html',
  styleUrls: ['./editfigure.component.css']
})
export class EditfigureComponent implements OnInit {
  id: string = '';
  figure!: Figure;
  figures!: Figure [];

  @Output() updateEvent = new EventEmitter<Figure>();
  form = new FormGroup({
    nameControl: new FormControl<string>(''),
    topicControl: new FormControl<string>(''),
    articleNumberControl: new FormControl<string>(''),
    purchasePriceControl: new FormControl<string>(''),
    salePriceControl: new FormControl<string>(''),
  });

  constructor(private route: ActivatedRoute,
              private bs: BackendserviceService,
              private fb: FormBuilder,
              private location: Location,
              private router: Router,) {
    this.form = this.fb.group(
      {
        nameControl: ['', Validators.required],
        topicControl: ['', Validators.required],
        articleNumberControl: ['', Validators.required],
        purchasePriceControl: ['', Validators.required],
        salePriceControl: ['', Validators.required],
      }
    );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
   this.readOneFigure(this.id);

   this.form.patchValue({
     nameControl: this.figure?.name,
     topicControl: this.figure?.topic,
     articleNumberControl: this.figure?.articleNumber,
     purchasePriceControl: this.figure?.purchasePrice,
     salePriceControl: this.figure?.salePrice
   });
  }
  readOneFigure(id: string): void {
    // this.bs.getOneFigure(id).subscribe(
    //   {
    //     next: (response) => {
    //       this.figure = response;
    //       console.log ('figure', this.figure);
    //       this.form.patchValue({
    //         nameControl: this.figure?.name,
    //         topicControl: this.figure?.topic,
    //         articleNumberControl: this.figure?.articleNumber,
    //         purchasePriceControl: this.figure?.purchasePrice,
    //         salePriceControl: this.figure?.salePrice,
    //       })
    //       return this.figure;
    //     },
    //     error: (err) => console.log(err),
    //     complete: () => console.log('getOneFigure() completed')
    //   });
  }
  update(): void{
    const values = this.form.value;
    this.figure.name = values.nameControl!;
    this.figure.topic = values.topicControl!;
    this.figure.articleNumber = values.articleNumberControl!;
    this.figure.purchasePrice = values.purchasePriceControl!;
    this.figure.salePrice = values.salePriceControl!;

    console.log(this.figure);
    this.updateEvent.emit(this.figure);
    // this.bs.updatefigure(this.id, this.figure)
      // .subscribe({
      //     next: (response) => {
      //       console.log(response);
      //       console.log(response._id);
      //     },
      //     error: (error) => {
      //       console.log(error);
      //     },
      //     complete: () => console.log('update() completed')
      //   }
      // );
    this.router.navigateByUrl('/allfigures');
  }

  cancel(): void {
    this.location.back();
  }

}
