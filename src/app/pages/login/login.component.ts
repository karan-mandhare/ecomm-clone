import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonResponse } from 'src/app/model/CommonResponse';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { WishlistService } from 'src/app/service/wishlist.service';


function passwordValidators(controls: AbstractControl) {
  const hasUppercase = /[A-Z]/.test(controls.value);
  const hasNumber = /\d/.test(controls.value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(controls.value);

  if (hasUppercase && hasNumber && hasSpecialChar) {
    return null;
  }

  return { invalidPassword: true };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginserviceService,
    private authService: AuthService,
    private wishListService: WishlistService
  ) { }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), passwordValidators],
    ],
  });

  ngOnInit(): void { }

  submit() {
    if (this.form.valid) {
      this.loginService.loginUser(this.form.value, (result: CommonResponse<any>) => {
        if (result.success) {
          this.authService.clear();
          let role = result?.data?.roles;
          this.authService.setRole(role?.[0]);
          this.toastr.success(result.message)
          sessionStorage.setItem('token', result?.data?.token);  // Store token
          let id = this.authService.decodeToken(result?.data?.token)
          // this.wishListService.getWishList(id);
          if (result?.data?.roles?.length > 1 || result?.data?.roles?.[0] == "ADMIN") {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user'])
          }
        } else {
          this.toastr.error(result?.message)
        }

      })
    } else {
      this.toastr.error('Enter valid data');
    }
  }

  signupClk() {
    this.router.navigate(['register']);
  }
}
