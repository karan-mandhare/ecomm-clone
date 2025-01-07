import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login/login.service';

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
    private loginService: LoginService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), passwordValidators],
    ],
  });

  ngOnInit(): void {}

  submit() {
    const email = this.form?.controls?.email?.value;
    const password = this.form?.controls?.password?.value;
    if (!email || !password) {
      this.toastr.error('Enter email and password');
      return;
    }

    this.loginService.loginUser(email, password).subscribe({
      next: (val: any) => {
        console.log('val', val);
        this.authService.saveToken(val?.token?.token);
        this.toastr.success(val.message);
        const role = this.authService.getRole();
        if (role === 'admin') {
          this.router.navigate(['admin/dashboard']);
        } else if (role === 'user') {
          this.router.navigate(['user']);
        } else {
          this.router.navigate(['register']);
        }
      },
      error: (error) => {
        console.log('error', error);
        this.toastr.error(error?.error?.message || 'An error occurred');
        this.router.navigate(['register']);
      },
    });
  }

  signupClk() {
    this.router.navigate(['register']);
  }
}
