import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

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

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      available: [true, Validators.required],
      desc: ['', Validators.required],
      actPrice: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      category: ['', Validators.required],
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
        name: this.product.name || '',
        available: this.product.available || true,
        desc: this.product.desc || '',
        actPrice: this.product.actPrice || '',
        discount: this.product.discount || '',
        category: this.product.category || '',
        brand: this.product.brand || '',
        rating: this.product.rating || null,
      });
    }
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (val: any) => {
        this.categoryOptions = val?.data?.data;
        console.log(val.data.data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();

      formData.append('name', this.productForm.controls?.['name']?.value);
      formData.append(
        'available',
        this.productForm.controls?.['available']?.value
      );
      formData.append('desc', this.productForm.controls?.['desc']?.value);
      formData.append(
        'actPrice',
        this.productForm.controls?.['actPrice']?.value
      );
      formData.append(
        'discount',
        this.productForm.controls?.['discount']?.value
      );
      formData.append(
        'category',
        this.productForm.controls?.['category']?.value
      );
      formData.append('image', this.productForm.controls?.['image']?.value);
      formData.append('brand', this.productForm.controls?.['brand']?.value);
      formData.append('rating', this.productForm.controls?.['rating']?.value);

      if (typeof this.product === 'object') {
        formData.append('id', this.product._id);
        this.productService.updateProduct(formData).subscribe({
          next: (val: any) => {
            this.toastr.success(val.message);
            this.update.emit();
          },
          error: (error) => {
            this.toastr.error(error.error.message);
            console.log(error);
          },
        });
      } else {
        console.log('cat', this.productForm.controls);
        this.productService.addProduct(formData).subscribe({
          next: (val: any) => {
            this.toastr.success(val.message);
            this.update.emit();
            setTimeout(() => {
              this.closeForm();
            }, 1000);
          },
          error: (error) => {
            this.toastr.error(error.error.message);
          },
        });
      }
    } else {
      this.toastr.error('Form is invalid');
    }
  }

  closeForm() {
    this.productForm.reset();
  }
}
