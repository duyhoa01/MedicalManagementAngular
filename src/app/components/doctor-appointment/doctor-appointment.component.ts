import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserToken } from 'src/app/models/app-user';
import { Appointment } from 'src/app/models/appointment';
import { AccountService } from 'src/app/services/account.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit {

  page: number = 0;
  count: number | undefined = undefined;
  size: number = 2;
  x: number | undefined = undefined;

  currentUser : UserToken = new UserToken();

  appointments : Appointment[] =[]
  
  constructor(private doctorService: DoctorService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,) { }

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

    this.doctorService.getListAppointment(this.page,this.size,this.currentUser.id).subscribe(response =>{
      if(response.page.totalElements == 0){
        this.appointments = []
      } else{
        this.appointments = response._embedded.appoinments;
        this.count = response.page.totalPages;
        this.x = response.page.totalPages -1;
      }
    })
  }

  acceptAppointment(id:number){
    if(confirm("bạn có muốn xác nhận cuộc hẹn này không")) {
      this.appointmentService.appceptAppointment(id)
      .subscribe(response => {
          alert("xác nhận thành công")
          this.getListAppointment();
      },
      error => {
        alert(error.error.message)
      console.log(error)}
      )
    }
  }


}
