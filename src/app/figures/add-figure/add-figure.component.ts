import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import { Figure } from "../../shared/data";
import { ActivatedRoute, Router } from "@angular/router";
import { BackendserviceService } from "../../shared/backendservice.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-figure',
  templateUrl: './add-figure.component.html',
  styleUrls: ['./add-figure.component.css']
})
export class AddFigureComponent implements OnInit {
  figure: Figure;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private bs: BackendserviceService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router
  ) {
    // Initialisiert das Formular
    this.form = this.fb.group(
      {
        nameControl: ['', Validators.required],
        topicControl: ['', Validators.required],
        articleNumberControl: ['', Validators.required],
        purchasePriceControl: ['',Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
        salePriceControl: ['', Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
      });
    this.figure = {_id: '0', name: '', topic: '', salePrice: 0 , purchasePrice: 0, articleNumber: ''};
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.warn(this.form.value);

    const values = this.form.value; // Holt sich die Werte des Formulares
    this.figure.name = values.nameControl;
    this.figure.topic = values.topicControl;
    this.figure.articleNumber = values.articleNumberControl;
    this.figure.purchasePrice = values.purchasePriceControl;
    this.figure.salePrice = values.salePriceControl;

    console.log(this.figure);
    this.bs.createfigure(this.figure);
    this.router.navigateByUrl('/allfigures');

  }

  cancel(): void {
    this.location.back();
  }
}
