import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { AdminAppointmentComponent } from './components/admin-appointment/admin-appointment.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminDoctorsComponent } from './components/admin-doctors/admin-doctors.component';
import { AdminPatientsComponent } from './components/admin-patients/admin-patients.component';
import { DoctorAppointmentComponent } from './components/doctor-appointment/doctor-appointment.component';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { EditDoctorComponent } from './components/edit-doctor/edit-doctor.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MakeAppointmentComponent } from './components/make-appointment/make-appointment.component';
import { PatientAppointmentComponent } from './components/patient-appointment/patient-appointment.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login',component: LoginComponent },
  { path: 'register',component: RegisterComponent },
  { path: 'doctors',component: DoctorsComponent },
  { path: 'doctors/:id',component: DoctorDetailComponent },
  { path: 'admin-dashboard',component: AdminDashboardComponent },
  { path: 'admin-doctors',component: AdminDoctorsComponent },
  { path: 'add-doctor',component: AddDoctorComponent },
  { path: 'edit-doctor/:id',component: EditDoctorComponent },
  { path: 'admin-patients',component: AdminPatientsComponent },
  { path: 'add-patient',component: AddPatientComponent },
  { path: 'edit-patient/:id',component: EditPatientComponent },
  { path: 'doctors/:id/makeappointment',component: MakeAppointmentComponent },
  { path: 'admin-appointments',component: AdminAppointmentComponent },
  { path: 'doctor-appointments',component: DoctorAppointmentComponent },
  { path: 'patient-appointments',component: PatientAppointmentComponent },
  { path: '',component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
