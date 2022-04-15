import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.scss'],
})
export class FormBookComponent implements OnInit {
  bookForm: FormGroup;
  getTypeAction: any;
  getId: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    // this.bookForm = this.formBuilder.group({
    //   name: [''],
    //   price: [''],
    //   description: [''],
    // });

    this.bookForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      price: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      description: new FormControl(),
    });

    this.getTypeAction =
      this.activatedRoute.snapshot.paramMap.get('type_action');
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.getTypeAction === 'edit') {
      this.crudService.GetBook(this.getId).subscribe((res) => {
        this.bookForm.setValue({
          name: res['name'],
          price: res['price'],
          description: res['description'],
        });
      });
    }
  }

  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `กรุณาระบุ`,
    },
    {
      error: 'minlength',
      format: (label, error) =>
        `กรุณาอย่างน้อย ${error.requiredLength} ตัวอักษร`,
    },
    {
      error: 'pattern',
      format: (label, error) =>
        `${String(label).toUpperCase()} DOESN'T LOOK RIGHT...`,
    },
  ];

  ngOnInit(): void {}

  onSubmit(): any {
    console.log('this.getType: ', this.getTypeAction);
    if (this.getTypeAction === 'add') {
      this.crudService.AddBook(this.bookForm.value).subscribe(
        () => {
          console.log('Data added successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/book-list'));
        },
        (err) => {
          console.log('err: ', err);
        }
      );
    } else {
      console.log('this.getId: ', this.getId);
      this.crudService.updateBook(this.getId, this.bookForm.value).subscribe(
        () => {
          console.log('Data update successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/book-list'));
        },
        (err) => {
          console.log('err: ', err);
        }
      );
    }
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }
}
