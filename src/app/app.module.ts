import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminDoctorsComponent } from './components/admin-doctors/admin-doctors.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { EditDoctorComponent } from './components/edit-doctor/edit-doctor.component';
import { AdminPatientsComponent } from './components/admin-patients/admin-patients.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DoctorsComponent,
    AdminDashboardComponent,
    SidebarComponent,
    AdminDoctorsComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    AdminPatientsComponent,
    AddPatientComponent,
    EditPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
