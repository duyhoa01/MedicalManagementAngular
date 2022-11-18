import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminDoctorsComponent } from './components/admin-doctors/admin-doctors.component';
import { AdminPatientsComponent } from './components/admin-patients/admin-patients.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { EditDoctorComponent } from './components/edit-doctor/edit-doctor.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login',component: LoginComponent },
  { path: 'register',component: RegisterComponent },
  { path: 'doctors',component: DoctorsComponent },
  { path: 'admin-dashboard',component: AdminDashboardComponent },
  { path: 'admin-doctors',component: AdminDoctorsComponent },
  { path: 'add-doctor',component: AddDoctorComponent },
  { path: 'edit-doctor/:id',component: EditDoctorComponent },
  { path: 'admin-patients',component: AdminPatientsComponent },
  { path: 'add-patient',component: AddPatientComponent },
  { path: 'edit-patient/:id',component: EditPatientComponent },
  { path: '',component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
