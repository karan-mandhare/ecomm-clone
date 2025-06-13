import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  @Output() update = new EventEmitter();
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: CategoryService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        image: file,
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.error('Enter valid information');
    } else {
      const formData = new FormData();
      formData.append('name', this.form?.get('name')?.value);
      formData.append('image', this.form?.get('image')?.value);

      this.http.addCategory(formData, (result: any) => {
        if (result.success) {
          this.toastr.success(result.message)
          this.update.emit();
        } else {
          this.toastr.error(result.message)
        }
      })
    }
  }

  closeForm() {
    this.form.reset();
  }
}
