import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { AppointmentPost } from 'src/app/models/appointment';
import { Doctor } from 'src/app/models/doctor';
import { AccountService } from 'src/app/services/account.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.css']
})
export class MakeAppointmentComponent implements OnInit {

  doctor: Doctor = new Doctor();
  currentUser : UserToken = new UserToken();
  appointment: AppointmentPost = new AppointmentPost();

  id: number = 0;
  
  constructor(private doctorService: DoctorService,
              private route: ActivatedRoute,
              public accountService: AccountService,
              private appointmentService: AppointmentService,
              private router: Router) { }

  ngOnInit(): void {
    console.log(this.accountService.currentUser$.forEach((user) => {
      if(user){
        this.currentUser = user
      }
    }))
    this.id = this.route.snapshot.params["id"];
    this.doctorService.getMemberDetail(this.id).subscribe(doctor => {
      this.doctor = doctor
    })
    this.appointment.doctor_id = this.id;
    this.appointment.patient_id = this.currentUser.id;
  }

  makeAppointment(){
    console.log(this.appointment)
    this.appointmentService.makeAppointment(this.appointment)
    .subscribe(response => {
        alert("tạo cuộc hẹn thành công")
        this.router.navigate([`/doctors`]);
    },
    error => {
      alert(error.error.message)
    console.log(error)}
    )
  }
}
