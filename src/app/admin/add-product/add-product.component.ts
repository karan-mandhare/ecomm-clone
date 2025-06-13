import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { CommonhttpService } from 'src/app/service/commonhttp.service';
import { CommonResponse } from 'src/app/model/CommonResponse';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Input() product!: any;
  @Output() update = new EventEmitter();

  productForm: FormGroup;
  categoryOptions: any[] = [];
  ratings = [1, 2, 3, 4, 5];

  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    // private productService: ProductService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      available: [true, Validators.required],
      desc: ['', Validators.required],
      price: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      category: [null, Validators.required],
      image: [null],
      brand: ['', Validators.required],
      rating: [
        null,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.productForm.patchValue({
        name: this.product?.name,
        available: this.product?.available || true,
        desc: this.product?.desc,
        price: this.product?.price,
        discount: this.product?.discount,
        category: this.product?.category,
        brand: this.product?.brand,
        rating: this.product?.rating || null,
      });
    }
  }

  ngOnInit(): void {
    this.categoryService.getCategories((result: CommonResponse<any>) => {
      this.categoryOptions = result?.data;
    })
  }

  onImageChange(event: any) {
    const file = event?.target?.files?.[0];
    if (file) {
      this.selectedFile = file;
      this.productForm.patchValue({ image: file });
    }
  }


  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();

      formData.append('name', this.productForm.controls?.['name']?.value);
      formData.append('brandName', this.productForm.controls?.['brand']?.value);
      formData.append('desc', this.productForm.controls?.['desc']?.value);
      formData.append('price', this.productForm.controls?.['price']?.value);
      formData.append('discount', this.productForm.controls?.['discount']?.value);
      formData.append('categoryId', this.productForm.controls?.['category']?.value);
      formData.append('rating', this.productForm.controls?.['rating']?.value);
      formData.append('available', this.productForm.controls?.['available']?.value);

      if (this.selectedFile)
        formData.append('image', this.selectedFile);

      this.productService.addProduct(formData, (result: CommonResponse<any>) => {
        if (result?.success) {
          this.toastr.success(result?.message)
          this.update.emit()
        } else {
          this.toastr.error(result?.message)
        }
      })

    } else {
      this.toastr.error('Form is invalid');
    }
  }

  closeForm() {
    this.productForm.reset();
  }
}
