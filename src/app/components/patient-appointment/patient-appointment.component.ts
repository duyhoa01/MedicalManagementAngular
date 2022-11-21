import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { Appointment } from 'src/app/models/appointment';
import { AccountService } from 'src/app/services/account.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';


@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit {

  page: number = 0;
  count: number | undefined = undefined;
  size: number = 2;
  x: number | undefined = undefined;

  currentUser : UserToken = new UserToken();

  appointments : Appointment[] =[]
  
  constructor(private patientService: PatientService,
    private accountService: AccountService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.accountService.currentUser$.forEach((user) => {
      if(user){
        this.currentUser = user
      }
    })
    this.getListAppointment();
  }

  getListAppointment() {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'];
      this.size = params['size'];
    });

    this.patientService.getListAppointment(this.page,this.size,this.currentUser.id).subscribe(response =>{
      if(response.page.totalElements == 0){
        this.appointments = []
      } else{
        this.appointments = response._embedded.appoinments;
        this.count = response.page.totalPages;
        this.x = response.page.totalPages -1;
      }
    })
  }

  

}
