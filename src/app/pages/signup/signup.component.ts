import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupserviceService } from 'src/app/service/signupservice.service';

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
    private httpService: SignupserviceService
  ) { }

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    password: [
      '',
      [Validators.required, Validators.minLength(8), passwordValidators],
    ],
  });

  ngOnInit(): void { }

  submit() {
    if (this.form.valid) {
      let data = this.form.value;
      let newData = {
        ...data,
        roles: [{ name: "USER" }]
      };
      this.httpService.createUser(newData, (result: any) => {
        if (result.success) {
          this.toastr.success(result.message)
          this.router.navigate(['login'])
        } else {
          this.toastr.error(result.message)
        }
      })
    } else {
      this.toastr.error('Enter field data properly.');
    }
  }

  loginClk() {
    this.router.navigate(['login']);
  }
}
