import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
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
import { UserChatComponent } from './components/user-chat/user-chat.component';

import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';

import {
  RoleGuardService as RoleGuard
} from './services/role-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'doctors/:id', component: DoctorDetailComponent },
  {
    path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    }
  },
  {
    path: 'admin-doctors', component: AdminDoctorsComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    }
  },
  {
    path: 'add-doctor', component: AddDoctorComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    }
  },
  {
    path: 'edit-doctor/:id', component: EditDoctorComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    }
  },
  {
    path: 'admin-patients', component: AdminPatientsComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    }
  },
  {
    path: 'add-patient', component: AddPatientComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    }
  },
  {
    path: 'edit-patient/:id', component: EditPatientComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    }
  },
  { path: 'doctors/:id/makeappointment', component: MakeAppointmentComponent, canActivate: [AuthGuard], },
  {
    path: 'admin-appointments', component: AdminAppointmentComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    }
  },
  {
    path: 'doctor-appointments', component: DoctorAppointmentComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_DOCTOR'
    }
  },
  {
    path: 'patient-appointments', component: PatientAppointmentComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_PATIENT'
    }
  },
  { path: 'messages/:id', component: UserChatComponent , canActivate: [AuthGuard],},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
