import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-admin-appointment',
  templateUrl: './admin-appointment.component.html',
  styleUrls: ['./admin-appointment.component.css']
})
export class AdminAppointmentComponent implements OnInit {

  page: number = 0;
  count: number | undefined = undefined;
  size: number = 2;
  x: number | undefined = undefined;

  appointments : Appointment[] =[]

  constructor(private appointmentService: AppointmentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getListAppointment()
  }

  getListAppointment() {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'];
      this.size = params['size'];
    });

    this.appointmentService.getListAppointment(this.page,this.size).subscribe(response =>{
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
