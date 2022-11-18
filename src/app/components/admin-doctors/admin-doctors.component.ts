import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { AccountService } from 'src/app/services/account.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-admin-doctors',
  templateUrl: './admin-doctors.component.html',
  styleUrls: ['./admin-doctors.component.css']
})
export class AdminDoctorsComponent implements OnInit {

  doctors : Doctor[] =[]
  key: string | null = ''
  page: number = 0;
  count: number = 0;
  size: number = 10;
  specialty: number = 0;

  constructor(private doctorService: DoctorService,public accountService: AccountService) { }

  ngOnInit(): void {
    this.getDoctor(this.page)
  }

  getDoctor(page:number){
    this.doctorService.getMembers(this.key,this.specialty,page,this.size).subscribe(doctor => {
      if(doctor.page.totalElements == 0){
        this.doctors = []
      } else{
        this.doctors = doctor._embedded.doctors;
        this.count = doctor.page.totalPages;
      }
    });
  }

  deleteDoctor(id: number){
    if(confirm("Are you sure to delete "+id)) {
      this.doctorService.deleteDoctor(id).subscribe(
        response => {
          alert(response.message)
          this.getDoctor(this.page)
        },
        error => alert(error.message)
      )
    }
  }

}
