import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/services/signup/signup.service';

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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private signup: SignupService
  ) {}

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), passwordValidators],
    ],
  });

  ngOnInit(): void {}

  submit() {
    const username = this.form.controls.username.value;
    const email = this.form.controls.email.value;
    const password = this.form.controls.password.value;
    if (!username || !email || !password) {
      this.toastr.error('All fields required');
      return;
    }
    this.signup.signUp(username, email, password).subscribe({
      next: (val: any) => {
        console.log(val);
        this.toastr.success(val.message);
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }

  loginClk() {
    this.router.navigate(['login']);
  }
}
