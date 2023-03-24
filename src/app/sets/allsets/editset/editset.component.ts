import {Component, OnInit} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import {Set} from "../../../shared/data";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendserviceService} from "../../../shared/backendservice.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-editset',
  templateUrl: './editset.component.html',
  styleUrls: ['./editset.component.css']
})
export class EditsetComponent {
  id: string = '';
  set!: Set;
  sets!: Set [];
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
      purchasePriceControl: ['', Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
      salePriceControl: ['', Validators.pattern("[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)")],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readOneSet(this.id);
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
      complete: () => console.log('readOneSet() completed ')
    });
  }

  update(): void {
    const values = this.form.value;
    this.set.name = values.nameControl;
    this.set.topic = values.topicControl;
    this.set.articleNumber = values.articleNumberControl;
    this.set.purchasePrice = values.purchasePriceControl;
    this.set.salePrice = values.salePriceControl;

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
    this.router.navigate(['/allsets'])
      .then(() => {
        window.location.reload();
      });
  }

  cancel(): void {
    this.location.back();
  }

}
