import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Set } from "../../../shared/data";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendserviceService} from "../../../shared/backendservice.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
  set!: Set;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private bs: BackendserviceService,
    private fb: FormBuilder,
    private location: Location,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        nameControl: ['', Validators.required],
        topicControl: ['', Validators.required],
        articleNumberControl: ['', Validators.required],
        purchasePriceControl: ['',Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
        salePriceControl: ['', Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
      });
    this.set = {_id: '0', name: '', topic: '', salePrice: 0 , purchasePrice: 0, articleNumber: ''};
  }

  ngOnInit(): void {

  }

  onSubmit(): void {

    console.warn(this.form.value);

    const values = this.form.value;
    this.set.name = values.nameControl;
    this.set.topic = values.topicControl;
    this.set.articleNumber = values.articleNumberControl;
    this.set.purchasePrice = values.purchasePriceControl;
    this.set.salePrice = values.salePriceControl;

    console.log(this.set);
    this.bs.createset(this.set);

    this.router.navigate(['/allsets'])
    .then(() => {
      window.location.reload();
    });
  }

  cancel(): void {
    this.location.back();
  }
}
