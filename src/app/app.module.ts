import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { HighchartsComponent } from './chart/highcharts/highcharts.component';

import { ChartModule } from 'angular-highcharts';
import { MatTableComponent } from './mat-table/mat-table/mat-table.component';

// angular material models
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UserModule } from './user/user.module';
import { AuthInterceptorInterceptor } from './auth/auth-interceptor.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    FooterComponent,
    NotFoundComponent,
    HighchartsComponent,
    MatTableComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbRatingModule,
    ChartModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    UserModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
